import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  ExternalLink,
  Globe,
  School,
  X,
} from "lucide-react";
import { intercollegeEvents, umuOnlyEvents, Event } from "../data/eventsData";

// speaker posters
const speakers = [
  { image: "/images/speakers/Kritty.jpg" },
  { image: "/images/speakers/ankit.jpg" },
  { image: "/images/speakers/ishaa.jpg" },
  { image: "/images/speakers/sanat.jpg" },
];

interface EventCardProps {
  event: Event;
  isIntercollege: boolean;
}

const prizePools: Record<string, string> = {
  "BitShift - Hackathon": "₹40,000",
  "WebVerse - Web Development": "₹10,000",
  "BattleVerse - BGMI": "₹10,000 + in-game rewards",
  "BattleVerse - FF Max": "₹10,000 + in-game rewards",
};

const getRegistrationLink = (event: Event): string => {
  return event.registrationLink || "#contact";
};

const EventCard: React.FC<EventCardProps> = ({ event, isIntercollege }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const registrationLink = getRegistrationLink(event);

  const handleRegister = () => {
    if (registrationLink.startsWith("#")) {
      document
        .querySelector(registrationLink)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(registrationLink, "_blank");
    }
  };

  return (
    // relative + overflow-hidden so the expanded panel can overlay without changing grid height
    <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0A2540] rounded-xl border border-[#00D4FF]/30 hover:border-[#7B2CBF] transition-all duration-300 overflow-hidden h-[430px] flex flex-col">
      {/* main card content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
          <div className="flex-1 mb-2 sm:mb-0 sm:pr-2">
            <h3 className="text-base md:text-lg font-bold text-white mb-1 leading-tight">
              {event.name}
            </h3>
            <p className="text-gray-300 text-xs md:text-sm line-clamp-2">
              {event.description}
            </p>
          </div>
          <div
            className={`self-start px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
              isIntercollege
                ? "bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/30"
                : "bg-[#7B2CBF]/20 text-[#7B2CBF] border border-[#7B2CBF]/30"
            }`}
          >
            {isIntercollege ? "INTERCOLLEGE" : "UMU ONLY"}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 mb-3">
          <div className="flex items-center text-gray-400 text-xs">
            <Calendar className="w-3 h-3 mr-1 text-[#00D4FF]" />
            <span>{event.day}</span>
          </div>
          <div className="flex items-center text-gray-400 text-xs">
            <MapPin className="w-3 h-3 mr-1 text-[#00D4FF]" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center text-gray-400 text-xs">
            <Users className="w-3 h-3 mr-1 text-[#00D4FF]" />
            <span>{event.team}</span>
          </div>
          <div className="flex items-center text-gray-400 text-xs">
            <IndianRupee className="w-3 h-3 mr-1 text-[#00D4FF]" />
            <span className="font-semibold text-[#FFD700]">
              {event.entryFee}
            </span>
          </div>
          {prizePools[event.name] && (
            <div className="flex items-center text-gray-300 text-xs mt-1 col-span-1 sm:col-span-2">
              <span className="font-semibold text-[#FFD700]">
                Prize Pool: {prizePools[event.name]}
              </span>
            </div>
          )}
        </div>

        <div className="mb-3">
          <span className="text-[#00D4FF] font-semibold text-sm">
            {event.time}
          </span>
        </div>

        {/* buttons sit at the bottom of the card content area */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleRegister}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] text-white rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            REGISTER
          </button>
          <button
            onClick={() => setIsExpanded(true)}
            className="px-3 py-2 border-2 border-[#00D4FF] text-[#00D4FF] rounded-lg font-semibold hover:bg-[#00D4FF] hover:text-white transition-all duration-300 text-sm"
          >
            More
          </button>
        </div>
      </div>

      {/* Absolute overlay for expanded details - does NOT change layout height */}
      {isExpanded && (
        <div className="absolute inset-0 z-30 flex flex-col p-4 bg-black/80 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4">
            <h4 className="text-white font-semibold text-lg">{event.name}</h4>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-full border border-[#00D4FF]/40 text-[#00D4FF] hover:bg-[#00D4FF] hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 flex-1 overflow-y-auto pr-2 space-y-4">
            {event.prizes && (
              <div>
                <h5 className="text-white font-semibold mb-1">Prizes:</h5>
                <p className="text-gray-300 text-sm">{event.prizes}</p>
              </div>
            )}

            <div>
              <h5 className="text-white font-semibold mb-1">Requirements:</h5>
              <p className="text-gray-300 text-sm">
                {event.participantRequirements}
              </p>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-1">We Provide:</h5>
              <p className="text-gray-300 text-sm">{event.organizerProvides}</p>
            </div>

            {/* {event.preparation && (
              <div>
                <h5 className="text-white font-semibold mb-1">Event Setup:</h5>
                <p className="text-gray-300 text-sm">{event.preparation}</p>
              </div>
            )} */}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                handleRegister();
                setIsExpanded(false);
              }}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center text-sm"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              REGISTER
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="px-3 py-2 border-2 border-[#00D4FF] text-[#00D4FF] rounded-lg font-semibold hover:bg-[#00D4FF] hover:text-white transition-all duration-300 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Events = () => {
  const [activeTab, setActiveTab] = useState<"intercollege" | "umu-only">(
    "intercollege"
  );

  return (
    <section
      id="events"
      className="section-padding bg-gradient-to-b from-[#0A2540] to-[#1A1A1A]"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-center mb-4 text-gradient">
          Events
        </h2>
        <p className="text-center text-gray-300 mb-8 md:mb-12 text-base md:text-lg px-4">
          Choose your competition level and showcase your skills
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-8 md:mb-12 px-4">
          <div className="bg-[#1A1A1A] p-1 md:p-2 rounded-xl border border-[#00D4FF]/30 inline-flex">
            <div className="flex flex-col sm:flex-row gap-0">
              <button
                onClick={() => setActiveTab("intercollege")}
                className={`flex items-center justify-center px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeTab === "intercollege"
                    ? "bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Globe className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                Intercollege
                <span className="ml-2 px-2 py-0.5 bg-[#00D4FF]/20 text-[#00D4FF] text-xs rounded-full">
                  {intercollegeEvents.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("umu-only")}
                className={`flex items-center justify-center px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeTab === "umu-only"
                    ? "bg-gradient-to-r from-[#7B2CBF] to-[#00D4FF] text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <School className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                UMU Only
                <span className="ml-2 px-2 py-0.5 bg-[#7B2CBF]/20 text-[#7B2CBF] text-xs rounded-full">
                  {umuOnlyEvents.length}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {activeTab === "intercollege" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 items-stretch">
            {intercollegeEvents.map((event, index) => (
              <div key={index} className="flex">
                <EventCard event={event} isIntercollege={true} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 px-4">
            {umuOnlyEvents.map((event, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)] max-w-sm flex"
              >
                <EventCard event={event} isIntercollege={false} />
              </div>
            ))}
          </div>
        )}

        {/* Speakers */}
        <div id="speakers" className="mt-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-gradient">
            Our Speakers
          </h2>
          <p className="text-gray-300 mb-10 text-lg">
            Inspiring minds sharing their journey in tech and innovation
          </p>

          <div className="flex justify-center">
            <div className="grid justify-center gap-6 px-6 w-full max-w-6xl grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={speaker.image}
                    alt={`Speaker Poster ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
