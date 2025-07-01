import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectModal from "./ProjectModal";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  client?: string;
  duration?: string;
  challenge?: string;
}

interface ProjectsShowcaseProps {
  projects?: Project[];
}

const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  projects = defaultProjects,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    "all",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  return (
    <section className="py-16 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my recent work across various domains and technologies. Each
            project demonstrates my approach to problem-solving and technical
            implementation.
          </p>
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <div className="flex justify-center mb-8">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer rounded-lg overflow-hidden border bg-card text-card-foreground shadow transition-all hover:shadow-lg"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}

        <Dialog
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        >
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </Dialog>
      </div>
    </section>
  );
};

// Default projects data for demonstration
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A full-featured online store with product catalog, shopping cart, user accounts, and payment processing.",
    category: "web",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API", "Redux"],
    liveUrl: "https://example.com/ecommerce",
    repoUrl: "https://github.com/example/ecommerce",
    client: "RetailCo Inc.",
    duration: "3 months",
    challenge:
      "Implementing a secure payment system while maintaining a smooth user experience.",
  },
  {
    id: "2",
    title: "Health & Fitness App",
    description:
      "Mobile application for tracking workouts, nutrition, and personal health metrics with customized recommendations.",
    category: "mobile",
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80",
    technologies: ["React Native", "Firebase", "GraphQL", "TensorFlow.js"],
    liveUrl: "https://apps.example.com/fitness",
    repoUrl: "https://github.com/example/fitness-app",
    duration: "4 months",
    challenge:
      "Creating an algorithm for personalized workout recommendations based on user data.",
  },
  {
    id: "3",
    title: "Corporate Dashboard",
    description:
      "Data visualization dashboard for business analytics with real-time updates and interactive charts.",
    category: "web",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    technologies: ["Vue.js", "D3.js", "Express", "PostgreSQL", "WebSockets"],
    liveUrl: "https://example.com/dashboard",
    repoUrl: "https://github.com/example/dashboard",
    client: "DataCorp Analytics",
    duration: "2 months",
    challenge:
      "Optimizing performance for real-time data visualization with large datasets.",
  },
  {
    id: "4",
    title: "Community Forum",
    description:
      "Online discussion platform with user profiles, topic categories, and moderation tools.",
    category: "web",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    technologies: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Socket.io",
      "Tailwind CSS",
    ],
    liveUrl: "https://example.com/forum",
    repoUrl: "https://github.com/example/forum",
    duration: "3 months",
    challenge: "Building a scalable notification system for user interactions.",
  },
  {
    id: "5",
    title: "Travel Companion App",
    description:
      "Mobile app for travelers with itinerary planning, local recommendations, and offline maps.",
    category: "mobile",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    technologies: ["Flutter", "Firebase", "Google Maps API", "TripAdvisor API"],
    liveUrl: "https://apps.example.com/travel",
    repoUrl: "https://github.com/example/travel-app",
    client: "Wanderlust Ventures",
    duration: "5 months",
    challenge:
      "Implementing efficient offline data storage and synchronization.",
  },
  {
    id: "6",
    title: "Portfolio Website",
    description:
      "Personal portfolio website showcasing projects and skills with a modern, responsive design.",
    category: "design",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    liveUrl: "https://example.com/portfolio",
    repoUrl: "https://github.com/example/portfolio",
    duration: "3 weeks",
    challenge: "Creating engaging animations without compromising performance.",
  },
];

export default ProjectsShowcase;
