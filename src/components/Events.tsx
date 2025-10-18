import React, { useState } from 'react';
import { Calendar, MapPin, Users, DollarSign, ExternalLink, Globe, School } from 'lucide-react';
import { intercollegeEvents, umuOnlyEvents, Event } from '../data/eventsData';

interface EventCardProps {
  event: Event;
  isIntercollege: boolean;
}

// Registration links for each event
const getRegistrationLink = (eventName: string): string => {
  const registrationLinks: Record<string, string> = {
    "Hackathon": "https://forms.gle/LWod7N7kzFVZAeyd6",
    "Web Development Contest": "https://forms.gle/Bkvc9JB8fDzwiJCJ7",
    "Cosplay Competition": "https://forms.gle/5d57gihm9hY2kgmq6",
    "BGMI Tournament": "https://forms.gle/onhuHU6gQNdDBgnc9",
    "Free Fire Tournament": "https://forms.gle/9PhHhD32KSRrL1fz9",
    "Robotics Competition": "https://forms.gle/tTFrYFJyckqdrAiQ9",
    "Robo Race": "https://forms.gle/tTFrYFJyckqdrAiQ9", // Same as robotics for now
    "Drone Race": "https://forms.gle/Ea4eXJvvf3UHP6oA8",
    "Coding Marathon": "https://forms.gle/pHa9WXfHAP997Tzi6",
    "Tech Quiz": "https://forms.gle/62KSrgAU9Fm9V7mt7",
    "AI/ML Workshop": "https://forms.gle/DYftBze1xtKX6ZYbA",
    "Startup Pitch Competition": "https://forms.gle/miKbJ7H8scnhaHiF8",
    "Cybersecurity Workshop": "https://forms.gle/DYftBze1xtKX6ZYbA",
    "Tech Exhibition": "https://forms.gle/miKbJ7H8scnhaHiF8",
    "Closing Ceremony & Prize Distribution": "#contact"
  };
  
  return registrationLinks[eventName] || "https://www.unstop.com";
};

