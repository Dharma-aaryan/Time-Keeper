import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

export default function ProjectOverviewCards() {
  const { data: realData, isLoading } = useQuery({
    queryKey: ['/api/projects/real-data']
  });

  if (isLoading || !realData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <div className="animate-pulse h-4 bg-muted rounded w-24"></div>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="animate-pulse h-3 bg-muted rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const { projects = [], summary = {} } = (realData as any) || {};
  const totalBudget = projects.reduce((sum: number, p: any) => sum + p.budget, 0);
  const totalActual = projects.reduce((sum: number, p: any) => sum + p.actualCost, 0);
  const avgTeamSize = Math.round(projects.reduce((sum: number, p: any) => sum + p.teamSize, 0) / projects.length);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const activeProjects = projects.filter((p: any) => p.status === 'in-progress').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Projects */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projects.length}</div>
          <p className="text-xs text-green-600 font-medium">Across 8 industries</p>
        </CardContent>
      </Card>

      {/* Active Projects */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeProjects}</div>
          <p className="text-xs text-blue-600 font-medium">Currently in progress</p>
        </CardContent>
      </Card>

      {/* Average Team Size */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Average Team Size</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgTeamSize}</div>
          <p className="text-xs text-green-600 font-medium">Team members</p>
        </CardContent>
      </Card>

      {/* Total Budget */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
          <p className="text-xs text-green-600 font-medium">Portfolio value</p>
        </CardContent>
      </Card>
    </div>
  );
}