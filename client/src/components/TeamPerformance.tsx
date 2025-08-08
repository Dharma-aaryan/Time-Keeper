import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const teamMembers = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Frontend Developer",
    tasksCompleted: 18,
    totalTasks: 22,
    efficiency: 85,
    status: "available",
  },
  {
    id: 2,
    name: "John Smith",
    role: "UI/UX Designer",
    tasksCompleted: 14,
    totalTasks: 16,
    efficiency: 92,
    status: "busy",
  },
  {
    id: 3,
    name: "Alice Johnson",
    role: "Backend Developer",
    tasksCompleted: 12,
    totalTasks: 15,
    efficiency: 78,
    status: "available",
  },
  {
    id: 4,
    name: "Bob Wilson",
    role: "QA Engineer",
    tasksCompleted: 9,
    totalTasks: 12,
    efficiency: 88,
    status: "away",
  },
  {
    id: 5,
    name: "Carol Brown",
    role: "Project Manager",
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
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
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