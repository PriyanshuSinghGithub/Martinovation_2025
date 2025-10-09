import { useState } from 'react';
import { Code, Gamepad2, Brain, Plane, Cloud, Presentation } from 'lucide-react';

interface Event {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const events: Event[] = [
  {
    title: 'Hackathon',
    description: 'Build innovative solutions in 48 hours. Code, collaborate, and create the future with your team.',
    icon: <Code className="w-12 h-12" />,
    color: '#00D4FF',
  },
  {
    title: 'E-Sports Tournament',
    description: 'Compete in thrilling gaming championships. Show your skills in popular multiplayer games.',
    icon: <Gamepad2 className="w-12 h-12" />,
    color: '#7B2CBF',
  },
  {
    title: 'Tech Quiz',
    description: 'Test your technical knowledge across multiple domains. Challenge yourself and win amazing prizes.',
    icon: <Brain className="w-12 h-12" />,
    color: '#FFD700',
  },
  {
    title: 'Drone Racing',
    description: 'Navigate drones through challenging obstacle courses. Experience high-speed aerial competition.',
    icon: <Plane className="w-12 h-12" />,
    color: '#00D4FF',
  },
  {
    title: 'Cloud Workshop',
    description: 'Learn cutting-edge cloud computing technologies. Hands-on training with industry experts.',
    icon: <Cloud className="w-12 h-12" />,
    color: '#7B2CBF',
  },
  {
    title: 'Tech Exhibitions',
    description: 'Showcase innovative projects and prototypes. Experience the latest in technology and innovation.',
    icon: <Presentation className="w-12 h-12" />,
    color: '#FFD700',
  },
];

const Events = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="events" className="section-padding bg-[#0A2540]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-gradient">
          Featured Events
        </h2>
        <p className="text-center text-gray-300 mb-12 text-lg">
          Explore competitions, workshops, and exhibitions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="relative bg-gradient-to-br from-[#1A1A1A] to-[#0A2540] p-8 rounded-2xl border-2 transition-all duration-500 h-full"
                style={{
                  borderColor: hoveredIndex === index ? event.color : 'rgba(0, 212, 255, 0.3)',
                  transform: hoveredIndex === index ? 'translateY(-10px) rotateX(5deg)' : 'translateY(0) rotateX(0)',
                  boxShadow: hoveredIndex === index ? `0 20px 40px ${event.color}40` : 'none',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at center, ${event.color}, transparent)` }}
                />

                <div
                  className="mb-6 inline-block p-4 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: `${event.color}20`,
                    color: event.color,
                  }}
                >
                  {event.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00D4FF] transition-colors duration-300">
                  {event.title}
                </h3>

                <p className="text-gray-300 leading-relaxed mb-6">{event.description}</p>

                <button
                  className="mt-auto px-6 py-3 rounded-lg font-semibold transition-all duration-300 w-full"
                  style={{
                    backgroundColor: hoveredIndex === index ? event.color : 'transparent',
                    border: `2px solid ${event.color}`,
                    color: hoveredIndex === index ? '#0A2540' : event.color,
                  }}
                >
                  Learn More
                </button>
              </div>

              <div
                className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl -z-10"
                style={{
                  background: `linear-gradient(135deg, ${event.color}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-300 mb-6">
            Ready to participate in these amazing events?
          </p>
          <a
            href="#contact"
            className="inline-block px-10 py-4 bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Register for Events
          </a>
        </div>
      </div>
    </section>
  );
};

export default Events;
