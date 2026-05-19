import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth/session";
import { getCustomerRecords } from "@/lib/db/courses";

export const dynamic = "force-dynamic";

export default async function CrmPage() {
  const user = await requireAdmin();
  const customers = await getCustomerRecords();

  return (
    <AdminShell user={user}>
      <section className="admin-card">
        <div className="admin-section-head">
          <div>
            <span className="admin-eyebrow">Mini-CRM</span>
            <h2>Kundendaten</h2>
          </div>
          <span className="admin-pill">{customers.length} Kontakte</span>
        </div>

        <div className="admin-table">
          {customers.length === 0 ? (
            <p className="admin-muted">Noch keine Anmeldungen vorhanden.</p>
          ) : (
            customers.map((customer) => (
              <div key={customer.email} className="admin-table-row admin-table-row--crm">
                <div>
                  <strong>
                    {customer.firstName} {customer.lastName}
                  </strong>
                  <span>
                    <a href={`mailto:${customer.email}`} className="admin-link">
                      {customer.email}
                    </a>
                    {customer.phone ? ` · ${customer.phone}` : ""}
                  </span>
                  <p>
                    {customer.registrationCount} Anmeldung
                    {customer.registrationCount === 1 ? "" : "en"} ·{" "}
                    {customer.inquiryCount} Anfrage
                    {customer.inquiryCount === 1 ? "" : "n"} · zuletzt{" "}
                    {new Date(customer.lastRegistrationAt).toLocaleDateString("de-DE")}
                  </p>
                  {customer.courses.length > 0 ? <p>{customer.courses.join(" · ")}</p> : null}
                  {customer.inquirySources.length > 0 ? (
                    <p>{customer.inquirySources.join(" · ")}</p>
                  ) : null}
                  {customer.latestMessage ? <p>„{customer.latestMessage}“</p> : null}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </AdminShell>
  );
}
