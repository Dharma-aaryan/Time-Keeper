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
  const [displayCount, setDisplayCount] = useState(10);
  
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
    
  const displayedProjects = filteredProjects.slice(0, displayCount);
  const hasMoreProjects = filteredProjects.length > displayCount;

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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your projects across industries
          </p>
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

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Projects</CardTitle>
            <p className="text-sm text-muted-foreground">
              {filteredProjects.length} projects found
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Project Name</th>
                    <th className="text-left py-3 px-4 font-medium">Industry</th>
                    <th className="text-left py-3 px-4 font-medium">Client</th>
                    <th className="text-right py-3 px-4 font-medium">Budget</th>
                    <th className="text-center py-3 px-4 font-medium">Team Size</th>
                    <th className="text-center py-3 px-4 font-medium">Status</th>
                    <th className="text-center py-3 px-4 font-medium">Progress</th>
                    <th className="text-left py-3 px-4 font-medium">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProjects.map((project: any, index: number) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-xs text-muted-foreground">{project.description.substring(0, 60)}...</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs">
                          {project.industry}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 font-medium">{project.client}</td>
                      <td className="py-3 px-4 text-right font-medium">{formatCurrency(project.budget)}</td>
                      <td className="py-3 px-4 text-center">{project.teamSize}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-sm font-medium">{project.status}</span>
                      </td>
                      <td className="py-3 px-4 text-center">{project.progress}%</td>
                      <td className="py-3 px-4 text-sm">{project.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {hasMoreProjects && (
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setDisplayCount(prev => prev + 10)}
                  className="px-8"
                >
                  Show More ({filteredProjects.length - displayCount} remaining)
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching the selected filter.</p>
          </div>
        )}
      </main>
    </div>
  );
}
