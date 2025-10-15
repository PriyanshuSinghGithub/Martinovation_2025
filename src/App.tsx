import { useState, useEffect } from 'react';
import { Moon, Sun, LogOut, User } from 'lucide-react';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import Auth from './components/Auth';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Schedule from './components/Schedule';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Team from './components/Team';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loading from './components/Loading';


// --------------------
// Inner App after Auth
// --------------------
function AppContent() {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Simulate loading animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (loading) {
    return <Loading />;
  }

  // If user not logged in → show Auth screen
  if (!user) {
    return <Auth />;
  }

  // Otherwise → show full site
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0A2540]">
      {/* Dark mode toggle button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* Authenticated Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1A2A]/80 backdrop-blur-xl border-b border-[#1A334B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF]">
            UMU TechFest 2025
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <User className="w-5 h-5" />
              <span className="text-sm">{user.email}</span>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 bg-[#1A334B] hover:bg-[#2A4058] text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Your existing components */}
      <div className="pt-20">
        <Navigation />
        <Hero />
        <About />
        <Schedule />
        <Events />
        <Gallery />
        <Team />
        <Sponsors />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

// --------------------
// App Wrapper
// --------------------
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
