"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, GitBranch, CheckCircle, AlertCircle, Activity, Zap } from "lucide-react"

const accuracyData = [
  { round: 1, global: 72.1, local: 69.8 },
  { round: 2, global: 76.3, local: 74.2 },
  { round: 3, global: 81.2, local: 79.5 },
  { round: 4, global: 84.7, local: 83.1 },
  { round: 5, global: 87.9, local: 86.8 },
  { round: 6, global: 92.4, local: 91.2 },
]

const rocData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.1, tpr: 0.68 },
  { fpr: 0.2, tpr: 0.81 },
  { fpr: 0.3, tpr: 0.87 },
  { fpr: 0.4, tpr: 0.91 },
  { fpr: 0.5, tpr: 0.94 },
  { fpr: 0.6, tpr: 0.96 },
  { fpr: 0.7, tpr: 0.97 },
  { fpr: 0.8, tpr: 0.98 },
  { fpr: 0.9, tpr: 0.99 },
  { fpr: 1, tpr: 1 },
]

const precisionRecallData = [
  { recall: 0, precision: 1 },
  { recall: 0.1, precision: 0.96 },
  { recall: 0.2, precision: 0.94 },
  { recall: 0.3, precision: 0.91 },
  { recall: 0.4, precision: 0.89 },
  { recall: 0.5, precision: 0.87 },
  { recall: 0.6, precision: 0.84 },
  { recall: 0.7, precision: 0.81 },
  { recall: 0.8, precision: 0.76 },
  { recall: 0.9, precision: 0.68 },
  { recall: 1, precision: 0.52 },
]

const modelChangelog = [
  {
    version: "v1.4",
    date: "2024-01-15",
    description: "Improved recall for high-value transactions",
    status: "deployed",
    accuracy: 92.4,
    deployment: "CI/CD Pipeline",
  },
  {
    version: "v1.3",
    date: "2024-01-14",
    description: "Enhanced merchant category detection",
    status: "deployed",
    accuracy: 87.9,
    deployment: "Hotfix",
  },
  {
    version: "v1.2",
    date: "2024-01-13",
    description: "Federated learning optimization",
    status: "deployed",
    accuracy: 84.7,
    deployment: "CI/CD Pipeline",
  },
  {
    version: "v1.1",
    date: "2024-01-12",
    description: "Initial federated model release",
    status: "archived",
    accuracy: 81.2,
    deployment: "Manual",
  },
]

interface ModelPerformanceProps {
  userRole: "admin" | "node"
}

export function ModelPerformance({ userRole }: ModelPerformanceProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Model Performance</h1>
        <p className="text-muted-foreground mt-1">
          Analyze global and local model performance metrics across federated training rounds
        </p>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Global Accuracy</div>
                <div className="text-xl font-bold text-blue-900 dark:text-blue-100">92.4%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-green-700 dark:text-green-300">Local Accuracy</div>
                <div className="text-xl font-bold text-green-900 dark:text-green-100">91.2%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-purple-700 dark:text-purple-300">F1 Score</div>
                <div className="text-xl font-bold text-purple-900 dark:text-purple-100">0.89</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <GitBranch className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-orange-700 dark:text-orange-300">Model Version</div>
                <div className="text-xl font-bold text-orange-900 dark:text-orange-100">v1.4</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="curves">Model Curves</TabsTrigger>
          <TabsTrigger value="changelog">Model Changelog</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Global vs Local Performance
              </CardTitle>
              <CardDescription>Compare federated global model performance with local node performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="round" />
                  <YAxis domain={[65, 95]} />
                  <Tooltip
                    formatter={(value, name) => [
                      `${Number(value).toFixed(1)}%`,
                      name === "global" ? "Global Model" : "Local Model",
                    ]}
                    labelFormatter={(label) => `Training Round ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="global"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ fill: "#2563eb", strokeWidth: 2, r: 6 }}
                    name="global"
                  />
                  <Line
                    type="monotone"
                    dataKey="local"
                    stroke="#16a34a"
                    strokeWidth={3}
                    dot={{ fill: "#16a34a", strokeWidth: 2, r: 6 }}
                    strokeDasharray="5 5"
                    name="local"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curves" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>ROC Curve</CardTitle>
                <CardDescription>
                  Receiver Operating Characteristic - True Positive Rate vs False Positive Rate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={rocData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis
                      dataKey="fpr"
                      label={{ value: "False Positive Rate", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis label={{ value: "True Positive Rate", angle: -90, position: "insideLeft" }} />
                    <Tooltip
                      formatter={(value, name) => [
                        Number(value).toFixed(3),
                        name === "tpr" ? "True Positive Rate" : "False Positive Rate",
                      ]}
                    />
                    <Area type="monotone" dataKey="tpr" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} />
                    <Line type="monotone" dataKey="fpr" stroke="#dc2626" strokeWidth={1} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Precision-Recall Curve</CardTitle>
                <CardDescription>Precision vs Recall trade-off for fraud detection optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={precisionRecallData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="recall" label={{ value: "Recall", position: "insideBottom", offset: -5 }} />
                    <YAxis label={{ value: "Precision", angle: -90, position: "insideLeft" }} />
                    <Tooltip
                      formatter={(value, name) => [
                        Number(value).toFixed(3),
                        name === "precision" ? "Precision" : "Recall",
                      ]}
                    />
                    <Area type="monotone" dataKey="precision" stroke="#16a34a" fill="#16a34a" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="changelog">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-purple-600" />
                Model Deployment History
              </CardTitle>
              <CardDescription>Track model versions, deployments, and performance improvements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelChangelog.map((version, index) => (
                  <div
                    key={version.version}
                    className={`p-4 rounded-lg border ${
                      index === 0 ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={version.status === "deployed" ? "default" : "secondary"}
                          className="font-medium"
                        >
                          {version.version}
                        </Badge>
                        {index === 0 && (
                          <Badge variant="outline" className="text-xs">
                            Current
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">{version.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{version.accuracy.toFixed(1)}% accuracy</span>
                        {version.status === "deployed" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{version.description}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="text-xs">
                        {version.deployment}
                      </Badge>
                      {version.deployment === "CI/CD Pipeline" && (
                        <span className="text-green-600">✅ Automated deployment</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
