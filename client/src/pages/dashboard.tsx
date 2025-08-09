import Header from "@/components/Header";
import ProjectOverviewCards from "@/components/ProjectOverviewCards";
import ActiveProjectsTable from "@/components/ActiveProjectsTable";
import ProjectStatusChart from "@/components/ProjectStatusChart";

export default function Dashboard() {

  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Project Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Real-time overview of 117+ active projects across 8 major industries
          </p>
        </div>

        {/* Overview Cards */}
        <ProjectOverviewCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <ActiveProjectsTable />
          </div>
          <div>
            <ProjectStatusChart />
          </div>
        </div>


      </main>
    </div>
  );
}
