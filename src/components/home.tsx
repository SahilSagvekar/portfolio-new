import React, { useState } from "react";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import ProjectsShowcase from "./ProjectsShowcase";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import { TypeAnimation } from "react-type-animation";
import { PixelTrail } from "../fancy/components/background/pixel-trail";



const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, this would update the document class or a theme context
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? "dark" : ""}`}>

      {/* Navigation */}
      <header className="sticky top-0 z-10 bg-background border-b border-border py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-bold text-xl">DevPortfolio</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="hover:text-primary transition-colors">
              Home
            </a>
            <a
              href="#projects"
              className="hover:text-primary transition-colors"
            >
              Projects
            </a>
            <a href="#skills" className="hover:text-primary transition-colors">
              Skills
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button className="hidden md:inline-flex">Hire Me</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 md:py-32 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {/* <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hi, I'm <span className="text-primary">Alex</span> <br />
              Freelance Web Developer
            </h1> */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Hi, I'm <span className="text-primary">Alex</span>
              <br />
              <TypeAnimation
                sequence={[
                  "Freelance Web Developer",
                  2000,
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
                className="text-primary"
              />
            </h1>

            <p className="text-lg text-muted-foreground">
              I create beautiful, responsive websites and web applications that
              help businesses grow online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-medium">
                View My Work
              </Button>
              <Button size="lg" variant="outline" className="font-medium">
                Contact Me
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -z-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
              <Avatar className="w-64 h-64 border-4 border-primary/20">
                <AvatarImage
                  src="/me.png"
                  alt="Developer Avatar"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 flex justify-center">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Scroll Down <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Check out some of my recent work. I specialize in creating
              responsive, user-friendly websites and applications.
            </p>
          </div>
          <ProjectsShowcase />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I've worked with a variety of technologies and tools throughout my
              career. Here's a snapshot of my technical expertise.
            </p>
          </div>
          <SkillsSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 md:px-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how I can help bring your
              ideas to life. Fill out the form below and I'll get back to you
              soon.
            </p>
          </div>
          <ContactSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DevPortfolio. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
