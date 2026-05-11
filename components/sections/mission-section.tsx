import { Reveal } from "../reveal";

export function MissionSection() {
  return (
    <section id="mission">
      <div className="csm">
        <Reveal>
          <div className="m-div" />
        </Reveal>
        <Reveal>
          <h2 className="m-h">Warum EIRENIA existiert</h2>
        </Reveal>
        <Reveal>
          <p className="m-p">
            In einer lauten, schnellen Welt ist Frieden zu einem seltenen Luxus
            geworden.
          </p>
        </Reveal>
        <Reveal>
          <span className="m-s">EIRENIA ist unsere Antwort darauf</span>
        </Reveal>
        <Reveal>
          <p className="m-p">Kein Konzept, sondern eine gelebte Erfahrung.</p>
        </Reveal>
        <Reveal>
          <p className="m-p">
            Ein Ort, an dem Menschen sich begegnen, zuhören, loslassen,
            ankommen.
          </p>
        </Reveal>
        <Reveal>
          <p className="m-it">
            Denn wahre Heilung geschieht nicht in der Isolation,
            <br />
            <span>sondern in der Begegnung.</span>
          </p>
        </Reveal>
        <Reveal>
          <div className="m-div" />
        </Reveal>
      </div>
    </section>
  );
}
