import { useNavigate } from "react-router-dom";

const ServiceCTAButtons = () => {
  const navigate = useNavigate();

  const handleHablemos = () => {
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  };

  const handleVerPlanes = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("planes");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
      <button
        onClick={handleVerPlanes}
        className="rounded-full bg-background text-foreground border-[1.5px] border-white px-8 py-3 text-base font-medium shadow-[0_0_15px_rgba(255,255,255,0.3),0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5),0_0_40px_rgba(255,255,255,0.25)] transition-all duration-300"
      >
        Ver planes
      </button>
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
