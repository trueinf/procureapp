import React, { useState } from 'react';
import { Upload, CheckCircle2, AlertTriangle } from 'lucide-react';

export const KBUploader: React.FC = () => {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [vectorStoreId, setVectorStoreId] = useState<string | null>(null);

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMessage(null);
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch('/.netlify/functions/kb-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, base64 }),
      });
      const text = await res.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        throw new Error(`Unexpected response (${res.status}): ${text?.slice(0, 200)}`);
      }
      if (!res.ok) throw new Error(data?.error || `Upload failed (${res.status})`);
      setVectorStoreId(data.vectorStoreId);
      setMessage('Uploaded and indexed successfully.');
    } catch (err: any) {
      setMessage(err?.message || 'Upload failed');
    } finally {
      setBusy(false);
      e.currentTarget.value = '';
    }
  }

  return (
    <div className="rounded-xl border p-4 bg-slate-50">
      <div className="flex items-center gap-2 mb-3">
        <Upload className="h-5 w-5 text-blue-600" />
        <div className="font-semibold text-slate-800">Knowledge Base (Admin)</div>
      </div>
      <p className="text-sm text-slate-600 mb-3">Upload a .docx/.pdf to ground the chat assistant. File is sent securely to OpenAI for indexing.</p>
      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
        <input type="file" accept=".doc,.docx,.pdf,.txt" className="hidden" disabled={busy} onChange={onFileChange} />
        <Upload className="h-4 w-4" />
        <span>{busy ? 'Uploading…' : 'Upload KB File'}</span>
      </label>
      {message && (
        <div className="mt-3 text-sm flex items-center gap-2">
          {message.includes('success') ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          )}
          <span className={message.includes('success') ? 'text-green-700' : 'text-amber-700'}>{message}</span>
        </div>
      )}
      {vectorStoreId && (
        <div className="mt-2 text-xs text-slate-500">
          Vector Store ID: <code className="px-1 py-0.5 bg-white border rounded">{vectorStoreId}</code><br />
          Add this to Netlify env as <code>OPENAI_VECTOR_STORE_ID</code> for future runs.
        </div>
      )}
    </div>
  );
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