const EventCard: React.FC<EventCardProps> = ({ event, isIntercollege }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const registrationLink = getRegistrationLink(event.name);

  const handleRegister = () => {
    if (registrationLink.startsWith('#')) {
      // Internal link
      document.querySelector(registrationLink)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // External link
      window.open(registrationLink, '_blank');
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A2540] rounded-xl border border-[#00D4FF]/30 hover:border-[#7B2CBF] transition-all duration-300 overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
          <div className="flex-1 mb-2 sm:mb-0 sm:pr-2">
            <h3 className="text-base md:text-lg font-bold text-white mb-1 leading-tight">{event.name}</h3>
            <p className="text-gray-300 text-xs md:text-sm line-clamp-2">{event.description}</p>
          </div>
          <div className={`self-start px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            isIntercollege 
              ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/30' 
              : 'bg-[#7B2CBF]/20 text-[#7B2CBF] border border-[#7B2CBF]/30'
          }`}>
            {isIntercollege ? 'INTERCOLLEGE' : 'UMU ONLY'}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 mb-3">
          <div className="flex items-center text-gray-400 text-xs">
            <Calendar className="w-3 h-3 mr-1 text-[#00D4FF] flex-shrink-0" />
            <span>{event.day}</span>
          </div>
          <div className="flex items-center text-gray-400 text-xs">
            <MapPin className="w-3 h-3 mr-1 text-[#00D4FF] flex-shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center text-gray-400 text-xs">
            <Users className="w-3 h-3 mr-1 text-[#00D4FF] flex-shrink-0" />
            <span>{event.team}</span>
          </div>
          <div className="flex items-center text-gray-400 text-xs">
            <DollarSign className="w-3 h-3 mr-1 text-[#00D4FF] flex-shrink-0" />
            <span className="font-semibold text-[#FFD700]">{event.entryFee}</span>
          </div>
        </div>

        <div className="mb-3">
          <span className="text-[#00D4FF] font-semibold text-sm">{event.time}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleRegister}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            REGISTER
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-2 border-2 border-[#00D4FF] text-[#00D4FF] rounded-lg font-semibold hover:bg-[#00D4FF] hover:text-white transition-all duration-300 text-sm"
          >
            {isExpanded ? 'Less' : 'More'}
          </button>
        </div>

        {isExpanded && (
          <div className="pt-3 mt-3 border-t border-[#00D4FF]/20">
            <div className="space-y-2">
              <div>
                <h4 className="text-white font-semibold mb-1 text-sm">Requirements:</h4>
                <p className="text-gray-300 text-xs">{event.participantRequirements}</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1 text-sm">We Provide:</h4>
                <p className="text-gray-300 text-xs">{event.organizerProvides}</p>
              </div>
              {event.preparation && (
                <div>
                  <h4 className="text-white font-semibold mb-1 text-sm">Event Setup:</h4>
                  <p className="text-gray-300 text-xs">{event.preparation}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Events = () => {
  const [activeTab, setActiveTab] = useState<'intercollege' | 'umu-only'>('intercollege');

  return (
    <section id="events" className="section-padding bg-gradient-to-b from-[#0A2540] to-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-4 text-gradient">
          Events
        </h2>
        <p className="text-center text-gray-300 mb-8 md:mb-12 text-base md:text-lg px-4">
          Choose your competition level and showcase your skills
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 md:mb-12 px-4">
          <div className="bg-[#1A1A1A] p-1 md:p-2 rounded-xl border border-[#00D4FF]/30 inline-flex">
            <div className="flex flex-col sm:flex-row gap-0">
              <button
                onClick={() => setActiveTab('intercollege')}
                className={`flex items-center justify-center px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeTab === 'intercollege'
                    ? 'bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Intercollege Events</span>
                <span className="sm:hidden">Intercollege</span>
                <span className="ml-1 md:ml-2 px-1 md:px-2 py-0.5 md:py-1 bg-[#00D4FF]/20 text-[#00D4FF] text-xs rounded-full">
                  {intercollegeEvents.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('umu-only')}
                className={`flex items-center justify-center px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeTab === 'umu-only'
                    ? 'bg-gradient-to-r from-[#7B2CBF] to-[#00D4FF] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <School className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                <span className="hidden sm:inline">UMU Only Events</span>
                <span className="sm:hidden">UMU Only</span>
                <span className="ml-1 md:ml-2 px-1 md:px-2 py-0.5 md:py-1 bg-[#7B2CBF]/20 text-[#7B2CBF] text-xs rounded-full">
                  {umuOnlyEvents.length}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Event Description */}
        <div className="text-center mb-6 md:mb-8 px-4">
          {activeTab === 'intercollege' ? (
            <div className="bg-gradient-to-r from-[#00D4FF]/10 to-[#7B2CBF]/10 p-4 md:p-6 rounded-xl border border-[#00D4FF]/30">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 flex items-center justify-center">
                <Globe className="w-5 h-5 md:w-6 md:h-6 mr-2 text-[#00D4FF]" />
                Intercollege Events
              </h3>
              <p className="text-gray-300 text-sm md:text-lg">
                Open to all colleges and universities. Compete with the best minds across institutions and win exciting prizes!
              </p>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[#7B2CBF]/10 to-[#00D4FF]/10 p-4 md:p-6 rounded-xl border border-[#7B2CBF]/30">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 flex items-center justify-center">
                <School className="w-5 h-5 md:w-6 md:h-6 mr-2 text-[#7B2CBF]" />
                UMU Only Events
              </h3>
              <p className="text-gray-300 text-sm md:text-lg">
                Exclusive for Usha Martin University students. Build skills, learn new technologies, and connect with peers!
              </p>
            </div>
          )}
        </div>

        {/* Events Grid */}
        {activeTab === 'intercollege' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 px-4">
            {intercollegeEvents.map((event, index) => (
              <EventCard key={index} event={event} isIntercollege={true} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
            {umuOnlyEvents.map((event, index) => (
              <div key={index} className="w-full sm:w-[calc(50%-0.25rem)] lg:w-[calc(33.333%-0.5rem)] max-w-sm">
                <EventCard event={event} isIntercollege={false} />
              </div>
            ))}
          </div>
        )}


      </div>
    </section>
  );
};

export default Events;