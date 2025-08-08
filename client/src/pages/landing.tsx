import { Clock, Users, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">TimeSuite</span>
            </div>
            <Button onClick={() => window.location.href = '/api/login'}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6">
            Professional Time
            <span className="text-primary"> Tracking</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your team's time tracking with powerful features for project management, 
            approval workflows, and comprehensive reporting.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-3"
            onClick={() => window.location.href = '/api/login'}
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything you need to track time effectively
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for teams of all sizes with enterprise-grade security and intuitive design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardHeader className="text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Time Tracking</CardTitle>
              <CardDescription>
                Manual entry and timer-based tracking with real-time synchronization
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Role-based access control with approval workflows for managers
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Comprehensive reporting and analytics for better project insights
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <CardTitle>Secure</CardTitle>
              <CardDescription>
                Enterprise-grade security with data encryption and audit trails
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your time tracking?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of teams already using TimeSuite to boost productivity.
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-8 py-3"
              onClick={() => window.location.href = '/api/login'}
            >
              Start Your Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 TimeSuite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
