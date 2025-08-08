import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    tasksCompleted: 18,
    totalTasks: 22,
    efficiency: 85,
    status: "available",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612db15?w=100",
    tasksCompleted: 14,
    totalTasks: 16,
    efficiency: 92,
    status: "busy",
  },
  {
    id: 3,
    name: "Mike Wilson",
    role: "Backend Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    tasksCompleted: 12,
    totalTasks: 15,
    efficiency: 78,
    status: "available",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "QA Engineer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    tasksCompleted: 9,
    totalTasks: 12,
    efficiency: 88,
    status: "away",
  },
  {
    id: 5,
    name: "David Brown",
    role: "Project Manager",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    tasksCompleted: 7,
    totalTasks: 8,
    efficiency: 95,
    status: "available",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800";
    case "busy":
      return "bg-red-100 text-red-800";
    case "away":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function TeamPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member) => {
            const completionRate = Math.round((member.tasksCompleted / member.totalTasks) * 100);
            
            return (
              <div key={member.id} className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <p className="text-sm font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(member.status)} variant="secondary">
                        {member.status}
                      </Badge>
                      <span className="text-sm font-medium">{member.efficiency}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Progress value={completionRate} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground">
                      {member.tasksCompleted}/{member.totalTasks}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}