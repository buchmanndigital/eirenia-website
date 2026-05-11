export type ProgrammeItem = {
  emoji: string;
  name: string;
  tag: string;
  tagColor?: string;
  description: string;
};

export const programmes: ProgrammeItem[] = [
  {
    emoji: "☕",
    name: "Der Cacao mit Andreas",
    tag: "Rituale",
    description: "Herzöffnung, Erdung, Verbindung",
  },
  {
    emoji: "🌙",
    name: "Das Sein mit Andreas",
    tag: "Meditation",
    description: "Innere Stille & Klarheit",
  },
  {
    emoji: "🕊️",
    name: "Der Frieden mit Andreas",
    tag: "Energie",
    tagColor: "#5B8A7A",
    description: "Heilung & Bewusstwerdung",
  },
  {
    emoji: "🌺",
    name: "Das Gesicht mit Andreas",
    tag: "Physiognomik",
    description: "Selbstbild & Ausdruck",
  },
  {
    emoji: "💫",
    name: "Das System mit Julia",
    tag: "Systemik",
    tagColor: "#7E9CC0",
    description: "Aufstellungen & Familienthemen",
  },
  {
    emoji: "🌬️",
    name: "Die Atemreise mit Michael",
    tag: "Wim Hof",
    tagColor: "#4A90A4",
    description: "Präsenz & Lebenskraft",
  },
  {
    emoji: "🔮",
    name: "Die Alphafrequenz mit Tobi",
    tag: "Hypnose",
    tagColor: "#8B7BAF",
    description: "Unterbewusstsein & Transformation",
  },
  {
    emoji: "🌊",
    name: "Der Flow mit Ela",
    tag: "Yoga",
    tagColor: "#5B8A7A",
    description: "Balance von Körper & Seele",
  },
  {
    emoji: "🔔",
    name: "Der Klang mit Axel",
    tag: "Klangschalen",
    tagColor: "#B8882A",
    description: "Schwingung & Heilung",
  },
  {
    emoji: "🎥",
    name: "Der Filmabend mit uns",
    tag: "Kino",
    tagColor: "#E8644A",
    description: "Inspiration & Austausch",
  },
  {
    emoji: "🪶",
    name: "Der Daishin-Zen mit Nina",
    tag: "Zen",
    tagColor: "#2A3E4F",
    description: "Tiefe & Weisheit",
  },
];
