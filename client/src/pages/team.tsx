import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Team() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Team</h1>
          <p className="text-muted-foreground mt-1">
            Manage team members and review their timesheets.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Team management features are coming soon. This will include timesheet approval workflows and team analytics.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
