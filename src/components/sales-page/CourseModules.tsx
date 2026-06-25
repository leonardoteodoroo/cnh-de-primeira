import { BookOpen, Clock, PlayCircle } from "lucide-react";
import { courseModules } from "./data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function CourseModules() {
  const totalHours = "13h15";
  const totalLessons = 16;

  return (
    <section id="modulos" className="bg-white px-5 py-16 md:px-8 md:py-24">
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-yellow-700">
            O que tem dentro
          </p>
          <h2 className="text-3xl font-black leading-[1.35] tracking-tight text-zinc-950 md:text-5xl md:leading-[1.35]">
            Apenas o que te
            <br />
            <span className="relative inline-block text-yellow-600 my-1">
              APROVA!
              <svg
                className="absolute w-full h-2.5 -bottom-1.5 left-0 text-yellow-500"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
              </svg>
            </span>
            <br />
            Sem enrolação teórica.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-600 md:text-lg">
            6 módulos diretos, {totalLessons} aulas comentadas e simulados no
            formato oficial. Sem enrolação, sem conteúdo de
            enchimento.
          </p>
        </div>

        {/* Stats rápidas */}
        <div className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-3 md:max-w-lg">
          {[
            { icon: Clock, value: totalHours, label: "de conteúdo" },
            { icon: PlayCircle, value: `${totalLessons}`, label: "aulas" },
            { icon: BookOpen, value: "60+", label: "questões" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center rounded-2xl bg-zinc-50 p-3 md:p-4 ring-1 ring-zinc-200 w-full min-w-0"
            >
              <stat.icon className="mb-2 text-yellow-600 shrink-0" size={22} />
              <span className="text-lg font-black text-zinc-950 md:text-2xl whitespace-nowrap">
                {stat.value}
              </span>
              <span className="mt-1 text-[9px] min-[375px]:text-[10px] md:text-[11px] font-bold uppercase tracking-tight text-zinc-500 whitespace-nowrap text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Grid de módulos */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courseModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <article
                key={mod.title}
                className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition-colors hover:border-yellow-300 hover:bg-yellow-50/40"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-200 text-zinc-950">
                    <Icon size={20} />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-400">
                    <span>{mod.hours}</span>
                    <span className="text-zinc-300">·</span>
                    <span>
                      {mod.lessons} {mod.lessons === 1 ? "aula" : "aulas"}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-black leading-tight text-zinc-950">
                  {mod.title}
                </h3>

                <ul className="mt-3 space-y-1.5">
                  {mod.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2 text-[13px] leading-snug text-zinc-600"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-yellow-500" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
