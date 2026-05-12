import { NextResponse } from "next/server";

const UA = "EIREnia-Website/1.0 (https://www.eirenia.de)";

const MAX_PLACES = 10;
const NOMINATIM_DELAY_MS = 900;

export const maxDuration = 25;

type NominatimHit = {
  lat: string;
  lon: string;
  display_name: string;
};

type GeocodeMarker = {
  lat: number;
  lon: number;
  label: string;
  query: string;
};

async function nominatimSearch(
  q: string,
): Promise<{ lat: number; lon: number; label: string } | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("q", q);

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": UA },
    next: { revalidate: 60 * 60 * 24 * 7 },
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as NominatimHit[];
  if (!data?.length) {
    return null;
  }

  const hit = data[0]!;
  return {
    lat: parseFloat(hit.lat),
    lon: parseFloat(hit.lon),
    label: hit.display_name,
  };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültiger JSON-Body" }, { status: 400 });
  }

  const raw = typeof body === "object" && body !== null ? (body as { places?: unknown }).places : undefined;
  if (!Array.isArray(raw)) {
    return NextResponse.json({ error: "places (Array) erforderlich" }, { status: 400 });
  }

  const places = [
    ...new Set(
      raw
        .map((s) => (typeof s === "string" ? s.trim() : ""))
        .filter((s) => s.length >= 2),
    ),
  ].slice(0, MAX_PLACES);

  if (places.length === 0) {
    return NextResponse.json({ markers: [] as GeocodeMarker[] });
  }

  const markers: GeocodeMarker[] = [];

  for (let i = 0; i < places.length; i++) {
    const q = places[i]!;
    if (i > 0) {
      await new Promise((r) => setTimeout(r, NOMINATIM_DELAY_MS));
    }
    const hit = await nominatimSearch(q);
    if (hit) {
      markers.push({ ...hit, query: q });
    }
  }

  const seen = new Set<string>();
  const unique = markers.filter((m) => {
    const k = `${m.lat.toFixed(4)},${m.lon.toFixed(4)}`;
    if (seen.has(k)) {
      return false;
    }
    seen.add(k);
    return true;
  });

  return NextResponse.json({ markers: unique });
}
