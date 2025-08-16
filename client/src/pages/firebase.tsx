import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Database, Upload, Download, Trash2, RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Firebase() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSeeding, setIsSeeding] = useState(false);

  // Get storage status
  const { data: storageStatus, isLoading: statusLoading } = useQuery({
    queryKey: ['/api/storage/status']
  });

  // Get Firebase projects (if connected)
  const { data: firebaseProjects, isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects/real-data'],
    enabled: storageStatus?.firebaseEnabled
  });

  // Seed data mutation
  const seedMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/projects/seed-firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to seed data');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.message
      });
      queryClient.invalidateQueries({ queryKey: ['/api/projects/real-data'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to seed data",
        variant: "destructive"
      });
    }
  });

  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      await seedMutation.mutateAsync();
    } finally {
      setIsSeeding(false);
    }
  };

  const getStatusIcon = () => {
    if (statusLoading) return <RefreshCw className="w-5 h-5 animate-spin" />;
    if (storageStatus?.firebaseEnabled) return <CheckCircle className="w-5 h-5 text-green-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getStatusBadge = () => {
    if (statusLoading) return <Badge variant="secondary">Loading...</Badge>;
    if (storageStatus?.firebaseEnabled) return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
    return <Badge variant="destructive">Not Connected</Badge>;
  };

  return (
    <div className="bg-background min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Firebase Database</h1>
          <p className="text-muted-foreground mt-2">
            Manage your Firebase database connection and project data
          </p>
        </div>

        {/* Connection Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm font-medium">
                {getStatusIcon()}
                <span className="ml-2">Connection Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getStatusBadge()}
                <p className="text-sm text-muted-foreground">
                  {storageStatus?.message || "Checking connection..."}
                </p>
                <p className="text-xs text-muted-foreground">
                  Storage Type: {storageStatus?.storageType || "Unknown"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm font-medium">
                <Database className="w-5 h-5 mr-2" />
                Project Count
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projectsLoading ? "..." : firebaseProjects?.projects?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Projects in database
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-sm font-medium">
                <AlertCircle className="w-5 h-5 mr-2" />
                Data Source
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">
                {storageStatus?.firebaseEnabled ? "Firebase Firestore" : "Local Storage"}
              </div>
              <p className="text-xs text-muted-foreground">
                {storageStatus?.firebaseEnabled ? "Real-time database" : "In-memory storage"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Firebase Actions */}
        {storageStatus?.firebaseEnabled ? (
          <div className="space-y-6">
            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Data Management
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage your project data in Firebase
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button 
                    onClick={handleSeedData}
                    disabled={isSeeding || seedMutation.isPending}
                    className="flex items-center"
                  >
                    {isSeeding || seedMutation.isPending ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Seed Real Project Data
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/projects/real-data'] })}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Data
                  </Button>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">About Seeding Data</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    This will upload 117+ real project records from companies like Tesla, Netflix, JPMorgan Chase, 
                    and NASA to your Firebase database. This is a one-time operation that populates your database 
                    with authentic project data.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Current Data Preview */}
            {firebaseProjects?.projects?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Current Projects in Firebase
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Preview of projects stored in your Firebase database
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-3">Project Name</th>
                          <th className="text-left py-2 px-3">Industry</th>
                          <th className="text-left py-2 px-3">Client</th>
                          <th className="text-center py-2 px-3">Status</th>
                          <th className="text-right py-2 px-3">Budget</th>
                        </tr>
                      </thead>
                      <tbody>
                        {firebaseProjects.projects.slice(0, 10).map((project: any, index: number) => (
                          <tr key={index} className="border-b hover:bg-muted/50">
                            <td className="py-2 px-3 font-medium">{project.name}</td>
                            <td className="py-2 px-3">
                              <Badge variant="outline" className="text-xs">
                                {project.industry}
                              </Badge>
                            </td>
                            <td className="py-2 px-3">{project.client}</td>
                            <td className="py-2 px-3 text-center">
                              <Badge 
                                variant={project.status === 'completed' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {project.status}
                              </Badge>
                            </td>
                            <td className="py-2 px-3 text-right font-medium">
                              ${project.budget?.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {firebaseProjects.projects.length > 10 && (
                      <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          Showing 10 of {firebaseProjects.projects.length} projects
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* Firebase Not Connected */
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                Firebase Not Connected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Firebase is not currently connected. The application is using local storage with real project data.
                </p>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <h4 className="font-medium text-orange-900 dark:text-orange-100">To connect Firebase:</h4>
                  <ol className="list-decimal list-inside text-sm text-orange-700 dark:text-orange-300 mt-2 space-y-1">
                    <li>Ensure your Firebase credentials are properly configured</li>
                    <li>Set STORAGE_TYPE environment variable to "firebase"</li>
                    <li>Restart the application</li>
                  </ol>
                </div>
                
                <Button 
                  variant="outline"
                  onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/storage/status'] })}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}