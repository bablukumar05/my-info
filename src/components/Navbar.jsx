import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const BLOB_LAYERS = [
  { count: 4, size: 100, speed: 0.5, opacity: 0.35, parallax: 0.12 },
  { count: 3, size: 80, speed: 0.35, opacity: 0.25, parallax: 0.08 },
];

const PARTICLE_LAYERS = [
  { count: 10, minSize: 2, maxSize: 4, parallax: 0.1 },
  { count: 15, minSize: 1, maxSize: 3, parallax: 0.05 },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navRef = useRef(null);
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);

  const cursor = useRef({ x: 0, y: 0 });
  const lastCursor = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const blobRefs = useRef([]);
  const particleRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 10);
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.45 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = navRef.current?.querySelector(`[data-id="${active}"]`);
    if (el) {
      const rect = el.getBoundingClientRect();
      const parentRect = navRef.current.getBoundingClientRect();
      setUnderlineProps({ left: rect.left - parentRect.left, width: rect.width });
    }
  }, [active]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursor.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let animationFrame;
    const start = Date.now();

    const animate = () => {
      const t = (Date.now() - start) / 1000;
      lastCursor.current.x += (cursor.current.x - lastCursor.current.x) * 0.05;
      lastCursor.current.y += (cursor.current.y - lastCursor.current.y) * 0.05;

      let blobIndex = 0;
      BLOB_LAYERS.forEach((layer) => {
        for (let i = 0; i < layer.count; i++, blobIndex++) {
          const blob = blobRefs.current[blobIndex];
          if (!blob) continue;

          const xOffset =
            Math.sin(t * layer.speed + i) * 15 +
            lastCursor.current.x * 0.03 +
            scrollY.current * layer.parallax;
          const yOffset =
            Math.cos(t * layer.speed + i) * 15 +
            lastCursor.current.y * 0.03 +
            scrollY.current * layer.parallax * 0.5;
          const rotate = Math.sin(t * layer.speed + i) * 10;

          const scrollScale = 1 + Math.sin(scrollY.current * 0.002 + i) * 0.06;

          const dx = lastCursor.current.x - blob.offsetLeft - blob.offsetWidth / 2;
          const dy = lastCursor.current.y - blob.offsetTop - blob.offsetHeight / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const hoverScale = dist < 100 ? 1 + (100 - dist) / 400 : 1;
          const glow = dist < 100 ? (100 - dist) / 150 : 0;

          const r = Math.floor(150 + Math.sin(t * 0.5 + i) * 50);
          const g = Math.floor(50 + Math.sin(t * 0.7 + i) * 80);
          const b = Math.floor(200 + Math.sin(t * 0.9 + i) * 50);
          blob.style.background = `radial-gradient(circle at 30% 30%, rgba(${r},${g},${b},${layer.opacity}), rgba(0,0,0,0))`;

          blob.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${rotate}deg) scale(${scrollScale * hoverScale})`;
          blob.style.boxShadow = `0 0 ${8 + glow * 15}px rgba(168,139,250,${layer.opacity})`;
        }
      });

      let pIndex = 0;
      PARTICLE_LAYERS.forEach((layer) => {
        for (let i = 0; i < layer.count; i++, pIndex++) {
          const p = particleRefs.current[pIndex];
          if (!p) continue;
          const pos = p._pos || (p._pos = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
          });

          pos.x += pos.vx;
          pos.y += pos.vy;

          if (pos.x < 0 || pos.x > window.innerWidth) pos.vx *= -1;
          if (pos.y < 0 || pos.y > window.innerHeight) pos.vy *= -1;

          const dx = lastCursor.current.x - pos.x;
          const dy = lastCursor.current.y - pos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            pos.vx += dx * 0.0004;
            pos.vy += dy * 0.0004;
          }

          p.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  function goTo(id) {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;

    const navbarHeight = document.querySelector("nav")?.offsetHeight || 80;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-lg transition-shadow ${
        hasScrolled ? "shadow-xl" : ""
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLE_LAYERS.map((layer, layerIdx) =>
          [...Array(layer.count)].map((_, i) => {
            const index =
              PARTICLE_LAYERS.slice(0, layerIdx).reduce((acc, l) => acc + l.count, 0) + i;
            const size = Math.random() * (layer.maxSize - layer.minSize) + layer.minSize;
            return (
              <div
                key={index}
                ref={(el) => (particleRefs.current[index] = el)}
                className="absolute rounded-full bg-indigo-400 opacity-50 blur-sm"
                style={{ width: size, height: size, transform: "translate3d(0,0,0)" }}
              />
            );
          })
        )}
        {BLOB_LAYERS.map((layer, layerIdx) =>
          [...Array(layer.count)].map((_, i) => {
            const index =
              BLOB_LAYERS.slice(0, layerIdx).reduce((acc, l) => acc + l.count, 0) + i;
            return (
              <div
                key={index}
                ref={(el) => (blobRefs.current[index] = el)}
                className="absolute rounded-full filter blur-3xl mix-blend-screen"
                style={{
                  width: layer.size,
                  height: layer.size,
                  transform: "translate3d(0,0,0)",
                }}
              />
            );
          })
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between z-10">
        <button
          className="flex items-center gap-3 cursor-pointer focus:outline-none rounded z-10"
          onClick={() => goTo("home")}
        >
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg select-none">
            B
          </div>
          <span className="text-indigo-300 font-semibold text-lg select-none">Bablu Kumar</span>
        </button>

        <div className="hidden sm:flex relative z-10" ref={navRef}>
          <div className="flex gap-6 sm:gap-8 text-gray-200 select-none">
            {NAV_ITEMS.map((n) => (
              <motion.button
                key={n.id}
                data-id={n.id}
                onClick={() => goTo(n.id)}
                className="py-2 focus:outline-none rounded hover:text-indigo-300 text-sm sm:text-base"
                whileHover={{ scale: 1.1, color: "#A78BFA" }}
              >
                {n.label}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-indigo-400 rounded-full"
            layout
            transition={{ type: "spring", stiffness: 600, damping: 35 }}
            style={{
              width: underlineProps.width,
              transform: `translateX(${underlineProps.left}px)`,
            }}
          />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden p-2 rounded-md bg-indigo-600 text-white focus:outline-none z-10"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="sm:hidden bg-gradient-to-b from-[#0F172A]/90 to-[#0F172A]/70 backdrop-blur-lg px-6 pb-6 overflow-hidden"
          >
            <ul className="flex flex-col gap-4 text-gray-200 select-none">
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => goTo(n.id)}
                    className="block w-full text-left py-2 rounded hover:bg-indigo-700/30 focus:outline-none"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}