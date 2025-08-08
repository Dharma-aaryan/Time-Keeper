import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Timesheets() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Timesheets</h1>
          <p className="text-muted-foreground mt-1">
            Manage and submit your timesheets for approval.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Timesheet Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Timesheet management features are coming soon. You can track time from the dashboard for now.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
