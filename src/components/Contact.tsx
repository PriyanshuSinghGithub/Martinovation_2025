import {
  Mail,
  MapPin,
  Instagram,
} from "lucide-react";

const Contact = () => {

  return (
    <section id="contact" className="section-padding bg-[#0A2540]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-gradient">
          Get In Touch
        </h2>
        <p className="text-center text-gray-300 mb-12 text-lg">
          Have questions? Reach out to us
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-8">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start justify-center md:justify-end">
                <Mail className="w-6 h-6 text-[#00D4FF] mr-4 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-white font-semibold mb-1">Email</p>
                  <a
                    href="mailto:martinovation1@gmail.com"
                    className="text-gray-300 hover:text-[#00D4FF] transition-colors duration-300"
                  >
                    martinovation1@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start justify-center md:justify-start">
                <MapPin className="w-6 h-6 text-[#00D4FF] mr-4 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-white font-semibold mb-1">Location</p>
                  <p className="text-gray-300">
                    Usha Martin University
                    <br />
                    Angara, Ranchi, Jharkhand 835103
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A2540] p-6 rounded-xl border border-[#00D4FF]/30 mb-8 max-w-md mx-auto">
              <h4 className="text-xl font-bold text-white mb-4">Follow Us</h4>
              <div className="flex justify-center">
                <a
                  href="https://www.instagram.com/martinovation_techfest?igsh=cGczMm42M3hwOWxs"
                  className="w-12 h-12 rounded-full bg-[#7B2CBF]/20 flex items-center justify-center text-[#7B2CBF] hover:bg-[#7B2CBF] hover:text-white transition-all duration-300 pulse"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#00D4FF]/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.485817868827!2d85.50638197492462!3d23.40681147890637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f518cbbfffffff%3A0x49668409bc317a24!2sUsha%20Martin%20University!5e0!3m2!1sen!2sin!4v1760105732799!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Usha Martin University Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
