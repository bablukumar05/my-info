import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectModal({ project, onClose, enableCarousel = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = project?.images?.length || 0;

  useEffect(() => {
    if (!enableCarousel || totalImages <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 3500);
    return () => clearInterval(interval);
  }, [enableCarousel, totalImages]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (enableCarousel && totalImages > 1) {
        if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
        if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % totalImages);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, enableCarousel, totalImages]);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % totalImages);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);

  if (!project) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <motion.div
          className="relative bg-gray-900 rounded-xl max-w-4xl w-full mx-4 sm:mx-6 max-h-[90vh] overflow-y-auto overflow-x-hidden shadow-2xl glass"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-2 rounded-full text-white bg-gray-800/50 hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
          <div className="relative w-full h-64 sm:h-80 md:h-96 bg-black flex items-center justify-center overflow-hidden rounded-t-xl">
            {totalImages > 0 ? (
              <>
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentIndex}
                    src={project.images[currentIndex]}
                    alt={`${project.title} screenshot ${currentIndex + 1}`}
                    className="w-full h-full object-cover object-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    loading="eager"
                  />
                </AnimatePresence>
                {enableCarousel && totalImages > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      aria-label="Next image"
                    >
                      <FaChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-3 flex gap-2 justify-center w-full">
                      {project.images.map((_, i) => (
                        <button
                          key={i}
                          className={`w-2 h-2 rounded-full transition ${
                            i === currentIndex ? "bg-indigo-500" : "bg-gray-500/50"
                          }`}
                          onClick={() => setCurrentIndex(i)}
                          aria-label={`Go to image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="text-gray-400 text-center">No images available</div>
            )}
          </div>
          <div className="p-6 sm:p-8 text-left">
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {project.title}
            </h2>
            <p id="modal-description" className="text-gray-300 text-sm sm:text-base mb-4">
              {project.description}
            </p>
            <div className="mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-indigo-300 mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.highlights?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-indigo-600/50 text-white rounded-full text-xs sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`Visit ${project.title} project page`}
              >
                Visit Project <FaExternalLinkAlt size={16} />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}