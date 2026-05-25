import { useNavigate } from "react-router-dom";

const ServiceCTAButtons = () => {
  const navigate = useNavigate();

  const handleHablemos = () => {
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  };

  const handleVerPlanes = () => {
    navigate("/");
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById("planes");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts++ < 40) {
        setTimeout(tryScroll, 100);
      }
    };
    setTimeout(tryScroll, 100);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
      <button
        onClick={handleVerPlanes}
        className="rounded-full bg-white text-black px-8 py-3 text-base font-semibold shadow-[0_0_20px_rgba(255,255,255,0.4),0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6),0_0_60px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
      >
        Ver planes
      </button>
      <button
        onClick={handleHablemos}
        className="rounded-full bg-background text-foreground border-[1.5px] border-white/60 px-8 py-3 text-base font-medium hover:bg-white/10 transition-all duration-300"
      >
        Hablemos
      </button>
    </div>
  );
};

export default ServiceCTAButtons;
