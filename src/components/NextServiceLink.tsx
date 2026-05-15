import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface NextServiceLinkProps {
  to: string;
  label: string;
}

const NextServiceLink = ({ to, label }: NextServiceLinkProps) => (
  <div className="mt-20 mb-4 flex flex-col items-center">
    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
      Siguiente servicio
    </p>
    <Link
      to={to}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })}
      className="group inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:gap-5"
    >
      <span>{label}</span>
      <motion.span
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary-foreground/15 group-hover:bg-primary-foreground/25"
      >
        <ArrowRight size={18} />
      </motion.span>
    </Link>
  </div>
);

export default NextServiceLink;
