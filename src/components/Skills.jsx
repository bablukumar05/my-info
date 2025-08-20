import React, { useRef, useEffect, useState } from "react";
import {
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaCode, FaNodeJs,
  FaMoon, FaSun, FaVolumeUp, FaVolumeMute
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiGreensock, SiMysql, SiExpress } from "react-icons/si";
import gsap from "gsap";

const initialSkills = [
  { id: "react", name: "React", icon: <FaReact />, level: 85, color: "#61dafb", details: "Hooks, context, component patterns." },
  { id: "js", name: "JavaScript", icon: <FaJs />, level: 82, color: "#f7df1e", details: "ES6+, async, closures." },
  { id: "html", name: "HTML", icon: <FaHtml5 />, level: 92, color: "#e34f26", details: "Semantic markup & accessibility." },
  { id: "css", name: "CSS", icon: <FaCss3Alt />, level: 90, color: "#2965f1", details: "Flexbox, Grid, animations." },
  { id: "tailwind", name: "Tailwind", icon: <SiTailwindcss />, level: 60, color: "#38bdf8", details: "Utility-first responsive design." },
  { id: "mongodb", name: "MongoDB", icon: <SiMongodb />, level: 25, color: "#47a248", details: "Basic CRUD & schemas." },
  { id: "dsa", name: "DSA", icon: <FaCode />, level: 75, color: "#ff6b6b", details: "Data structures & algorithms problem solving." },
  { id: "gsap", name: "GSAP", icon: <SiGreensock />, level: 75, color: "#88ce02", details: "High-performance animations." },
  { id: "sql", name: "SQL", icon: <SiMysql />, level: 40, color: "#00758f", details: "Basic queries & relational DB concepts." },
  { id: "express", name: "Express.js", icon: <SiExpress />, level: 30, color: "#000000", details: "REST APIs & middleware." },
  { id: "node", name: "Node.js", icon: <FaNodeJs />, level: 40, color: "#3c873a", details: "Server-side JavaScript runtime." },
];

