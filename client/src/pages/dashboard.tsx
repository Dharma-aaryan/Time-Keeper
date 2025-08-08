import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import QuickTimer from "@/components/QuickTimer";
import RecentProjects from "@/components/RecentProjects";
import StatsCards from "@/components/StatsCards";
import TimeEntriesTable from "@/components/TimeEntriesTable";
import TimeOffRequests from "@/components/TimeOffRequests";
import Notifications from "@/components/Notifications";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleExportTimesheet = () => {
    toast({
      title: "Export Started",
      description: "Your timesheet export is being prepared...",
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <QuickTimer />
            <RecentProjects />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Dashboard Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back, {user?.firstName || 'there'}! Here's your time tracking overview.
                </p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={handleExportTimesheet}
                  className="flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </Button>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Entry</span>
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Recent Time Entries */}
            <TimeEntriesTable />

            {/* Time Off & Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TimeOffRequests />
              <Notifications />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
