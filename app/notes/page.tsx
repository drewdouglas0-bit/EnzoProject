import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import AddNoteForm from "./AddNoteForm";

export default async function NotesPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: notes, error } = await supabase
    .from("notes")
    .select("id, content, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="p-10">
        <p className="text-red-600">Error loading notes: {error.message}</p>
        <Link className="underline" href="/">
          Home
        </Link>
      </main>
    );
  }

  return (
    <main className="p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Notes</h1>
        <Link className="underline" href="/">
          Home
        </Link>
      </div>

      <div className="mt-6">
        <AddNoteForm />
      </div>

      <ul className="mt-8 space-y-3">
        {(notes ?? []).map((n) => (
          <li key={n.id} className="rounded border p-3">
            <div>{n.content}</div>
            <div className="mt-1 text-sm opacity-70">
              {new Date(n.created_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}