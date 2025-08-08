import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Website Redesign", estimated: 120, actual: 98, efficiency: 82 },
  { name: "Mobile App", estimated: 200, actual: 240, efficiency: 120 },
  { name: "API Integration", estimated: 80, actual: 75, efficiency: 94 },
  { name: "Dashboard", estimated: 150, actual: 135, efficiency: 90 },
  { name: "E-commerce", estimated: 300, actual: 285, efficiency: 95 },
  { name: "Analytics", estimated: 100, actual: 110, efficiency: 110 },
];

export default function ProjectEfficiencyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Efficiency</CardTitle>
        <p className="text-sm text-muted-foreground">
          Estimated vs actual hours across projects
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            <Bar dataKey="estimated" fill="hsl(var(--primary))" name="Estimated Hours" />
            <Bar dataKey="actual" fill="hsl(var(--chart-2))" name="Actual Hours" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}