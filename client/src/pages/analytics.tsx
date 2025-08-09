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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Project Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Real-world data from multiple industries with manual project entry
          </p>
        </div>

        {/* Data Source Tabs */}
        <Tabs defaultValue="dataset-overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dataset-overview" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Dataset Overview</span>
            </TabsTrigger>
            <TabsTrigger value="real-data" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Real Industry Data</span>
            </TabsTrigger>
            <TabsTrigger value="manual-entry" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Your Project</span>
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
            <div className="space-y-6">
              <DatasetOverview />
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


        </Tabs>
      </main>
    </div>
  );
}