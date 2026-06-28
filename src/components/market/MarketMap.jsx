import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { bugununGunu } from "../../lib/days.js";
import { yolTarifiLink } from "../../lib/maps.js";

function pinIcon(renk) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:22px;height:22px;border-radius:50% 50% 50% 0;
      background:${renk};transform:rotate(-45deg);
      border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35);
    "></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 22],
    popupAnchor: [0, -20],
  });
}

const ICON_NORMAL = pinIcon("#16a34a");
const ICON_BUGUN = pinIcon("#f97316");

const MERSIN_MERKEZ = [36.8, 34.63];

export default function MarketMap({ markets, height = "100%" }) {
  const bugun = bugununGunu();
  const noktali = markets.filter(
    (m) => m.latitude != null && m.longitude != null
  );

  const merkez = noktali.length
    ? [noktali[0].latitude, noktali[0].longitude]
    : MERSIN_MERKEZ;

  return (
    <MapContainer
      center={merkez}
      zoom={noktali.length === 1 ? 14 : 11}
      style={{ height, width: "100%" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {noktali.map((m) => (
        <Marker
          key={m.id}
          position={[m.latitude, m.longitude]}
          icon={m.day === bugun ? ICON_BUGUN : ICON_NORMAL}
        >
          <Popup>
            <div style={{ minWidth: 160 }}>
              <strong>{m.neighborhood} Mah.</strong>
              <div style={{ fontSize: 12, color: "#555", margin: "2px 0" }}>
                {m.district} · {m.day}
              </div>
              <div style={{ fontSize: 12, marginBottom: 6 }}>{m.address}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <Link to={`/pazar/${m.id}`} style={{ color: "#16a34a", fontWeight: 600 }}>
                  Detay
                </Link>
                <a
                  href={yolTarifiLink(m)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ea580c", fontWeight: 600 }}
                >
                  Yol Tarifi
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
