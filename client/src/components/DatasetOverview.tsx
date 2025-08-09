import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { 
  Building2, 
  HeartPulse, 
  Factory, 
  Code, 
  Zap, 
  Pill, 
  Rocket, 
  DollarSign,
  Users,
  Calendar,
  TrendingUp
} from "lucide-react";

export default function DatasetOverview() {
  const { data: realData, isLoading } = useQuery({
    queryKey: ['/api/projects/real-data']
  });

  if (isLoading || !realData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { projects = [], stats = {} } = (realData as any) || {};

  const industryIcons: Record<string, any> = {
    'Construction': Building2,
    'Healthcare': HeartPulse,
    'Manufacturing': Factory,
    'Technology': Code,
    'Energy': Zap,
    'Pharmaceutical': Pill,
    'Aerospace': Rocket,
    'Financial Services': DollarSign,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalBudget = projects.reduce((sum: number, p: any) => sum + p.budget, 0);
  const totalTeamMembers = projects.reduce((sum: number, p: any) => sum + p.teamSize, 0);

  return (
    <div className="space-y-8">
      {/* Dataset Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Building2 className="w-4 h-4 mr-2" />
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-blue-600 font-medium">Across 8 industries</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
            <p className="text-xs text-green-600 font-medium">Combined budgets</p>
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
            <div className="text-2xl font-bold">{totalTeamMembers}</div>
            <p className="text-xs text-purple-600 font-medium">Total workforce</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2023-2025</div>
            <p className="text-xs text-orange-600 font-medium">Project timeline</p>
          </CardContent>
        </Card>
      </div>

      {/* Industry Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Dataset Breakdown</CardTitle>
          <p className="text-sm text-muted-foreground">
            Real project data sources and industry statistics
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(stats).map(([industry, stat]: [string, any]) => {
              const Icon = industryIcons[industry] || Building2;
              const industryProjects = projects.filter((p: any) => p.industry === industry);
              
              return (
                <div key={industry} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{industry}</h3>
                      <p className="text-xs text-muted-foreground">{industryProjects.length} projects</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Budget:</span>
                      <span className="font-medium">{formatCurrency(stat.avgBudget)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Duration:</span>
                      <span className="font-medium">{stat.avgDuration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Projects:</span>
                      <span className="font-medium">{stat.totalProjects.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sample Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Project Data</CardTitle>
          <p className="text-sm text-muted-foreground">
            Preview of the real project dataset included in the analytics
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Project Name</th>
                  <th className="text-left py-3 px-4 font-medium">Industry</th>
                  <th className="text-left py-3 px-4 font-medium">Budget</th>
                  <th className="text-left py-3 px-4 font-medium">Team Size</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Location</th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 6).map((project: any, index: number) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{project.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{project.industry}</Badge>
                    </td>
                    <td className="py-3 px-4">{formatCurrency(project.budget)}</td>
                    <td className="py-3 px-4">{project.teamSize}</td>
                    <td className="py-3 px-4">
                      <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{project.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Data Sources & Authenticity</CardTitle>
          <p className="text-sm text-muted-foreground">
            Information about the real datasets integrated into this dashboard
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Government & Public Sources</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 text-blue-600" />
                  <div>
                    <p className="font-medium">San Francisco Building Permits</p>
                    <p className="text-muted-foreground text-xs">Construction project data from SF Open Data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 text-green-600" />
                  <div>
                    <p className="font-medium">ClinicalTrials.gov</p>
                    <p className="text-muted-foreground text-xs">Healthcare research project timelines</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 text-purple-600" />
                  <div>
                    <p className="font-medium">NASA Project Database</p>
                    <p className="text-muted-foreground text-xs">Aerospace engineering project data</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Industry Datasets</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 text-orange-600" />
                  <div>
                    <p className="font-medium">Manufacturing IoT Data</p>
                    <p className="text-muted-foreground text-xs">Industrial automation project metrics</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 text-red-600" />
                  <div>
                    <p className="font-medium">Financial Services Projects</p>
                    <p className="text-muted-foreground text-xs">Banking and fintech development data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-4 h-4 mt-0.5 text-teal-600" />
                  <div>
                    <p className="font-medium">Energy Grid Projects</p>
                    <p className="text-muted-foreground text-xs">Renewable energy installation data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}