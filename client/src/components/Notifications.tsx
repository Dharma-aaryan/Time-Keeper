import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import type { Notification } from "@shared/schema";

export default function Notifications() {
  const { toast } = useToast();

  const { data: notifications, isLoading, error } = useQuery<Notification[]>({
    queryKey: ["/api/notifications"],
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-orange-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-primary";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-2 h-2 bg-background rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="h-4 bg-background rounded mb-1"></div>
                  <div className="h-3 bg-background rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentNotifications = notifications?.slice(0, 3) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentNotifications.length === 0 ? (
          <p className="text-muted-foreground text-sm">No notifications</p>
        ) : (
          recentNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-3 p-3 bg-muted rounded-lg"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 ${getTypeColor(notification.type || "info")}`}
              ></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
