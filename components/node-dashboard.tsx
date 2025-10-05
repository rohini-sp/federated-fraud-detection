"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Activity, Shield, Clock, GitBranch, Lock, Wifi, Database } from "lucide-react"

const localAccuracyData = [
  { round: 1, accuracy: 69.8 },
  { round: 2, accuracy: 74.2 },
  { round: 3, accuracy: 79.5 },
  { round: 4, accuracy: 83.1 },
  { round: 5, accuracy: 86.8 },
  { round: 6, accuracy: 87.4 },
]

const recentLocalPredictions = [
  { id: "LOCAL-001247", amount: 1250.0, riskScore: 0.12, prediction: "Normal", time: "14:32:15" },
  { id: "LOCAL-001248", amount: 89.5, riskScore: 0.08, prediction: "Normal", time: "14:32:08" },
  { id: "LOCAL-001249", amount: 3200.0, riskScore: 0.78, prediction: "Fraudulent", time: "14:31:54" },
  { id: "LOCAL-001250", amount: 45.99, riskScore: 0.15, prediction: "Normal", time: "14:31:42" },
  { id: "LOCAL-001251", amount: 5000.0, riskScore: 0.95, prediction: "Fraudulent", time: "14:31:28" },
]

interface NodeDashboardProps {
  nodeId?: string
}

export function NodeDashboard({ nodeId = "NODE_A" }: NodeDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Node Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Local performance metrics and global model synchronization for {nodeId}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <Shield className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Data Privacy Protected</span>
        </div>
      </div>

      {/* Privacy Assurance */}
      <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          <strong>🔒 Complete Privacy:</strong> All data shown here is processed locally on your node. Your transaction
          data never leaves this system and remains fully encrypted.
          <br />
          <span className="text-xs mt-1 block">
            ✅ GDPR Compliant • ✅ DPDP Ready • ✅ HIPAA-Safe • ✅ Zero Data Leakage
          </span>
        </AlertDescription>
      </Alert>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Local Accuracy</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">87.4%</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">On private dataset</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Global Model</CardTitle>
            <GitBranch className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">v1.4</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">92.4% global accuracy</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Last Sync</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">2m</div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">ago</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Privacy Status</CardTitle>
            <Shield className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">🔒</div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Fully protected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Local Performance Chart */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Local Model Performance
            </CardTitle>
            <CardDescription>Your node's accuracy improvement through federated learning</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={localAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="round" />
                <YAxis domain={[65, 90]} />
                <Tooltip
                  formatter={(value) => [`${Number(value).toFixed(1)}%`, "Local Accuracy"]}
                  labelFormatter={(label) => `Training Round ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: "#2563eb", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: "#2563eb", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Global Model Info */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-green-600" />
              Global Model Information
            </CardTitle>
            <CardDescription>Read-only information about the federated global model</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-sm font-medium text-green-700 dark:text-green-300">Version</div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">v1.4</div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Global Accuracy</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">92.4%</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Sync</span>
                <span className="text-sm text-muted-foreground">2 minutes ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sync Status</span>
                <div className="flex items-center gap-1">
                  <Wifi className="h-3 w-3 text-green-600" />
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Model Weights</span>
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-blue-600" />
                  <span className="text-sm text-blue-600">Encrypted</span>
                </div>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
              <Database className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 dark:text-blue-200 text-xs">
                Global model weights are downloaded and used locally for predictions. No raw data is ever shared with
                the global aggregator.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Recent Local Predictions */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-600" />
            Recent Local Predictions
          </CardTitle>
          <CardDescription>Latest fraud detection results processed locally on your node</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentLocalPredictions.map((prediction) => (
              <div
                key={prediction.id}
                className={`p-4 rounded-lg border ${
                  prediction.prediction === "Fraudulent"
                    ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
                    : "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={prediction.prediction === "Fraudulent" ? "destructive" : "secondary"}
                      className="font-medium"
                    >
                      {prediction.prediction}
                    </Badge>
                    <span className="font-mono text-sm text-muted-foreground">{prediction.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Risk: {(prediction.riskScore * 100).toFixed(1)}%</span>
                    <div
                      className={`h-2 w-16 rounded-full ${
                        prediction.riskScore > 0.7
                          ? "bg-red-200"
                          : prediction.riskScore > 0.4
                            ? "bg-yellow-200"
                            : "bg-green-200"
                      }`}
                    >
                      <div
                        className={`h-full rounded-full ${
                          prediction.riskScore > 0.7
                            ? "bg-red-500"
                            : prediction.riskScore > 0.4
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${prediction.riskScore * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Amount: ${prediction.amount.toFixed(2)}</span>
                  <span>Time: {prediction.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
