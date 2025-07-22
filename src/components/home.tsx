"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";

// Define all sections for navigation tracking
const sections = ["intro", "work", "experience", "skills", "contact"];

export default function Home() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await fetch("http://localhost:5050/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMsg("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMsg("❌ Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setResponseMsg("❌ Something went wrong. Try again later.");
    }

    setLoading(false);
  };
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
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-emerald-400 hover:bg-emerald-300 text-black font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
              >
                Get in touch
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("experience");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-emerald-400 text-emerald-400 hover:bg-emerald-900 font-semibold py-3 px-6 rounded-full transition-all duration-300"
              >
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
            {/* Project 1 */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-400 p-8 bg-[#121212] hover:shadow-[0_0_30px_#34d399] transition-shadow duration-300">
              {/* Icons for links */}
              <div className="absolute top-4 right-4 flex gap-3 text-emerald-400 text-xl">
                <a
                  href="https://github.com/SahilSagvekar/doctors-appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title="GitHub Repo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.8-1.5-3.8-1.5-.6-1.4-1.4-1.7-1.4-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.3 1.8 1.3 1.1 1.9 3 1.3 3.7.9.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.5.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>

                <a
                  href="https://doctors-appointment-lac.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title="Live Demo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3z" />
                    <path d="M5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z" />
                  </svg>
                </a>
              </div>

              {/* Card Content */}
              <h4 className="text-2xl font-bold text-white mb-4">
                Doctors Appointment Platform
              </h4>
              <p className="text-gray-400 text-sm">
                A seamless online platform for booking and managing doctor
                appointments with ease and convenience.
              </p>
              <p className="text-gray-500 text-xs mt-4">
                Technologies Used | React, Next-JS, Tailwind CSS NeonDB Prisma
                Clerk Vonage Shadcn UI
              </p>
            </div>

            {/* Project 2 */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-400 p-8 bg-[#121212] hover:shadow-[0_0_30px_#34d399] transition-shadow duration-300">
              {/* Icons for links */}
              <div className="absolute top-4 right-4 flex gap-3 text-emerald-400 text-xl">
                <a
                  href="https://github.com/SahilSagvekar/Digital-Marketing-Agency-Website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title="GitHub Repo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.8-1.5-3.8-1.5-.6-1.4-1.4-1.7-1.4-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.3 1.8 1.3 1.1 1.9 3 1.3 3.7.9.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.5.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>

                <a
                  href="https://digital-marketing-kappa.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title="Live Demo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3z" />
                    <path d="M5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z" />
                  </svg>
                </a>
              </div>

              {/* Card Content */}
              <h4 className="text-2xl font-bold text-white mb-4">
                Digital Marketing Agency Website
              </h4>
              <p className="text-gray-400 text-sm">
                Data visualization dashboard for business analytics with
                real-time updates and interactive charts.
              </p>
              <p className="text-gray-500 text-xs mt-4">
                {" "}
                Technologies Used | Next, TailwindCSS, stripe, Aceternity UI, shadcn/ui
              </p>
            </div>

            {/* Project 3 */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-400 p-8 bg-[#121212] hover:shadow-[0_0_30px_#34d399] transition-shadow duration-300">
              {/* Icons for links */}
              <div className="absolute top-4 right-4 flex gap-3 text-emerald-400 text-xl">
                <a
                  href="https://github.com/SahilSagvekar/NEXT-artshop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title="GitHub Repo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.8-1.5-3.8-1.5-.6-1.4-1.4-1.7-1.4-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.3 1.8 1.3 1.1 1.9 3 1.3 3.7.9.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.5.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>

                <a
                  href="https://next-artshop-gilt.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title="Live Demo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3z" />
                    <path d="M5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z" />
                  </svg>
                </a>
              </div>

              {/* Card Content */}
              <h4 className="text-2xl font-bold text-white mb-4">Artshop Website</h4>
              <p className="text-gray-400 text-sm">
               Ecommerce store built using next js 14 , sanity for admin dashboard to crud products , stripe for payments and zustand for shopping cart global state management.
              </p>
              <p className="text-gray-500 text-xs mt-4"> Technologies Used | Next, TailwindCSS, stripe, shadcn/ui</p>
            </div>

            {/* Project 4 */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-400 p-8 bg-[#121212] hover:shadow-[0_0_30px_#34d399] transition-shadow duration-300">
              {/* Icons for links */}
              <div className="absolute top-4 right-4 flex gap-3 text-emerald-400 text-xl">
                <a
                  href="https://github.com/SahilSagvekar/sample-flat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title="GitHub Repo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.8-1.5-3.8-1.5-.6-1.4-1.4-1.7-1.4-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.3 1.8 1.3 1.1 1.9 3 1.3 3.7.9.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.5.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>

                <a
                  href="https://sample-flat.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title="Live Demo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3z" />
                    <path d="M5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z" />
                  </svg>
                </a>
              </div>

              {/* Card Content */}
              <h4 className="text-2xl font-bold text-white mb-4">SampleFlat</h4>
              <p className="text-gray-400 text-sm">
               TheSampleFlat is a real estate platform that focuses on showcasing new and 
under-construction properties with immersive video content
              </p>
              <p className="text-gray-500 text-xs mt-4">Technologies Used | Next.js, TypeScript, Tailwind CSS, Prisma, MongoDB, Stripe, Shadcn/UI, Zod, Resend / Nodemailer</p>
            </div>

            {/* Project 5 */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-400 p-8 bg-[#121212] hover:shadow-[0_0_30px_#34d399] transition-shadow duration-300">
              {/* Icons for links */}
              <div className="absolute top-4 right-4 flex gap-3 text-emerald-400 text-xl">
                <a
                  href="https://github.com/SahilSagvekar/React-coffee-Website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title="GitHub Repo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.8-1.5-3.8-1.5-.6-1.4-1.4-1.7-1.4-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.3 1.8 1.3 1.1 1.9 3 1.3 3.7.9.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.5.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>

                <a
                  href="https://react-coffee-website.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title="Live Demo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3z" />
                    <path d="M5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z" />
                  </svg>
                </a>
              </div>

              {/* Card Content */}
              <h4 className="text-2xl font-bold text-white mb-4">Coffee Website</h4>
              <p className="text-gray-400 text-sm">
                Bueatifully designed coffee website with a modern UI, showcasing various coffee products and their details.
              </p>
              <p className="text-gray-500 text-xs mt-4">Technologies Used | React, Tailwind CSS</p>
            </div>

            {/* Project 6 */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-400 p-8 bg-[#121212] hover:shadow-[0_0_30px_#34d399] transition-shadow duration-300">
              {/* Icons for links */}
              <div className="absolute top-4 right-4 flex gap-3 text-emerald-400 text-xl">
                <a
                  href="https://github.com/SahilSagvekar/React-Food-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title="GitHub Repo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.2c-3.2.7-3.8-1.5-3.8-1.5-.6-1.4-1.4-1.7-1.4-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.3 1.8 1.3 1.1 1.9 3 1.3 3.7.9.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.5.5.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>

                <a
                  href="https://react-food-app-azure-three.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                  title="Live Demo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3z" />
                    <path d="M5 5h5V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5h-2v5H5V5z" />
                  </svg>
                </a>
              </div>

              {/* Card Content */}
              <h4 className="text-2xl font-bold text-white mb-4">React Food App</h4>
              <p className="text-gray-400 text-sm">
                A simple food ordering application built with React, showcasing various food items and their details.
              </p>
              <p className="text-gray-500 text-xs mt-4">Technologies Used | React, Tailwind CSS</p>
            </div>
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
          // className="min-h-screen bg-[#0e0e0e] text-white px-6 md:px-24 py-20 border-t border-emerald-400"
          className="min-h-screen bg-[#0e0e0e] text-white  py-20 border-t border-emerald-400 pl-0 ml-0 mr-10 pr-20"
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
                      className="w-25 h-21 object-contain"
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
            Whether you have a question, want to collaborate, or just want to say hi — feel free to drop a message. I’ll try my best to get back to you!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border border-emerald-400 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border border-emerald-400 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border border-emerald-400 rounded-md p-3 text-white h-32 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Let's talk about your next project..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-4 bg-emerald-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-emerald-500 transition-colors duration-300"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {responseMsg && <p className="text-sm mt-2">{responseMsg}</p>}
          </form>
        </div>

        {/* Right: Animation */}
        <div className="flex-1 w-full max-w-md">
          <Player
            autoplay
            loop
            src="https://assets5.lottiefiles.com/packages/lf20_zrqthn6o.json"
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </section>
      </motion.main>
    </section>
  );
}
