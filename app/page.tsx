import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-semibold">MyApp</h1>
      <p className="mt-2 opacity-80">Auth + Supabase Notes demo</p>

      <div className="mt-6 flex gap-4">
        <Link className="underline" href="/login">
          Login
        </Link>
        <Link className="underline" href="/notes">
          Notes
        </Link>
      </div>
    </main>
  );
}