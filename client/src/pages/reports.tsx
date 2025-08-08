import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { 
  Download, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  BarChart3,
  PieChart,
  FileText,
  Building2,
  Factory,
  HeartPulse,
  Code
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

export default function Reports() {
  const { data: projectData, isLoading } = useQuery({
    queryKey: ['/api/projects/real-data']
  });

  const { data: analyticsData } = useQuery({
    queryKey: ['/api/projects/analytics']
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const generateReport = (reportType: string) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${reportType}-report-${timestamp}.csv`;
    
    if (projectData?.projects) {
      const headers = ['Project', 'Industry', 'Budget', 'Actual Cost', 'Progress', 'Status', 'Team Size'];
      const csvContent = [
        headers.join(','),
        ...projectData.projects.map((p: any) => [
          `"${p.name}"`,
          `"${p.industry}"`,
          p.budget,
          p.actualCost,
          `${p.progress}%`,
          `"${p.status}"`,
          p.teamSize
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
  
  // Calculate report metrics
  const totalBudget = projects.reduce((sum: number, p: any) => sum + p.budget, 0);
  const totalActualCost = projects.reduce((sum: number, p: any) => sum + p.actualCost, 0);
  const totalTeamMembers = projects.reduce((sum: number, p: any) => sum + p.teamSize, 0);
  const budgetUtilization = Math.round((totalActualCost / totalBudget) * 100);
  const avgProgress = Math.round(projects.reduce((sum: number, p: any) => sum + p.progress, 0) / projects.length);

  // Industry breakdown for charts
  const industryBreakdown = projects.reduce((acc: any, project: any) => {
    acc[project.industry] = (acc[project.industry] || 0) + 1;
    return acc;
  }, {});

  const industryChartData = Object.entries(industryBreakdown).map(([industry, count], index) => ({
    name: industry,
    value: count as number,
    fill: `hsl(${index * 45}, 65%, 50%)`
  }));

  // Budget analysis by status
  const statusBudgetData = projects.reduce((acc: any, project: any) => {
    if (!acc[project.status]) {
      acc[project.status] = { status: project.status, budget: 0, actualCost: 0, count: 0 };
    }
    acc[project.status].budget += project.budget;
    acc[project.status].actualCost += project.actualCost;
    acc[project.status].count += 1;
    return acc;
  }, {});

  const statusChartData = Object.values(statusBudgetData);

  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive project reports and analytics
          </p>
        </div>

        {/* Executive Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{projects.length}</div>
                <p className="text-sm text-muted-foreground mt-1">Total Projects</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{formatCurrency(totalBudget)}</div>
                <p className="text-sm text-muted-foreground mt-1">Total Budget</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{totalTeamMembers}</div>
                <p className="text-sm text-muted-foreground mt-1">Team Members</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{avgProgress}%</div>
                <p className="text-sm text-muted-foreground mt-1">Avg Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Budget Utilization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Allocated: {formatCurrency(totalBudget)}</span>
                  <span>Spent: {formatCurrency(totalActualCost)}</span>
                </div>
                <Progress value={budgetUtilization} className="h-3" />
                <div className="text-center">
                  <span className="text-2xl font-bold">{budgetUtilization}%</span>
                  <p className="text-xs text-muted-foreground">Budget utilized</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Project Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(summary).map(([status, count]) => (
                  <div key={status} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{status}</span>
                    <Badge variant="secondary">{count as number}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Building2 className="w-4 h-4 mr-2" />
                Industry Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(industryBreakdown).slice(0, 4).map(([industry, count]) => (
                  <div key={industry} className="flex justify-between text-sm">
                    <span>{industry}</span>
                    <span className="font-medium">{count as number}</span>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    {Object.keys(industryBreakdown).length} industries total
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Projects by Industry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={industryChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    fontSize={11}
                  >
                    {industryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Budget by Project Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="status" 
                    fontSize={11}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    fontSize={11}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), '']}
                  />
                  <Bar dataKey="budget" fill="hsl(var(--primary))" name="Budget" />
                  <Bar dataKey="actualCost" fill="hsl(var(--chart-2))" name="Actual Cost" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Project List */}
        <Card>
          <CardHeader>
            <CardTitle>Project Performance Summary</CardTitle>
            <p className="text-sm text-muted-foreground">
              Detailed breakdown of all active projects
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Project</th>
                    <th className="text-left py-3 px-4 font-medium">Industry</th>
                    <th className="text-right py-3 px-4 font-medium">Budget</th>
                    <th className="text-right py-3 px-4 font-medium">Spent</th>
                    <th className="text-center py-3 px-4 font-medium">Progress</th>
                    <th className="text-center py-3 px-4 font-medium">Status</th>
                    <th className="text-center py-3 px-4 font-medium">Team</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.slice(0, 10).map((project: any, index: number) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{project.name}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs">
                          {project.industry}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">{formatCurrency(project.budget)}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={project.actualCost > project.budget ? 'text-red-600' : 'text-green-600'}>
                          {formatCurrency(project.actualCost)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-sm">{project.progress}%</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-sm">{project.status}</span>
                      </td>
                      <td className="py-3 px-4 text-center">{project.teamSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {projects.length > 10 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Showing 10 of {projects.length} projects. Download full report for complete data.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
