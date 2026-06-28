import { useLocation } from "react-router-dom";
import AppRoutes from "./router.jsx";
import BottomNav from "./components/layout/BottomNav.jsx";

export default function App() {
  const location = useLocation();
  const detayda = location.pathname.startsWith("/pazar/");

  return (
    <div className="app-shell flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        <AppRoutes />
      </main>
      {!detayda && <BottomNav />}
    </div>
  );
}
