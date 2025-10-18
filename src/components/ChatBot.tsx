import { useState, useEffect, useRef } from "react";
import { events, Event } from "../data/eventsData";
import { MessageSquare, X, Send } from "lucide-react";

// Comprehensive site knowledge base
const siteKnowledge = {
  about: {
    name: "Martinovation Tech Fest 2025: Genesis of Tomorrow",
    dates: "November 3-7, 2025",
    location: "Usha Martin University, Angara, Ranchi, Jharkhand 835103",
    description: "Usha Martin University's annual techno-cultural celebration that blends innovation, creativity, and collaboration. The fest transforms the campus into a vibrant hub of hackathons, workshops, competitions, exhibitions, gaming, and cultural showcases.",
    stats: {
      days: 5,
      events: "20+",
      participants: "3,000+"
    }
  },
  contact: {
    email: "martinovation1@gmail.com",
    instagram: "https://www.instagram.com/martinovation_techfest?igsh=cGczMm42M3hwOWxs",
    address: "Usha Martin University, Angara, Ranchi, Jharkhand 835103"
  },
  team: {
    core: [
      { name: 'Umanand Mishra', contact: '8674944887', role: 'Core Team & Sponsorship Head' },
      { name: 'Ankur Anand', contact: '9263476357', role: 'Core Team & Marketing Head' },
      { name: 'Madhur Manoj', contact: '8092971088', role: 'Core Team' },
      { name: 'Akash Singh', contact: '7739339852', role: 'Core Team' },
      { name: 'Shivanjali Shudhanshu', contact: '7209483014', role: 'Core Team' },
      { name: 'Himank Jaiswal', contact: '7016545592', role: 'Core Team' }
    ],
    departments: [
      { name: 'Event Management', head: 'Pankaj Kr. Mahto', contact: '6201052622' },
      { name: 'Technical', head: 'Abu Reeyan', contact: '7808373330' },
      { name: 'Web Design & Development', head: 'Vinay Kumar', contact: '9065934001' },
      { name: 'Creative & Visuals', head: 'Bibhanshu Dutta', contact: '9470943650' },
      { name: 'Logistics & Resources', head: 'Himanshu Kr. Singh', contact: '8252577845' }
    ]
  },
  sponsors: [
    { name: "Powered By Unstop", type: "Main Partner" },
    { name: "GeeksforGeeks", type: "Technical Partner" },
    { name: "Coding Club", type: "Quizzing Partner" }
  ]
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string; timestamp: Date }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
  };

  // Scroll when messages change or typing status changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 50); // Small delay to ensure DOM is updated

    return () => clearTimeout(timeoutId);
  }, [messages, isTyping]);

  // Scroll when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 300); // Wait for animation to complete
    }
  }, [isOpen]);

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        sender: "bot",
        text: "👋 Welcome to Martinovation TechFest 2025! I'm your AI assistant.\n\nI can help you with:\n• Event details and schedules\n• Team and contact information\n• Registration and venue details\n• General fest information\n\nWhat would you like to know?",
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);

  const getSmartResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase();

    // Greeting responses
    if (lower.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return "Hello! 👋 Welcome to Martinovation TechFest 2025! How can I help you today?";
    }

    // About fest queries
    if (lower.includes('about') || lower.includes('martinovation') || lower.includes('fest') || lower.includes('what is')) {
      return `🎉 **Martinovation TechFest 2025: Genesis of Tomorrow**\n\n📅 **Dates:** ${siteKnowledge.about.dates}\n📍 **Location:** ${siteKnowledge.about.location}\n\n${siteKnowledge.about.description}\n\n📊 **Quick Stats:**\n• ${siteKnowledge.about.stats.days} Days of Innovation\n• ${siteKnowledge.about.stats.events} Tech Events\n• ${siteKnowledge.about.stats.participants} Expected Participants`;
    }

    // Contact information
    if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('reach')) {
      return `📞 **Contact Information:**\n\n📧 **Email:** ${siteKnowledge.contact.email}\n📍 **Address:** ${siteKnowledge.contact.address}\n📱 **Instagram:** @martinovation_techfest\n\n**Key Contacts:**\n• Umanand Mishra (Sponsorship): 8674944887\n• Ankur Anand (Marketing): 9263476357\n• Pankaj Kr. Mahto (Events): 6201052622`;
    }

    // Team information
    if (lower.includes('team') || lower.includes('organizer') || lower.includes('coordinator')) {
      const coreTeam = siteKnowledge.team.core.map(member =>
        `• ${member.name}: ${member.contact}`
      ).join('\n');

      return `👥 **Organizing Team:**\n\n**Core Committee:**\n${coreTeam}\n\n**Department Heads:**\n• Technical: Abu Reeyan (7808373330)\n• Event Management: Pankaj Kr. Mahto (6201052622)\n• Web Development: Vinay Kumar (9065934001)\n• Creative: Bibhanshu Dutta (9470943650)`;
    }

    // Sponsors information
    if (lower.includes('sponsor') || lower.includes('partner')) {
      return `🤝 **Our Sponsors & Partners:**\n\n• **Powered By:** Unstop\n• **Technical Partner:** GeeksforGeeks\n• **Quizzing Partner:** Coding Club\n\n💼 **Interested in Sponsoring?**\nContact Umanand Mishra: 8674944887`;
    }

    // Registration queries
    if (lower.includes('register') || lower.includes('registration') || lower.includes('how to participate')) {
      return `📝 **Registration Information:**\n\n• Most events are open for registration\n• Entry fees vary by event (some are free!)\n• Both individual and team events available\n• Contact event coordinators for specific registration details\n\n📞 **For Registration Help:**\nContact Pankaj Kr. Mahto: 6201052622`;
    }

    // Venue and location
    if (lower.includes('venue') || lower.includes('location') || lower.includes('where') || lower.includes('address')) {
      return `📍 **Venue Information:**\n\n**Main Location:** Usha Martin University\n**Address:** Angara, Ranchi, Jharkhand 835103\n\n**Event Venues:**\n• Auditorium (Above central mess)\n• Volleyball court ground (Exhibition zone)\n• Various campus locations\n\n🗺️ **Getting Here:** The campus is easily accessible from Ranchi city center.`;
    }

    // Schedule and dates
    if (lower.includes('schedule') || lower.includes('when') || lower.includes('date') || lower.includes('time')) {
      return `📅 **Event Schedule:**\n\n**Festival Dates:** November 3-7, 2025\n**Duration:** 5 Days of Innovation\n\n**Daily Events:**\n• Day 1: Coding Marathon, Robotics\n• Multiple events each day\n• Various time slots from morning to evening\n\nFor detailed schedule, ask about specific events!`;
    }

    // Event-specific queries
    const eventMatch = events.find(event =>
      lower.includes(event.name.toLowerCase()) ||
      lower.includes(event.code.toLowerCase())
    );

    if (eventMatch) {
      return `🎯 **${eventMatch.name} (${eventMatch.code})**\n\n⏰ **Time:** ${eventMatch.time}\n📍 **Venue:** ${eventMatch.venue}\n${eventMatch.description ? `📝 **Description:** ${eventMatch.description}\n` : ''}${eventMatch.entryFee ? `💰 **Entry Fee:** ${eventMatch.entryFee}\n` : ''}${eventMatch.team ? `👥 **Team Size:** ${eventMatch.team}\n` : ''}${eventMatch.participantRequirements ? `📋 **Requirements:** ${eventMatch.participantRequirements}` : ''}`;
    }

    // Day-specific queries
    if (lower.includes('day 1') || lower.includes('first day')) {
      const day1Events = events.filter(event => event.day === "Day 1");
      const eventList = day1Events.map(event =>
        `• ${event.name} (${event.time}) - ${event.venue}`
      ).join('\n');

      return `📅 **Day 1 Events:**\n\n${eventList}\n\nAsk about any specific event for more details!`;
    }

    // List all events
    if (lower.includes('events') || lower.includes('competitions') || lower.includes('list')) {
      const eventList = events.map(event =>
        `• ${event.name} (${event.code}) - ${event.day}`
      ).join('\n');

      return `🎯 **All Events:**\n\n${eventList}\n\nAsk about any specific event for detailed information!`;
    }

    // Help and commands
    if (lower.includes('help') || lower.includes('commands')) {
      return `🤖 **I can help you with:**\n\n• Event details and schedules\n• Team and contact information\n• Registration process\n• Venue and location details\n• Sponsor information\n• General fest information\n\n**Try asking:**\n• "Tell me about Coding Marathon"\n• "What's the schedule for Day 1?"\n• "How do I register?"\n• "Who are the organizers?"`;
    }

    // Default response with suggestions
    return `🤔 I didn't quite understand that. Here are some things you can ask:\n\n• "Tell me about Martinovation"\n• "What events are there?"\n• "How do I register?"\n• "Who can I contact?"\n• "Where is the venue?"\n\nOr ask about any specific event by name!`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newUserMessage = { sender: "user" as const, text: userMessage, timestamp: new Date() };

    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay for better UX
    setTimeout(() => {
      const botResponse = getSmartResponse(userMessage);
      const newBotMessage = { sender: "bot" as const, text: botResponse, timestamp: new Date() };

      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);

      // Ensure scroll after bot response
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }, 800);
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Handle bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={i} className="mb-1">
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
            )}
          </p>
        );
      }
      return <p key={i} className="mb-1">{line}</p>;
    });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 sm:bottom-8 right-4 sm:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-300 chat-pulse touch-manipulation"
        aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
      >
        {isOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-4 sm:right-8 z-50 w-full sm:w-96 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-2rem)] h-[70vh] sm:h-[600px] max-h-[calc(100vh-8rem)] bg-gradient-to-b from-[#1A1A1A] to-[#0A2540] border-2 border-[#00D4FF]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden slide-in-up mx-4 sm:mx-0">
          {/* Header */}
          <div className="p-3 sm:p-4 bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base sm:text-lg">Martinovation AI Assistant</h3>
                <p className="text-xs sm:text-sm opacity-90">Genesis of Tomorrow 2025</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 touch-manipulation"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-[#00D4FF]/30">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} message-slide-in`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[85%] p-2.5 sm:p-3 rounded-2xl ${msg.sender === "user"
                    ? "bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] text-white rounded-br-md"
                    : "bg-[#1A1A1A]/80 text-gray-100 border border-[#00D4FF]/20 rounded-bl-md"
                    }`}
                >
                  <div className="text-xs sm:text-sm leading-relaxed">
                    {formatMessage(msg.text)}
                  </div>
                  <div className={`text-xs mt-1.5 sm:mt-2 opacity-70 ${msg.sender === "user" ? "text-right" : "text-left"
                    }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start message-slide-in">
                <div className="bg-[#1A1A1A]/80 border border-[#00D4FF]/20 p-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#00D4FF] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#00D4FF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#00D4FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-[#00D4FF]/20">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#1A1A1A] border border-[#00D4FF]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00D4FF] transition-colors duration-300 text-sm sm:text-base"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B2CBF] text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center min-w-[44px] sm:min-w-[48px] touch-manipulation"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
              {["Events", "Schedule", "Contact", "Register"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion.toLowerCase())}
                  className="px-2.5 sm:px-3 py-1 text-xs bg-[#00D4FF]/20 text-[#00D4FF] rounded-full hover:bg-[#00D4FF]/30 transition-colors duration-200 touch-manipulation"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
