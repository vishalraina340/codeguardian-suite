import DashboardHeader from "@/components/DashboardHeader";
import SecurityMetrics from "@/components/SecurityMetrics";
import SecurityFeatures from "@/components/SecurityFeatures";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Security Overview</h2>
          <p className="text-muted-foreground">
            Monitor your application security posture across all environments
          </p>
        </div>

        <SecurityMetrics />
        
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Security Capabilities</h3>
        </div>
        
        <SecurityFeatures />
      </main>
    </div>
  );
};

export default Index;
