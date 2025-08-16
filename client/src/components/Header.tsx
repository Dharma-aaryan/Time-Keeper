import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Clock, BarChart3, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

// Utility functions for CSV download
const convertToCSV = (data: any[]) => {
  if (!data || data.length === 0) return '';
  
  const headers = ['Name', 'Industry', 'Client', 'Budget', 'Actual Cost', 'Team Size', 'Status', 'Progress', 'Start Date', 'End Date', 'Location'];
  const csvContent = [
    headers.join(','),
    ...data.map(row => [
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
  
  return csvContent;
};

const downloadCSV = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function Header() {
  const [location] = useLocation();
  const [currentTimer, setCurrentTimer] = useState({
    isRunning: true,
    duration: "2:34:15",
    project: "Website Redesign"
  });

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">ProjectDash</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className={`flex items-center space-x-2 ${isActive('/') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link href="/projects" className={`flex items-center space-x-2 ${isActive('/projects') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
                <Clock className="w-4 h-4" />
                <span>Projects</span>
              </Link>
              <Link href="/analytics" className={`flex items-center space-x-2 ${isActive('/analytics') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
                <Calendar className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
              <Link href="/reports" className={`flex items-center space-x-2 ${isActive('/reports') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
                <Settings className="w-4 h-4" />
                <span>Reports</span>
              </Link>
              <Link href="/firebase" className={`flex items-center space-x-2 ${isActive('/firebase') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
                <BarChart3 className="w-4 h-4" />
                <span>Firebase</span>
              </Link>
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Download project data as CSV
                fetch('/api/projects/real-data')
                  .then(res => res.json())
                  .then(data => {
                    const csv = convertToCSV(data.projects);
                    downloadCSV(csv, 'project-data.csv');
                  })
                  .catch(err => console.error('Download failed:', err));
              }}
            >
              Download Data
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
