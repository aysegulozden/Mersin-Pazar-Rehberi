import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./features/home/HomePage.jsx";
import CalendarPage from "./features/calendar/CalendarPage.jsx";
import MapPage from "./features/map/MapPage.jsx";
import MarketDetailPage from "./features/detail/MarketDetailPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/takvim" element={<CalendarPage />} />
      {/* <Route path="/harita" element={<MapPage />} /> */}
      <Route path="/pazar/:id" element={<MarketDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
