import { useState } from "react";
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, FileText, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SASTDetailsProps {
  onBack: () => void;
}

const SASTDetails = ({ onBack }: SASTDetailsProps) => {
  const vulnerabilities = [
    {
      id: "CWE-79",
      title: "Cross-Site Scripting (XSS)",
      severity: "High",
      file: "src/components/UserProfile.tsx",
      line: 42,
      description: "Potential XSS vulnerability detected in user input handling",
      status: "Open"
    },
    {
      id: "CWE-89",
      title: "SQL Injection",
      severity: "Critical",
      file: "src/api/users.ts",
      line: 128,
      description: "SQL query constructed with user input without proper sanitization",
      status: "Fixed"
    },
    {
      id: "CWE-326",
      title: "Inadequate Encryption Strength",
      severity: "Medium",
      file: "src/utils/encryption.ts",
      line: 15,
      description: "Using weak encryption algorithm for sensitive data",
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
          <h1 className="text-3xl font-bold text-foreground">SAST Analysis</h1>
          <p className="text-muted-foreground">Static Application Security Testing Results</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">5 critical, 4 high, 3 medium</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Files Scanned</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">React & TypeScript files</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Scan</CardTitle>
            <Clock className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h ago</div>
            <p className="text-xs text-muted-foreground">Automated daily scan</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vulnerabilities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="owasp">OWASP Top 10</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities">
          <Card>
            <CardHeader>
              <CardTitle>Security Vulnerabilities</CardTitle>
              <CardDescription>
                Detected security issues aligned with CWE standards
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
                        <span className="font-medium">{vuln.title}</span>
                        <span className="text-sm text-muted-foreground">({vuln.id})</span>
                      </div>
                      <Badge variant={vuln.status === "Fixed" ? "default" : "secondary"}>
                        {vuln.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{vuln.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{vuln.file}:{vuln.line}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View Code</Button>
                      <Button size="sm" variant="outline">Fix Suggestion</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="owasp">
          <Card>
            <CardHeader>
              <CardTitle>OWASP Top 10 Compliance</CardTitle>
              <CardDescription>
                Security assessment based on OWASP Top 10 2021
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "A01:2021 – Broken Access Control", status: "Pass", issues: 0 },
                  { name: "A02:2021 – Cryptographic Failures", status: "Warning", issues: 1 },
                  { name: "A03:2021 – Injection", status: "Fail", issues: 3 },
                  { name: "A04:2021 – Insecure Design", status: "Pass", issues: 0 },
                  { name: "A05:2021 – Security Misconfiguration", status: "Pass", issues: 0 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <span className="font-medium">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      {item.issues > 0 && (
                        <span className="text-sm text-muted-foreground">{item.issues} issues</span>
                      )}
                      <Badge className={
                        item.status === "Pass" ? "bg-success text-success-foreground" :
                        item.status === "Warning" ? "bg-warning text-warning-foreground" :
                        "bg-destructive text-destructive-foreground"
                      }>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Security Trends</CardTitle>
              <CardDescription>
                Historical analysis of security findings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Trend charts and historical data visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SASTDetails;