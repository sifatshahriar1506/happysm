import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Brand } from "@/components/brand";

export default function LoginPage() {
  return <main className="min-h-screen px-5 py-6"><div className="mx-auto max-w-5xl"><header className="flex items-center justify-between"><Brand/><Link href="/" className="inline-flex items-center gap-2 text-sm text-[#61756d]"><ArrowLeft size={16}/> Home</Link></header><div className="mx-auto mt-16 max-w-md rounded-3xl border border-[#e1e9e3] bg-white p-7 shadow-sm"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e2f2e8] text-[#28785d]"><Mail/></div><h1 className="mt-5 text-3xl font-semibold">Welcome to happysm</h1><p className="mt-3 text-sm leading-6 text-[#61756d]">Authentication setup is the next implementation step. This screen intentionally does not collect credentials until Supabase is configured.</p><div className="mt-6 rounded-xl bg-[#f7faf7] p-4 text-sm leading-6"><strong>For the developer:</strong> configure the Supabase URL and publishable/anon key in your local <code>.env.local</code>, then wire this route to the server-side auth actions in Phase 4.</div><Link href="/bmi" className="mt-6 block rounded-full bg-[#28785d] px-5 py-3 text-center font-semibold text-white">Try the BMI calculator instead</Link></div></div></main>;
}
