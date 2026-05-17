import { Reveal } from "../reveal";

/** Wird unter Suspense gezeigt, bis Kursdaten aus der DB da sind (schneller erster Paint). */
export function ProgrammeSectionSkeleton() {
  return (
    <section id="programme" className="programme-section-skeleton" aria-busy="true">
      <div className="container">
        <div className="ph">
          <Reveal>
            <span className="ey">🔆 Kurse & Programme</span>
          </Reveal>
          <Reveal>
            <h2>Kurse & Programme</h2>
          </Reveal>
          <Reveal>
            <span className="pgs">Echte Begegnung, lebendige Energie</span>
          </Reveal>
        </div>
        <p className="programme-skeleton-status">Termine &amp; Kalender werden geladen …</p>
      </div>
    </section>
  );
}
