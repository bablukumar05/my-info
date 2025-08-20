import React from "react";
import { Typewriter } from "react-simple-typewriter";
import profile from "../assets/profile.jpg";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./Hero.css";

gsap.registerPlugin(ScrollToPlugin);

export default function Hero() {
  const resumePath = "/resume.pdf";

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`Element with ID "${id}" not found.`);
      return;
    }

    const navbarHeight = document.querySelector("nav")?.offsetHeight || 80;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;

    if (typeof top !== "number" || isNaN(top)) {
      console.warn(`Invalid scroll position: ${top}`);
      return;
    }

    gsap.to(window, {
      scrollTo: { y: top, autoKill: true },
      duration: 1,
      ease: "power2.out",
    });
  };

  const socialLinks = [
    { Icon: FaGithub, url: "https://github.com/bablukumar05" },
    { Icon: FaLinkedin, url: "https://www.linkedin.com/in/bablu-kumar-145642281/" },
    { Icon: FaTwitter, url: "https://twitter.com/bablu_kumar" },
    { Icon: FaInstagram, url: "https://www.instagram.com/bablu_yadav__2024?utm_source=qr&igsh=cGRhenBkcXNrZ3Q1" },
    { Icon: FaFacebookF, url: "https://www.facebook.com/share/15pPukKpbc/" },
  ];

  return (
    <section className="hero-section" aria-label="Hero Section">
      {/* Decorative blobs */}
      <div className="hero-blob hero-blob--top-left animate-float" />
      <div className="hero-blob hero-blob--bottom-right animate-float animation-delay-1000" />
      <div className="hero-blob hero-blob--center animate-float animation-delay-2000" />

     <div className="relative z-10 max-w-6xl w-full flex flex-col md:flex-row items-center gap-6 md:gap-14 p-6 sm:p-12 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">

        {/* Text section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-text-shine">
            Hi, I'm Bablu Kumar
          </h1>

          <p className="mt-4 text-indigo-300 font-semibold text-lg sm:text-xl min-h-[38px]">
            <Typewriter
              words={["MERN Stack Developer", "React + Tailwind", "Animations & UX"]}
              loop
              cursor
              cursorStyle="▍"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </p>
          <p className="mt-2 text-indigo-400 text-sm sm:text-base font-light">
            Based in India | Passionate about creating seamless web experiences
          </p>

          {/* Buttons */}
          <div className="hero-buttons mt-6">
            <button
              onClick={() => scrollTo("projects")}
              className="hero-button bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              See Projects
            </button>
            <a
              href={resumePath}
              download="resume.pdf"
              className="hero-button bg-indigo-700 hover:bg-indigo-800 text-white"
              aria-label="Download resume"
            >
              Download Resume
            </a>
          </div>

          {/* Social links */}
        <div className="mt-8 flex justify-center md:justify-start gap-5 text-indigo-300 text-2xl">
            {socialLinks.map(({ Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-125 hover:text-indigo-400"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Right side profile image */}
        <div className="hero-profile">
          <img
            src={profile}
            alt="Bablu Kumar profile"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
