export interface PhotoSlot {
  id: string;
  caption?: string;
  src?: string;
  alt?: string;
}

export interface DateEntry {
  date: string;
  title: string;
  description: string;
}

export interface Reason {
  title: string;
  body: string;
}

export interface BirthdayContent {
  name: string;
  heroGreeting: string;
  heroSubtitle: string;
  beginLabel: string;
  letter: string[];
  gallery: PhotoSlot[];
  dates: DateEntry[];
  reasons: Reason[];
  finale: { primary: string; secondary: string };
}

export const birthdayContent: BirthdayContent = {
  name: "My Love",
  heroGreeting: "Happy Birthday",
  heroSubtitle: "A little story, written for you.",
  beginLabel: "Tap to begin",
  letter: [
    "On this quiet morning, the world feels a little brighter — because somewhere in it, you woke up today.",
    "Every moment with you has felt like a soft chapter I never want to close. Your laugh, your kindness, the way you look at the world — all of it is the reason my days have color.",
    "So today, I'm wrapping up everything I feel and giving it back to you, slowly, page by page.",
  ],
  gallery: Array.from({ length: 11 }).map((_, i) => ({
    id: `memory-${i + 1}`,
    caption: [
      "the first time",
      "a quiet afternoon",
      "city lights, your smile",
      "somewhere by the sea",
      "morning coffee",
      "the way you laughed",
      "us, getting lost",
      "rain on the window",
      "a small celebration",
      "the long drive home",
      "you, simply you",
    ][i],
  })),
  dates: [
    { date: "The day we met", title: "First Meeting", description: "A conversation that didn't want to end." },
    { date: "Our first date", title: "First Date", description: "Slow walks, soft laughter, the start of everything." },
    { date: "Our first trip", title: "First Trip", description: "New places felt like home with you." },
    { date: "Your birthday, last year", title: "Birthday Celebration", description: "Candles, cake, and a wish I kept secret." },
    { date: "Our anniversary", title: "Anniversary", description: "One more loop around the sun, together." },
    { date: "Today and always", title: "Forever Together", description: "Wherever the road goes, I'm with you." },
  ],
  reasons: [
    { title: "Your smile", body: "It rearranges the room every time." },
    { title: "Your kindness", body: "Gentle, steady, and quietly brave." },
    { title: "Your laugh", body: "My favorite sound in any language." },
    { title: "Your support", body: "You make hard days softer." },
    { title: "Your love", body: "Patient, real, and entirely yours." },
  ],
  finale: {
    primary: "Happy Birthday, My Love ❤️",
    secondary: "I'll love you, forever.",
  },
};