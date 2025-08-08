import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Frontend Development", value: 35, color: "hsl(var(--primary))" },
  { name: "Backend Development", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Design & UX", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Testing & QA", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Project Management", value: 8, color: "hsl(var(--chart-5))" },
];

export default function ResourceUtilizationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Utilization</CardTitle>
        <p className="text-sm text-muted-foreground">
          Time allocation across different activities
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              fontSize={12}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}