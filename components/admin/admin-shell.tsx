import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import type { AdminUser } from "@/lib/db/types";

type AdminShellProps = {
  user: AdminUser;
  children: React.ReactNode;
};

export function AdminShell({ user, children }: AdminShellProps) {
  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand">
          EIRENIA
          <span>Team & Kurse</span>
        </Link>
        <nav className="admin-nav">
          <Link href="/admin">Übersicht</Link>
          <Link href="/admin/courses">Kurse</Link>
          {user.role === "admin" && <Link href="/admin/coaches">Coaches</Link>}
          {user.role === "admin" && <Link href="/admin/crm">Mini-CRM</Link>}
          <Link href="/admin/courses/new">Neuer Kurs</Link>
        </nav>
        <form action={logoutAction}>
          <button className="admin-logout" type="submit">
            Abmelden
          </button>
        </form>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-eyebrow">
              {user.role === "admin" ? "Admin" : "Coach"}
            </span>
            <h1>Willkommen, {user.name}</h1>
          </div>
          <span className="admin-pill">{user.email}</span>
        </header>
        {children}
      </main>
    </div>
  );
}
