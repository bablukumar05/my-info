import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaBriefcase, FaBullseye, FaCameraRetro } from "react-icons/fa";

const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
const NUM_PARTICLES = isMobile ? 10 : 30;

const Particle = ({ mouseX, mouseY }) => {
  const [pos, setPos] = useState({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.3 + 0.1,
    speedX: Math.random() * 0.4 - 0.2,
    speedY: Math.random() * 0.4 - 0.2,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPos((prev) => {
        let dx = prev.x - mouseX;
        let dy = prev.y - mouseY;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let moveX = prev.speedX;
        let moveY = prev.speedY;
        if (!isMobile && dist < 80) {
          moveX += dx / 800;
          moveY += dy / 800;
        }
        let newX = (prev.x + moveX + window.innerWidth) % window.innerWidth;
        let newY = (prev.y + moveY + window.innerHeight) % window.innerHeight;
        return { ...prev, x: newX, y: newY };
      });
    }, 20);
    return () => clearInterval(interval);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: pos.size,
        height: pos.size,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.2)",
        pointerEvents: "none",
        filter: isMobile ? "blur(0.4px)" : "blur(0.8px)",
      }}
    />
  );
};

const ParticleBackground = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      {Array.from({ length: NUM_PARTICLES }).map((_, i) => (
        <Particle key={i} mouseX={mousePos.x} mouseY={mousePos.y} />
      ))}
    </div>
  );
};

const cardsData = [
  {
    title: "Experience",
    text: "Fresher — React, Tailwind, GSAP, Framer Motion.",
    icon: <FaBriefcase size={24} className="text-pink-500" />,
  },
  {
    title: "Focus",
    text: "Animations, accessibility, responsive UI.",
    icon: <FaBullseye size={24} className="text-purple-500" />,
  },
  {
    title: "Hobbies",
    text: "Frontend & UI/UX Design, React.js, Learning New Tech.",
    icon: <FaCameraRetro size={24} className="text-indigo-500" />,
  },
];

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const TiltCard = ({ icon, title, text, index }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateLimit = isMobile ? 4 : 12;
    const rotateX = useTransform(y, [-40, 40], [rotateLimit, -rotateLimit]);
    const rotateY = useTransform(x, [-40, 40], [-rotateLimit, rotateLimit]);

    const handleMouseMove = (e) => {
      const rect = cardRef.current.getBoundingClientRect();
      const cardX = e.clientX - rect.left;
      const cardY = e.clientY - rect.top;
      x.set(cardX - rect.width / 2);
      y.set(cardY - rect.height / 2);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setHoverIndex(null);
    };

    const offsetX = hoverIndex !== null && hoverIndex !== index ? (index - hoverIndex) * 8 : 0;
    const offsetY = hoverIndex !== null && hoverIndex !== index ? Math.abs(index - hoverIndex) * 4 : 0;
    const scale = hoverIndex === index ? 1.06 : 1;

    const shadowX = useTransform(x, [-40, 40], [8, -8]);
    const shadowY = useTransform(y, [-40, 40], [8, -8]);
    const shadowBlur = useTransform(x, [-40, 40], [12, 25]);

    return (
      <motion.article
        ref={cardRef}
        className="p-5 rounded-xl cursor-pointer select-none flex flex-col items-center text-center perspective-1000"
        style={{
          rotateX,
          rotateY,
          scale,
          x: offsetX,
          y: offsetY,
          boxShadow: `calc(${shadowX}px) calc(${shadowY}px) ${shadowBlur}px rgba(0,0,0,0.3), 0 0 12px rgba(255,255,255,0.05)`,
          background: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHoverIndex(index)}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        role="region"
        aria-labelledby={`${title}-title`}
        aria-describedby={`${title}-desc`}
      >
        <motion.div
          className="mb-3"
          animate={{ y: [0, -5, 0], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror" }}
        >
          {icon}
        </motion.div>
        <h3 id={`${title}-title`} className="font-semibold text-white text-lg sm:text-xl mb-2">
          {title}
        </h3>
        <p id={`${title}-desc`} className="text-gray-300 text-sm sm:text-base">
          {text}
        </p>
      </motion.article>
    );
  };

  return (
    <section id="about" className="relative py-16 px-4 sm:px-8 bg-gray-900 overflow-hidden" aria-label="About Me Section">
      {!isMobile && <ParticleBackground />}
      <motion.div
        className="absolute w-64 h-64 sm:w-72 sm:h-72 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 top-[-60px] left-[-60px]"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      />
      <motion.div
        className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-25 top-1/4 right-[-80px]"
        animate={{ x: [0, -40, 0], y: [0, 25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      />
      <div className="relative max-w-5xl mx-auto text-center z-10">
        <motion.h2
          className="relative inline-block text-2xl sm:text-3xl font-extrabold text-white mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          About Me
          <motion.span
            className="block h-1 w-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mt-2 mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ originX: 0 }}
          />
        </motion.h2>
        <motion.p
          className="mt-2 text-gray-300 leading-relaxed max-w-3xl mx-auto text-sm sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          I’m a dedicated MERN stack developer with strong expertise in frontend development and growing backend skills. I specialize in creating dynamic, responsive web applications enhanced with GSAP animations for smooth, engaging user experiences. Additionally, I have a solid foundation in data structures and algorithms using Java, enabling me to write efficient and optimized code.
        </motion.p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {cardsData.map((card, i) => (
            <TiltCard key={card.title} {...card} index={i} />
          ))}
        </div>
        <motion.p
          className="mt-12 text-gray-400 italic max-w-2xl mx-auto text-sm sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          “I’m always eager to learn and collaborate on exciting projects that challenge me to grow as a developer and designer.”
        </motion.p>
      </div>
    </section>
  );
}