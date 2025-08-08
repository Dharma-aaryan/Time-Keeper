import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import type { TimeOffRequest } from "@shared/schema";

export default function TimeOffRequests() {
  const { toast } = useToast();

  const { data: requests, isLoading, error } = useQuery<TimeOffRequest[]>({
    queryKey: ["/api/time-off-requests"],
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const handleRequestTimeOff = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Time off request form will be available soon.",
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Time Off Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="h-4 bg-background rounded w-20 mb-1"></div>
                  <div className="h-3 bg-background rounded w-32"></div>
                </div>
                <div className="h-6 bg-background rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentRequests = requests?.slice(0, 3) || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Time Off Requests</CardTitle>
          <Button 
            variant="link" 
            className="text-primary"
            onClick={handleRequestTimeOff}
          >
            Request Time Off
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentRequests.length === 0 ? (
          <p className="text-muted-foreground text-sm">No time off requests</p>
        ) : (
          recentRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-foreground capitalize">
                  {request.type}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(request.startDate), "MMM dd")} - {format(new Date(request.endDate), "MMM dd")}
                </p>
              </div>
              <Badge className={getStatusColor(request.status || "pending")}>
                {request.status || "pending"}
              </Badge>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
