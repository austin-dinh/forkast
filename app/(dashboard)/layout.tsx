import Link from "next/link";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-base-200">
      <aside className="w-60 shrink-0 bg-base-100 border-r border-base-300 flex flex-col">
        <div className="navbar min-h-16 px-4">
          <span className="text-xl font-bold tracking-tight">Forkast</span>
        </div>
        <div className="divider my-0" />
        <nav className="flex-1 p-3">
          <ul className="menu menu-md w-full">
            <li>
              <Link href="/reservations">Reservations</Link>
            </li>
            <li>
              <Link href="/tables">Tables</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 overflow-y-auto">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
