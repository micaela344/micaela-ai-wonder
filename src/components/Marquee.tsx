import { useState } from "react";
import { ChevronRight } from "lucide-react";
import marquee1 from "@/assets/marquee-1.png";
import marquee2 from "@/assets/marquee-2.png";
import marquee3 from "@/assets/marquee-3.png";
import marquee4 from "@/assets/marquee-4.png";
import marquee5 from "@/assets/marquee-5.jpg";
import marquee6 from "@/assets/marquee-6.png";
import marquee7 from "@/assets/marquee-7.png";
import marqueeLipgloss from "@/assets/marquee-lipgloss.png";

const showcaseRow = [
  marquee1,
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
            <div key={i} className="flex-shrink-0 w-[30rem] h-80 md:w-[36rem] md:h-96 rounded-lg overflow-hidden">
              <img src={img} alt="Muestra creativa" className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
