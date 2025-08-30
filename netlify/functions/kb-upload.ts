// Upload a KB file (.docx/.pdf/.txt) to OpenAI Files API and attach to a vector store
// Request: POST { filename: string, base64: string }
// Env: OPENAI_API_KEY, OPENAI_VECTOR_STORE_ID (optional)

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
  if (!apiKey) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Missing OPENAI_API_KEY" }) };
  }

  try {
    const { filename, base64 } = JSON.parse(event.body || "{}");
    if (!filename || !base64) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "filename and base64 required" }) };
    }

    const buffer = Buffer.from(base64, "base64");
    const form = new FormData();
    form.append("purpose", "file_search");
    const mime = filename.toLowerCase().endsWith(".pdf")
      ? "application/pdf"
      : filename.toLowerCase().endsWith(".docx")
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : "text/plain";
    const blob = new Blob([buffer], { type: mime });
    form.append("file", blob, filename);

    // 1) Upload file
    const uploadRes = await fetch(`${OPENAI_API_BASE}/files`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, 'OpenAI-Beta': 'assistants=v2' },
      body: form as any,
    });
    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      throw new Error(`File upload failed: ${errText}`);
    }
    const uploaded = await uploadRes.json();
    const fileId = uploaded.id as string;

    // 2) Ensure vector store
    let vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
    if (!vectorStoreId) {
      const vsRes = await fetch(`${OPENAI_API_BASE}/vector_stores`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", 'OpenAI-Beta': 'assistants=v2' },
        body: JSON.stringify({ name: "ProcureApp KB" }),
      });
      if (!vsRes.ok) {
        const errText = await vsRes.text();
        throw new Error(`Create vector store failed: ${errText}`);
      }
      const vs = await vsRes.json();
      vectorStoreId = vs.id as string;
    }

    // 3) Attach file to vector store
    const attachRes = await fetch(`${OPENAI_API_BASE}/vector_stores/${vectorStoreId}/files`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", 'OpenAI-Beta': 'assistants=v2' },
      body: JSON.stringify({ file_id: fileId }),
    });
    if (!attachRes.ok) {
      const errText = await attachRes.text();
      throw new Error(`Attach file failed: ${errText}`);
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ fileId, vectorStoreId }),
    };
  } catch (err: any) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: err?.message || "Unknown error" }) };
  }
};
