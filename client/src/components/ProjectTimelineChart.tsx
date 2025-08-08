import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { month: "Jan", planning: 20, development: 80, testing: 15, deployment: 5 },
  { month: "Feb", planning: 15, development: 120, testing: 25, deployment: 8 },
  { month: "Mar", planning: 25, development: 100, testing: 30, deployment: 12 },
  { month: "Apr", planning: 18, development: 140, testing: 35, deployment: 15 },
  { month: "May", planning: 22, development: 110, testing: 28, deployment: 10 },
  { month: "Jun", planning: 30, development: 130, testing: 40, deployment: 18 },
];

export default function ProjectTimelineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline Distribution</CardTitle>
        <p className="text-sm text-muted-foreground">
          Hours spent across project phases over time
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="planning" 
              stackId="1" 
              stroke="hsl(var(--primary))" 
              fill="hsl(var(--primary))"
              name="Planning"
            />
            <Area 
              type="monotone" 
              dataKey="development" 
              stackId="1" 
              stroke="hsl(var(--chart-2))" 
              fill="hsl(var(--chart-2))"
              name="Development"
            />
            <Area 
              type="monotone" 
              dataKey="testing" 
              stackId="1" 
              stroke="hsl(var(--chart-3))" 
              fill="hsl(var(--chart-3))"
              name="Testing"
            />
            <Area 
              type="monotone" 
              dataKey="deployment" 
              stackId="1" 
              stroke="hsl(var(--chart-4))" 
              fill="hsl(var(--chart-4))"
              name="Deployment"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}