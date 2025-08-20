import { ArrowLeft, Cloud, AlertTriangle, CheckCircle, Server, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IaCDetailsProps {
  onBack: () => void;
}

const IaCDetails = ({ onBack }: IaCDetailsProps) => {
  const misconfigurations = [
    {
      id: "TF-001",
      title: "S3 Bucket Public Access",
      severity: "Critical",
      file: "terraform/s3.tf",
      line: 15,
      description: "S3 bucket allows public read access without encryption",
      resource: "aws_s3_bucket.user_data",
      status: "Open"
    },
    {
      id: "TF-002", 
      title: "Security Group Too Permissive",
      severity: "High",
      file: "terraform/security_groups.tf",
      line: 8,
      description: "Security group allows inbound traffic from 0.0.0.0/0 on port 22",
      resource: "aws_security_group.web",
      status: "Fixed"
    },
    {
      id: "TF-003",
      title: "IAM Policy Overprivileged",
      severity: "Medium",
      file: "terraform/iam.tf",
      line: 32,
      description: "IAM policy grants excessive permissions with wildcard actions",
      resource: "aws_iam_policy.app_policy",
      status: "Open"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-destructive text-destructive-foreground";
      case "High": return "bg-warning text-warning-foreground";
      case "Medium": return "bg-info text-info-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Infrastructure Security</h1>
          <p className="text-muted-foreground">Infrastructure as Code Security Analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Misconfigurations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 critical, 1 high, 1 medium</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources Scanned</CardTitle>
            <Server className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Terraform resources</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Security best practices</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="misconfigurations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="misconfigurations">Misconfigurations</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="misconfigurations">
          <Card>
            <CardHeader>
              <CardTitle>Security Misconfigurations</CardTitle>
              <CardDescription>
                Infrastructure security issues detected in Terraform templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {misconfigurations.map((config, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={getSeverityColor(config.severity)}>
                          {config.severity}
                        </Badge>
                        <span className="font-medium">{config.title}</span>
                        <span className="text-sm text-muted-foreground">({config.id})</span>
                      </div>
                      <Badge variant={config.status === "Fixed" ? "default" : "secondary"}>
                        {config.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{config.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <span>Resource: {config.resource}</span>
                      <span>{config.file}:{config.line}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View Template</Button>
                      <Button size="sm" variant="outline">Fix Suggestion</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Frameworks</CardTitle>
              <CardDescription>
                Infrastructure compliance against security standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "CIS AWS Foundations", score: "92%", status: "Pass" },
                  { name: "NIST Cybersecurity Framework", score: "89%", status: "Pass" },
                  { name: "SOC 2 Type II", score: "85%", status: "Warning" },
                  { name: "PCI DSS", score: "94%", status: "Pass" }
                ].map((framework, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <span className="font-medium">{framework.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{framework.score}</span>
                      <Badge className={
                        framework.status === "Pass" ? "bg-success text-success-foreground" :
                        "bg-warning text-warning-foreground"
                      }>
                        {framework.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resource Analysis</CardTitle>
              <CardDescription>
                Breakdown of scanned infrastructure resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { type: "S3 Buckets", count: 12, issues: 1 },
                  { type: "Security Groups", count: 8, issues: 1 },
                  { type: "IAM Policies", count: 15, issues: 1 },
                  { type: "EC2 Instances", count: 6, issues: 0 },
                  { type: "RDS Instances", count: 3, issues: 0 },
                  { type: "Load Balancers", count: 4, issues: 0 }
                ].map((resource, index) => (
                  <div key={index} className="p-3 border rounded">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{resource.type}</span>
                      <span className="text-2xl font-bold">{resource.count}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {resource.issues > 0 ? `${resource.issues} issues` : "Secure"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IaCDetails;