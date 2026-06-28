import { NavLink } from "react-router-dom";

const ITEMS = [
  { to: "/", label: "Bugün", icon: HomeIcon, end: true },
  { to: "/takvim", label: "Takvim", icon: CalendarIcon },
  // { to: "/harita", label: "Harita", icon: MapIcon },
];

export default function BottomNav() {
  return (
    <nav
      className="safe-bottom sticky bottom-0 z-20 mt-auto"
      style={{
        background: "rgba(255,248,241,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(232,90,30,0.12)",
        boxShadow: "0 -4px 24px rgba(44,24,16,0.08)",
      }}
    >
      <div className="flex">
        {ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                "touch-target relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-semibold transition-all duration-200",
                isActive ? "text-brand-500" : "text-ink-faint",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-full bg-brand-500"
                    style={{ boxShadow: "0 2px 8px rgba(232,90,30,0.4)" }}
                  />
                )}
                <span
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200",
                    isActive ? "bg-brand-100 scale-110" : "",
                  ].join(" ")}
                >
                  <Icon active={isActive} />
                </span>
                <span className={isActive ? "text-brand-600" : ""}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function HomeIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10.5 12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill={active ? "currentColor" : "none"}
        fillOpacity={active ? 0.2 : 0}
      />
    </svg>
  );
}
function CalendarIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="3" y="5" width="18" height="16" rx="2"
        stroke="currentColor" strokeWidth="2"
        fill={active ? "currentColor" : "none"} fillOpacity={active ? 0.15 : 0}
      />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function MapIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
        fill={active ? "currentColor" : "none"} fillOpacity={active ? 0.15 : 0}
      />
      <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
