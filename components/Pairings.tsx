import { pairings } from "@/data/menu";
import { Reveal } from "./Reveal";

export function Pairings() {
  const groups = ["First", "Second", "Third"];

  return (
    <section
      id="pairings"
      className="mx-auto w-full max-w-2xl scroll-mt-16 border-t border-bone/10 px-6 py-16"
    >
      <Reveal>
        <div className="text-center">
          <p className="tracking-menu text-[0.55rem] uppercase text-brass">
            The Bar
          </p>
          <h2 className="mt-4 font-display text-3xl italic sm:text-4xl">
            Pairings
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.8rem] leading-relaxed text-bone-dim">
            One cocktail and one bottle per course. The pours are generous
            because the walk home is short.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 space-y-10">
        {groups.map((g) => (
          <Reveal key={g}>
            <div>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.26em] text-bone/40">
                With the {g}
              </p>
              <ul className="mt-4 space-y-6">
                {pairings
                  .filter((p) => p.course === g)
                  .map((p) => (
                    <li key={p.drink}>
                      <h3 className="font-display text-lg text-bone">
                        {p.drink}
                      </h3>
                      <p className="mt-1 text-[0.74rem] lowercase tracking-[0.04em] text-bone-dim">
                        {p.detail}
                      </p>
                      <p className="mt-2 text-[0.78rem] italic leading-relaxed text-brass-dim">
                        {p.note}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
