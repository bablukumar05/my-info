import React, { useRef, useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import ProjectModal from "./ProjectModal";
import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.jpg";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Employee Management System",
    description:
      "React + Tailwind — admin dashboard, employee dashboard, role-based auth, polished UI.",
    images: [project1],
    highlights: ["React", "Tailwind", "GSAP","Framer motion", "SkipperUI"],
    link: "https://bablukumar05.github.io/Employee--Management-System/",
  },
  {
    id: 2,
    title: "Personal Portfolio",
    description: "This portfolio — responsive, animated, and accessible.",
    images: [project2],
    highlights: ["React", "Framer Motion", "Tailwind","SkipperUI"],
    link: "#",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
  float: { y: [0, -5, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
};

export default function Projects() {
  const refs = useRef([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    refs.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 50, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const onMove = (e, i) => {
    const card = refs.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
    card.style.transition = "transform 0.1s ease-out";

    const sheen = card.querySelector(".card-sheen");
    if (sheen) {
      sheen.style.transform = `translateX(${(x / rect.width) * 260 - 40}%) rotate(25deg)`;
      sheen.style.opacity = 0.25;
    }
  };

  const onLeave = (i) => {
    const card = refs.current[i];
    if (!card) return;

    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";

    const sheen = card.querySelector(".card-sheen");
    if (sheen) {
      sheen.style.transform = "translateX(-40%) rotate(25deg)";
      sheen.style.opacity = 0;
      sheen.style.transition = "opacity 0.4s ease";
    }
  };

  return (
    <section
      id="projects"
      className="relative py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden"
    >
      {/* Background blobs + curved connecting lines + particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Large gradient blobs */}
        <motion.div
          className="absolute w-72 h-72 bg-indigo-500/40 rounded-full blur-3xl -top-32 -left-32"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-pink-500/30 rounded-full blur-3xl -bottom-40 -right-32"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        />
        {/* Curved connecting lines (SVG paths) */}
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M50 100 C150 50 250 150 350 100"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="2"
            fill="transparent"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
          <motion.path
            d="M400 200 C500 150 600 250 700 200"
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth="2"
            fill="transparent"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-5xl sm:text-5xl font-extrabold mb-16 text-indigo-400 drop-shadow-lg">
          My Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {PROJECTS.map((p, i) => (
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable={false} key={p.id}>
              <motion.div
                ref={(el) => (refs.current[i] = el)}
                tabIndex={0}
                className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black cursor-pointer opacity-0 hover:shadow-indigo-600/70 focus:shadow-indigo-600/70 focus:outline-none"
                onMouseMove={(e) => onMove(e, i)}
                onMouseLeave={() => onLeave(i)}
                onFocus={(e) => onMove(e, i)}
                onBlur={() => onLeave(i)}
                onClick={() => setSelected(p)}
                variants={cardVariants}
                initial="hidden"
                animate={["visible", "float"]}
                whileHover={{ scale: 1.06 }}
                aria-label={`Open details for ${p.title}`}
              >
                {/* Image */}
                <div className="w-full h-64 relative overflow-hidden rounded-t-3xl group">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500 rounded-t-3xl pointer-events-none" />
                  <div
                    className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white/30 to-transparent pointer-events-none card-sheen"
                    style={{ transform: "translateX(-40%) rotate(25deg)", opacity: 0 }}
                  />
                </div>

                {/* Text + badges */}
                <div className="p-6 text-left">
                  <h3 className="text-2xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-3 text-gray-300 leading-relaxed">{p.description}</p>
                  <motion.div
                    className="mt-4 flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    {p.highlights.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm font-medium"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(p);
                      }}
                      className="inline-block px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-lg shadow-lg transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>

      {/* Modal with carousel */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.id}
            project={selected}
            onClose={() => setSelected(null)}
            enableCarousel
          />
        )}
      </AnimatePresence>
    </section>
  );
}
