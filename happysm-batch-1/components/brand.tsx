import Link from "next/link";
import { Sprout } from "lucide-react";

export function Brand({ light = false }: { light?: boolean }) {
  return <Link href="/" aria-label="happysm home" className={`inline-flex items-center gap-2 font-bold tracking-tight ${light ? "text-white" : "text-[#18352d]"}`}>
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#28785d] text-white"><Sprout size={20} aria-hidden="true" /></span>
    <span className="text-xl">happy<span className="text-[#28785d]">sm</span></span>
  </Link>;
}
