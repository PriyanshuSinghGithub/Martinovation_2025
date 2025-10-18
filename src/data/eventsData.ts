export interface Event {
  day: string;
  code: string;
  name: string;
  time: string;
  venue: string;
  description?: string;
  revenue?: string;
  price?: string;
  winner?: string;
  entryFee?: string;
  slot?: string;
  team?: string;
  participantRequirements?: string;
  organizerProvides?: string;
  preparation?: string;
  category?: 'intercollege' | 'umu-only';
}

// Intercollege Events (Open to all colleges)
export const intercollegeEvents: Event[] = [
  {
    day: "Day 2",
    code: "D2-21",
    name: "Hackathon",
    time: "09:00–18:00",
    venue: "Computer Lab & Open Spaces",
    description: "24-hour intensive coding competition where teams build innovative solutions to real-world problems.",
    entryFee: "499 per team",
    team: "3-4 person",
    participantRequirements: "Laptops, programming skills, creativity, problem-solving abilities.",
    organizerProvides: "Problem statements, mentors, workspace, meals, judging panel.",
    preparation: "Define problem statements, arrange mentors, setup workspace, plan meals.",
    category: "intercollege"
  },
  {
    day: "Day 2",
    code: "D2-22",
    name: "Web Development Contest",
    time: "10:00–15:00",
    venue: "Computer Lab A",
    description: "Build responsive and innovative websites within the given timeframe.",
    entryFee: "199 per team",
    team: "2 person",
    participantRequirements: "HTML, CSS, JavaScript knowledge, design skills.",
    organizerProvides: "Theme/requirements, internet access, hosting platform, judges.",
    preparation: "Prepare website themes, setup development environment, arrange judges.",
    category: "intercollege"
  },
  {
    day: "Day 3",
    code: "D3-33",
    name: "Cosplay Competition",
    time: "12:30–14:00",
    venue: "Open Ground",
    description: "Theme-based cosplay showcasing character design and performance.",
    entryFee: "Free",
    team: "Individual",
    participantRequirements: "Costume, character knowledge, performance skills.",
    organizerProvides: "Stage, judges, timing, sound system.",
    preparation: "Setup stage, arrange judges, prepare evaluation criteria.",
    category: "intercollege"
  },
  {
    day: "Day 4",
    code: "D4-43",
    name: "BGMI Tournament",
    time: "10:00–14:00",
    venue: "Gaming Zone (Student Center)",
    description: "BGMI Battle Royale tournament with competitive gameplay.",
    entryFee: "99 per team",
    team: "4 person",
    participantRequirements: "Smartphone with BGMI installed, gaming skills.",
    organizerProvides: "Lobby setup, streaming, internet, prizes.",
    preparation: "Setup gaming stations, create tournament brackets, arrange streaming.",
    category: "intercollege"
  },
  {
    day: "Day 4",
    code: "D4-44",
    name: "Free Fire Tournament",
    time: "11:00–15:00",
    venue: "Gaming Zone (Student Center)",
    description: "Free Fire Max competitive gaming tournament.",
    entryFee: "99 per team",
    team: "4 person",
    participantRequirements: "Smartphone with Free Fire Max, gaming skills.",
    organizerProvides: "Lobby setup, streaming, internet, prizes.",
    preparation: "Setup gaming stations, create tournament brackets, arrange streaming.",
    category: "intercollege"
  },
  {
    day: "Day 1",
    code: "D1-12",
    name: "Robotics Competition",
    time: "10:30–13:00",
    venue: "Volleyball court ground (exhibition zone)",
    description: "Teams design and program robots to perform specific tasks or compete in challenges.",
    entryFee: "Free",
    team: "1 person",
    participantRequirements: "Pre-built robots, basic electronics, and programming knowledge.",
    organizerProvides: "Arena/track, power supply, safety barriers, tools, judges.",
    preparation: "Arena setup, rules, registration of robots, safety checks.",
    category: "intercollege"
  },
  {
    day: "Day 3",
    code: "D3-34",
    name: "Robo Race",
    time: "14:00–16:00",
    venue: "Volleyball court ground",
    description: "High-speed robot racing competition with obstacle courses.",
    entryFee: "Free",
    team: "2 person",
    participantRequirements: "Racing robot, remote control, basic electronics knowledge.",
    organizerProvides: "Race track, obstacles, timing system, judges.",
    preparation: "Setup race track, arrange obstacles, prepare timing system.",
    category: "intercollege"
  },
  {
    day: "Day 3",
    code: "D3-35",
    name: "Drone Race",
    time: "16:00–18:00",
    venue: "Open Ground",
    description: "Drone racing through obstacle courses with time-based scoring.",
    entryFee: "Free",
    team: "Individual",
    participantRequirements: "Own drone, piloting skills, safety knowledge.",
    organizerProvides: "Obstacle course, timing system, safety barriers, judges.",
    preparation: "Setup obstacle course, arrange safety measures, prepare timing system.",
    category: "intercollege"
  }
];

