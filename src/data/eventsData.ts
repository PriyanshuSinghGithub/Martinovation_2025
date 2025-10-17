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
}

export const events: Event[] = [
  {
    day: "Day 1",
    code: "D1-11",
    name: "Coding Marathon",
    time: "10:00–12:00",
    venue: "Auditorium (Above central mess)",
    description: "Participants solve coding problems under time constraints; individual or team-based.",
    entryFee: "399 per team",
    slot: "Open teams (Intra college)",
    team: "2 person",
    participantRequirements: "Laptop with coding environment, basic algorithm knowledge.",
    organizerProvides: "Problem sets, online IDE access, timers, judges.",
    preparation: "Prepare problem sets, testing platforms, a leaderboard, and a prize plan."
  },
  {
    day: "Day 1",
    code: "D1-12",
    name: "Robotics",
    time: "10:30–1:00",
    venue: "Volleyball court ground (exhibition zone)",
    description: "Teams design and program robots to perform specific tasks or compete in challenges.",
    entryFee: "Free",
    team: "1 person",
    participantRequirements: "Pre-built robots, basic electronics, and programming knowledge.",
    organizerProvides: "Arena/track, power supply, safety barriers, tools, judges.",
    preparation: "Arena setup, rules, registration of robots, safety checks."
  },
  // Add the rest of your events here in the same format
];
