import { motion } from "framer-motion";

interface Props { active: boolean; }

const teamMembers = [
  {
    name: "Venu Kandagatla",
    image: "/venu2.jpg",
    role: "Technical Architect",
    description: "Designs system architecture, defines technical standards, and guides distributed cache implementation strategies"
  },
  {
    name: "Sailaja Avula",
    image: "/sailaja.jpg",
    role: "Product Owner",
    description: "Drives product vision, prioritizes backlog, and ensures alignment between business goals and technical delivery"
  },
  {
    name: "Preeti Talasila",
    image: "/preeti.jpg",
    role: "Scrum Master",
    description: "Facilitates agile ceremonies, removes impediments, and fosters team collaboration for continuous improvement"
  },
];

export function Section03TeamGallery({ active }: Props) {
  return (
    <div className="slide-container px-4 md:px-8 py-12 flex flex-col">
      <div className="max-w-7xl w-full mx-auto relative z-10 flex-1 flex flex-col">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h2
            className="font-display font-black leading-tight mb-2"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 3.8rem)",
              background: "linear-gradient(135deg, #00e6e6, #60a5fa, #34d399)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Hermes Team
          </h2>
          <p className="font-body text-sm" style={{ color: "var(--ef-gray)" }}>
            Meet the talented people building the future of distributed caching
          </p>
        </motion.div>

        {/* Unified Box with 2 Column Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex-1 rounded-2xl overflow-hidden"
          style={{
            border: "3px solid rgba(0,230,230,0.4)",
            boxShadow: "0 0 60px rgba(0,230,230,0.25), inset 0 0 40px rgba(0,230,230,0.08)",
            background: "rgba(10,15,30,0.8)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Left Column - Team Members (3 rows) */}
            <div className="flex flex-col justify-center gap-6 p-6 lg:p-8"
              style={{ borderRight: "1px solid rgba(0,230,230,0.2)" }}
            >
              {teamMembers.map((member, idx) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group flex flex-row items-center gap-5"
                >
                  {/* Circular Avatar */}
                  <div
                    className="relative rounded-full overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
                    style={{
                      width: "110px",
                      height: "110px",
                      border: "2.5px solid rgba(0,230,230,0.5)",
                      boxShadow: "0 0 25px rgba(0,230,230,0.3), inset 0 0 25px rgba(0,230,230,0.1)",
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name and Role - to the right of image */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={active ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: idx * 0.15 + 0.25 }}
                    className="flex flex-col text-left"
                  >
                    <div className="font-display font-bold text-xl" style={{ color: "var(--ef-cyan)" }}>
                      {member.name}
                    </div>
                    <div className="font-body text-sm font-semibold mt-1" style={{ color: "var(--ef-blue)" }}>
                      {member.role}
                    </div>
                    <div className="font-body text-xs mt-1 max-w-xs" style={{ color: "var(--ef-gray)", lineHeight: "1.4" }}>
                      {member.description}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Right Column - Team Photo (spans full height) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center justify-center p-4 lg:p-6"
              style={{ minHeight: "400px" }}
            >
              <img
                src="/team.jpg"
                alt="Hermes Development Team"
                className="w-full h-full object-contain object-center rounded-xl"
                style={{
                  maxHeight: "100%",
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center mt-8"
        >
          <p className="font-body text-xs" style={{ color: "var(--ef-lgray)" }}>
            Passionate engineers delivering high-performance distributed systems
          </p>
        </motion.div>
      </div>
    </div>
  );
}
