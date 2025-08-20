import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { FaGlobe, FaArrowUp } from "react-icons/fa"; // ✅ Arrow icon
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import { initGSAP } from "./utils/gsapAnimations";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const [showArrow, setShowArrow] = useState(false); // ✅ Track arrow visibility

  useEffect(() => {
    let counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => setProgress(Math.floor(counter.value)),
      onComplete: () => {
        gsap.to(".loader", {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setLoading(false);
            setShowIntro(true);
          },
        });
      },
    });
  }, []);

  useEffect(() => {
    if (showIntro) {
      gsap.to(".intro-text", {
        opacity: 0,
        y: -60,
        duration: 1,
        delay: 1,
        ease: "power3.inOut",
        onComplete: () => {
          setShowIntro(false);
          initGSAP();
        },
      });
    }
  }, [showIntro]);

  // ✅ Scroll-to-top function
  const scrollToTop = () => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: 1, ease: "power2.out" });
  };

  // ✅ Show/hide arrow depending on scroll
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("home")?.offsetHeight || 500;
      if (window.scrollY > heroHeight - 100) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "home", Component: Hero },
    { id: "about", Component: About },
    { id: "skills", Component: Skills },
    { id: "projects", Component: Projects },
    { id: "contact", Component: Contact },
  ];

  return (
    <div id="smooth-wrapper" style={{ position: "relative" }}>
      <div id="smooth-content">
        {/* Loader */}
        {loading && (
          <div className="loader fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
            <div className="w-3/4 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <h2 className="text-white text-2xl font-bold">{progress}%</h2>
          </div>
        )}

        {/* Intro */}
        {showIntro && (
          <div className="intro fixed inset-0 bg-black flex items-center justify-center z-40">
            <h1 className="intro-text flex items-center gap-3 text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              WELCOME TO MY WORLD
              <FaGlobe className="text-blue-400 animate-spin-slow" />
            </h1>
          </div>
        )}

        {/* Main Content */}
        {!loading && !showIntro && (
          <>
            <Navbar />
            <main className="pt-20 relative">
              {sections.map(({ id, Component }) => (
                <section
                  key={id}
                  id={id}
                  className="reveal-section load-reveal"
                >
                  <Component />
                </section>
              ))}

              <footer className="py-8 text-center text-gray-400">
                © {new Date().getFullYear()} Bablu Kumar
              </footer>
            </main>
          </>
        )}
      </div>

      {!loading && <Cursor />}

      {/* ✅ Floating Arrow (only shows after Hero) */}
      {showArrow && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition z-50"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
