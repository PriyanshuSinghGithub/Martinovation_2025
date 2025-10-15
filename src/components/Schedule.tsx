import { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface ScheduleEvent {
  time: string;
  title: string;
  venue?: string;
}

interface DaySchedule {
  day: number;
  date: string;
  events: ScheduleEvent[];
}

const scheduleData: DaySchedule[] = [
  {
    day: 1,
    date: 'Nov 3',
    events: [
      { time: '9:30 – 10:00 AM', title: 'Opening Ceremony', venue: 'Auditorium (Above Central Mess)' },
      { time: '10:00 – 12:00 PM', title: 'Coding Marathon (D1-11)', venue: 'Auditorium (Above Central Mess)' },
      { time: '10:30 – 1:00 PM', title: 'Robotics (D1-12)', venue: 'Volleyball Court Ground (Exhibition Zone)' },
      { time: '11:00 – 12:00 PM', title: 'Workshop', venue: 'Dassam G8' },
      { time: '12:30 – 2:00 PM', title: 'Tech Quiz (D1-23)', venue: 'Auditorium (Above Central Mess)' },
      { time: '12:30 – 2:00 PM', title: 'UI/UX Design Challenge (D1-24)', venue: 'Baitarni 5th Floor Lab' },
      { time: '2:00 – 3:30 PM', title: 'Tech Talk & Seminar', venue: 'Auditorium (Above Central Mess)' },
      { time: '3:30 – 4:00 PM', title: 'Hackathon Brief (D1-25)', venue: 'Auditorium (Above Central Mess)' },
    ],
  },
  {
    day: 2,
    date: 'Nov 4',
    events: [
      { time: '10:00 AM – 36 Hr', title: 'Hackathon Kickoff', venue: 'Auditorium (Above Central Mess)' },
      { time: '10:00 – 12:00 PM', title: 'Web Dev Sprint (D2-11)', venue: 'Baitarni 2nd Floor Seminar Hall' },
      { time: '10:00 – 4:00 PM', title: 'Bootcamp (JioGames)', venue: 'Baitarni Block' },
      { time: '11:00 – 12:00 PM', title: 'Workshop', venue: 'Dassam G8' },
      { time: '12:30 – 2:00 PM', title: 'Short Film (D2-22)', venue: 'Open Campus' },
      { time: '12:30 – 2:00 PM', title: 'Hack Puzzle (D2-23)', venue: 'Baitarni 2nd Floor - Room 302' },
      { time: '1:00 – 3:00 PM', title: 'General Quiz (D2-24)', venue: 'Baitarni 2nd Floor Seminar Hall' },
      { time: '2:00 – 4:00 PM', title: 'AI Art + AI Music Composition (D2-25)', venue: 'Volleyball Court Ground (Exhibition Zone)' },
    ],
  },
  {
    day: 3,
    date: 'Nov 5',
    events: [
      { time: '10:00 – 12:00 PM', title: 'Project Exhibition (D3-11)', venue: 'Volleyball Court Ground (Exhibition Zone)' },
      { time: '10:00 – 12:00 PM', title: 'AutoCAD Design (D3-12)', venue: 'Baitarni - Mechanical Lab' },
      { time: '10:30 – 12:00 PM', title: 'Drone Race (D3-13)', venue: 'Volleyball Court Ground (Exhibition Zone)' },
      { time: '12:30 – 1:30 PM', title: 'Virtual Escape Room (D3-24)', venue: 'Baitarni 2nd Floor Seminar Hall' },
      { time: '12:30 – 1:30 PM', title: 'Workshop', venue: 'Dassam G8' },
      { time: '12:30 – 2:00 PM', title: 'Cosplay (D3-25)', venue: 'Open Ground' },
      { time: '12:30 – 2:00 PM', title: 'Meme Battle (D3-26)', venue: 'None' },
      { time: '12:30 – 2:00 PM', title: 'AI Bot Challenge (D3-27)', venue: 'Volleyball Court — Exhibition Zone' },
      { time: '2:00 – 3:30 PM', title: 'Talent Show (D3-28)', venue: 'Baitarni Reception' },
    ],
  },
  {
    day: 4,
    date: 'Nov 6',
    events: [
      { time: '10:00 AM – 2:00 PM', title: 'BGMI Finals (D4-11)', venue: 'Baitarni 2nd Floor Seminar Hall' },
      { time: '10:00 AM – 1:00 PM', title: 'Valorant Finals (D4-12)', venue: 'Baitarni 5th Floor Lab' },
      { time: '11:00 AM – 3:00 PM', title: 'Free Fire Finals (D4-13)', venue: 'Auditorium (Above Central Mess)' },
      { time: '12:30 – 2:00 PM', title: 'Open Mic (D4-24)', venue: 'Baitarni Reception' },
      { time: '2:00 – 3:30 PM', title: 'Dance Off (D4-25)', venue: 'Dassam Front' },
      { time: '10:00 AM – 2:00 PM', title: 'Photography (D4-26)', venue: 'Volleyball Court - Exhibition Zone' },
      { time: '11:00 – 12:00 PM', title: 'Workshop', venue: 'Dassam G8' },
    ],
  },
  {
    day: 5,
    date: 'Nov 7',
    events: [
      { time: '10:00 – 10:30 AM', title: 'Cultural Performances (D5-11)', venue: 'Auditorium (Above Central Mess)' },
      { time: '11:00 – 12:30 PM', title: 'Guest Session / Key Notes', venue: 'Auditorium (Above Central Mess)' },
      { time: '1:00 – 2:00 PM', title: 'Prize Distribution & Closing Ceremony', venue: 'Auditorium (Above Central Mess)' },
      { time: '2:00 – 3:00 PM', title: 'Mashup Battle (D5-22)', venue: 'Auditorium (Above Central Mess)' },
      { time: '3:00 – 7:30 PM', title: 'DJ Night & Farewell (D5-23)', venue: 'Volleyball Court' },
    ],
  },
];

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="schedule" className="section-padding bg-gradient-to-b from-[#0A2540] to-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-gradient">
          Event Schedule
        </h2>
        <p className="text-center text-gray-300 mb-12 text-lg">
          Five days of innovation, competition, and celebration
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {scheduleData.map((schedule, index) => (
            <button
              key={schedule.day}
              onClick={() => setActiveDay(index)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeDay === index
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] text-white shadow-lg scale-105'
                  : 'bg-[#0A2540] text-gray-400 border border-[#00D4FF]/30 hover:border-[#00D4FF]'
              }`}
            >
              Day {schedule.day}
              <span className="block text-sm mt-1">{schedule.date}</span>
            </button>
          ))}
        </div>

        <div className="bg-[#0A2540]/60 backdrop-blur-md border border-[#00D4FF]/30 rounded-2xl p-6 md:p-10 shadow-2xl">
          <div className="flex items-center mb-8">
            <Calendar className="w-8 h-8 text-[#00D4FF] mr-4" />
            <h3 className="text-3xl font-bold text-white">
              Day {scheduleData[activeDay].day} - {scheduleData[activeDay].date}
            </h3>
          </div>

          <div className="space-y-6">
            {scheduleData[activeDay].events.map((event, index) => (
              <div
                key={index}
                className="relative pl-8 pb-6 border-l-2 border-[#00D4FF]/50 last:border-l-0 last:pb-0 group hover:border-[#FFD700] transition-all duration-300"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[#00D4FF] border-4 border-[#0A2540] group-hover:bg-[#FFD700] group-hover:scale-125 transition-all duration-300" />
                <div className="bg-gradient-to-r from-[#1A1A1A]/80 to-transparent p-6 rounded-lg hover:from-[#1A1A1A] transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h4 className="text-xl font-bold text-white mb-2 md:mb-0">{event.title}</h4>
                    <div className="flex items-center text-[#00D4FF]">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-semibold">{event.time}</span>
                    </div>
                  </div>
                  {event.venue && (
                    <div className="flex items-center text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.venue}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;