// UMU-Only Events (Restricted to Usha Martin University students)
export const umuOnlyEvents: Event[] = [
  {
    day: "Day 1",
    code: "D1-11",
    name: "Coding Marathon",
    time: "10:00–12:00",
    venue: "Auditorium (Above central mess)",
    description: "Participants solve coding problems under time constraints; individual or team-based.",
    entryFee: "Free",
    slot: "UMU Students Only",
    team: "2 person",
    participantRequirements: "Laptop with coding environment, basic algorithm knowledge.",
    organizerProvides: "Problem sets, online IDE access, timers, judges.",
    preparation: "Prepare problem sets, testing platforms, a leaderboard, and a prize plan.",
    category: "umu-only"
  },
  {
    day: "Day 1",
    code: "D1-13",
    name: "Tech Quiz",
    time: "14:00–16:00",
    venue: "Auditorium (Above central mess)",
    description: "Technology-focused quiz competition covering latest trends, innovations, and general tech knowledge.",
    entryFee: "Free",
    team: "2-3 person",
    participantRequirements: "Good knowledge of current technology trends, programming concepts.",
    organizerProvides: "Question sets, buzzers, presentation setup, prizes.",
    preparation: "Prepare diverse tech questions, setup buzzer system, arrange prizes.",
    category: "umu-only"
  },
  {
    day: "Day 3",
    code: "D3-31",
    name: "AI/ML Workshop",
    time: "11:00–16:00",
    venue: "Seminar Hall",
    description: "Hands-on workshop on Artificial Intelligence and Machine Learning concepts with practical implementations.",
    entryFee: "Free",
    team: "Individual",
    participantRequirements: "Basic programming knowledge, laptop with Python installed.",
    organizerProvides: "Workshop materials, datasets, expert instructors, certificates.",
    preparation: "Prepare workshop content, arrange expert speakers, setup lab environment.",
    category: "umu-only"
  },
  {
    day: "Day 4",
    code: "D4-41",
    name: "Startup Pitch Competition",
    time: "10:00–14:00",
    venue: "Auditorium (Above central mess)",
    description: "Entrepreneurs present their startup ideas to a panel of judges and investors.",
    entryFee: "Free",
    team: "3-5 person",
    participantRequirements: "Business plan, presentation skills, innovative idea.",
    organizerProvides: "Presentation setup, expert judges, networking opportunities, prizes.",
    preparation: "Arrange expert judges, setup presentation area, plan networking session.",
    category: "umu-only"
  },
  {
    day: "Day 4",
    code: "D4-42",
    name: "Cybersecurity Workshop",
    time: "15:00–17:00",
    venue: "Computer Lab B",
    description: "Learn about cybersecurity threats, ethical hacking, and security best practices.",
    entryFee: "Free",
    team: "Individual",
    participantRequirements: "Basic computer knowledge, interest in cybersecurity.",
    organizerProvides: "Workshop materials, virtual lab access, expert instructors, certificates.",
    preparation: "Setup virtual lab environment, arrange cybersecurity experts, prepare materials.",
    category: "umu-only"
  },
  {
    day: "Day 5",
    code: "D5-51",
    name: "Tech Exhibition",
    time: "10:00–16:00",
    venue: "Exhibition Hall",
    description: "Showcase of innovative projects, research work, and technological solutions by students and professionals.",
    entryFee: "Free for visitors, 199 for exhibitors",
    team: "Individual/Team",
    participantRequirements: "Completed project, presentation materials, demonstration setup.",
    organizerProvides: "Exhibition space, display materials, visitor management, judging panel.",
    preparation: "Allocate exhibition spaces, arrange display materials, organize judging.",
    category: "umu-only"
  },
  {
    day: "Day 5",
    code: "D5-52",
    name: "Closing Ceremony & Prize Distribution",
    time: "17:00–19:00",
    venue: "Main Auditorium",
    description: "Grand finale with cultural performances, prize distribution, and closing remarks.",
    entryFee: "Free",
    team: "All participants",
    participantRequirements: "Festival participation, formal attire recommended.",
    organizerProvides: "Cultural performances, prizes, certificates, refreshments.",
    preparation: "Arrange cultural performances, prepare prizes and certificates, setup stage.",
    category: "umu-only"
  }
];

// Combined events for backward compatibility
export const events: Event[] = [...intercollegeEvents, ...umuOnlyEvents];
