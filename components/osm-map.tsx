"use client";

import { useEffect, useId, useRef, useState } from "react";

type GeocodeMarker = {
  lat: number;
  lon: number;
  label: string;
  query: string;
};

type OsmMapProps = {
  places: string[];
  className?: string;
  title?: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function makePinSvg(filterId: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44" aria-hidden="true"><defs><filter id="${filterId}" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1.2" flood-opacity="0.35"/></filter></defs><path filter="url(#${filterId})" fill="#c9a84c" stroke="#fff" stroke-width="2" d="M18 2C10.3 2 4 8.1 4 15.4c0 8.2 10 22.6 14 26.6 4-4 14-18.4 14-26.6C32 8.1 25.7 2 18 2z"/><circle fill="#fff" cx="18" cy="15" r="4.2"/></svg>`;
}

const GEOCODE_DEBOUNCE_MS = 380;

export function OsmMap({ places, className = "", title = "OpenStreetMap-Karte" }: OsmMapProps) {
  const pinFilterId = useId().replace(/:/g, "");
  const canvasRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const [phase, setPhase] = useState<"idle" | "loading" | "ready" | "empty" | "error">("idle");

  const placesKey = places
    .map((p) => p.trim())
    .filter(Boolean)
    .join("\u0000");

  useEffect(() => {
    const el = canvasRef.current;

    if (!el || placesKey.length === 0) {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
      setPhase("empty");
      return;
    }

    setPhase("loading");

    const placesClean = placesKey.split("\u0000").filter(Boolean);
    let cancelled = false;

    const timer = window.setTimeout(() => {
      async function run() {
        const res = await fetch("/api/geocode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ places: placesClean }),
        });

        if (cancelled) {
          return;
        }

        if (!res.ok) {
          setPhase("error");
          return;
        }

        const data = (await res.json()) as { markers: GeocodeMarker[] };
        if (!data.markers.length) {
          setPhase("error");
          return;
        }

        const L = (await import("leaflet")).default;

        if (cancelled) {
          return;
        }

        const host = canvasRef.current;
        if (!host) {
          return;
        }

        mapInstanceRef.current?.remove();
        mapInstanceRef.current = null;
        host.replaceChildren();

        const map = L.map(host, {
          scrollWheelZoom: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noreferrer">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);

        const icon = L.divIcon({
          className: "osm-pin-wrap",
          html: makePinSvg(pinFilterId),
          iconSize: [36, 44],
          iconAnchor: [18, 44],
          popupAnchor: [0, -40],
        });

        for (const m of data.markers) {
          L.marker([m.lat, m.lon], { icon, title: m.query })
            .addTo(map)
            .bindPopup(
              `<div class="osm-popup"><strong>${escapeHtml(m.query)}</strong><br /><span class="osm-popup-sub">${escapeHtml(m.label)}</span></div>`,
            );
        }

        if (data.markers.length === 1) {
          const m0 = data.markers[0]!;
          map.setView([m0.lat, m0.lon], 15);
        } else {
          const bounds = L.latLngBounds(
            data.markers.map((m) => [m.lat, m.lon] as [number, number]),
          );
          map.fitBounds(bounds, { padding: [28, 28], maxZoom: 15 });
        }

        mapInstanceRef.current = map;
        setPhase("ready");

        requestAnimationFrame(() => {
          map.invalidateSize();
          setTimeout(() => map.invalidateSize(), 450);
        });
      }

      void run();
    }, GEOCODE_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [placesKey, pinFilterId]);

  const showOverlay =
    placesKey.length === 0 ? phase === "empty" : phase !== "ready";

  return (
    <div className={`osm-map-root ${className}`.trim()}>
      {showOverlay && (
        <div className="osm-map-overlay" aria-live="polite">
          {(phase === "idle" || phase === "loading") && <span>Karte wird geladen …</span>}
          {phase === "error" && <span>Ort konnte nicht gefunden werden.</span>}
          {phase === "empty" && <span>Kein Ort für die Karte angegeben.</span>}
        </div>
      )}
      <div ref={canvasRef} className="osm-map-canvas" role="region" aria-label={title} />
    </div>
  );
}
