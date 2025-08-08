import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import type { TimeEntry } from "@shared/schema";

export default function TimeEntriesTable() {
  const { toast } = useToast();

  const { data: timeEntries, isLoading, error } = useQuery<TimeEntry[]>({
    queryKey: ["/api/time-entries"],
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

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return "0:00";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "submitted":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Time Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="h-4 bg-muted rounded flex-1"></div>
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-4 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const recentEntries = timeEntries?.slice(0, 5) || [];

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Recent Time Entries</CardTitle>
          <Button variant="link" className="text-primary">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {recentEntries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No time entries found. Start tracking your time!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      {format(new Date(entry.date), "MMM dd")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="font-medium">Project Name</span>
                      </div>
                    </TableCell>
                    <TableCell>{entry.description || "No description"}</TableCell>
                    <TableCell>{formatDuration(entry.duration)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(entry.status || "draft")}>
                        {entry.status || "draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="link" size="sm" className="text-primary">
                          Edit
                        </Button>
                        <Button variant="link" size="sm" className="text-destructive">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
