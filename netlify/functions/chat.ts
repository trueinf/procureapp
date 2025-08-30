// Minimal Netlify function to proxy chat to OpenAI Assistants API
// Expects env vars: OPENAI_API_KEY, OPENAI_ASSISTANT_ID (required)
// Optional: OPENAI_VECTOR_STORE_ID to enable file_search grounding

const OPENAI_API_BASE = "https://api.openai.com/v1";

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
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const assistantId = process.env.OPENAI_ASSISTANT_ID;
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;

  if (!apiKey || !assistantId) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Missing OPENAI_API_KEY or OPENAI_ASSISTANT_ID" }),
    };
  }

  try {
    const { message, threadId } = JSON.parse(event.body || "{}");
    if (!message || typeof message !== "string") {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Missing 'message' in request body" }),
      };
    }

    const authHeader = { Authorization: `Bearer ${apiKey}`, 'OpenAI-Beta': 'assistants=v2' } as const;

    // 1) Ensure thread
    let currentThreadId = threadId as string | undefined;
    if (!currentThreadId) {
      const createThreadRes = await fetch(`${OPENAI_API_BASE}/threads`, {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!createThreadRes.ok) {
        const err = await createThreadRes.text();
        throw new Error(`Failed to create thread: ${err}`);
      }
      const threadData = await createThreadRes.json();
      currentThreadId = threadData.id;
    }

    // 2) Add user message
    const addMsgRes = await fetch(`${OPENAI_API_BASE}/threads/${currentThreadId}/messages`, {
      method: "POST",
      headers: { ...authHeader, "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "user",
        content: message,
      }),
    });
    if (!addMsgRes.ok) {
      const err = await addMsgRes.text();
      throw new Error(`Failed to add message: ${err}`);
    }

    // 3) Create run
    const runBody: any = { assistant_id: assistantId };
    if (vectorStoreId) {
      runBody.tool_resources = {
        file_search: { vector_store_ids: [vectorStoreId] },
      };
    }

    const runRes = await fetch(`${OPENAI_API_BASE}/threads/${currentThreadId}/runs`, {
      method: "POST",
      headers: { ...authHeader, "Content-Type": "application/json" },
      body: JSON.stringify(runBody),
    });
    if (!runRes.ok) {
      const err = await runRes.text();
      throw new Error(`Failed to create run: ${err}`);
    }
    const run = await runRes.json();

    // 4) Poll run status until completed/cancelled/failed
    const terminal = new Set(["completed", "cancelled", "failed", "expired"]);
    let runStatus = run.status as string;
    let runId = run.id as string;
    const maxWaitMs = 60000; // 60s
    const start = Date.now();
    while (!terminal.has(runStatus)) {
      if (Date.now() - start > maxWaitMs) {
        throw new Error("Run polling timed out");
      }
      await new Promise((r) => setTimeout(r, 1000));
      const statusRes = await fetch(`${OPENAI_API_BASE}/threads/${currentThreadId}/runs/${runId}`, {
        headers: authHeader as any,
      });
      if (!statusRes.ok) {
        const err = await statusRes.text();
        throw new Error(`Failed to fetch run: ${err}`);
      }
      const statusJson = await statusRes.json();
      runStatus = statusJson.status;
    }

    // 5) Fetch latest assistant message
    const msgsRes = await fetch(`${OPENAI_API_BASE}/threads/${currentThreadId}/messages?limit=10`, {
      headers: authHeader as any,
    });
    if (!msgsRes.ok) {
      const err = await msgsRes.text();
      throw new Error(`Failed to list messages: ${err}`);
    }
    const msgsJson = await msgsRes.json();
    // messages are newest first (OpenAI API returns in descending order)
    const assistantMsg = (msgsJson.data as any[]).find((m) => m.role === "assistant");
    let answer = "";
    if (assistantMsg) {
      const content = assistantMsg.content || [];
      const textPart = content.find((c: any) => c.type === "text");
      answer = textPart?.text?.value || "";
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ threadId: currentThreadId, answer, status: runStatus }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err?.message || "Unknown error" }),
    };
  }
};
