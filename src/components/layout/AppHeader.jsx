import { motion } from "framer-motion";

export default function AppHeader({ title, subtitle, right, emoji = "🛒" }) {
  return (
    <header className="hero-header safe-top sticky top-0 z-20 pb-8 pt-4 px-4">
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, -8, 8, -4, 0] }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
            className="text-3xl leading-none"
          >
            {emoji}
          </motion.div>
          <div>
            <h1 className="text-lg font-extrabold leading-tight text-white drop-shadow-sm">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-0.5 text-sm font-medium text-white/80">{subtitle}</p>
            )}
          </div>
        </div>
        {right && <div className="relative z-10">{right}</div>}
      </div>
    </header>
  );
}
