import { useState } from "react";
import { ChevronRight } from "lucide-react";
import marquee1 from "@/assets/marquee-1.webp";
import marquee2 from "@/assets/marquee-2.webp";
import marquee3 from "@/assets/marquee-3.webp";
import marquee4 from "@/assets/marquee-4.webp";
import marquee5 from "@/assets/marquee-5.webp";
import marquee6 from "@/assets/marquee-6.webp";
import marquee7 from "@/assets/marquee-7.webp";
import marqueeLipgloss from "@/assets/marquee-lipgloss.webp";
import marqueeYoga from "@/assets/marquee-yoga.webp";

const showcaseRow = [
  marquee1,
  marqueeYoga,
  marquee2,
  marquee3,
  marquee4,
  marquee5,
  marquee6,
  marquee7,
  marqueeLipgloss,
];

const Marquee = () => {
  const [isFast, setIsFast] = useState(false);

  return (
    <section id="portfolio" className="pt-6 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setIsFast((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-foreground text-sm hover:bg-secondary transition-colors"
        >
          <ChevronRight size={16} />
          {isFast ? "Velocidad normal" : "Acelerar"}
        </button>
      </div>

      <div className="flex gap-8 overflow-hidden px-6">
        <div className={`flex gap-8 ${isFast ? "animate-marquee-left-fast" : "animate-marquee-left"}`}>
          {[...showcaseRow, ...showcaseRow].map((img, i) => (
            <a
              key={i}
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex-shrink-0 w-[30rem] h-80 md:w-[36rem] md:h-96 rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={img}
                alt="Muestra creativa"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
