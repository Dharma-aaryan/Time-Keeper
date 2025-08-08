import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { Project } from "@shared/schema";

export default function QuickTimer() {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState("");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    retry: false,
  });

  const handleStartTimer = () => {
    if (!selectedProject) {
      toast({
        title: "Project Required",
        description: "Please select a project before starting the timer.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Timer Started",
      description: `Timer started for ${taskDescription || 'selected project'}`,
    });
  };

  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Quick Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="project" className="text-sm font-medium text-foreground mb-2 block">
            Project
          </Label>
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger>
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects?.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="task" className="text-sm font-medium text-foreground mb-2 block">
            Task
          </Label>
          <Input
            id="task"
            type="text"
            placeholder="What are you working on?"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <Button
          className="w-full flex items-center justify-center space-x-2"
          onClick={handleStartTimer}
        >
          <Play className="w-4 h-4" />
          <span>Start Timer</span>
        </Button>
      </CardContent>
    </Card>
  );
}
