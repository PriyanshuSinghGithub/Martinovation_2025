import { useState, useEffect } from "react";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
// import Schedule from "./components/Schedule";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Team from "./components/Team";
import Sponsors from "./components/Sponsors";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import ChatBot from "./components/ChatBot";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0A2540]">
      <div className="pt-0">
        <Navigation />
        <Hero />
        <About />
        {/* <Schedule /> */}
        <Events />
        <Gallery />
        <Team />
        <Sponsors />
        <Contact />
        <Footer />
      </div>
      <ChatBot />
    </div>
  );
}

export default App;
