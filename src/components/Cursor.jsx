import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef([]);
  const TRAIL_COUNT = 8;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  useEffect(() => {
    if (isTouch) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    let mouseX = 0;
    let mouseY = 0;

    gsap.set(cursor, { x: -100, y: -100 });
    trail.forEach((dot, i) => {
      gsap.set(dot, { x: -100, y: -100, scale: 1 - i * 0.1 });
    });

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out",
      });

      trail.forEach((dot, i) => {
        gsap.to(dot, {
          x: mouseX,
          y: mouseY,
          duration: 0.2 + i * 0.05,
          ease: "power2.out",
          scale: 1 - i * 0.1,
          opacity: 0.3 + (TRAIL_COUNT - i) * 0.05,
        });
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[10000]">
      <div
        ref={cursorRef}
        className="w-3 h-3 rounded-full bg-indigo-500 mix-blend-difference"
      />
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRef.current[i] = el)}
          className="absolute w-2 h-2 rounded-full bg-indigo-400 mix-blend-difference"
        />
      ))}
    </div>
  );
}