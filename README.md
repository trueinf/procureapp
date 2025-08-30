# ProcureApp (React + TypeScript + Vite)

This app includes an Initiate page for creating RFIs/RFQs and an elegant built‑in AI assistant.

## Chatbot (Assistants API) Setup

The Initiate page includes a floating chat widget powered by a Netlify Function that proxies to OpenAI’s Assistants API. It can optionally ground answers on your Word document knowledge base using File Search.

Environment variables (set in Netlify):
- `OPENAI_API_KEY`: your OpenAI API key
- `OPENAI_ASSISTANT_ID`: the Assistant ID configured with `file_search` tool
- `OPENAI_VECTOR_STORE_ID` (optional): vector store ID containing your KB files

Function endpoints
- `/.netlify/functions/chat` (POST): body `{ message, threadId? }` → `{ threadId, answer }`

Local development
- Run with `netlify dev` to enable function routes alongside Vite.

One‑time KB setup (outline)
1) Upload your `.docx` to Files API with `purpose=file_search`.
2) Create a vector store and attach the uploaded file.
3) Create an Assistant with `file_search` enabled and point to the vector store.
4) Put `OPENAI_ASSISTANT_ID` and `OPENAI_VECTOR_STORE_ID` in Netlify env.

Notes
- Never expose your API key in the browser. The frontend only calls the Netlify function.
- The chat preserves a conversation `threadId` in localStorage to maintain context across refreshes.

## Realtime Voice (Speech↔Speech)

This app includes a voice button in the chat widget that starts a WebRTC session with OpenAI’s Realtime API.

Env
- `OPENAI_API_KEY` (already used)
- `OPENAI_VECTOR_STORE_ID` (optional): if set, the server attaches your KB via `file_search` to the Realtime session.

Endpoints
- `/.netlify/functions/realtime-token` (POST): mints ephemeral session credentials for the browser.

How it works
- Browser requests a token → server calls `POST /v1/realtime/sessions` with headers `OpenAI-Beta: realtime=v1, assistants=v2`.
- The session includes `tools=[{type:file_search}]` and `tool_resources` with your `OPENAI_VECTOR_STORE_ID` when provided.
- Browser opens a WebRTC connection to `https://api.openai.com/v1/realtime?model=...` using the ephemeral token; mic is sent up, audio is streamed back.

Run locally
- `netlify dev` (so functions resolve). Use the Netlify URL (e.g. http://localhost:8888).
