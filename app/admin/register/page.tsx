import { Suspense } from "react";
import { hasDatabase } from "@/lib/db/env";
import { RegisterClient } from "./register-client";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <main className="admin-auth">
          <div className="admin-auth-card wide">
            <p style={{ color: "var(--tm2)", textAlign: "center" }}>Laden …</p>
          </div>
        </main>
      }
    >
      <RegisterClient hasDatabase={hasDatabase} />
    </Suspense>
  );
}
