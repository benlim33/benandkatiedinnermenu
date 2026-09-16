import { courses, dietKey } from "@/data/menu";
import { Reveal } from "./Reveal";

const anchors = ["first", "second", "sides", "third"];

export function Courses() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 py-4">
      {courses.map((course, ci) => (
        <div
          key={course.title}
          id={anchors[ci]}
          className="scroll-mt-16 border-t border-bone/10 py-16 first:border-t-0"
        >
          <Reveal>
            <div className="text-center">
              <p className="tracking-menu text-[0.55rem] uppercase text-brass">
                {course.index} · {course.label} Course
              </p>
              <h2 className="mt-4 font-display text-3xl italic sm:text-4xl">
                {course.title}
              </h2>
              {course.note ? (
                <p className="mx-auto mt-4 max-w-md text-[0.8rem] leading-relaxed text-bone-dim">
                  {course.note}
                </p>
              ) : null}
            </div>
          </Reveal>

          <ul className="mt-12 space-y-11">
            {course.dishes.map((dish, di) => (
              <li key={dish.name}>
                <Reveal delay={di * 0.06}>
                  <h3 className="font-display text-xl leading-snug text-bone sm:text-2xl">
                    {dish.name}
                    {dish.tags?.length ? (
                      <span className="ml-2 align-super text-[0.6rem] text-brass-dim">
                        {dish.tags.map((t) => dietKey[t].mark).join("")}
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-2 text-[0.76rem] lowercase leading-relaxed tracking-[0.04em] text-bone-dim sm:text-[0.82rem]">
                    {dish.ingredients.join(" · ")}
                  </p>
                  {dish.aside ? (
                    <p className="mt-3 max-w-prose text-[0.8rem] italic leading-relaxed text-brass-dim">
                      {dish.aside}
                    </p>
                  ) : null}
                  {dish.source ? (
                    <a
                      href={dish.source.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-3 inline-block font-mono text-[0.55rem] uppercase tracking-[0.24em] text-bone/35 underline decoration-dotted underline-offset-4 transition-colors hover:text-brass"
                    >
                      {dish.source.label}
                    </a>
                  ) : null}
                </Reveal>
              </li>
            ))}
          </ul>

          {course.footnote ? (
            <Reveal>
              <p className="mt-12 border-l border-brass/30 pl-4 text-[0.72rem] italic leading-relaxed text-bone/45">
                {course.footnote}
              </p>
            </Reveal>
          ) : null}
        </div>
      ))}

      <Reveal>
        <div className="border-t border-bone/10 py-10">
          <p className="tracking-menu text-[0.52rem] uppercase text-brass-dim">
            Key
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-bone/40 sm:grid-cols-2">
            {Object.values(dietKey).map((k) => (
              <li key={k.label}>
                <span className="text-brass-dim">{k.mark}</span> {k.label}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.7rem] italic leading-relaxed text-bone/35">
            Nothing on this menu contains nuts except the pesto butter on the
            salmon. The stuffed mushrooms have sausage in them — veggie ones exist.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
