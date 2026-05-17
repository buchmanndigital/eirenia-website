import { SternstundeForm } from "../sternstunde-form";
import { Reveal } from "../reveal";

const stars = [
  { w: 8, h: 8, top: "10%", left: "8%" },
  { w: 5, h: 5, top: "20%", left: "93%" },
  { w: 6, h: 6, top: "5%", left: "50%" },
  { w: 5, h: 5, top: "75%", left: "6%" },
  { w: 8, h: 8, top: "85%", left: "88%" },
  { w: 5, h: 5, top: "40%", left: "96%" },
  { w: 6, h: 6, top: "60%", left: "3%" },
];

export function SternstundeSection() {
  return (
    <section id="sternstunde">
      {stars.map((s, i) => (
        <div
          key={`${s.top}-${s.left}-${i}`}
          className="ss"
          style={{
            width: s.w,
            height: s.h,
            top: s.top,
            left: s.left,
          }}
        />
      ))}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <Reveal>
            <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>⭐</div>
          </Reveal>
          <Reveal>
            <span className="ey">🌾 Deine Sternstunde</span>
          </Reveal>
          <Reveal>
            <h2>Deine Sternstunde</h2>
          </Reveal>
          <Reveal>
            <span className="ssg">Der Beginn deiner Rückkehr</span>
          </Reveal>
          <Reveal>
            <p className="ssb">
              Manchmal braucht es nur einen Moment,
              <br />
              <span className="g">in dem dich jemand wirklich sieht.</span>
            </p>
          </Reveal>
          <Reveal>
            <p className="ssit">Die Sternstunde ist dieser Moment.</p>
          </Reveal>
          <Reveal>
            <p className="ssb">
              Sie ist dein persönlicher Start – die erste Begegnung, in der du
              spürst, ob EIRENIA dein Weg ist.
            </p>
          </Reveal>
          <Reveal>
            <p className="ssit">Du darfst kommen, fühlen, atmen, fragen.</p>
          </Reveal>
          <Reveal>
            <SternstundeForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
