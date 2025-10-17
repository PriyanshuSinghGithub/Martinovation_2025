import React, { useState } from "react";
import {
  Code,
  Gamepad2,
  Brain,
  Plane,
  Calendar,
  MapPin,
  User,
  Users,
  Tag,
  DollarSign,
  X,
  FlaskConical,
  PenTool,
  Music,
  Footprints,
  Camera,
  Mic,
  Megaphone,
  Paintbrush,
  Puzzle,
  Tv,
  Presentation,
} from "lucide-react";

interface Event {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: React.ReactNode;
  category: string;
  fee: string;
  venue: string;
  speaker: string;
  capacity: number | string;
  includes: string[];
  color: string;
  day: string;
  registrationLink: string;
}

const getEventDetails = (title: string) => {
  const brief: Record<string, any> = {
    "Hackathon – BitShift": {
      description:
        "A 24-hour coding competition where teams develop innovative software solutions based on a theme.",
      long: "A 24-hour hackathon (BitShift). Teams of 2-4 build software solutions around a theme. Participant Requirements: Laptop, IDEs installed. Organizer provides internet, power, workspace, mentors, refreshments, and judging. Prize pool ₹40,000 (1st ₹20,000, 2nd ₹12,000, 3rd ₹8,000). Entry fee: ₹500 per team. Slot: 200 teams.",
      fee: "₹500 / team",
      prize: "₹40,000",
      slot: 200,
      team: "2-4",
      includes: ["Prize pool ₹40,000", "Internet & Power", "Mentorship"],
    },
    "Coding Marathon – FutureScript": {
      description:
        "Participants solve timed coding problems (individual or duo).",
      long: "Coding Marathon – FutureScript: intense problem-solving in fixed time. Participant Requirements: Laptop, coding environment. Organizer provides problem sets, timers, judges, and certificates/medals.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "2",
      includes: ["Problem sets", "Leaderboard", "Certificates"],
    },
    "Tech Quiz – TechQuest": {
      description:
        "Teams compete on technology, gadgets, AI, and coding knowledge.",
      long: "Tech Quiz – TechQuest: buzzer rounds, MCQs, and rapid-fire focused on tech & current trends. Organizer provides buzzer system, projector, scoreboard, and prizes.",
      fee: "Free",
      prize: "Prizes for top teams",
      slot: "Open",
      team: "2",
      includes: ["Buzzer system", "Scoreboard", "Prizes"],
    },
    "General Quiz – MindForge": {
      description:
        "Quiz across general knowledge, current affairs, science, and entertainment.",
      long: "General Quiz – MindForge: rounds covering general knowledge. Organizer provides quizmaster, scoreboard, buzzers, and prizes.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "2",
      includes: ["Quizmaster", "Projector", "Certificates"],
    },
    Robotics: {
      description: "Teams design and program robots for tasks/challenges.",
      long: "Robotics – Rise of Machines: teams bring robots to navigate tasks. Organizer provides arena, power, safety barriers, tools, and judges. Participant Requirements: pre-built robots, electronics and programming knowledge.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "Teams",
      includes: ["Arena & safety barriers", "Judges & tools"],
    },
    "Drone Race – SkyNova": {
      description: "Race drones through an obstacle course.",
      long: "Drone Race – SkyNova: pilots navigate drones through timed obstacles. Participant Requirements: own or pre-approved drone. Organizer provides obstacle setup, chargers, judges, and safety.",
      fee: "Free",
      prize: "₹5,000 (1st ₹3,000, 2nd ₹2,000, 3rd ₹1,000)",
      slot: "Open",
      team: "Individual",
      includes: ["Obstacle course access", "Power stations", "Judges"],
    },
    "Hack Puzzle – CodeCipher": {
      description:
        "Teams solve programming, logic & cybersecurity puzzles under time pressure.",
      long: "Hack Puzzle – CodeCipher: timed puzzle-solving. Participant Requirements: laptop, basic programming & logic. Organizer provides puzzles, mentors, and scoreboard.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "Individual",
      includes: ["Puzzles & mentors", "Scoreboard"],
    },
    "Meme Battle – MetaMeme": {
      description:
        "Create tech/campus-themed memes under time constraints.",
      long: "Meme Battle – MetaMeme: live meme creation and display. Participant Requirements: laptop/phone. Organizer provides theme, projection, internet, and judges.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "Individual",
      includes: ["Theme & projector", "Judges & internet"],
    },
    "Short Film Challenge – Frame the Future": {
      description: "Create short films based on a theme.",
      long: "Short Film Challenge – Frame the Future: storytelling through short films. Participant Requirements: camera or smartphone. Organizer provides submission portal, judges, and display.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "Individual",
      includes: ["Submission portal", "Judges", "Display"],
    },
    "Talent Show – Eclipsera": {
      description: "Open stage for music, dance, magic, and other talents.",
      long: "Talent Show – Eclipsera: participants perform live onstage. Organizer provides stage, sound, judges, and lights.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "Individual/Groups",
      includes: ["Stage & sound system", "Judges"],
    },
    "Project Exhibition – ProtoVerse": {
      description:
        "Participants showcase tech, robotics, and software projects.",
      long: "Project Exhibition – ProtoVerse: display prototypes. Organizer provides display tables, electricity, and judges. Prize pool ₹10,000.",
      fee: "Free",
      prize: "₹10,000",
      slot: "Open",
      team: "2-4",
      includes: ["Display tables", "Electricity", "Judges"],
    },
    "BGMI Tournament – BattleVerse - BGMI": {
      description: "BGMI Battle Royale tournament.",
      long: "BGMI Tournament – BattleVerse: competitive PUBG Mobile (BGMI) tournament. Participant Requirements: smartphone with BGMI. Organizer provides lobby setup, projector, internet, and prizes. Entry fee ₹149 per team; slots 200 teams.",
      fee: "₹149 / team",
      prize: "₹30,000",
      slot: 200,
      team: "4",
      includes: ["Lobby & streaming", "Prizes"],
    },
    "Valorant Tournament": {
      description: "Competitive PC shooter tournament (Valorant).",
      long: "Valorant Tournament: competitive PC shooter matches. Participant Requirements: PC with Valorant, peripherals. Organizer provides PCs (if needed), internet, admin, and projector. Entry fee ₹149 per team; slots 200 teams.",
      fee: "₹149 / team",
      prize: "₹20,000",
      slot: 200,
      team: "4",
      includes: ["PCs & internet", "Admin & projector"],
    },
    "AutoCAD Design – FutureFrame": {
      description: "Design 2D/3D models in AutoCAD.",
      long: "AutoCAD Design – FutureFrame: participants design models using AutoCAD. Participant Requirements: laptop with AutoCAD. Organizer provides theme, projector, and judges.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "Individual",
      includes: ["Theme & judges", "Projector"],
    },
    "Web Development Sprint – WebVerse": {
      description:
        "Build a functional website in limited time based on a theme.",
      long: "Web Development Sprint – WebVerse: build a website within the sprint time. Participant Requirements: laptop, editor, internet. Organizer provides mentors, internet, power, and prizes.",
      fee: "₹199",
      prize: "₹10,000",
      slot: 100,
      team: "2-4",
      includes: ["Theme", "Mentorship", "Prize pool"],
    },
    "Workshops – InnovateX": {
      description: "Hands-on sessions on coding, robotics, AI or design.",
      long: "Workshops – InnovateX: practical instructor-led sessions across multiple days. Organizer provides instructors, materials, and workspace.",
      fee: "Free (registration required)",
      prize: "N/A",
      slot: "Open",
      team: "Individual",
      includes: ["Instructor & materials", "Projector & workspace"],
    },
    "AI Art Competition – VisionSynth": {
      description: "Create digital artwork using AI tools.",
      long: "AI Art Competition – VisionSynth: participants create AI-generated art. Participant Requirements: laptop/phone with AI tools. Organizer provides theme, internet, projector, and judges.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "Individual",
      includes: ["Theme & internet", "Projector & judges"],
    },
    "AI Music Composition – EchoMind": {
      description: "Compose music using AI tools and workflows.",
      long: "AI Music Composition – EchoMind: participants use AI to compose music pieces. Organizer provides internet, mentors, judging criteria, and projector/audio setup.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "Individual",
      includes: ["Theme & mentors", "Audio setup & judges"],
    },
    Cosplay: {
      description: "Theme-based cosplay showcasing character design.",
      long: "Cosplay – ChronoVerse: themed dressing & performance. Organizer provides platform, judges, and timing.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "Individual",
      includes: ["Stage & judges", "Timer & mentors"],
    },
    "Photography – Pixel Rebirth": {
      description: "Photography contest capturing campus areas.",
      long: "Photography – Pixel Rebirth: high-quality campus photography challenge. Organizer provides categories, mentors, and judges.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "Individual",
      includes: ["Mentors & judges", "Display area"],
    },
    "Push-Ups Challenge – Power Surge": {
      description: "Fitness challenge testing strength & endurance.",
      long: "Push-Ups Challenge – Power Surge: endurance test with judges and awards.",
      fee: "Free",
      prize: "Certificates & Medals",
      slot: "Open",
      team: "Individual",
      includes: ["Mats & judges", "Stopwatch"],
    },
  };

  const schedule: Record<string, any> = {
    "Opening Ceremony": {
      time: "9:30 – 10:00",
      venue: "Auditorium (Above central mess)",
      day: "Day 1",
    },
    "Coding Marathon – FutureScript": {
      time: "10:00 – 12:00",
      venue: "Auditorium (Above central mess)",
      day: "Day 1",
    },
    "Tech Quiz – TechQuest": {
      time: "12:30 – 14:00",
      venue: "Auditorium (Above central mess)",
      day: "Day 1",
    },
    "Tech Talk & Seminar": {
      time: "14:00 – 15:30",
      venue: "Auditorium (Above central mess)",
      day: "Day 1",
    },
    "Hackathon – BitShift": {
      time: "16:00 – 24:00 (24 hr)",
      venue: "Auditorium (Above central mess)",
      day: "Day 1",
    },
    "Web Development Sprint – WebVerse": {
      time: "12:30 – 16:30",
      venue: "Baitarni 5th floor lab",
      day: "Day 1",
    },
    "Robotics": {
      time: "10:30 – 13:00",
      venue: "Volleyball court",
      day: "Day 1",
    },
    "General Quiz – MindForge": {
      time: "13:00 – 15:00",
      venue: "Baitarni 2nd floor seminar hall",
      day: "Day 2",
    },
    "Hack Puzzle – CodeCipher": {
      time: "12:30 – 14:00",
      venue: "Baitarni 2nd floor - 302",
      day: "Day 2",
    },
    "AI Art Competition – VisionSynth": {
      time: "14:00 – 16:00",
      venue: "Volleyball court ground (exhibition zone)",
      day: "Day 2",
    },
    "AI Music Composition – EchoMind": {
      time: "14:00 – 16:00",
      venue: "Volleyball court ground (exhibition zone)",
      day: "Day 2",
    },
    "Short Film Challenge – Frame the Future": {
      time: "12:30 – 14:00",
      venue: "Campus (submission/display area)",
      day: "Day 2",
    },
    "Project Exhibition – ProtoVerse": {
      time: "10:00 – 12:00",
      venue: "Volleyball court",
      day: "Day 3",
    },
    "Drone Race – SkyNova": {
      time: "10:30 – 12:00",
      venue: "Volleyball court ground (exhibition zone)",
      day: "Day 3",
    },
    "Meme Battle – MetaMeme": {
      time: "12:30 – 14:00",
      venue: "Campus / Online",
      day: "Day 3",
    },
    "Cosplay": {
      time: "12:30 – 14:00",
      venue: "Open Ground",
      day: "Day 3",
    },
    "Talent Show – Eclipsera": {
      time: "14:00 – 15:30",
      venue: "Baitarni reception",
      day: "Day 3",
    },
    "AI Bot Challenge – NeuraWars": {
      time: "12:30 – 14:00",
      venue: "Volleyball court—Exhibition Zone",
      day: "Day 3",
    },
    "Push-Ups Challenge – Power Surge": {
      time: "14:00 – 15:30",
      venue: "Baitarni reception",
      day: "Day 3",
    },
    "BGMI Tournament – BattleVerse - BGMI": {
      time: "10:00 – 14:00",
      venue: "Baitarni 2nd floor - seminar hall",
      day: "Day 4",
    },
    "Valorant Tournament": {
      time: "10:00 – 13:00",
      venue: "Baitarni 5th floor lab",
      day: "Day 4",
    },
    "Photography – Pixel Rebirth": {
      time: "10:00 – 14:00",
      venue: "Campus",
      day: "Day 4",
    },
    "AutoCAD Design – FutureFrame": {
      time: "10:00 – 12:00",
      venue: "Baitarni - mechanical lab",
      day: "Day 3",
    },
    "Workshops – InnovateX": {
      time: "Everyday (check schedule)",
      venue: "Dassam G8",
      day: "All Days",
    },
  };

  const scheduleEntry = schedule[title];
  const briefEntry = brief[title] || brief[title.replace(/ *–.*$/, "")] || {};

  return {
    time: scheduleEntry?.time || "TBA",
    venue: scheduleEntry?.venue || "TBA",
    day: scheduleEntry?.day || "TBA",
    ...scheduleEntry,
    ...briefEntry,
    fee: briefEntry.fee || "Free",
    speaker: "TBA",
    category: "Event",
    capacity: briefEntry.slot || "Open",
    description:
      briefEntry.description || "Event details available upon registration.",
    fullDescription:
      briefEntry.long ||
      briefEntry.description ||
      "Comprehensive description is currently unavailable. Please check the venue.",
    includes: briefEntry.includes || ["Event access"],
  };
};

