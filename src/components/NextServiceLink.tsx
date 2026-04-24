import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface NextServiceLinkProps {
  to: string;
  label: string;
}

const NextServiceLink = ({ to, label }: NextServiceLinkProps) => (
  <div className="mt-20 mb-4 flex flex-col items-center">
    <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
      Siguiente servicio
    </p>
    <Link
      to={to}
      className="group inline-flex items-center gap-4 px-8 py-5 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:gap-6"
    >
      <span>{label}</span>
      <motion.span
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary-foreground/15 group-hover:bg-primary-foreground/25"
      >
        <ArrowRight size={24} />
      </motion.span>
    </Link>
  </div>
);

export default NextServiceLink;
