"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

// Define all sections for navigation tracking
const sections = ["intro", "work", "experience", "skills", "contact"];

export default function Home() {
  // State to track the currently active section
  const [activeSection, setActiveSection] = useState("intro");

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      let current = "intro";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { ref: workRef, inView: workInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="min-h-screen bg-[#0e0e0e] text-white flex flex-col md:flex-row">
      <motion.div
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
        className="fixed z-50 top-10 left-6 sm:right-10 sm:left-auto bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-3 rounded-full shadow-lg"
      >
        <a
          href="https://calendly.com/sahilsagvekar230/new-meeting-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="text-white text-base font-semibold hover:scale-105 transition-transform duration-300">
            Hire Me
          </Button>
        </a>
      </motion.div>

      {/* Sidebar Navigation */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:w-1/4 w-full px-6 py-8"
      >
        <h1 className="text-base font-semibold tracking-wide mb-10 fixed text-gray-300">
          SAHIL SAGVEKAR
        </h1>

        <nav className="space-y-2 text-sm p-6 mt-32 fixed left-0 top-20 w-52">
          {sections.map((section) => (
            <a
              href={`#${section}`}
              key={section}
              className={`relative block px-4 py-2 rounded-lg transition-all duration-300 transform ${
                activeSection === section
                  ? "text-emerald-400 font-semibold scale-[1.03]"
                  : "text-gray-500 hover:text-emerald-400 hover:scale-[1.01]"
              }`}
            >
              <span
                className={`absolute left-0 top-0 h-full w-1 bg-emerald-400 rounded transition-all duration-300 ${
                  activeSection === section ? "opacity-100" : "opacity-0"
                }`}
              />
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="flex-1 flex flex-col justify-start p-6"
      >
        {/* Intro Section */}
        <div id="intro" className="mr-60 pl-50 min-h-[90vh] flex items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-emerald-400 text-sm font-medium"
            >
              <span className="animate-blink">●</span> Open to New Projects
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mt-3 mb-8"
            >
              Engineering seamless digital experiences with precision.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 mt-4"
            >
              <button className="bg-emerald-400 hover:bg-emerald-300 text-black font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300">
                Get in touch
              </button>
              <button className="border border-emerald-400 text-emerald-400 hover:bg-emerald-900 font-semibold py-3 px-6 rounded-full transition-all duration-300">
                My work
              </button>
            </motion.div>
          </div>
        </div>

        {/* Work Section */}
        <motion.section
          id="work"
          ref={workRef}
          initial={{ opacity: 0, y: 30 }}
          animate={workInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col justify-start p-6 min-h-screen border-t border-gray-800 pt-20 bg-[#0e0e0e] pr-56 pl-0"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-16 text-white">
            My Work
          </h3>

          <div className="grid md:grid-cols-2 gap-12">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden border border-emerald-400 p-8 bg-[#121212] hover:shadow-[0_0_30px_#34d399] transition-shadow duration-300"
              >
                <div className="absolute top-4 right-4 text-emerald-400 text-xl">
                  ↗
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  SampleFlat
                </h4>
                <p className="text-gray-400 text-sm">
                  A full-fledged real estate marketplace with buyer-seller video
                  calls, bookings, and Stripe payments.
                </p>
                <p className="text-gray-500 text-xs mt-4">2024 | Full-stack</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          ref={workRef}
          initial={{ opacity: 0, y: 30 }}
          animate={workInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-h-screen bg-[#0e0e0e] text-white px-6 md:px-24 py-20 border-t border-emerald-400"
        >
          <h2 className="font-sans text-4xl md:text-5xl font-bold mb-20">
            Work experience
          </h2>

          <div className="flex flex-col md:flex-row items-start gap-12">
            {/* Left: Experience List */}
            <div className="w-full md:w-1/2 space-y-16">
              {[
                {
                  company: "Homeville Group",
                  role: "Software Engineer - 1",
                  description:
                    "Worked as a Software Development Engineer - I at Homeville, contributing to the development and maintenance of scalable fintech applications.",
                },
                {
                  company: "NullClass",
                  role: "Web Development Intern",
                  description:
                    "Built and deployed MERN-based web applications with real-time CRUD functionality.",
                },
                {
                  company: "Business Web Solutions",
                  role: "Web Development Intern",
                  description:
                    "Contributed to fullstack modules while learning MERN stack fundamentals.",
                },
              ].map((exp, i) => (
                <div className="flex items-start gap-6" key={i}>
                  <div>
                    <h3 className="text-xl font-semibold">{exp.company}</h3>
                    <p className="text-gray-400 font-medium text-sm mb-2">
                      {exp.role}
                    </p>
                    <p className="text-gray-400 text-sm max-w-2xl">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Animation */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
              {/* this one */}
              <Player
                autoplay
                loop
                src="https://assets1.lottiefiles.com/packages/lf20_4kx2q32n.json"
                style={{ height: "300px", width: "300px" }}
              />
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-h-screen bg-[#0e0e0e] text-white px-6 md:px-24 py-20 border-t border-emerald-400"
        >
          <h2 className="font-sans text-4xl md:text-5xl font-bold mb-20">
            Skills
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {[
              { name: "JavaScript", icon: "/icons/js.png" },
              { name: "React", icon: "/icons/react.jpg" },
              { name: "Next.js", icon: "/icons/next.png" },
              { name: "Node.js", icon: "/icons/node.png" },
              { name: "TypeScript", icon: "/icons/ts.png" },
              { name: "MongoDB", icon: "/icons/mongodb.png" },
              { name: "Tailwind CSS", icon: "/icons/tailwind.jpg" },
              { name: "Express.js", icon: "/icons/express.png" },
            ].map((skill, index) => (
              <div
                key={skill.name}
                className="flip-card w-full h-40 bg-transparent border border-emerald-400 rounded-xl"
              >
                <div className="flip-inner w-full h-full">
                  {/* Front Side */}
                  <div className="flip-front bg-[#121212] text-center flex items-center justify-center">
                    <p className="text-white font-medium text-sm">
                      {skill.name}
                    </p>
                  </div>

                  {/* Back Side */}
                  <div className="flip-back bg-[#121212] flex items-center justify-center">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-29 h-29 object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <section
          id="contact"
          className="px-6 md:px-24 py-24 text-white border-t border-emerald-400 bg-[#0e0e0e]"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
            {/* Left: Contact Form */}
            <div className="flex-1 w-full">
              <h2 className="text-3xl font-bold text-emerald-400 mb-8">
                Let’s work together
              </h2>

              <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                Whether you have a question, want to collaborate, or just want
                to say hi — feel free to drop a message. I’ll try my best to get
                back to you!
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border border-emerald-400 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border border-emerald-400 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Message
                  </label>
                  <textarea
                    className="w-full bg-transparent border border-emerald-400 rounded-md p-3 text-white h-32 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Let's talk about your next project..."
                  ></textarea>
                </div>

                <button className="mt-4 bg-emerald-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-emerald-500 transition-colors duration-300">
                  Send Message
                </button>
              </div>
            </div>

            {/* Right: Image */}
            <div className="flex-1 w-full max-w-md">
              <div className="flex-1 w-full max-w-md">
                <Player
                  autoplay
                  loop
                  src="https://assets5.lottiefiles.com/packages/lf20_zrqthn6o.json"
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </div>
          </div>
        </section>
      </motion.main>
    </section>
  );
}
