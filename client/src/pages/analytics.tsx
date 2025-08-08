import Header from "@/components/Header";
import ProjectEfficiencyChart from "@/components/ProjectEfficiencyChart";
import TeamProductivityChart from "@/components/TeamProductivityChart";
import ResourceUtilizationChart from "@/components/ResourceUtilizationChart";
import ProjectTimelineChart from "@/components/ProjectTimelineChart";
import ManualProjectForm from "@/components/ManualProjectForm";
import RealDataCharts from "@/components/RealDataCharts";
import DatasetOverview from "@/components/DatasetOverview";
import DataTable from "@/components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download, Filter, Database, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Analytics() {
  const { data: realData, isLoading } = useQuery({
    queryKey: ['/api/projects/analytics']
  });

  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Project Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Real-world data from multiple industries with manual project entry
            </p>
          </div>
          <div className="flex space-x-3">
            <Select defaultValue="30d">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Data Source Tabs */}
        <Tabs defaultValue="real-data" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="real-data" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Real Industry Data</span>
            </TabsTrigger>
            <TabsTrigger value="dataset-overview" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Dataset Overview</span>
            </TabsTrigger>
            <TabsTrigger value="manual-entry" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Your Project</span>
            </TabsTrigger>
            <TabsTrigger value="demo-charts" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Sample Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="real-data">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <RealDataCharts data={realData} />
            )}
          </TabsContent>

          <TabsContent value="dataset-overview">
            <div className="space-y-8">
              <DatasetOverview />
              <DataTable />
            </div>
          </TabsContent>

          <TabsContent value="manual-entry">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Add Your Project Data</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Enter your project information to see it integrated with our analytics
                  </p>
                </CardHeader>
                <CardContent>
                  <ManualProjectForm />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="demo-charts">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-green-600 font-medium">Sample data</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-blue-600 font-medium">Demo metrics</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Team Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-green-600 font-medium">Example value</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Budget Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-green-600 font-medium">Demonstration</p>
                </CardContent>
              </Card>
            </div>

            {/* Demo Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ProjectEfficiencyChart />
              <TeamProductivityChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ResourceUtilizationChart />
              <ProjectTimelineChart />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}