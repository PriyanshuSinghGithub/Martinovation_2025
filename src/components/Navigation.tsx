import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoLoadError, setLogoLoadError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Schedule", href: "#schedule" },
    { name: "Events", href: "#events" },
    { name: "Gallery", href: "#gallery" },
    { name: "Team", href: "#team" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A2540]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center space-x-2 flex-shrink-0">
  {/* Logo */}
  {!logoLoadError ? (
    <img
      src="/martinovation-logo.png"
      alt="Martinovation Logo"
      className="h-24 sm:h-32 md:h-40 w-auto drop-shadow-[0_0_35px_rgba(0,212,255,1)] transition-transform duration-500 hover:scale-110"
      onError={() => setLogoLoadError(true)}
    />
  ) : (
    <Sparkles className="w-10 sm:w-12 h-10 sm:h-12 text-[#00D4FF] glow-cyan" />
  )}

  <span className="text-xl sm:text-3xl md:text-4xl font-bold orbitron glow-cyan">
    Martinovation
  </span>
</div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-[#00D4FF] px-3 py-2 text-sm font-medium transition-all duration-300 hover:glow-cyan"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#00D4FF] p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0A2540]/98 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-[#00D4FF] block px-3 py-2 text-base font-medium transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
