import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SecurityMetrics = () => {
  const metrics = [
    {
      title: "Security Score",
      value: "94%",
      change: "+2%",
      trend: "up",
      icon: CheckCircle,
      color: "success"
    },
    {
      title: "Critical Issues",
      value: "3",
      change: "-5",
      trend: "down",
      icon: AlertTriangle,
      color: "warning"
    },
    {
      title: "Vulnerabilities",
      value: "47",
      change: "-12",
      trend: "down",
      icon: TrendingDown,
      color: "destructive"
    },
    {
      title: "Compliance Rate",
      value: "98.5%",
      change: "+1.2%",
      trend: "up",
      icon: TrendingUp,
      color: "success"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const getIconColor = (color: string) => {
          switch (color) {
            case "success": return "text-success";
            case "warning": return "text-warning";
            case "destructive": return "text-destructive";
            default: return "text-primary";
          }
        };
        
        const getChangeColor = (color: string) => {
          switch (color) {
            case "success": return "text-success";
            case "warning": return "text-warning";
            case "destructive": return "text-destructive";
            default: return "text-primary";
          }
        };
        
        return (
          <Card key={index} className="shadow-card bg-gradient-surface">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${getIconColor(metric.color)}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className={`${getChangeColor(metric.color)} font-medium mr-1`}>
                  {metric.change}
                </span>
                from last month
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SecurityMetrics;