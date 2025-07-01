import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Calendar, Clock } from "lucide-react";

interface ProjectModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  project?: {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    challenges: string;
    duration: string;
    date: string;
    client?: string;
    liveUrl?: string;
    repoUrl?: string;
  };
}

const ProjectModal = ({
  isOpen = true,
  onClose = () => {},
  project = {
    id: "1",
    title: "E-commerce Website Redesign",
    description:
      "Complete redesign of an e-commerce platform focusing on improved user experience, mobile responsiveness, and conversion optimization. Implemented modern design patterns and optimized checkout flow resulting in 35% increase in mobile conversions.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    technologies: ["React", "Next.js", "Tailwind CSS", "Stripe", "Supabase"],
    challenges:
      "The main challenge was maintaining performance while adding new features. Implemented code splitting and lazy loading to ensure fast page loads even with rich product imagery.",
    duration: "8 weeks",
    date: "January 2023",
    client: "Fashion Retailer Inc.",
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/example",
  },
}: ProjectModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {project.client && <span>Client: {project.client}</span>}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          <div className="rounded-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Project Overview</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Challenges & Solutions
              </h3>
              <p className="text-muted-foreground">{project.challenges}</p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{project.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Duration: {project.duration}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          {project.repoUrl && (
            <Button
              variant="outline"
              className="flex items-center gap-2"
              asChild
            >
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                View Code
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button className="flex items-center gap-2" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Live Site
              </a>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
