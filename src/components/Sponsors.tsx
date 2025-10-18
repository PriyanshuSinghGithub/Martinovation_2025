import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Handshake } from "lucide-react";

const sponsorLogos = [
  { name: "Powered By Unstop", logo: "/images/sponsor/unstop-logo.jpg" },
  { name: "Technical Partner", logo: "/images/sponsor/gfg-logo.jpg" },
  { name: "Quizzing Partner", logo: "/images/sponsor/cc-logo.jpg" },
  { name: "Title Sponsor", logo: "/images/sponsor/triumph-logo.png" },
  { name: "Gaming Partner", logo: "/images/sponsor/jiogames-logo.png" },
  { name: "Weebs India", logo: "/images/sponsor/Weebs-logo.jpg" },
  { name: "TMR E-Sports", logo: "/images/sponsor/TMR-logo.jpg" },
];

const Sponsors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate list for seamless looping
  const extendedLogos = [...sponsorLogos, ...sponsorLogos];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, []);

  // Infinite scroll logic
  useEffect(() => {
    if (!isTransitioning) return;

    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      if (currentIndex >= sponsorLogos.length) {
        setCurrentIndex(0);
      } else if (currentIndex < 0) {
        setCurrentIndex(sponsorLogos.length - 1);
      }
    };

    const track = trackRef.current;
    track?.addEventListener("transitionend", handleTransitionEnd);
    return () => track?.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex, isTransitioning]);

  return (
    <section
      id="sponsors"
      className="section-padding bg-gradient-to-b from-[#1A1A1A] to-[#0A2540]"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-gradient">
          Our Sponsors
        </h2>
        <p className="text-center text-gray-300 mb-12 text-lg">
          Powering innovation together
        </p>

        <div className="relative overflow-hidden">
          <div
            ref={trackRef}
            className={`flex ${
              isTransitioning ? "transition-transform duration-500 ease-in-out" : ""
            }`}
            style={{
              transform: `translateX(-${
                (currentIndex * 100) / itemsPerView
              }%)`,
            }}
          >
            {extendedLogos.map((sponsor, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-4"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A2540] p-8 rounded-xl border-2 border-[#00D4FF]/30 hover:border-[#7B2CBF] transition-all duration-300 hover:shadow-lg hover:shadow-[#7B2CBF]/20 aspect-square flex items-center justify-center group">
                  <div className="text-center">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-54 h-54 mx-auto mb-4 object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="text-white font-semibold text-lg">
                      {sponsor.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#00D4FF] hover:bg-[#7B2CBF] text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#00D4FF] hover:bg-[#7B2CBF] text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A2540] p-10 rounded-2xl border-2 border-[#FFD700]/50">
            <Handshake className="w-16 h-16 text-[#FFD700] mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Become a Sponsor
            </h3>
            <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
              Partner with us to empower the next generation of innovators and
              gain visibility among talented students and tech enthusiasts.
            </p>
            <a
              href="tel:8674944887"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#00D4FF] text-[#0A2540] rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Contact Umanand Mishra: 8674944887
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;