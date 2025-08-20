import { 
  Shield, 
  Cloud, 
  Package, 
  FileText, 
  Key, 
  Calendar, 
  Server, 
  BarChart3, 
  Link, 
  FileDown,
  MessageSquare,
  Mail
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SecurityFeatures = () => {
  const features = [
    {
      title: "SAST",
      description: "Static Application Security Testing aligned with OWASP & CWE Standards",
      icon: Shield,
      status: "Active",
      statusColor: "success",
      lastScan: "2 hours ago",
      issues: 12
    },
    {
      title: "Infrastructure as Code Security",
      description: "Scan your IaC templates for security misconfigurations",
      icon: Cloud,
      status: "Active",
      statusColor: "success",
      lastScan: "1 hour ago",
      issues: 3
    },
    {
      title: "Software Composition Analysis",
      description: "Identify vulnerabilities in open source dependencies",
      icon: Package,
      status: "Active",
      statusColor: "success",
      lastScan: "30 minutes ago",
      issues: 8
    },
    {
      title: "SOC 2 Audit Reports",
      description: "Generate comprehensive SOC 2 compliance reports",
      icon: FileText,
      status: "Ready",
      statusColor: "info",
      lastScan: "Daily",
      issues: 0
    },
    {
      title: "Secret Scanning",
      description: "Detect exposed API keys, tokens, and credentials",
      icon: Key,
      status: "Active",
      statusColor: "success",
      lastScan: "5 minutes ago",
      issues: 2
    },
    {
      title: "End-of-Life Dependency Detection",
      description: "Monitor for outdated and unsupported dependencies",
      icon: Calendar,
      status: "Active",
      statusColor: "success",
      lastScan: "4 hours ago",
      issues: 15
    },
    {
      title: "Cloud Misconfiguration Scanning",
      description: "Monitor cloud infrastructure for security misconfigurations",
      icon: Server,
      status: "Active",
      statusColor: "success",
      lastScan: "1 hour ago",
      issues: 5
    },
    {
      title: "Code Security Dashboard",
      description: "Centralized view of all security metrics and trends",
      icon: BarChart3,
      status: "Live",
      statusColor: "success",
      lastScan: "Real-time",
      issues: 0
    },
    {
      title: "Jira Integration",
      description: "Automatically create tickets for security findings",
      icon: Link,
      status: "Connected",
      statusColor: "success",
      lastScan: "N/A",
      issues: 0
    },
    {
      title: "Executive Reports",
      description: "Generate PDF & CSV reports for stakeholders",
      icon: FileDown,
      status: "Ready",
      statusColor: "info",
      lastScan: "Weekly",
      issues: 0
    },
    {
      title: "Slack Support",
      description: "Real-time security alerts and notifications",
      icon: MessageSquare,
      status: "Connected",
      statusColor: "success",
      lastScan: "N/A",
      issues: 0
    },
    {
      title: "Email Support",
      description: "Email notifications for critical security events",
      icon: Mail,
      status: "Active",
      statusColor: "success",
      lastScan: "N/A",
      issues: 0
    }
  ];

  const getStatusColor = (color: string) => {
    switch (color) {
      case "success": return "bg-success text-success-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      case "destructive": return "bg-destructive text-destructive-foreground";
      case "info": return "bg-info text-info-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Card key={index} className="shadow-card hover:shadow-security transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
                <Badge className={getStatusColor(feature.statusColor)}>
                  {feature.status}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                <span>Last scan: {feature.lastScan}</span>
                {feature.issues > 0 && (
                  <span className="text-warning font-medium">
                    {feature.issues} issues
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SecurityFeatures;