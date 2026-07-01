
import bg from "../../../images/bg.jpg";
import img1 from "../../images/img1.jpg";

import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jpg";
import img4 from "../../images/img4.jpg";
import img5 from "../../images/img5.jpg";
import img6 from "../../images/img6.jpg";
import img7 from "../../images/img7.jpg";
import img8 from "../../images/img8.jpg";
import img9 from "../../images/img9.jpg";
import img10 from "../../images/img10.jpg";
import img11 from "../../images/img11.jpg";
import img12 from "../../images/img12.jpg";





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
  name: "Nikita",
  heroGreeting: "Happy Birthday",
  heroSubtitle: "A little story, written for you.",
  beginLabel: "Tap to begin",
  letter: [
    "Hi, I'm not a good writer, so writing a letter for you isn't easy. I tried my best, and if there are any mistakes, please forgive me. I also made a small website with my little effort and a lot of love.",
    "First of all, I want to thank you for coming into my life. In such a short period of time, we faced many problems, but we successfully overcame them together. I wish we stay together until our last breath.",
    "I know you love me more than I love you. I hope your love for me grows even more in the future. I want to be everything in your life and fulfill all my dreams with you.",
    "So today, I'm wrapping up everything I feel and giving it back to you, slowly, page by page.",
  ],
  gallery: [
  {
    id: "memory-1",
    src: img1,
    caption: "Our first photo together. ❤️ ",
  },
  {
    id: "memory-2",
    src: img2,
    caption: "our first trip",
  },
  {
    id: "memory-3",
    src: img3,
    caption: "The moment i realized we looked so similar. ✨",
  },
  {
    id: "memory-4",
    src: img4,
    caption: "The first time we became one. ❤️",
  },
  {
    id: "memory-5",
    src: img5,
    caption: "The trip that brought us even closer. 💖",
  },
  {
    id: "memory-6",
    src: img6,
    caption: "i love this photo",
  },
  {
    id: "memory-7",
    src: img7,
    caption: "my fav picture",
  },
  {
    id: "memory-8",
    src: img8,
    caption: "The moment I found peace in your arms. ❤️",
  },
  {
    id: "memory-9",
    src: img9,
    caption: "The day we simply sat, talked, and cherished every moment together. 🫂",
  },
  {
    id: "memory-10",
    src: img10,
    caption: "I can't tell you about this day.",
  },
  {
    id: "memory-11",
    src: img11,
    caption: "Every picture feels complete when we're together. 📸❤️",
  },
  {
    id: "memory-12",
    src: img12,
    caption: "I love you mo naiku ❤️",
  },
],
  dates: [
    { date: "The day we follow eachother", title: "", description: "I think this is the best step I have ever taken in my life, and all the credit goes to you because you saw my story." },
    { date: "The day we met", title: "First Meeting", description: "We met at the Boat Club, and everything felt magical from that day." },

    { date: "Our first trip", title: "puri", description: "The trip that brought us closer—and the last seat of the traveler, where unforgettable memories were made. ❤️✨" },
  
    { date: "Our anniversary", title: "Anniversary", description: "The only two dates that truly matter to me are your birthday and our anniversary. ❤️" },
    { date: "Today and always", title: "Forever Together", description: "Wherever the road goes, I'm with you." },
  ],
  reasons: [
    { title: "Your smile", body: "Your smile is my favorite thing about you. ✨" },
    { title: "Your anger", body: "I'd rather stay quiet about your anger, or you'll just get mad at me again. 😅❤️" },
    { title: "Your laugh", body: "No matter how loud it was, your smile was all that mattered to me. 🌹" },
    { title: "Your support", body: "You make hard days softer." },
    { title: "Your love", body: "You love me exactly the way I always dreamed of being loved. You turned my dream into reality, and I want to say it again—you are, and always will be, my dream girl. ❤️" },
  ],
  finale: {
    primary: "Happy Birthday, my dream girl.❤️You are the most beautiful chapter of my life, and I love you more than words can express. I hope all your dreams come true, every problem fades away as if it never existed, and you always receive the love and respect you truly deserve from your family. Wishing you a lifetime of happiness, love, and beautiful memories. Happy Birthday, my forever love. 🎂✨",
    secondary: "Love you Dhana",
  },
};