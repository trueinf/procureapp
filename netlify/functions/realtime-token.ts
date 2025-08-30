// Mints an ephemeral Realtime session token for the browser.
// Env required: OPENAI_API_KEY
// Optional: OPENAI_VECTOR_STORE_ID (to attach KB via file_search)

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
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID; // not used at session create (not supported)
  if (!apiKey) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: "Missing OPENAI_API_KEY" }) };
  }

  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const voice = body.voice || "verse"; // pick any supported voice
    const model = body.model || "gpt-4o-realtime-preview-2024-12-17";

    const session: any = {
      model,
      voice,
      // High-level guidance; keep short for latency
      instructions:
        "You are a helpful procurement voice assistant. Be concise and friendly. If asked policy/procurement specifics, consult the attached knowledge base.",
    };

    const res = await fetch(`${OPENAI_API_BASE}/realtime/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Realtime session creation header
        "OpenAI-Beta": "realtime=v1",
      },
      body: JSON.stringify(session),
    });

    const text = await res.text();
    if (!res.ok) {
      return { statusCode: res.status, headers: corsHeaders, body: text || JSON.stringify({ error: "Failed to create session" }) };
    }

    return { statusCode: 200, headers: { ...corsHeaders, "Content-Type": "application/json" }, body: text };
  } catch (err: any) {
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: err?.message || "Unknown error" }) };
  }
};
