"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  async function signIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl mb-6">Login</h1>
      <button
        onClick={signIn}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Continue with Google
      </button>
    </main>
  );
}