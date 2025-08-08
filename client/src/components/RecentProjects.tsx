import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@shared/schema";

export default function RecentProjects() {
  const { toast } = useToast();

  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    retry: false,
  });

  if (error && isUnauthorizedError(error as Error)) {
    toast({
      title: "Unauthorized",
      description: "You are logged out. Logging in again...",
      variant: "destructive",
    });
    setTimeout(() => {
      window.location.href = "/api/login";
    }, 500);
    return null;
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 p-2">
                <div className="w-3 h-3 bg-muted rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
                <div className="h-3 bg-muted rounded w-8"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentProjects = projects?.slice(0, 3) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentProjects.length === 0 ? (
          <p className="text-muted-foreground text-sm">No projects found</p>
        ) : (
          recentProjects.map((project, index) => (
            <div
              key={project.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.color || '#3b82f6' }}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{project.name}</p>
                <p className="text-xs text-muted-foreground">
                  {project.description || 'No description'}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">0h</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
