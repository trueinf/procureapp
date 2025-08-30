// Runs a KB-grounded query via Assistants API using your vector store
// Request: POST { query: string }
// Env: OPENAI_API_KEY, OPENAI_ASSISTANT_ID, OPENAI_VECTOR_STORE_ID

type NetlifyEvent = {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body?: string | null;
};

type NetlifyResponse = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

const OPENAI_API_BASE = "https://api.openai.com/v1";

export const handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: corsHeaders, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const assistantId = process.env.OPENAI_ASSISTANT_ID;
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
  if (!apiKey || !assistantId || !vectorStoreId) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Missing OPENAI_API_KEY, OPENAI_ASSISTANT_ID, or OPENAI_VECTOR_STORE_ID" }),
    };
  }

  try {
    const { query } = JSON.parse(event.body || "{}");
    if (!query || typeof query !== "string") {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "'query' is required" }) };
    }

    const authHeader = { Authorization: `Bearer ${apiKey}`, 'OpenAI-Beta': 'assistants=v2' };

    // 1) Create thread
    const thRes = await fetch(`${OPENAI_API_BASE}/threads`, {
      method: 'POST',
      headers: { ...authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    if (!thRes.ok) {
      const t = await thRes.text();
      throw new Error(`thread create failed: ${t}`);
    }
    const th = await thRes.json();
    const threadId = th.id as string;

    // 2) Add message
    const msgRes = await fetch(`${OPENAI_API_BASE}/threads/${threadId}/messages`, {
      method: 'POST',
      headers: { ...authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'user', content: query })
    });
    if (!msgRes.ok) {
      const t = await msgRes.text();
      throw new Error(`message add failed: ${t}`);
    }

    // 3) Run with vector store tool resources
    const runRes = await fetch(`${OPENAI_API_BASE}/threads/${threadId}/runs`, {
      method: 'POST',
      headers: { ...authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        assistant_id: assistantId,
        tool_resources: { file_search: { vector_store_ids: [vectorStoreId] } },
      })
    });
    if (!runRes.ok) {
      const t = await runRes.text();
      throw new Error(`run create failed: ${t}`);
    }
    const run = await runRes.json();
    const runId = run.id as string;

    // 4) Poll
    const terminal = new Set(["completed","failed","cancelled","expired"]);
    let status = run.status as string;
    const start = Date.now();
    while (!terminal.has(status)) {
      if (Date.now() - start > 45000) throw new Error('kb run timeout');
      await new Promise(r => setTimeout(r, 800));
      const stRes = await fetch(`${OPENAI_API_BASE}/threads/${threadId}/runs/${runId}`, { headers: authHeader as any });
      if (!stRes.ok) {
        const t = await stRes.text();
        throw new Error(`run fetch failed: ${t}`);
      }
      const st = await stRes.json();
      status = st.status;
    }

    // 5) Get messages
    const listRes = await fetch(`${OPENAI_API_BASE}/threads/${threadId}/messages?limit=10`, { headers: authHeader as any });
    if (!listRes.ok) {
      const t = await listRes.text();
      throw new Error(`messages list failed: ${t}`);
    }
    const list = await listRes.json();
    const assistantMsg = (list.data as any[]).find(m => m.role === 'assistant');
    const content = assistantMsg?.content || [];
    const textPart = content.find((c: any) => c.type === 'text');
    const answer = textPart?.text?.value || '';

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer }),
    };
  } catch (err: any) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: err?.message || 'Unknown error' }) };
  }
};

