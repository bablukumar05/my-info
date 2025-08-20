// components/ScrollToTopButton.jsx
import React from "react";
import gsap from "gsap";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    const scrollElement = document.querySelector("#smooth-content");
    gsap.to(scrollElement, { scrollTo: 0, duration: 0.8, ease: "power2.out" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all"
    >
      <FaArrowUp size={18} />
    </button>
  );
}
