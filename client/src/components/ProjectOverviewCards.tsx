import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Clock, Users, DollarSign, Target } from "lucide-react";

export default function ProjectOverviewCards() {
  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2",
      changeType: "increase",
      icon: Target,
      color: "blue",
    },
    {
      title: "Team Members",
      value: "28",
      change: "+4",
      changeType: "increase", 
      icon: Users,
      color: "green",
    },
    {
      title: "Total Hours",
      value: "1,248",
      change: "+156",
      changeType: "increase",
      icon: Clock,
      color: "purple",
    },
    {
      title: "Budget Used",
      value: "$89.2k",
      change: "-2.1%",
      changeType: "decrease",
      icon: DollarSign,
      color: "orange",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-600";
      case "green":
        return "bg-green-50 text-green-600";
      case "purple":
        return "bg-purple-50 text-purple-600";
      case "orange":
        return "bg-orange-50 text-orange-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {stat.changeType === "increase" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={stat.changeType === "increase" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}