const allEvents: Event[] = [
  {
    id: "opening-ceremony",
    title: "Opening Ceremony",
    icon: <Megaphone className="w-12 h-12" />,
    color: "#00D4FF",
    ...getEventDetails("Opening Ceremony"),
    date: "November 3, 2025",
    time: "09:30 AM – 10:00 AM",
    speaker: "Chief Guest",
    category: "Keynote",
    capacity: 500,
    includes: ["Chief guest welcome & inauguration"],
    registrationLink:
      "https://www.umutechfest.co.in/#events",
  },
  {
    id: "coding-marathon",
    title: "Coding Marathon – FutureScript",
    icon: <Code className="w-12 h-12" />,
    color: "#7B2CBF",
    ...getEventDetails("Coding Marathon – FutureScript"),
    date: "November 3, 2025",
    time: "10:15 AM – 12:30 PM",
    category: "Competition",
    speaker: "Judges/Mentors",
    registrationLink: "https://forms.gle/pHa9WXfHAP997Tzi6",
  },
  {
    id: "tech-quiz",
    title: "Tech Quiz – TechQuest",
    icon: <Brain className="w-12 h-12" />,
    color: "#00FF7F",
    ...getEventDetails("Tech Quiz – TechQuest"),
    date: "November 3, 2025",
    time: "01:00 PM – 02:30 PM",
    category: "Quiz",
    registrationLink: "https://forms.gle/62KSrgAU9Fm9V7mt7",
  },
  {
    id: "tech-talk",
    title: "Tech Talk & Seminar",
    icon: <Presentation className="w-12 h-12" />,
    color: "#00D4FF",
    ...getEventDetails("Tech Talk & Seminar"),
    date: "November 3, 2025",
    time: "03:00 PM – 04:30 PM",
    category: "Seminar",
    speaker: "Guest Speaker",
    registrationLink:
      "https://www.umutechfest.co.in/#events",
  },
  {
    id: "hackathon",
    title: "Hackathon – BitShift",
    icon: <Code className="w-12 h-12" />,
    color: "#FF4500",
    ...getEventDetails("Hackathon – BitShift"),
    date: "November 3–4, 2025",
    time: "04:00 PM (Nov 3) – 04:00 PM (Nov 4)",
    category: "Competition",
    registrationLink: "https://forms.gle/LWod7N7kzFVZAeyd6",
  },
  {
    id: "web-dev-sprint",
    title: "Web Development Sprint – WebVerse",
    icon: <Code className="w-12 h-12" />,
    color: "#00D4FF",
    ...getEventDetails("Web Development Sprint – WebVerse"),
    date: "November 3, 2025",
    time: "12:30 PM – 04:00 PM",
    category: "Competition",
    registrationLink:
      "https://forms.gle/Bkvc9JB8fDzwiJCJ7",
  },
  {
    id: "robotics",
    title: "Robotics – Rise of Machines",
    icon: <FlaskConical className="w-12 h-12" />,
    color: "#7B2CBF",
    ...getEventDetails("Robotics"),
    date: "November 3, 2025",
    time: "10:30 AM – 01:00 PM",
    category: "Competition",
    registrationLink: "https://forms.gle/tTFrYFJyckqdrAiQ9",
  },
  {
    id: "hack-puzzle",
    title: "Hack Puzzle – CodeCipher",
    icon: <Puzzle className="w-12 h-12" />,
    color: "#FF69B4",
    ...getEventDetails("Hack Puzzle – CodeCipher"),
    date: "November 4, 2025",
    time: "12:00 PM – 01:30 PM",
    category: "Puzzle",
    registrationLink: "https://forms.gle/i8bbBaSDkXv6ZoV67",
  },
  {
    id: "general-quiz",
    title: "General Quiz – MindForge",
    icon: <Brain className="w-12 h-12" />,
    color: "#00FF7F",
    ...getEventDetails("General Quiz – MindForge"),
    date: "November 4, 2025",
    time: "02:00 PM – 03:30 PM",
    category: "Quiz",
    registrationLink: "https://forms.gle/zYWT7J8LW27yVLkS6",
  },
  {
    id: "ai-art",
    title: "AI Art Competition – VisionSynth",
    icon: <Paintbrush className="w-12 h-12" />,
    color: "#FF4500",
    ...getEventDetails("AI Art Competition – VisionSynth"),
    date: "November 4, 2025",
    time: "03:30 PM – 05:00 PM",
    category: "Creative",
    registrationLink: "https://forms.gle/XLiBnC9w3xXuJLVo7",
  },
  {
    id: "ai-music",
    title: "AI Music Composition – EchoMind",
    icon: <Music className="w-12 h-12" />,
    color: "#FFD700",
    ...getEventDetails("AI Music Composition – EchoMind"),
    date: "November 4, 2025",
    time: "03:30 PM – 05:00 PM",
    category: "Creative",
    registrationLink: "https://forms.gle/B8CMkySxLvTbQUui7",
  },
  {
    id: "short-film",
    title: "Short Film Challenge – Frame the Future",
    icon: <Tv className="w-12 h-12" />,
    color: "#00D4FF",
    ...getEventDetails("Short Film Challenge – Frame the Future"),
    date: "November 4, 2025",
    time: "11:00 AM – 01:00 PM",
    category: "Creative",
    registrationLink: "https://forms.gle/oaD2DHZmoEofTgAW9",
  },
  {
    id: "project-exhibition",
    title: "Project Exhibition – ProtoVerse",
    icon: <Presentation className="w-12 h-12" />,
    color: "#FFD700",
    ...getEventDetails("Project Exhibition – ProtoVerse"),
    date: "November 5, 2025",
    time: "10:00 AM – 12:00 PM",
    category: "Exhibition",
    registrationLink: "https://forms.gle/miKbJ7H8scnhaHiF8",
  },
  {
    id: "autocad-design",
    title: "AutoCAD Design – FutureFrame",
    icon: <PenTool className="w-12 h-12" />,
    color: "#00D4FF",
    ...getEventDetails("AutoCAD Design – FutureFrame"),
    date: "November 5, 2025",
    time: "01:00 PM – 02:30 PM",
    category: "Design",
    registrationLink: "https://forms.gle/KvU8HjocZHGVSZD2A",
  },
  {
    id: "drone-race",
    title: "Drone Race – SkyNova",
    icon: <Plane className="w-12 h-12" />,
    color: "#7B2CBF",
    ...getEventDetails("Drone Race – SkyNova"),
    date: "November 5, 2025",
    time: "02:30 PM – 04:00 PM",
    category: "Competition",
    registrationLink: "https://forms.gle/Ea4eXJvvf3UHP6oA8",
  },
  {
    id: "meme-battle",
    title: "Meme Battle – MetaMeme",
    icon: <Tv className="w-12 h-12" />,
    color: "#00D4FF",
    ...getEventDetails("Meme Battle – MetaMeme"),
    date: "November 5, 2025",
    time: "04:00 PM – 05:30 PM",
    category: "Fun",
    registrationLink: "https://forms.gle/S7wVCbLapK6yQf1J9",
  },
  {
    id: "ai-bot-challenge",
    title: "AI Bot Challenge – NeuraWars",
    icon: <Brain className="w-12 h-12" />,
    color: "#00FF7F",
    ...getEventDetails("AI Bot Challenge – NeuraWars"),
    date: "November 5, 2025",
    time: "11:30 AM – 01:00 PM",
    category: "Competition",
    registrationLink: "https://forms.gle/mekVKjAUmAqpnZa18",
  },
  {
    id: "push-ups",
    title: "Push-Ups Challenge – Power Surge",
    icon: <Footprints className="w-12 h-12" />,
    color: "#7B2CBF",
    ...getEventDetails("Push-Ups Challenge – Power Surge"),
    date: "November 6, 2025",
    time: "11:00 AM – 12:00 PM",
    category: "Fitness",
    registrationLink: "https://forms.gle/BMPwHG7zZpHkhDg19",
  },
  {
    id: "talent-show",
    title: "Talent Show – Eclipsera",
    icon: <Mic className="w-12 h-12" />,
    color: "#FFD700",
    ...getEventDetails("Talent Show – Eclipsera"),
    date: "November 6, 2025",
    time: "02:00 PM – 04:00 PM",
    category: "Cultural",
    registrationLink: "https://forms.gle/zPhCdJdx3ecQMPTQ9",
  },
  {
    id: "cosplay",
    title: "Cosplay – ChronoVerse",
    icon: <Tv className="w-12 h-12" />,
    color: "#FF69B4",
    ...getEventDetails("Cosplay"),
    date: "November 6, 2025",
    time: "12:30 PM – 02:00 PM",
    category: "Cultural",
    registrationLink: "https://forms.gle/5d57gihm9hY2kgmq6",
  },
  {
    id: "bgmi-finals",
    title: "BGMI Tournament – BattleVerse - BGMI",
    icon: <Gamepad2 className="w-12 h-12" />,
    color: "#FF4500",
    ...getEventDetails("BGMI Tournament – BattleVerse - BGMI"),
    date: "November 7, 2025",
    time: "10:00 AM – 02:00 PM",
    category: "E-Sports",
    registrationLink: "https://forms.gle/onhuHU6gQNdDBgnc9",
  },
  {
    id: "photography",
    title: "Photography – Pixel Rebirth",
    icon: <Camera className="w-12 h-12" />,
    color: "#00FF7F",
    ...getEventDetails("Photography – Pixel Rebirth"),
    date: "November 7, 2025",
    time: "10:00 AM – 04:00 PM",
    category: "Creative",
    registrationLink: "https://forms.gle/RQEdCoe8tTBaKrZk6",
  },
  {
    id: "workshops",
    title: "Workshops – InnovateX",
    icon: <FlaskConical className="w-12 h-12" />,
    color: "#7B2CBF",
    ...getEventDetails("Workshops – InnovateX"),
    date: "November 3–7, 2025",
    time: "10:00 AM – 04:00 PM (varies by topic)",
    category: "Workshop",
    registrationLink: "https://forms.gle/DYftBze1xtKX6ZYbA",
  },
];

