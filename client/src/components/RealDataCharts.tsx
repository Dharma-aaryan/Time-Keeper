import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from "recharts";

interface RealDataChartsProps {
  data: any;
}

export default function RealDataCharts({ data }: RealDataChartsProps) {
  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading real project data...</p>
      </div>
    );
  }

  const { industryBreakdown, budgetAnalysis, timelineData, summary } = data;

  // Transform industry breakdown for pie chart
  const industryChartData = Object.entries(industryBreakdown).map(([industry, count]) => ({
    name: industry,
    value: count as number,
    color: `hsl(${Math.hash(industry) % 360}, 65%, 50%)`
  }));

  // Format budget data for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.totalBudget)}</div>
            <p className="text-xs text-blue-600 font-medium">Real industry data</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Actual Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(summary.totalActualCost)}</div>
            <p className="text-xs text-green-600 font-medium">
              {Math.round((summary.totalActualCost / summary.totalBudget) * 100)}% of budget
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Team Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.avgTeamSize}</div>
            <p className="text-xs text-purple-600 font-medium">people per project</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.avgProgress}%</div>
            <p className="text-xs text-orange-600 font-medium">completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Industry Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Project Distribution by Industry</CardTitle>
            <p className="text-sm text-muted-foreground">
              Real project data across {Object.keys(industryBreakdown).length} industries
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  fontSize={11}
                >
                  {industryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(industryBreakdown).map(([industry, count]) => (
                <Badge key={industry} variant="secondary" className="text-xs">
                  {industry}: {count as number}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget vs Actual Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Budget vs Actual Costs</CardTitle>
            <p className="text-sm text-muted-foreground">
              Financial performance across real projects
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetAnalysis.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  fontSize={10}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), '']}
                />
                <Legend />
                <Bar dataKey="estimated" fill="hsl(var(--primary))" name="Estimated Budget" />
                <Bar dataKey="actual" fill="hsl(var(--chart-2))" name="Actual Cost" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Timeline Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Project Duration vs Progress</CardTitle>
            <p className="text-sm text-muted-foreground">
              Timeline analysis from real project data
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timelineData.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis fontSize={10} />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="duration" 
                  stackId="1" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))"
                  name="Duration (days)"
                />
                <Area 
                  type="monotone" 
                  dataKey="progress" 
                  stackId="2" 
                  stroke="hsl(var(--chart-3))" 
                  fill="hsl(var(--chart-3))"
                  name="Progress %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Industry Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Industry</CardTitle>
            <p className="text-sm text-muted-foreground">
              Cross-industry project performance metrics
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(industryBreakdown).map(([industry, count]) => {
                const industryProjects = timelineData.filter(p => p.industry === industry);
                const avgProgress = Math.round(
                  industryProjects.reduce((sum, p) => sum + p.progress, 0) / industryProjects.length || 0
                );
                
                return (
                  <div key={industry} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">{industry}</p>
                      <p className="text-xs text-muted-foreground">{count as number} projects</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{avgProgress}%</p>
                      <p className="text-xs text-muted-foreground">avg progress</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Simple hash function for consistent colors
declare global {
  interface String {
    hash(): number;
  }
}

String.prototype.hash = function() {
  let hash = 0;
  if (this.length === 0) return hash;
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};