import { Suspense } from "react";
import { hasDatabase } from "@/lib/db/env";
import { LoginClient } from "./login-client";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="admin-auth">
          <div className="admin-auth-card">
            <p style={{ color: "var(--tm2)", textAlign: "center" }}>Laden …</p>
          </div>
        </main>
      }
    >
      <LoginClient hasDatabase={hasDatabase} />
    </Suspense>
  );
}
