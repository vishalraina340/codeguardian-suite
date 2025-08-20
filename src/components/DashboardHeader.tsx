import { Shield, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  return (
    <header className="bg-gradient-security text-primary-foreground shadow-security">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">CodeGuardian Suite</h1>
                <p className="text-primary-glow text-sm">Enterprise Security Platform</p>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#dashboard" className="hover:text-primary-glow transition-colors">Dashboard</a>
            <a href="#scans" className="hover:text-primary-glow transition-colors">Security Scans</a>
            <a href="#reports" className="hover:text-primary-glow transition-colors">Reports</a>
            <a href="#integrations" className="hover:text-primary-glow transition-colors">Integrations</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-glow/20">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-glow/20">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-glow/20">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;