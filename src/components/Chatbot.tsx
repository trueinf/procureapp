import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Mic, MicOff } from 'lucide-react';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I’m your procurement assistant. Ask me anything about creating RFIs/RFQs, supplier criteria, timelines, or policy.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const [voiceOn, setVoiceOn] = useState(false);
  const [voiceConnecting, setVoiceConnecting] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<string>('');
  const [audioBlocked, setAudioBlocked] = useState(false);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const funcArgsRef = useRef<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('chat_thread_id');
    if (saved) setThreadId(saved);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function sendMessage() {
    if (!canSend) return;
    const text = input.trim();
    setInput('');
    const userMsg: ChatMessage = { id: String(Date.now()), role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, threadId }),
      });
      const raw = await res.text();
      let data: any = null;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch {
        throw new Error(`Unexpected response (${res.status}): ${raw?.slice(0, 200)}`);
      }
      if (!res.ok) throw new Error(data?.error || `Chat failed (${res.status})`);
      if (data.threadId && data.threadId !== threadId) {
        setThreadId(data.threadId);
        localStorage.setItem('chat_thread_id', data.threadId);
      }
      const botMsg: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        content: data.answer || '(No answer returned)'.trim(),
      };
      setMessages((m) => [...m, botMsg]);
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        { id: `${Date.now()}-error`, role: 'system', content: `Error: ${e?.message || 'Unknown error'}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function startVoice() {
    if (voiceOn || voiceConnecting) return;
    setVoiceConnecting(true);
    setVoiceStatus('Requesting token…');
    try {
      // 1) Get ephemeral session token
      const tokenRes = await fetchWithTimeout('/.netlify/functions/realtime-token', { method: 'POST' }, 12000);
      const tokenText = await tokenRes.text();
      let tokenData: any = null;
      try {
        tokenData = tokenText ? JSON.parse(tokenText) : null;
      } catch (e) {
        throw { message: `Token parse failed (${tokenRes.status}): ${tokenText?.slice(0, 200)}` };
      }
      if (!tokenRes.ok) {
        const errMsg = tokenData?.error?.message || tokenData?.error || tokenText || 'Failed to get realtime token';
        throw { message: `Token request failed (${tokenRes.status}): ${typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg)}` };
      }
      const ephemeralKey: string | undefined = tokenData?.client_secret?.value;
      const model: string = tokenData?.model || 'gpt-4o-realtime-preview-2024-12-17';
      if (!ephemeralKey) throw new Error('No ephemeral key returned');

      // 2) Ask for mic permission next (after we know token is fine)
      let local: MediaStream;
      try {
        local = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (micErr: any) {
        throw { message: `Microphone access error: ${micErr?.name || ''} ${micErr?.message || ''}` };
      }

      // Set up peer connection
      setVoiceStatus('Connecting…');
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      pcRef.current = pc;

      pc.onconnectionstatechange = () => {
        setVoiceStatus(`State: ${pc.connectionState}`);
        if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
          setMessages((m) => [...m, { id: `${Date.now()}-rt`, role: 'system', content: `Voice error: Connection ${pc.connectionState}` }]);
          stopVoice();
        }
      };
      pc.oniceconnectionstatechange = () => {
        // Helpful for debugging connectivity
        // console.log('ICE:', pc.iceConnectionState);
      };

      // Remote audio playback
      const remoteStream = new MediaStream();
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = remoteStream;
        try { await (remoteAudioRef.current as HTMLAudioElement).play(); } catch { setAudioBlocked(true); }
      }
      pc.ontrack = (e) => {
        e.streams[0].getTracks().forEach((t) => remoteStream.addTrack(t));
        // Attempt to play when first remote track arrives
        if (remoteAudioRef.current) {
          (remoteAudioRef.current as HTMLAudioElement).play().catch(() => setAudioBlocked(true));
        }
      };

      // Mic
      localStreamRef.current = local;
      try {
        if (pc.signalingState === 'closed') throw new Error('Voice cancelled');
        local.getTracks().forEach((t) => pc.addTrack(t, local));
      } catch (e) {
        throw e;
      }

      // Ensure we receive audio
      pc.addTransceiver('audio', { direction: 'recvonly' });

      // Data channel for Realtime JSON events
      const dc = pc.createDataChannel('oai-events');
      dcRef.current = dc;
      dc.onopen = () => {
        setVoiceStatus('Connected');
        // Provide tool definition and updated instructions
        const msg = {
          type: 'session.update',
          session: {
            instructions:
              'You are a helpful procurement voice assistant. When you need specific facts from the organization KB (policies, processes, definitions), call the function kb_search with a concise query before answering. Keep answers concise; cite key facts.',
            tools: [
              {
                type: 'function',
                name: 'kb_search',
                description: 'Retrieve factual passages from the procurement knowledge base for a given query',
                parameters: {
                  type: 'object',
                  properties: { query: { type: 'string' } },
                  required: ['query'],
                },
              },
            ],
          },
        } as const;
        dc.send(JSON.stringify(msg));
      };
      dc.onmessage = async (ev) => {
        try {
          const data = JSON.parse(typeof ev.data === 'string' ? ev.data : '');
          const t = data?.type;
          // Accumulate function call args
          if (t === 'response.function_call_arguments.delta') {
            const callId = data?.call_id as string;
            const delta = data?.delta as string;
            funcArgsRef.current[callId] = (funcArgsRef.current[callId] || '') + (delta || '');
          } else if (t === 'response.function_call_arguments.done') {
            const callId = data?.call_id as string;
            const name = data?.name as string;
            const argsStr = funcArgsRef.current[callId] || '{}';
            delete funcArgsRef.current[callId];
            if (name === 'kb_search') {
              let query = '';
              try {
                const parsed = JSON.parse(argsStr);
                query = parsed?.query || '';
              } catch {}
              if (!query) {
                dc?.send(
                  JSON.stringify({ type: 'response.function_call_output', call_id: callId, output: 'No query provided.' })
                );
                return;
              }
              // Call server KB endpoint
              let result = '';
              try {
                const r = await fetch('/.netlify/functions/kb-query', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ query }),
                });
                const text = await r.text();
                const j = text ? JSON.parse(text) : null;
                if (!r.ok) throw new Error(j?.error || text || 'kb-query failed');
                result = j?.answer || '';
              } catch (err: any) {
                result = `KB error: ${err?.message || err}`;
              }
              dc?.send(
                JSON.stringify({ type: 'response.function_call_output', call_id: callId, output: result || 'No result' })
              );
            }
          }
        } catch (e) {
          // Ignore non-JSON messages
        }
      };

      const offer = await pc.createOffer({ offerToReceiveAudio: true });
      await pc.setLocalDescription(offer);

      // Wait for ICE gathering to finish (or 3s timeout)
      await waitForIceGatheringComplete(pc, 3000);

      const sdpRes = await fetchWithTimeout(`https://api.openai.com/v1/realtime?model=${encodeURIComponent(model)}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          'Content-Type': 'application/sdp',
          // Only realtime header needed for the SDP exchange
          'OpenAI-Beta': 'realtime=v1',
        },
        body: offer.sdp || '',
      }, 12000);
      const sdpText = await sdpRes.text();
      if (!sdpRes.ok || !sdpText) {
        throw { message: `SDP exchange failed (${sdpRes.status}): ${sdpText?.slice(0, 200)}` };
      }
      const answer = { type: 'answer' as const, sdp: sdpText };
      await pc.setRemoteDescription(answer);
      setVoiceOn(true);
      setVoiceConnecting(false);
      setVoiceStatus('Live');
    } catch (e: any) {
      const detail = formatError(e);
      console.error('Realtime voice error', e);
      setMessages((m) => [...m, { id: `${Date.now()}-rt`, role: 'system', content: `Voice error: ${detail}` }]);
      stopVoice();
      setVoiceConnecting(false);
      setVoiceStatus('');
    }
  }

  function stopVoice() {
    setVoiceOn(false);
    setVoiceConnecting(false);
    try {
      pcRef.current?.close();
    } catch {}
    pcRef.current = null;
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    if (remoteAudioRef.current) {
      remoteAudioRef.current.pause();
      remoteAudioRef.current.srcObject = null;
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button
          className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 text-white flex items-center justify-center hover:scale-105 transition"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="w-[380px] max-w-[90vw] bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <div className="font-semibold">Procurement Assistant</div>
            </div>
            <button className="p-1 hover:bg-white/20 rounded-md" onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-[420px] p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-slate-50 to-white">
            {messages.map((m) => (
              <div key={m.id} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={
                    'max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ' +
                    (m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : m.role === 'assistant'
                      ? 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                      : 'bg-amber-50 text-amber-900 border border-amber-200')
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <div className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-200ms]"></div>
                <div className="h-2 w-2 rounded-full bg-slate-300 animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:200ms]"></div>
                <span className="ml-2">Thinking...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex items-center gap-2">
              <button
                title={voiceOn ? 'Stop voice' : 'Start voice'}
                className={
                  'px-3 py-2 rounded-xl border ' +
                  (voiceOn
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : voiceConnecting
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100')
                }
                onClick={() => (voiceOn ? stopVoice() : startVoice())}
                type="button"
                disabled={voiceConnecting}
              >
                {voiceOn ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              {voiceConnecting && <span className="text-xs text-slate-500">{voiceStatus || 'Connecting…'}</span>}
              {voiceOn && !voiceConnecting && voiceStatus && (
                <span className="text-xs text-green-600">{voiceStatus}</span>
              )}
              <input
                className="flex-1 rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask about RFQs, policies, timelines..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={loading}
              />
              <button
                className="px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
                onClick={sendMessage}
                disabled={!canSend}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-1 text-[10px] text-slate-500">
              Grounded with your knowledge base when configured.
            </div>
            {/* Hidden audio element to comply with autoplay policies */}
            <audio ref={remoteAudioRef} className="hidden" autoPlay />
            {audioBlocked && (
              <div className="mt-2 text-xs text-amber-700">Audio blocked by the browser. Click to enable:
                <button
                  className="ml-2 inline-flex items-center px-2 py-1 rounded border border-amber-300 text-amber-800 hover:bg-amber-50"
                  onClick={() => {
                    setAudioBlocked(false);
                    remoteAudioRef.current?.play().catch(() => setAudioBlocked(true));
                  }}
                >
                  Unmute
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function formatError(e: any): string {
  if (!e) return 'Unknown error';
  if (typeof e === 'string') return e;
  // DOMException or Error-like
  const name = (e && (e.name || e.constructor?.name)) || '';
  const msg = e && e.message ? String(e.message) : '';
  if (name || msg) return `${name}${name && msg ? ': ' : ''}${msg}`;
  // Response-like
  if (typeof e.status !== 'undefined') {
    const body = typeof e.text === 'function' ? '[response]' : '';
    return `status=${e.status} ${body}`;
  }
  try { return JSON.stringify(e, Object.getOwnPropertyNames(e)); } catch {}
  try { return JSON.stringify(e); } catch {}
  return String(e);
}

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit = {}, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, { ...init, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(t);
  }
}

function waitForIceGatheringComplete(pc: RTCPeerConnection, timeoutMs = 3000): Promise<void> {
  if (pc.iceGatheringState === 'complete') return Promise.resolve();
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      pc.removeEventListener('icegatheringstatechange', onChange);
      resolve();
    }, timeoutMs);
    function onChange() {
      if (pc.iceGatheringState === 'complete') {
        clearTimeout(timeout);
        pc.removeEventListener('icegatheringstatechange', onChange);
        resolve();
      }
    }
    pc.addEventListener('icegatheringstatechange', onChange);
  });
}
