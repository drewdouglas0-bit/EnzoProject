"use client";

import { useState, useTransition } from "react";

export default function AddNoteForm() {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const text = content.trim();
    if (!text) return;

    startTransition(async () => {
      const res = await fetch("/notes/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      if (!res.ok) {
        const msg = await res.text();
        setError(msg || "Failed to create note");
        return;
      }

      setContent("");
      window.location.reload();
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-xl">
      <textarea
        className="border rounded p-2"
        rows={3}
        placeholder="Write a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center gap-3">
        <button
          disabled={isPending}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          {isPending ? "Adding..." : "Add note"}
        </button>
        {error ? <span className="text-red-600">{error}</span> : null}
      </div>
    </form>
  );
}