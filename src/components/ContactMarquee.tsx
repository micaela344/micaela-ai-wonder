const ContactMarquee = () => {
  const text = "¡CONTÁCTANOS! ✦ ";
  const repeated = Array.from({ length: 20 }, () => text).join("");

  const handleClick = () => {
    window.open(
      "https://wa.me/34663474019?text=¡Hola!%20Me%20interesa%20saber%20más%20sobre%20sus%20servicios%2C%20¿me%20pueden%20ayudar%3F",
      "_blank"
    );
  };

  const spanStyle: React.CSSProperties = {
    color: "#0a0a0a",
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    paddingRight: "1rem",
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      aria-label="Contáctanos por WhatsApp"
      className="w-full h-12 overflow-hidden cursor-pointer hover:brightness-110 transition-all duration-300"
      style={{ backgroundColor: "#C8FF00" }}
    >
      <div
        className="flex whitespace-nowrap h-full items-center"
        style={{ animation: "contact-marquee-scroll 8s linear infinite", width: "max-content" }}
      >
        <span style={spanStyle}>{repeated}</span>
        <span style={spanStyle}>{repeated}</span>
      </div>
      <style>{`
        @keyframes contact-marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default ContactMarquee;
