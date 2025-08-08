import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { Plus, Calendar, Users, DollarSign, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function Projects() {
  const [filter, setFilter] = useState('all');
  
  const { data: projectData, isLoading } = useQuery({
    queryKey: ['/api/projects/real-data']
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading || !projectData) {
    return (
      <div className="bg-background min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  const { projects, summary } = projectData;
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter((p: any) => p.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      case 'planning': return 'bg-gray-100 text-gray-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskIcon = (risk: string) => {
    if (risk === 'high') return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (risk === 'medium') return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    return <AlertTriangle className="w-4 h-4 text-green-500" />;
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your projects across industries
            </p>
          </div>
          <Button onClick={() => window.location.href = '/analytics#manual-entry'}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Project Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.total}</div>
              <p className="text-xs text-blue-600 font-medium">Across multiple industries</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.active}</div>
              <p className="text-xs text-green-600 font-medium">Currently in progress</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Total Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(projects.reduce((sum: number, p: any) => sum + p.budget, 0))}
              </div>
              <p className="text-xs text-purple-600 font-medium">Combined value</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.reduce((sum: number, p: any) => sum + p.teamSize, 0)}
              </div>
              <p className="text-xs text-orange-600 font-medium">Total workforce</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-6">
          {['all', 'planning', 'in-progress', 'testing', 'completed'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status === 'all' ? 'All Projects' : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project: any) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {project.industry}
                      </Badge>
                      <Badge className={getStatusColor(project.status) + " text-xs"}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  {getRiskIcon(project.riskLevel)}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-medium">{formatCurrency(project.budget)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Team Size</p>
                    <p className="font-medium">{project.teamSize} members</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-medium">{formatDate(project.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">End Date</p>
                    <p className="font-medium">{formatDate(project.endDate)}</p>
                  </div>
                </div>

                {/* Client & Location */}
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Client</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium text-xs">{project.location}</p>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="pt-2">
                    <p className="text-muted-foreground text-sm mb-2">Technologies</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching the selected filter.</p>
          </div>
        )}
      </main>
    </div>
  );
}
