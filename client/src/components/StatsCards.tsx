import { useQuery } from "@tanstack/react-query";
import { Clock, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";

interface Stats {
  todayHours: number;
  weekHours: number;
  billableHours: number;
}

export default function StatsCards() {
  const { toast } = useToast();

  const { data: stats, isLoading, error } = useQuery<Stats>({
    queryKey: ["/api/stats"],
    retry: false,
  });

  if (error && isUnauthorizedError(error as Error)) {
    toast({
      title: "Unauthorized",
      description: "You are logged out. Logging in again...",
      variant: "destructive",
    });
    setTimeout(() => {
      window.location.href = "/api/login";
    }, 500);
    return null;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 bg-muted rounded w-20 mb-2"></div>
                    <div className="h-8 bg-muted rounded w-12"></div>
                  </div>
                  <div className="w-12 h-12 bg-muted rounded-lg"></div>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const todayHours = stats?.todayHours || 0;
  const weekHours = stats?.weekHours || 0;
  const billableHours = stats?.billableHours || 0;
  const billableRate = weekHours > 0 ? Math.round((billableHours / weekHours) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Today's Hours</p>
              <p className="text-2xl font-bold text-foreground mt-1">{todayHours}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+12%</span>
            <span className="text-muted-foreground ml-1">vs yesterday</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold text-foreground mt-1">{weekHours}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">
              {Math.round((weekHours / 40) * 100)}%
            </span>
            <span className="text-muted-foreground ml-1">of target (40h)</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Billable Hours</p>
              <p className="text-2xl font-bold text-foreground mt-1">{billableHours}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-purple-600 font-medium">{billableRate}%</span>
            <span className="text-muted-foreground ml-1">billable rate</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