export default function Skills() {
  const [skills] = useState(initialSkills);
  const [active, setActive] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const detailsRefs = useRef({});
  const blobRefs = useRef([]);
  const floatingNamesRef = useRef([]);
  const trailRefs = useRef([]);
  const circularRefs = useRef([]);
  const shimmerRefs = useRef([]);
  const particleRefs = useRef([]);
  const sparkRefs = useRef([]);
  const synthRef = useRef(window.speechSynthesis);
  const trailCount = 10;

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const orbitParticleCount = 6;
  const sparkCount = 15;

  // Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Floating blobs & names
  useEffect(() => {
    blobRefs.current.forEach((el, i) => {
      gsap.to(el, {
        x: `+=${Math.random() * 20 - 10}px`,
        y: `+=${Math.random() * 20 - 10}px`,
        scale: 1.1 + Math.random() * 0.1,
        rotate: Math.random() * 360,
        duration: 4 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });
    floatingNamesRef.current.forEach((el) => {
      gsap.to(el, {
        x: `+=${Math.random() * 20 - 10}px`,
        y: `+=${Math.random() * 20 - 10}px`,
        rotation: Math.random() * 10 - 5,
        duration: 5 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  // Skill details + voice
  useEffect(() => {
    synthRef.current.cancel();
    skills.forEach(({ id, details }) => {
      const el = detailsRefs.current[id];
      if (!el) return;
      if (active === id) {
        gsap.set(el, { display: "block" });
        gsap.fromTo(el, { height: 0, opacity: 0, padding: 0 }, { height: "auto", opacity: 1, padding: "12px 0", duration: 0.5 });
        if (!isMuted) synthRef.current.speak(new SpeechSynthesisUtterance(details));
      } else {
        gsap.to(el, { height: 0, opacity: 0, padding: 0, duration: 0.3, onComplete: () => gsap.set(el, { display: "none" }) });
      }
    });
  }, [active, isMuted, skills]);

  // Cursor trail
  useEffect(() => {
    const handleMouseMove = e => {
      trailRefs.current.forEach((el, i) => {
        gsap.to(el, {
          x: e.clientX + i * 2,
          y: e.clientY + i * 2,
          scale: 1 + Math.sin(Date.now() / 200 + i) * 0.3,
          opacity: 0.3 + 0.3 * Math.sin(Date.now() / 200 + i),
          duration: 0.15,
        });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Spark explosion
  const triggerExplosion = (i) => {
    sparkRefs.current[i]?.forEach((p) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 30;
      gsap.fromTo(p, 
        { x: 60, y: 60, opacity: 1, scale: 1 }, 
        { 
          x: 60 + distance * Math.cos(angle), 
          y: 60 + distance * Math.sin(angle),
          opacity: 0,
          scale: 0.3,
          fill: skills[i].color,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => gsap.set(p, { x: 60, y: 60, opacity: 0, scale: 1 })
        });
    });
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-300 text-white dark:text-gray-900 overflow-hidden">

      {/* Floating Blobs */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} ref={el => blobRefs.current[i] = el}
             className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 opacity-40 blur-3xl pointer-events-none"
             style={{ top: `${10+i*15}%`, left: `${20+i*12}%`, zIndex: 0 }} />
      ))}

      {/* Floating Skill Names */}
      {skills.map((skill, i) => (
        <div key={i} ref={el => floatingNamesRef.current[i] = el}
             className="absolute text-indigo-400 dark:text-indigo-700 font-bold opacity-30 text-sm sm:text-base select-none pointer-events-none"
             style={{ top: `${10+Math.random()*70}%`, left: `${10+Math.random()*70}%`, zIndex: 0 }}>
          {skill.name}
        </div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-400 dark:text-indigo-700 tracking-wide">My Skills</h2>
          <div className="flex gap-4">
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-md bg-indigo-500 dark:bg-indigo-300 hover:bg-indigo-600 dark:hover:bg-indigo-400 transition">
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
            <button onClick={() => setIsMuted(!isMuted)} className="p-2 rounded-md bg-indigo-500 dark:bg-indigo-300 hover:bg-indigo-600 dark:hover:bg-indigo-400 transition">
              {isMuted ? <FaVolumeMuSSte /> : <FaVolumeUp />}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center">
          {skills.map((skill, i) => (
            <div key={skill.id} 
                 className="relative cursor-pointer group transform transition-transform duration-500 hover:scale-105 hover:rotate-1"
                 onMouseEnter={() => {
                   gsap.to(circularRefs.current[i], { strokeDashoffset: circumference * (1 - skill.level / 100), duration: 1, ease: "power3.out" });
                   gsap.to(shimmerRefs.current[i], { x: 120, duration: 1.2, repeat: -1, ease: "linear" });
                   particleRefs.current[i]?.forEach((p, idx) => {
                     gsap.to(p, { rotate: 360, duration: 2 + idx * 0.2, repeat: -1, transformOrigin: "60px 60px", ease: "linear" });
                   });
                 }}
                 onMouseLeave={() => {
                   gsap.to(circularRefs.current[i], { strokeDashoffset: circumference, duration: 1, ease: "power3.inOut" });
                   gsap.killTweensOf(shimmerRefs.current[i]);
                   gsap.set(shimmerRefs.current[i], { x: -120 });
                   particleRefs.current[i]?.forEach(p => gsap.killTweensOf(p));
                 }}
                 onClick={() => setActive(skill.id)}
            >
              <svg width="120" height="120" className="transform -rotate-90">
                <circle cx="60" cy="60" r={radius} stroke="#4f46e5" strokeWidth="10" fill="none" opacity={0.1}/>
                <circle ref={el => circularRefs.current[i] = el} cx="60" cy="60" r={radius}
                        stroke="url(#grad)" strokeWidth="10" fill="none"
                        strokeDasharray={circumference} strokeDashoffset={circumference} strokeLinecap="round"/>
                <circle ref={el => shimmerRefs.current[i] = el} cx="60" cy="60" r={radius}
                        stroke="white" strokeWidth="6" fill="none" opacity={0.2}
                        strokeDasharray={circumference / 3} strokeDashoffset={circumference} strokeLinecap="round"/>
                {Array.from({ length: orbitParticleCount }).map((_, idx) => (
                  <circle key={idx} ref={el => {
                    if (!particleRefs.current[i]) particleRefs.current[i] = [];
                    particleRefs.current[i][idx] = el;
                  }} cx="60" cy={10} r="3" fill="white" opacity={0.7} />
                ))}
                {Array.from({ length: sparkCount }).map((_, idx) => (
                  <circle key={idx} ref={el => {
                    if (!sparkRefs.current[i]) sparkRefs.current[i] = [];
                    sparkRefs.current[i][idx] = el;
                  }} cx="60" cy="60" r="2" fill={skill.color} opacity={0} />
                ))}
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a78bfa"/>
                    <stop offset="100%" stopColor="#6366f1"/>
                  </linearGradient>
                </defs>
              </svg>

              <div className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-colors duration-300 group-hover:text-indigo-400`}
                   style={{ color: active === skill.id ? skill.color : undefined }}>
                {skill.icon}
                <span className="mt-2 font-semibold">{skill.name}</span>
                <span className="text-sm mt-1">{skill.level}%</span>
              </div>

              <div ref={el => detailsRefs.current[skill.id] = el} className="absolute top-full mt-2 w-48 bg-gray-800 bg-opacity-30 dark:bg-gray-200 dark:bg-opacity-30 backdrop-blur-md p-2 rounded opacity-0 invisible transition-all">
                {skill.details}
              </div>
            </div>
          ))}
        </div>
      </div>

      {Array.from({ length: trailCount }).map((_, i) => (
        <div key={i} ref={el => trailRefs.current[i] = el} className="absolute w-3 h-3 rounded-full bg-indigo-400 opacity-50 pointer-events-none z-20" />
      ))}
    </section>
  );
}