interface EventCardProps {
  event: Event;
  onLearnMore: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onLearnMore }) => {
  const [isHovered, setIsHovered] = useState(false);

  const gradientStart = event.color;
  const gradientEnd =
    event.color === "#00D4FF" || event.color === "#00FF7F"
      ? "#7B2CBF"
      : event.color === "#7B2CBF" || event.color === "#FF69B4"
      ? "#00D4FF"
      : "#7B2CBF";

  return (
    <div
      className="relative group perspective-[1000px] rounded-2xl p-0.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`
          : "transparent",
        transition: "all 0.4s ease-out",
        boxShadow: isHovered ? `0 10px 30px ${event.color}60` : "none",
      }}
    >
      <div
        className="bg-[#0A1A2A] p-6 rounded-2xl h-full flex flex-col transition-all duration-300 border-2 border-transparent"
        style={{
          borderColor: isHovered ? "transparent" : "#1A334B",
        }}
      >
        <p
          className="flex items-center text-sm font-semibold mb-3"
          style={{ color: event.color }}
        >
          <Calendar className="w-4 h-4 mr-2" />
          {event.date} | {event.time}
        </p>

        <h3 className="text-xl font-extrabold text-white mb-3 leading-snug">
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          {event.description}
        </p>

        <div className="flex space-x-4 mt-6">
          {!["opening-ceremony", "tech-talk"].includes(event.id) && (
  <button
    onClick={() => {
      if (event.registrationLink && event.registrationLink !== "TBA") {
        window.open(event.registrationLink, "_blank");
      } else {
        window.open("https://www.unstop.com", "_blank");
      }
    }}
    className="flex-grow px-4 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-lg"
    style={{
      background: `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`,
      boxShadow: `0 4px 15px ${gradientStart}50`,
      transform: isHovered ? "scale(1.03)" : "scale(1)",
    }}
  >
    REGISTER
  </button>
)}

          <button
            onClick={() => onLearnMore(event)}
            className="flex-grow px-4 py-3 rounded-xl font-semibold text-sm text-white border-2 transition-all duration-300 hover:bg-[#1A334B]"
            style={{
              borderColor: event.color,
              color: event.color,
            }}
          >
            LEARN MORE
          </button>
        </div>
      </div>
    </div>
  );
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

