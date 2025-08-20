import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaEnvelope,FaLinkedin, FaPhone, FaMapMarkerAlt,FaGithub } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: "error", message: "Please fix the errors above." });
      return;
    }

    try {
      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: "Failed to send message. Try again later." });
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 px-4 sm:px-8 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-2xl sm:text-3xl font-extrabold text-indigo-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>
        <motion.p
          className="text-gray-300 text-sm sm:text-base mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Feel free to reach out for collaborations, inquiries, or just to say hi!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="flex flex-col gap-6 text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-400 text-xl" />
              <a
                href="mailto:kumarbablu74824@gmail.com"
                className="text-gray-300 hover:text-indigo-400 transition"
              >
                kumarbablu74824@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-indigo-400 text-xl" />
              <a
                href="tel:+919876543210"
                className="text-gray-300 hover:text-indigo-400 transition"
              >
                +91 8825138188
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-400 text-xl" />
              <span className="text-gray-300">India</span>
            </div>
             <div className="flex items-center gap-3">
              <FaLinkedin className="text-indigo-400 text-xl" />
              <a
                href="https://www.linkedin.com/in/bablu-kumar-145642281/"
                className="text-gray-300 hover:text-indigo-400 transition"
              >
            LinkedIn
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FaGithub className="text-indigo-400 text-xl" />
              <a
                href="https://github.com/bablukumar05"
                className="text-gray-300 hover:text-indigo-400 transition"
              >
            GitHub
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 glass p-6 rounded-xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none"
                aria-label="Name"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none"
                aria-label="Email"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={4}
                className="w-full p-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none"
                aria-label="Message"
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center gap-2"
            >
              Send Message <FaPaperPlane />
            </button>
            {status && (
              <p
                className={`text-sm mt-2 ${
                  status.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {status.message}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}