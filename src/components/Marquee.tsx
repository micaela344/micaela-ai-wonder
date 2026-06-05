import { useState } from "react";
import { ChevronRight } from "lucide-react";
import marquee1 from "@/assets/home-marquee/home-marquee-1.png.asset.json";
import marquee2 from "@/assets/home-marquee/home-marquee-2.png.asset.json";
import marquee3 from "@/assets/home-marquee/home-marquee-3.mp4.asset.json";
import marquee4 from "@/assets/home-marquee/home-marquee-4.png.asset.json";
import marquee5 from "@/assets/home-marquee/home-marquee-5.png.asset.json";
import marquee6 from "@/assets/home-marquee/home-marquee-6.png.asset.json";
import marquee7 from "@/assets/home-marquee/home-marquee-7.png.asset.json";
import marquee8 from "@/assets/home-marquee/home-marquee-8.mp4.asset.json";
import marquee9 from "@/assets/home-marquee/home-marquee-9.png.asset.json";
import marquee10 from "@/assets/home-marquee/home-marquee-10.png.asset.json";

type ShowcaseItem = { type: "image"; src: string } | { type: "video"; src: string };

const showcaseRow: ShowcaseItem[] = [
  { type: "image", src: marquee1.url },
  { type: "image", src: marquee2.url },
  { type: "video", src: marquee3.url },
  { type: "image", src: marquee4.url },
  { type: "image", src: marquee5.url },
  { type: "image", src: marquee6.url },
  { type: "image", src: marquee7.url },
  { type: "video", src: marquee8.url },
  { type: "image", src: marquee9.url },
  { type: "image", src: marquee10.url },
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
          {[...showcaseRow, ...showcaseRow].map((item, i) => (
            <a
              key={i}
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex-shrink-0 w-[30rem] h-80 md:w-[36rem] md:h-96 rounded-lg overflow-hidden cursor-pointer"
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={item.src}
                  alt="Muestra creativa"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
