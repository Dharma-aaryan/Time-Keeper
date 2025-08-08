import Header from "@/components/Header";
import ProjectOverviewCards from "@/components/ProjectOverviewCards";
import ActiveProjectsTable from "@/components/ActiveProjectsTable";
import ProjectStatusChart from "@/components/ProjectStatusChart";
import TeamPerformance from "@/components/TeamPerformance";
import { Button } from "@/components/ui/button";
import { Plus, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();

  const handleRefreshData = () => {
    toast({
      title: "Data Refreshed",
      description: "Project data has been updated with the latest information.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your project data export is being prepared...",
    });
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Project Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Real-time insights into your project portfolio and team performance
            </p>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleRefreshData}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExportData}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <ProjectOverviewCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <ActiveProjectsTable />
          </div>
          <div>
            <ProjectStatusChart />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-8">
          <TeamPerformance />
        </div>
      </main>
    </div>
  );
}
