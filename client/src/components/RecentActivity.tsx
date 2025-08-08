import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, GitCommit, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const activities = [
  {
    id: 1,
    type: "commit",
    user: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    action: "pushed 3 commits to",
    project: "E-commerce Platform",
    time: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    icon: GitCommit,
    color: "blue",
  },
  {
    id: 2,
    type: "completed",
    user: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612db15?w=100",
    action: "completed task in",
    project: "Mobile Banking App",
    time: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    icon: CheckCircle,
    color: "green",
  },
  {
    id: 3,
    type: "comment",
    user: "Mike Wilson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    action: "commented on",
    project: "Analytics Dashboard",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    icon: MessageSquare,
    color: "purple",
  },
  {
    id: 4,
    type: "time",
    user: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    action: "logged 4 hours on",
    project: "Website Redesign",
    time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    icon: Clock,
    color: "orange",
  },
  {
    id: 5,
    type: "issue",
    user: "David Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    action: "reported an issue in",
    project: "API Integration",
    time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    icon: AlertTriangle,
    color: "red",
  },
];

const getIconColor = (color: string) => {
  switch (color) {
    case "blue":
      return "text-blue-600";
    case "green":
      return "text-green-600";
    case "purple":
      return "text-purple-600";
    case "orange":
      return "text-orange-600";
    case "red":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={activity.avatar} alt={activity.user} />
                  <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 ${getIconColor(activity.color)}`} />
                    <span className="text-sm">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action}</span>{' '}
                      <span className="font-medium text-primary">{activity.project}</span>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(activity.time, { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}