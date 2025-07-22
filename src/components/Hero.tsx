import { ChevronDown, PlayCircle } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="py-20 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE - TEXT */}
        <div className="space-y-6">
          {/* Greeting badge */}
          <div className="inline-block bg-yellow-400 text-black px-4 py-1 font-medium rounded-full text-sm shadow-sm w-max border border-yellow-600">
            👋 Hello There!
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-gray-900">
            I’m <span className="text-yellow-500">Sahil</span>,
            <br /> Web Developer Based in India.
          </h1>

          {/* Type animation */}
          <TypeAnimation
            sequence={[
              "React & Next.js Expert",
              2000,
              "Beautiful UI, Lightning Fast Code",
              2000,
              "Custom Websites for Your Business",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-lg text-gray-700 block mt-2"
          />

          {/* Subtext */}
          <p className="text-lg text-gray-600">
            I’m an experienced developer with 1+ years of building scalable and beautiful websites for startups and businesses.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-full font-medium shadow-sm">
              <PlayCircle className="h-5 w-5" />
              View My Portfolio
            </button>
            <a
              href="https://calendly.com/sahilsagvekar230/meet"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100"
            >
              Hire Me
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="relative flex justify-center">
          {/* Yellow half-circle background */}
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-yellow-400 rounded-full -z-10"></div>

          {/* Avatar image */}
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-[6px] border-white shadow-lg">
            <Image src="/me.png" alt="Sahil" fill objectFit="cover" />
          </div>

          {/* Label badges */}
          <div className="absolute bottom-4 left-[-60px] bg-green-900 text-white px-4 py-1 rounded-full text-sm shadow">
            Product Designer
          </div>
          <div className="absolute top-4 right-[-60px] bg-yellow-500 text-black px-3 py-1 rounded-full text-sm shadow">
            UI/UX Designer
          </div>

          {/* Rotated 'Hire Me' Circle Badge */}
          <div className="absolute bottom-[-30px] right-[-30px] w-24 h-24 rounded-full border-4 border-green-800 flex items-center justify-center text-xs font-semibold text-green-900 rotate-[15deg]">
            HIRE ME • HIRE ME •
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <div className="max-w-7xl mx-auto mt-20 flex justify-center">
        <button
          className="flex items-center gap-2 text-gray-600 hover:text-black transition"
          onClick={() =>
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Scroll Down <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
