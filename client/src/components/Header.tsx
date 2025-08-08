import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Clock, ChevronDown, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user } = useAuth();
  const [currentTimer, setCurrentTimer] = useState({
    isRunning: true,
    duration: "2:34:15",
    project: "Website Redesign"
  });

  const handleStopTimer = () => {
    setCurrentTimer(prev => ({ ...prev, isRunning: false }));
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">TimeSuite</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-primary font-medium">
                Dashboard
              </Link>
              <Link href="/timesheets" className="text-muted-foreground hover:text-foreground">
                Timesheets
              </Link>
              <Link href="/projects" className="text-muted-foreground hover:text-foreground">
                Projects
              </Link>
              <Link href="/reports" className="text-muted-foreground hover:text-foreground">
                Reports
              </Link>
              <Link href="/team" className="text-muted-foreground hover:text-foreground">
                Team
              </Link>
            </nav>
          </div>

          {/* Timer and User Menu */}
          <div className="flex items-center space-x-6">
            {/* Active Timer */}
            {currentTimer.isRunning && (
              <div className="hidden sm:flex items-center space-x-3 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full timer-pulse"></div>
                <span className="text-green-700 font-medium">{currentTimer.duration}</span>
                <span className="text-green-600 text-sm">{currentTimer.project}</span>
                <button 
                  className="text-green-600 hover:text-green-700"
                  onClick={handleStopTimer}
                >
                  <Pause className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <img 
                    className="w-8 h-8 rounded-full object-cover" 
                    src={user?.profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"} 
                    alt="User avatar"
                  />
                  <span className="hidden sm:block font-medium">
                    {user?.firstName || 'User'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => window.location.href = '/api/logout'}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
