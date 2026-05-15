import { useNavigate } from "react-router-dom";

const ServiceCTAButtons = () => {
  const navigate = useNavigate();

  const handleHablemos = () => {
    // Dispatch custom event to open chatbot
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
      <a
        href="/#planes"
        className="rounded-full bg-background text-foreground border-[1.5px] border-white px-8 py-3 text-base font-medium shadow-[0_0_15px_rgba(255,255,255,0.3),0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(255,255,255,0.25)] transition-all duration-300"
      >
        Ver planes
      </a>
      <button
        onClick={handleHablemos}
        className="rounded-full bg-background text-foreground border-[1.5px] border-white px-8 py-3 text-base font-medium shadow-[0_0_15px_rgba(255,255,255,0.3),0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(255,255,255,0.25)] transition-all duration-300"
      >
        Hablemos
      </button>
    </div>
  );
};

export default ServiceCTAButtons;
