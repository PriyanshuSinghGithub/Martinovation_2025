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
    Hackathon: {
      description:
        "A 36-hour coding competition where teams develop innovative software solutions or apps based on a given theme.",
      long: "A 36-hour coding competition where teams develop innovative software solutions or apps based on a given theme. Code, collaborate, and create the future with your team. Participant Requirements: Laptop, IDEs installed, basic knowledge of programming. The organizer provides internet, a power supply, workspace, mentors, refreshments, and judging criteria.",
      fee: "₹399",
      prize: "₹60,000",
      slot: 200,
      team: "2-4",
      includes: ["Prize pool ₹60,000", "Internet & Power Supply", "Mentorship"],
    },
    "Coding Marathon": {
      description:
        "Participants solve coding problems under time constraints; individual or team-based.",
      long: "Participants solve coding problems under time constraints; individual or team-based. Participant Requirements: Laptop with coding environment, basic algorithm knowledge. Organizer Provides: Problem sets, online IDE access, timers, judges.",
      fee: "Free",
      prize: "N/A",
      slot: "Open",
      team: "Duo",
      includes: ["Online IDE access", "Problem sets", "Leaderboard access"],
    },
    "Tech Quiz": {
      description:
        "Teams compete in a quiz focused on technology, gadgets, AI, coding, and general tech knowledge.",
      long: "Teams compete in a quiz focused on technology, gadgets, AI, coding, and general tech knowledge. Participant Requirements: None. The organizer provides quiz questions, a buzzer system, a projector, a scoreboard, and a quizmaster.",
      fee: "₹99",
      prize: "₹10,000",
      slot: "Open",
      team: "2",
      includes: ["Prize pool ₹10,000", "Buzzer system", "Scoreboard"],
    },
    "General Quiz": {
      description:
        "A quiz covering general knowledge, current affairs, science, and entertainment.",
      long: "A quiz covering general knowledge, current affairs, science, and entertainment. Participant Requirements: None. Organizer Provides: Quizmaster, projector, buzzers, questions, prizes.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Teams",
      includes: ["Certificate & Medal", "Quizmaster and Buzzers"],
    },
    "Electronics Circuit Design": {
      description:
        "Participants design and test functional electronic circuits to solve given challenges.",
      long: "Participants design and test functional electronic circuits to solve given challenges. Participant Requirements: Knowledge of electronics and basic components (optional). The organizer provides components (resistors, LEDs, ICs, wires, and breadboards), a power supply, and workspace.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Individual",
      includes: ["Certificate & Medal", "Components & Tools Provided"],
    },
    "Drone Race": {
      description: "Teams/individuals race drones through an obstacle course.",
      long: "Teams/individuals race drones through an obstacle course. Participant Requirements: Own drone or pre-approved drones. The organizer provides obstacle course setup, safety barriers, judges, and power charging stations.",
      fee: "Free",
      prize: "₹5,000",
      slot: "Open",
      team: "Individual/Teams",
      includes: [
        "Prize pool ₹5,000",
        "Obstacle course access",
        "Power charging stations",
      ],
    },
    "Hack Puzzle": {
      description:
        "Teams solve logical, programming, and cybersecurity puzzles in limited time.",
      long: "Teams solve logical, programming, and cybersecurity puzzles in limited time. Participant Requirements: Laptop, basic programming & logic knowledge. Organizer Provides: Puzzles, access to software/tools, mentors, and a scoreboard.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Teams",
      includes: ["Certificate & Medal", "Puzzles & Software Access"],
    },
    "Meme Battle": {
      description:
        "Participants create funny, tech-related, or campus-themed memes under time constraints.",
      long: "Participants create funny, tech-related, or campus-themed memes under time constraints. Participant Requirements: Laptop or phone with meme creation tools. Organizer Provides: Theme, projector for live display, judges, and internet.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Individual",
      includes: ["Certificate & Medal", "Theme Provided"],
    },
    "Photography Contest": {
      description: "Participants click photos based on pre-decided themes.",
      long: "Participants click photos based on pre-decided themes. Participant Requirements: Camera or smartphone. Organizer Provides: Theme, submission portal, display area, judges.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Individual",
      includes: ["Certificate & Medal", "Submission Portal Access"],
    },
    "Talent Show": {
      description: "Open stage for music, dance, magic, or other talents.",
      long: "Open stage for music, dance, magic, or other talents. Participant Requirements: Props, instruments, and performance preparations. The organizer provides a stage, sound system, judges, lights, and mics.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Individual/Groups",
      includes: ["Certificate & Medal", "Stage & Sound System"],
    },
    "Tech Talk & Seminar": {
      description:
        "Expert sessions on technology, innovation, startups, and AI.",
      long: "Expert sessions on technology, innovation, startups, and AI. Participant Requirements: None (audience). The organizer provides a speaker, projector, mic, seating, and refreshments.",
      fee: "Free",
      prize: "N/A",
      slot: "Open",
      team: "Audience",
      includes: ["Guest Speaker Session", "Refreshments"],
    },
    "Project Exhibition": {
      description:
        "Participants showcase their tech, robotics, or software projects.",
      long: "Participants showcase their tech, robotics, or software projects. Participant Requirements: Completed project setup, poster, and presentation. The organizer provides display tables, electricity, judges, and labels/signage.",
      fee: "Free",
      prize: "₹10,000",
      slot: "Selected",
      team: "2-4",
      includes: ["Prize pool ₹10,000", "Display tables", "Electricity"],
    },
    "BGMI Finals": {
      description: "Battle Royale gaming tournament in BGMI (PUBG Mobile).",
      long: "Battle Royale gaming tournament in BGMI (PUBG Mobile). Participant Requirements: Smartphones with BGMI installed. The organizer provides game lobby setup, rules, a live screen/projector for spectators, and internet.",
      fee: "Free",
      prize: "N/A",
      slot: "Selected",
      team: "Teams",
      includes: ["Live Streaming Setup", "Lobby Access", "Internet"],
    },
    "Free Fire Finals": {
      description: "Free Fire Max competitive gaming tournament.",
      long: "Free Fire Max competitive gaming tournament. Participant Requirements: Smartphone with FF Max installed. The organizer provides lobby creation, a host, a projector/live streaming, rules & scoring, and internet.",
      fee: "Free",
      prize: "N/A",
      slot: "Selected",
      team: "Teams",
      includes: ["Live Streaming Setup", "Lobby Access", "Internet"],
    },
    "Open Mic": {
      description:
        "Participants perform music, poetry, comedy, or spoken word live.",
      long: "Participants perform music, poetry, comedy, or spoken word live. Participant Requirements: Prepared performance, mic/instrument if needed. The organizer provides a stage, sound system, lights, seating, and judges (optional).",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Individual",
      includes: ["Certificate & Medal", "Stage & Sound System"],
    },
    "Dance Off": {
      description: "Competitive dance battle in groups or solo.",
      long: "Competitive dance battle in groups or solo. Participant Requirements: Performance attire, music files. The organizer provides a stage, sound system, judges, and lights.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Individual/Groups",
      includes: ["Certificate & Medal", "Stage & Sound System"],
    },
    "Web Dev Sprint": {
      description:
        "Build a functional website in limited time based on a theme.",
      long: "Build a functional website in limited time based on a theme. Participant Requirements: Laptop, code editor, internet. Organizer Provides: Theme, internet, power, mentors, judges.",
      fee: "₹199",
      prize: "₹10,000",
      slot: "Selected",
      team: "2-4",
      includes: ["Prize pool ₹10,000", "Theme provided", "Mentorship"],
    },
    "Hardware Prototyping Challenge": {
      description: "Build functional hardware prototypes for given problems.",
      long: "Build functional hardware prototypes for given problems. Participant Requirements: Basic components, tools, and kits. Organizer Provides: Extra components, workspace, power supply, mentors.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Teams",
      includes: ["Certificate & Medal", "Extra components provided"],
    },
    "AutoCAD Design": {
      description: "Design 3D or 2D models in AutoCAD based on challenges.",
      long: "Design 3D or 2D models in AutoCAD based on challenges. Participant Requirements: Laptop with AutoCAD installed. The organizer provides the theme, judging criteria, workspace, and projector.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Individual",
      includes: ["Certificate & Medal", "Theme provided"],
    },
    "Virtual Escape Room": {
      description:
        'Teams solve digital puzzles to "escape" a virtual scenario.',
      long: 'Teams solve digital puzzles to "escape" a virtual scenario. Participant Requirements: Laptop, internet, problem-solving skills. Organizer Provides: Virtual escape platform, instructions, mentors, timer, judges.',
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Teams",
      includes: ["Certificate & Medal", "Virtual platform access"],
    },
    "Digital Fashion Design": {
      description:
        "Create fashion designs using digital tools (CLO3D, Marvelous Designer).",
      long: "Create fashion designs using digital tools (CLO3D, Marvelous Designer). Participant Requirements: Laptop, design software. Organizer Provides: Theme, mentors, projector for display, judges.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Individual",
      includes: ["Certificate & Medal", "Theme provided"],
    },
    "AI Bot Challenge": {
      description: "Build an AI-powered chatbot or assistant to perform tasks.",
      long: "Build an AI-powered chatbot or assistant to perform tasks. Participant Requirements: Laptop, programming tools, AI frameworks. Organizer Provides: Guidelines, mentors, internet, judges.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Teams",
      includes: ["Certificate & Medal", "Guidelines provided"],
    },
    "Push-Ups Challenge": {
      description: "Fitness-based challenge testing strength & endurance.",
      long: "Fitness-based challenge testing strength & endurance. Participant Requirements: Sports attire, fitness readiness. Organizer Provides: Space, mats, stopwatch, judges, and water.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Individual",
      includes: ["Certificate & Medal", "Space & equipment provided"],
    },
    "AI Art + AI Music Composition": {
      description: "Create digital artwork or compose music using AI tools.",
      long: "Create digital artwork or compose music using AI tools. AI Art Requirements: Laptop or phone, AI art tools. AI Music Requirements: Laptop, AI music software. Organizer Provides: Theme, internet, projector, judges.",
      fee: "Free",
      prize: "Certificate + Medal",
      slot: "Open",
      team: "Individual",
      includes: ["Certificate & Medal", "Internet and Projector Access"],
    },
  };

  const schedule: Record<string, any> = {
    "Opening Ceremony": {
      time: "9:30 – 10:00",
      venue: "Auditorium (Above central mess)",
      day: "Day 1",
    },
    "Coding Marathon": {
      time: "10:00–12:00",
      venue: "Auditorium (Above central mess)",
      day: "Day 1",
    },
    "Tech Quiz": {
      time: "12:30–2:00",
      venue: "Auditorium (Above central mess)",
      day: "Day 1",
    },
    "Tech Talk & Seminar": {
      time: "2:00 – 3:30",
      venue: "Auditorium (Above central mess)",
      day: "Day 1",
    },
    "Hackathon Kickoff": {
      time: "10:00 - 36 hr",
      venue: "Auditorium (Above central mess)",
      day: "Day 2",
    },
    "Web Dev Sprint": {
      time: "10:00–12:00",
      venue: "Baitarni 2nd floor seminar hall",
      day: "Day 2",
    },
    "Electronics Circuit Design": {
      time: "10:00–12:00",
      venue: "Electrical lab—baitarni 2nd floor",
      day: "Day 2",
    },
    "Hardware Prototyping Challenge": {
      time: "12:30-2:00",
      venue: "Electrical lab—baitarni 2nd floor",
      day: "Day 2",
    },
    "Hack Puzzle": {
      time: "12:30–2:00",
      venue: "Baitarni 2nd floor - 302",
      day: "Day 2",
    },
    "General Quiz": {
      time: "1:00 - 3:00",
      venue: "Baitarni 2nd floor seminar hall",
      day: "Day 2",
    },
    "AI Art & Music Comp.": {
      time: "2:00 – 4:00",
      venue: "Volleyball court ground (exhibition zone)",
      day: "Day 2",
    },
    "Project Exhibition": {
      time: "10:00–12:00",
      venue: "Volleyball court ground (exhibition zone)",
      day: "Day 3",
    },
    "AutoCAD Design": {
      time: "10:00–12:00",
      venue: "Baitarni - mechanical lab",
      day: "Day 3",
    },
    "Drone Race": {
      time: "10:30 – 12:00",
      venue: "Volleyball court ground (exhibition zone)",
      day: "Day 3",
    },
    "Virtual Escape Room": {
      time: "12:30 - 1:30",
      venue: "Baitarni 2nd floor seminar hall",
      day: "Day 3",
    },
    "Digital Fashion Design": {
      time: "12:30 – 2:00",
      venue: "Volleyball court - exhibition zone",
      day: "Day 3",
    },
    "Meme Battle": {
      time: "12:30 – 2:00",
      venue: "Online Submission",
      day: "Day 3",
    },
    "AI Bot Challenge": {
      time: "12:30–2:00",
      venue: "Volleyball court—Exhibition Zone",
      day: "Day 3",
    },
    "Push-Ups Challenge": {
      time: "2:00 – 3:30",
      venue: "Baitarni reception",
      day: "Day 3",
    },
    "Talent Show": {
      time: "2:00 – 3:30",
      venue: "Baitarni reception",
      day: "Day 3",
    },
    "BGMI Finals": {
      time: "10:00–2:00",
      venue: "Baitarni 2nd floor - seminar hall",
      day: "Day 4",
    },
    "Free Fire Finals": {
      time: "11:00 - 3:00",
      venue: "Auditorium (Above central mess)",
      day: "Day 4",
    },
    "Open Mic": {
      time: "12:30 – 2:00",
      venue: "Baitarni reception",
      day: "Day 4",
    },
    "Dance Off": { time: "2:00 – 3:30", venue: "Dassam front", day: "Day 4" },
    "Photography Contest": {
      time: "10:00 - 2:00",
      venue: "Volleyball court - exhibition zone",
      day: "Day 4",
    },
  };

  const scheduleEntry = schedule[title];
  const briefEntry = brief[title] || {};

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
    date: "March 15",
    speaker: "Chief Guest",
    category: "Keynote",
    capacity: 500,
    includes: ["Chief guest welcome & inauguration"],
    registrationLink: "https://unstop.com/o/4Os1FIN?lb=LOBfmTq&utm_medium=Share&utm_source=kumarvinay21&utm_campaign=Online_coding_challenge",
  },
  {
    id: "coding-marathon",
    title: "Coding Marathon",
    icon: <Code className="w-12 h-12" />,
    color: "#7B2CBF",
    ...getEventDetails("Coding Marathon"),
    date: "March 15",
    speaker: "Judges/Mentors",
    category: "Competition",
    registrationLink: "- https://forms.gle/pHa9WXfHAP997Tzi6",
  },
  {
    id: "tech-quiz",
    title: "Tech Quiz",
    icon: <Brain className="w-12 h-12" />,
    color: "#00FF7F",
    ...getEventDetails("Tech Quiz"),
    date: "March 15",
    category: "Quiz",
    registrationLink: "https://forms.gle/62KSrgAU9Fm9V7mt7",
  },
  {
    id: "tech-talk",
    title: "Tech Talk & Seminar",
    icon: <Presentation className="w-12 h-12" />,
    color: "#00D4FF",
    ...getEventDetails("Tech Talk & Seminar"),
    date: "March 15",
    category: "Seminar",
    speaker: "Guest Speaker",
    registrationLink: "https://unstop.com/o/4Os1FIN?lb=LOBfmTq&utm_medium=Share&utm_source=kumarvinay21&utm_campaign=Online_coding_challenge",
  },
  {
    id: "hackathon",
    title: "Hackathon Kickoff",
    icon: <Code className="w-12 h-12" />,
    color: "#FF4500",
    ...getEventDetails("Hackathon"),
    date: "March 16",
    category: "Competition",
    description:
      "36-hour coding competition where teams develop innovative software solutions or apps.",
    registrationLink: "https://unstop.com/o/4Os1FIN?lb=LOBfmTq&utm_medium=Share&utm_source=kumarvinay21&utm_campaign=Online_coding_challenge",
  },
  {
    id: "web-dev-sprint",
    title: "Web Dev Sprint",
    icon: <Code className="w-12 h-12" />,
    color: "#00D4FF",
    ...getEventDetails("Web Dev Sprint"),
    date: "March 16",
    category: "Competition",
    registrationLink: "https://unstop.com/o/kKEsuHF?lb=LOBfmTq&utm_medium=Share&utm_source=kumarvinay21&utm_campaign=Competitions",
  },
  {
    id: "electronics-design",
    title: "Electronics Circuit Design",
    icon: <FlaskConical className="w-12 h-12" />,
    color: "#7B2CBF",
    ...getEventDetails("Electronics Circuit Design"),
    date: "March 16",
    category: "Workshop",
    registrationLink: "https://unstop.com/o/4Os1FIN?lb=LOBfmTq&utm_medium=Share&utm_source=kumarvinay21&utm_campaign=Online_coding_challenge",
  },
  {
    id: "hardware-prototype",
    title: "Hardware Prototyping Challenge",
    icon: <FlaskConical className="w-12 h-12" />,
    color: "#FFD700",
    ...getEventDetails("Hardware Prototyping Challenge"),
    date: "March 16",
    category: "Competition",
    registrationLink: "https://unstop.com/o/4Os1FIN?lb=LOBfmTq&utm_medium=Share&utm_source=kumarvinay21&utm_campaign=Online_coding_challenge",
  },
  {
    id: "hack-puzzle",
    title: "Hack Puzzle",
    icon: <Puzzle className="w-12 h-12" />,
    color: "#FF69B4",
    ...getEventDetails("Hack Puzzle"),
    date: "March 16",
    category: "Puzzle",
    registrationLink: "https://forms.gle/i8bbBaSDkXv6ZoV67",
  },
  {
    id: "general-quiz",
    title: "General Quiz",
    icon: <Brain className="w-12 h-12" />,
    color: "#00FF7F",
    ...getEventDetails("General Quiz"),
    date: "March 16",
    category: "Quiz",
    registrationLink: "https://forms.gle/zYWT7J8LW27yVLkS6",
  },
  {
    id: "ai-art-music",
    title: "AI Art & Music Comp.",
    icon: <Music className="w-12 h-12" />,
    color: "#FF4500",
    ...getEventDetails("AI Art + AI Music Composition"),
    date: "March 16",
    category: "Creative",
    registrationLink: "https://forms.gle/XLiBnC9w3xXuJLVo7",
  },
  {
    id: "project-exhibition",
    title: "Project Exhibition",
    icon: <Presentation className="w-12 h-12" />,
    color: "#FFD700",
    ...getEventDetails("Project Exhibition"),
    date: "March 17",
    category: "Exhibition",
    registrationLink: "https://forms.gle/miKbJ7H8scnhaHiF8",
  },
  {
    id: "autocad-design",
    title: "AutoCAD Design",
    icon: <PenTool className="w-12 h-12" />,
    color: "#00D4FF",
    ...getEventDetails("AutoCAD Design"),
    date: "March 17",
    category: "Design",
    registrationLink: "https://forms.gle/KvU8HjocZHGVSZD2A",
  },
  {
    id: "drone-race",
    title: "Drone Race",
    icon: <Plane className="w-12 h-12" />,
    color: "#7B2CBF",
    ...getEventDetails("Drone Race"),
    date: "March 17",
    category: "Competition",
    registrationLink: "https://forms.gle/Ea4eXJvvf3UHP6oA8",
  },
  {
    id: "virtual-escape",
    title: "Virtual Escape Room",
    icon: <Puzzle className="w-12 h-12" />,
    color: "#FF69B4",
    ...getEventDetails("Virtual Escape Room"),
    date: "March 17",
    category: "Fun",
    registrationLink: "https://unstop.com/o/4Os1FIN?lb=LOBfmTq&utm_medium=Share&utm_source=kumarvinay21&utm_campaign=Online_coding_challenge",
  },
  {
    id: "digital-fashion",
    title: "Digital Fashion Design",
    icon: <Paintbrush className="w-12 h-12" />,
    color: "#FF4500",
    ...getEventDetails("Digital Fashion Design"),
    date: "March 17",
    category: "Design",
    registrationLink: "https://unstop.com/o/4Os1FIN?lb=LOBfmTq&utm_medium=Share&utm_source=kumarvinay21&utm_campaign=Online_coding_challenge",
  },
  {
    id: "meme-battle",
    title: "Meme Battle",
    icon: <Tv className="w-12 h-12" />,
    color: "#00D4FF",
    ...getEventDetails("Meme Battle"),
    date: "March 17",
    category: "Fun",
    registrationLink: "https://forms.gle/S7wVCbLapK6yQf1J9",
  },
  {
    id: "ai-bot-challenge",
    title: "AI Bot Challenge",
    icon: <Brain className="w-12 h-12" />,
    color: "#00FF7F",
    ...getEventDetails("AI Bot Challenge"),
    date: "March 17",
    category: "Competition",
    registrationLink: " https://forms.gle/mekVKjAUmAqpnZa18",
  },
  {
    id: "push-ups",
    title: "Push-Ups Challenge",
    icon: <Footprints className="w-12 h-12" />,
    color: "#7B2CBF",
    ...getEventDetails("Push-Ups Challenge"),
    date: "March 17",
    category: "Fitness",
    registrationLink: "https://forms.gle/BMPwHG7zZpHkhDg19",
  },
  {
    id: "talent-show",
    title: "Talent Show",
    icon: <Mic className="w-12 h-12" />,
    color: "#FFD700",
    ...getEventDetails("Talent Show"),
    date: "March 17",
    category: "Cultural",
    registrationLink: "https://forms.gle/zPhCdJdx3ecQMPTQ9",
  },
  {
    id: "bgmi-finals",
    title: "BGMI Finals",
    icon: <Gamepad2 className="w-12 h-12" />,
    color: "#FF4500",
    ...getEventDetails("BGMI Finals"),
    date: "March 18",
    category: "E-Sports",
    registrationLink: "https://forms.gle/onhuHU6gQNdDBgnc9",
  },
  {
    id: "free-fire-finals",
    title: "Free Fire Finals",
    icon: <Gamepad2 className="w-12 h-12" />,
    color: "#00D4FF",
    ...getEventDetails("Free Fire Finals"),
    date: "March 18",
    category: "E-Sports",
    registrationLink: "https://forms.gle/9PhHhD32KSRrL1fz9",
  },
  {
    id: "open-mic",
    title: "Open Mic",
    icon: <Mic className="w-12 h-12" />,
    color: "#7B2CBF",
    ...getEventDetails("Open Mic"),
    date: "March 18",
    category: "Cultural",
    registrationLink: "https://unstop.com/o/4Os1FIN?lb=LOBfmTq&utm_medium=Share&utm_source=kumarvinay21&utm_campaign=Online_coding_challenge",
  },
  {
    id: "dance-off",
    title: "Dance Off",
    icon: <Footprints className="w-12 h-12" />,
    color: "#FFD700",
    ...getEventDetails("Dance Off"),
    date: "March 18",
    category: "Cultural",
    registrationLink: "https://unstop.com/o/4Os1FIN?lb=LOBfmTq&utm_medium=Share&utm_source=kumarvinay21&utm_campaign=Online_coding_challenge",
  },
  {
    id: "photography",
    title: "Photography Contest",
    icon: <Camera className="w-12 h-12" />,
    color: "#00FF7F",
    ...getEventDetails("Photography Contest"),
    date: "March 18",
    category: "Creative",
    registrationLink: "https://forms.gle/RQEdCoe8tTBaKrZk6",
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
          <button
            onClick={() => window.open(event.registrationLink, "_blank")}
            className="flex-grow px-4 py-3 rounded-xl font-bold text-sm text-white transition-all duration-300 shadow-lg"
            style={{
              background: `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`,
              boxShadow: `0 4px 15px ${gradientStart}50`,
              transform: isHovered ? "scale(1.03)" : "scale(1)",
            }}
          >
            REGISTER
          </button>
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
            <button
              onClick={() => window.open(event.registrationLink, "_blank")}
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

          <div className="mt-20 text-center">
            <p className="text-xl text-gray-300 mb-8 font-medium">
              Ready to participate in these amazing events?
            </p>
            <a
              href="https://www.unstop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] rounded-xl font-bold text-xl text-white shadow-xl hover:shadow-[0_0_30px_rgba(123,44,191,0.6)] hover:scale-[1.03] transition-all duration-300 transform"
            >
              Register on Unstop
            </a>
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
