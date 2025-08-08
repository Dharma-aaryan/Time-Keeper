import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Project {
  id: string;
  name: string;
  industry: string;
  client: string;
  budget: number;
  actualCost: number;
  teamSize: number;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  location: string;
}

export default function DataTable() {
  const [showAll, setShowAll] = useState(false);
  
  const { data: realData, isLoading } = useQuery({
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

  const downloadData = () => {
    if (!realData?.projects) return;
    
    const headers = ['Name', 'Industry', 'Client', 'Budget', 'Actual Cost', 'Team Size', 'Status', 'Progress', 'Start Date', 'End Date', 'Location'];
    const csvContent = [
      headers.join(','),
      ...realData.projects.map((row: Project) => [
        `"${row.name}"`,
        `"${row.industry}"`,
        `"${row.client}"`,
        row.budget,
        row.actualCost,
        row.teamSize,
        `"${row.status}"`,
        `${row.progress}%`,
        `"${row.startDate}"`,
        `"${row.endDate}"`,
        `"${row.location}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'project-data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!realData?.projects) {
    return (
      <Card>
        <CardContent className="p-8">
          <p className="text-center text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  const projects: Project[] = realData.projects;
  const displayedProjects = showAll ? projects : projects.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Project Data Table</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {projects.length} projects across {new Set(projects.map(p => p.industry)).size} industries
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAll(!showAll)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showAll ? 'Show Less' : `View All ${projects.length}`}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={downloadData}
            >
              <Download className="w-4 h-4 mr-2" />
              Download CSV
            </Button>
          </div>
        </div>
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
                <th className="text-right py-3 px-4 font-medium">Actual Cost</th>
                <th className="text-center py-3 px-4 font-medium">Team Size</th>
                <th className="text-center py-3 px-4 font-medium">Status</th>
                <th className="text-center py-3 px-4 font-medium">Progress</th>
                <th className="text-left py-3 px-4 font-medium">Location</th>
              </tr>
            </thead>
            <tbody>
              {displayedProjects.map((project: Project, index: number) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{project.name}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="text-xs">
                      {project.industry}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{project.client}</td>
                  <td className="py-3 px-4 text-right font-medium">
                    {formatCurrency(project.budget)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={project.actualCost > project.budget ? 'text-red-600' : 'text-green-600'}>
                      {formatCurrency(project.actualCost)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">{project.teamSize}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge 
                      variant={
                        project.status === 'completed' ? 'default' : 
                        project.status === 'in-progress' ? 'secondary' :
                        project.status === 'testing' ? 'outline' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {project.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-12 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs">{project.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {!showAll && projects.length > 5 && (
          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              onClick={() => setShowAll(true)}
            >
              Show {projects.length - 5} more projects
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}