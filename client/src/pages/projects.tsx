import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Projects() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your projects and track time allocation.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Project management features are coming soon. Projects are currently managed by administrators.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
