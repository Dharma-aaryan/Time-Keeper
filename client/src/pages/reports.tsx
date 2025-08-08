import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reports() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and export comprehensive time tracking reports.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Time Tracking Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Reporting features are coming soon. Basic stats are available on the dashboard.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