const DetailItem: React.FC<DetailItemProps> = ({
  icon,
  label,
  value,
  color,
}) => (
  <div className="bg-[#1A334B] p-4 rounded-xl shadow-inner border border-[#2A4058]">
    <div
      className="flex items-center text-sm font-medium mb-1"
      style={{ color }}
    >
      <span className="mr-2 w-5 h-5">{icon}</span>
      {label}
    </div>
    <p className="text-white text-lg font-bold">{value}</p>
  </div>
);

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0A1A2A] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border-2 border-[#1A334B]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#00D4FF] transition-colors p-2 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12">
          <h3 className="text-3xl font-extrabold text-white mb-6">
            {event.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <DetailItem
              icon={<Calendar />}
              label="Date & Time"
              value={`${event.date} | ${event.time}`}
              color={event.color}
            />
            <DetailItem
              icon={<MapPin />}
              label="Venue"
              value={event.venue}
              color={event.color}
            />
            <DetailItem
              icon={<User />}
              label="Speaker"
              value={event.speaker}
              color={event.color}
            />
            <DetailItem
              icon={<Users />}
              label="Capacity"
              value={`${event.capacity} attendees`}
              color={event.color}
            />
            <DetailItem
              icon={<Tag />}
              label="Category"
              value={event.category}
              color={event.color}
            />
            <DetailItem
              icon={<DollarSign />}
              label="Registration Fee"
              value={event.fee}
              color={event.color}
            />
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-100 mb-4">
              About This Event
            </h4>
            <p className="text-gray-400 leading-relaxed">
              {event.fullDescription}
            </p>
          </div>

          <div className="bg-[#1A334B] p-6 rounded-xl border border-[#2A4058] mb-8">
            <h4 className="text-xl font-bold text-gray-100 mb-4">
              What's Included
            </h4>
            <ul className="space-y-2">
              {event.includes.map((item, i) => (
                <li key={i} className="flex items-start text-gray-300">
                  <span className="mr-3 mt-1" style={{ color: event.color }}>
                    ●
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-semibold text-white border border-[#2A4058] hover:bg-[#1A334B] transition-colors"
            >
              CLOSE
            </button>
            {!["opening-ceremony", "tech-talk"].includes(event.id) && (
  <button
    onClick={() => {
      if (event.registrationLink && event.registrationLink !== "TBA") {
        window.open(event.registrationLink, "_blank");
      } else {
        window.open("https://www.unstop.com", "_blank");
      }
    }}
    className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 shadow-lg"
    style={{
      background: `linear-gradient(90deg, ${event.color}, ${
        event.color === "#00D4FF" || event.color === "#00FF7F"
          ? "#7B2CBF"
          : "#00D4FF"
      })`,
      boxShadow: `0 4px 15px ${event.color}50`,
    }}
  >
    REGISTER
  </button>
)}

          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="min-h-screen bg-[#0A2540] antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background-color: #0A2540;
        }
        .perspective-[1000px] {
          perspective: 1000px;
        }
      `}</style>

      <section id="events" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF]">
              Featured Events
            </span>
          </h2>
          <p className="text-center text-gray-300 mb-16 text-lg max-w-3xl mx-auto">
            Explore competitions, workshops, and exhibitions. Click 'Register'
            to sign up on Unstop or 'Learn More' for details.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onLearnMore={setSelectedEvent}
              />
            ))}
          </div>

          
        </div>
      </section>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default App;
