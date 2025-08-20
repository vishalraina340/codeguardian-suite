import { ArrowLeft, Package, AlertTriangle, TrendingUp, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SCADetailsProps {
  onBack: () => void;
}

const SCADetails = ({ onBack }: SCADetailsProps) => {
  const vulnerabilities = [
    {
      package: "lodash",
      version: "4.17.20",
      vulnerability: "CVE-2021-23337",
      severity: "High",
      description: "Command injection vulnerability in lodash template functionality",
      fixedVersion: "4.17.21",
      status: "Open"
    },
    {
      package: "axios",
      version: "0.21.0",
      vulnerability: "CVE-2021-3749",
      severity: "Critical",
      description: "Server-side request forgery in axios when following redirects",
      fixedVersion: "0.21.2",
      status: "Fixed"
    },
    {
      package: "react-scripts",
      version: "4.0.3",
      vulnerability: "CVE-2021-44906",
      severity: "Medium",
      description: "Prototype pollution vulnerability in minimist dependency",
      fixedVersion: "5.0.1",
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
          <h1 className="text-3xl font-bold text-foreground">Software Composition Analysis</h1>
          <p className="text-muted-foreground">Open Source Dependency Security Assessment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 critical, 2 high, 3 medium</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dependencies</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">Direct & transitive</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Shield className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.7</div>
            <p className="text-xs text-muted-foreground">Out of 10 (Medium risk)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Scan</CardTitle>
            <Clock className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30m</div>
            <p className="text-xs text-muted-foreground">ago</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vulnerabilities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="licenses">Licenses</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities">
          <Card>
            <CardHeader>
              <CardTitle>Known Vulnerabilities</CardTitle>
              <CardDescription>
                Security vulnerabilities detected in open source dependencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnerabilities.map((vuln, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className={getSeverityColor(vuln.severity)}>
                          {vuln.severity}
                        </Badge>
                        <span className="font-medium">{vuln.package}@{vuln.version}</span>
                        <span className="text-sm text-muted-foreground">({vuln.vulnerability})</span>
                      </div>
                      <Badge variant={vuln.status === "Fixed" ? "default" : "secondary"}>
                        {vuln.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{vuln.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-success">
                        Fixed in: {vuln.fixedVersion}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm">Update Package</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages">
          <Card>
            <CardHeader>
              <CardTitle>Package Analysis</CardTitle>
              <CardDescription>
                Overview of all dependencies and their security status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "react", version: "18.3.1", status: "Secure", vulnerabilities: 0 },
                  { name: "typescript", version: "5.6.2", status: "Secure", vulnerabilities: 0 },
                  { name: "lodash", version: "4.17.20", status: "Vulnerable", vulnerabilities: 1 },
                  { name: "axios", version: "0.21.2", status: "Secure", vulnerabilities: 0 },
                  { name: "express", version: "4.18.0", status: "Outdated", vulnerabilities: 0 }
                ].map((pkg, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-3">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium">{pkg.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">v{pkg.version}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {pkg.vulnerabilities > 0 && (
                        <span className="text-sm text-warning">{pkg.vulnerabilities} vulns</span>
                      )}
                      <Badge className={
                        pkg.status === "Secure" ? "bg-success text-success-foreground" :
                        pkg.status === "Vulnerable" ? "bg-destructive text-destructive-foreground" :
                        "bg-warning text-warning-foreground"
                      }>
                        {pkg.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licenses">
          <Card>
            <CardHeader>
              <CardTitle>License Compliance</CardTitle>
              <CardDescription>
                License analysis for all dependencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { license: "MIT", count: 95, risk: "Low" },
                  { license: "Apache-2.0", count: 24, risk: "Low" },
                  { license: "BSD-3-Clause", count: 12, risk: "Low" },
                  { license: "ISC", count: 8, risk: "Low" },
                  { license: "GPL-3.0", count: 3, risk: "High" }
                ].map((license, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <span className="font-medium">{license.license}</span>
                      <span className="text-sm text-muted-foreground ml-2">({license.count} packages)</span>
                    </div>
                    <Badge className={
                      license.risk === "Low" ? "bg-success text-success-foreground" :
                      "bg-warning text-warning-foreground"
                    }>
                      {license.risk} Risk
                    </Badge>
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

export default SCADetails;