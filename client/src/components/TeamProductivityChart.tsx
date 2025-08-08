import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { week: "Week 1", developer: 35, designer: 30, qa: 25, manager: 20 },
  { week: "Week 2", developer: 42, designer: 35, qa: 30, manager: 25 },
  { week: "Week 3", developer: 38, designer: 32, qa: 28, manager: 22 },
  { week: "Week 4", developer: 45, designer: 38, qa: 32, manager: 28 },
  { week: "Week 5", developer: 40, designer: 35, qa: 30, manager: 25 },
  { week: "Week 6", developer: 43, designer: 37, qa: 31, manager: 26 },
];

export default function TeamProductivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Productivity Trends</CardTitle>
        <p className="text-sm text-muted-foreground">
          Average hours per week by role
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="developer" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Developers"
            />
            <Line 
              type="monotone" 
              dataKey="designer" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              name="Designers"
            />
            <Line 
              type="monotone" 
              dataKey="qa" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2}
              name="QA Engineers"
            />
            <Line 
              type="monotone" 
              dataKey="manager" 
              stroke="hsl(var(--chart-4))" 
              strokeWidth={2}
              name="Managers"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}