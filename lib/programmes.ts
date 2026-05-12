export type ProgrammeItem = {
  emoji: string;
  name: string;
  slug: string;
  tag: string;
  tagColor?: string;
  description: string;
  coachName: string;
  duration: string;
  location: string;
  address: string;
  courseDate: string;
  about: string;
  expectations: string[];
};

export const programmes: ProgrammeItem[] = [
  {
    emoji: "☕",
    name: "Der Cacao mit Andreas",
    slug: "der-cacao-mit-andreas",
    tag: "Rituale",
    description: "Herzöffnung, Erdung, Verbindung",
    coachName: "Andreas Zettel",
    duration: "ca. 2–3 Stunden",
    location: "EIRENIA Raum, München",
    address: "Leopoldstraße 45, 80802 München",
    courseDate: "2026-06-12T18:30:00.000Z",
    about:
      "In diesem Ritual kommen wir gemeinsam im Kreis zusammen – begleitet von einer liebevoll zubereiteten Kakao-Zeremonie. Der Cacao öffnet das Herz, verbindet uns mit uns selbst und miteinander und schafft Raum für echte, tiefe Begegnung.",
    expectations: [
      "Herzöffnende Kakao-Zeremonie",
      "Stille, Austausch und echte Verbindung",
      "Geführte Meditations- und Atemübungen",
      "Kleine Gruppe für tiefe Begegnung",
    ],
  },
  {
    emoji: "🌙",
    name: "Das Sein mit Andreas",
    slug: "das-sein-mit-andreas",
    tag: "Meditation",
    description: "Innere Stille & Klarheit",
    coachName: "Andreas Zettel",
    duration: "ca. 90 Minuten",
    location: "EIRENIA Raum, München",
    address: "Leopoldstraße 45, 80802 München",
    courseDate: "2026-06-19T19:00:00.000Z",
    about:
      "Ein stiller Raum, in dem du nichts leisten musst. Andreas begleitet dich in eine Meditation, die dich zurück in dein Sein, deine Klarheit und deine innere Ruhe führt.",
    expectations: [
      "Geführte Meditation",
      "Ankommen im Körper",
      "Impulse für innere Klarheit",
      "Zeit für Stille und Integration",
    ],
  },
  {
    emoji: "🕊️",
    name: "Der Frieden mit Andreas",
    slug: "der-frieden-mit-andreas",
    tag: "Energie",
    tagColor: "#5B8A7A",
    description: "Heilung & Bewusstwerdung",
    coachName: "Andreas Zettel",
    duration: "ca. 2 Stunden",
    location: "EIRENIA Raum, München",
    address: "Leopoldstraße 45, 80802 München",
    courseDate: "2026-06-26T18:00:00.000Z",
    about:
      "Ein energetischer Kreis für Bewusstwerdung, Loslassen und die Rückkehr zu deinem inneren Frieden. Andreas hält den Raum, in dem du weich werden und dich erinnern darfst.",
    expectations: [
      "Energetische Friedensarbeit",
      "Raum für persönliche Themen",
      "Stille und achtsame Begegnung",
      "Integration in der Gruppe",
    ],
  },
  {
    emoji: "🌺",
    name: "Das Gesicht mit Andreas",
    slug: "das-gesicht-mit-andreas",
    tag: "Physiognomik",
    description: "Selbstbild & Ausdruck",
    coachName: "Andreas Zettel",
    duration: "ca. 2 Stunden",
    location: "EIRENIA Raum, München",
    address: "Leopoldstraße 45, 80802 München",
    courseDate: "2026-07-03T17:30:00.000Z",
    about:
      "Ein achtsamer Blick auf Ausdruck, Wesen und Selbstbild. Du erforschst, was dein Gesicht über deine Kraft, deine Geschichte und deinen Weg erzählen darf.",
    expectations: [
      "Einführung in Physiognomik",
      "Wahrnehmungsübungen",
      "Impulse für Selbstannahme",
      "Austausch im geschützten Kreis",
    ],
  },
  {
    emoji: "💫",
    name: "Das System mit Julia",
    slug: "das-system-mit-julia",
    tag: "Systemik",
    tagColor: "#7E9CC0",
    description: "Aufstellungen & Familienthemen",
    coachName: "Julia",
    duration: "ca. 2–3 Stunden",
    location: "EIRENIA Raum, München",
    address: "Leopoldstraße 45, 80802 München",
    courseDate: "2026-07-10T18:00:00.000Z",
    about:
      "Systemische Arbeit macht sichtbar, was im Verborgenen wirkt. In einem getragenen Feld dürfen Beziehungen, Muster und Familienthemen neu betrachtet werden.",
    expectations: [
      "Systemische Impulse",
      "Aufstellungsarbeit in kleiner Gruppe",
      "Achtsames Wahrnehmen",
      "Raum für neue Perspektiven",
    ],
  },
  {
    emoji: "🌬️",
    name: "Die Atemreise mit Michael",
    slug: "die-atemreise-mit-michael",
    tag: "Wim Hof",
    tagColor: "#4A90A4",
    description: "Präsenz & Lebenskraft",
    coachName: "Michael",
    duration: "ca. 2 Stunden",
    location: "EIRENIA Raum, München",
    address: "Leopoldstraße 45, 80802 München",
    courseDate: "2026-07-17T18:00:00.000Z",
    about:
      "Über bewussten Atem findest du zurück in Präsenz, Energie und innere Weite. Michael begleitet dich sicher durch eine intensive und zugleich achtsame Atemreise.",
    expectations: [
      "Atemtechnik und Vorbereitung",
      "Geführte Atemreise",
      "Körperwahrnehmung",
      "Integration und Austausch",
    ],
  },
  {
    emoji: "🔮",
    name: "Die Alphafrequenz mit Tobi",
    slug: "die-alphafrequenz-mit-tobi",
    tag: "Hypnose",
    tagColor: "#8B7BAF",
    description: "Unterbewusstsein & Transformation",
    coachName: "Tobi",
    duration: "ca. 2 Stunden",
    location: "EIRENIA Raum, München",
    address: "Leopoldstraße 45, 80802 München",
    courseDate: "2026-07-24T19:00:00.000Z",
    about:
      "Eine geführte Reise in entspannte Bewusstseinszustände, in denen neue innere Bilder, Klarheit und Transformation entstehen dürfen.",
    expectations: [
      "Sanfte Einführung in Hypnose",
      "Geführte Tiefenentspannung",
      "Arbeit mit inneren Bildern",
      "Reflexion und Integration",
    ],
  },
  {
    emoji: "🌊",
    name: "Der Flow mit Ela",
    slug: "der-flow-mit-ela",
    tag: "Yoga",
    tagColor: "#5B8A7A",
    description: "Balance von Körper & Seele",
    coachName: "Ela",
    duration: "ca. 90 Minuten",
    location: "EIRENIA Raum, München",
    address: "Leopoldstraße 45, 80802 München",
    courseDate: "2026-07-31T17:00:00.000Z",
    about:
      "Ein sanfter Yoga-Flow für Balance, Erdung und Verbindung. Ela führt dich durch Bewegung, Atem und Stille zurück in deinen Körper.",
    expectations: [
      "Sanfter Yoga-Flow",
      "Atem und Körperwahrnehmung",
      "Erdende Sequenzen",
      "Stille Abschlussintegration",
    ],
  },
  {
    emoji: "🔔",
    name: "Der Klang mit Axel",
    slug: "der-klang-mit-axel",
    tag: "Klangschalen",
    tagColor: "#B8882A",
    description: "Schwingung & Heilung",
    coachName: "Axel",
    duration: "ca. 90 Minuten",
    location: "EIRENIA Raum, München",
    address: "Leopoldstraße 45, 80802 München",
    courseDate: "2026-08-07T19:30:00.000Z",
    about:
      "Klang öffnet Räume, die Worte nicht erreichen. Axel begleitet dich mit Schwingung, Klangschalen und Stille in tiefe Entspannung.",
    expectations: [
      "Klangschalenreise",
      "Tiefenentspannung",
      "Sanfte Körperwahrnehmung",
      "Nachspüren in Stille",
    ],
  },
  {
    emoji: "🎥",
    name: "Der Filmabend mit uns",
    slug: "der-filmabend-mit-uns",
    tag: "Kino",
    tagColor: "#E8644A",
    description: "Inspiration & Austausch",
    coachName: "EIRENIA Team",
    duration: "ca. 3 Stunden",
    location: "EIRENIA Raum, München",
    address: "Leopoldstraße 45, 80802 München",
    courseDate: "2026-08-14T18:30:00.000Z",
    about:
      "Ein gemeinsamer Filmabend mit Inspiration, Gespräch und Begegnung. Wir schauen nicht nur zu – wir lassen das Gesehene in uns wirken.",
    expectations: [
      "Ausgewählter inspirierender Film",
      "Gemeinsamer Austausch",
      "Impulse für Bewusstwerdung",
      "Offener Abend im Kreis",
    ],
  },
  {
    emoji: "🪶",
    name: "Der Daishin-Zen mit Nina",
    slug: "der-daishin-zen-mit-nina",
    tag: "Zen",
    tagColor: "#2A3E4F",
    description: "Tiefe & Weisheit",
    coachName: "Nina",
    duration: "ca. 2 Stunden",
    location: "EIRENIA Raum, München",
    address: "Leopoldstraße 45, 80802 München",
    courseDate: "2026-08-21T18:00:00.000Z",
    about:
      "Zen als Weg in Einfachheit, Präsenz und innere Tiefe. Nina begleitet dich in eine ruhige Praxis, die dich mit Weisheit und Stille verbindet.",
    expectations: [
      "Einführung in Daishin-Zen",
      "Sitzmeditation",
      "Achtsame Stille",
      "Austausch zur Erfahrung",
    ],
  },
];

export function getProgrammeBySlug(slug: string) {
  return programmes.find((programme) => programme.slug === slug);
}
