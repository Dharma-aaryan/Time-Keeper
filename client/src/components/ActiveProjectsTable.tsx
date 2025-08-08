import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, MoreHorizontal } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "E-commerce Platform",
    client: "TechCorp",
    status: "In Progress",
    progress: 75,
    team: 6,
    budget: "$45,000",
    deadline: "Dec 15, 2024",
    priority: "High",
  },
  {
    id: 2,
    name: "Mobile Banking App",
    client: "FinanceBank",
    status: "In Progress",
    progress: 60,
    team: 4,
    budget: "$32,000",
    deadline: "Jan 30, 2025",
    priority: "Medium",
  },
  {
    id: 3,
    name: "Analytics Dashboard",
    client: "DataCorp",
    status: "Planning",
    progress: 15,
    team: 3,
    budget: "$28,000",
    deadline: "Mar 15, 2025",
    priority: "Low",
  },
  {
    id: 4,
    name: "Website Redesign",
    client: "CreativeAgency",
    status: "In Progress",
    progress: 90,
    team: 5,
    budget: "$18,000",
    deadline: "Nov 30, 2024",
    priority: "High",
  },
  {
    id: 5,
    name: "API Integration",
    client: "TechStart",
    status: "Testing",
    progress: 85,
    team: 2,
    budget: "$15,000",
    deadline: "Dec 5, 2024",
    priority: "Medium",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Planning":
      return "bg-yellow-100 text-yellow-800";
    case "Testing":
      return "bg-purple-100 text-purple-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-800";
    case "Medium":
      return "bg-orange-100 text-orange-800";
    case "Low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function ActiveProjectsTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Active Projects</CardTitle>
          <Button variant="link" className="text-primary">
            View All Projects
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.client}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-20">
                      <Progress value={project.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground mt-1">
                        {project.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{project.team} members</TableCell>
                  <TableCell>{project.budget}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(project.priority)}>
                      {project.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}