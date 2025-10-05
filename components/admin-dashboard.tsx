"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Activity, Users, RotateCcw, TrendingUp, GitBranch, CheckCircle, Shield, Clock } from "lucide-react"

const accuracyData = [
  { round: 1, accuracy: 72.1 },
  { round: 2, accuracy: 76.3 },
  { round: 3, accuracy: 81.2 },
  { round: 4, accuracy: 84.7 },
  { round: 5, accuracy: 87.9 },
  { round: 6, accuracy: 92.4 },
]

const dailyPredictions = [
  { node: "Bank A", predictions: 1247 },
  { node: "Bank B", predictions: 892 },
  { node: "Bank C", predictions: 1156 },
  { node: "Bank D", predictions: 743 },
]

const recentTransactions = [
  { id: "TXN-2024-001247", node: "Bank A", riskScore: 0.92, prediction: "Fraudulent", time: "14:32:15" },
  { id: "TXN-2024-001248", node: "Bank B", riskScore: 0.15, prediction: "Normal", time: "14:32:08" },
  { id: "TXN-2024-001249", node: "Bank C", riskScore: 0.78, prediction: "Fraudulent", time: "14:31:54" },
  { id: "TXN-2024-001250", node: "Bank A", riskScore: 0.23, prediction: "Normal", time: "14:31:42" },
  { id: "TXN-2024-001251", node: "Bank D", riskScore: 0.95, prediction: "Fraudulent", time: "14:31:28" },
]

interface AdminDashboardProps {
  userRole: "admin" | "node"
}

export function AdminDashboard({ userRole }: AdminDashboardProps) {
  return (
    <div className="space-y-6">
      {userRole === "node" ? (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Node Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Local performance metrics and global model synchronization status
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Data Privacy Protected</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Global Overview</h1>
            <p className="text-muted-foreground mt-1">
              Monitor federated learning performance across all participating institutions
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">All Systems Operational</span>
          </div>
        </div>
      )}

      {userRole === "node" ? (
        // Node-specific dashboard
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
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">92.4% accuracy</p>
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
      ) : (
        // Admin dashboard (existing content)
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Global Model Accuracy
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">92.4%</div>
              <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1">
                <span className="text-green-600">↗ +5.5%</span> from last round
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Nodes Participating
              </CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">4</div>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Banks actively training</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Training Rounds</CardTitle>
              <RotateCcw className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100">6</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">Completed successfully</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Current Version
              </CardTitle>
              <GitBranch className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">v1.4</div>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Deployed 5 mins ago</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Global Accuracy vs Training Rounds
            </CardTitle>
            <CardDescription>Model performance improvement through federated learning</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="round" />
                <YAxis domain={[70, 95]} />
                <Tooltip
                  formatter={(value) => [`${Number(value).toFixed(1)}%`, "Accuracy"]}
                  labelFormatter={(label) => `Round ${label}`}
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

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Daily Fraud Predictions by Node
            </CardTitle>
            <CardDescription>Transaction processing volume across participating banks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyPredictions}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="node" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}`, "Predictions"]} />
                <Bar dataKey="predictions" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Recent Transaction Predictions
          </CardTitle>
          <CardDescription>Latest fraud detection results from all participating nodes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Transaction ID</TableHead>
                <TableHead className="font-semibold">Node</TableHead>
                <TableHead className="font-semibold">Risk Score</TableHead>
                <TableHead className="font-semibold">Prediction</TableHead>
                <TableHead className="font-semibold">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-medium">
                      {transaction.node}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{transaction.riskScore.toFixed(2)}</div>
                      <div
                        className={`h-2 w-16 rounded-full ${
                          transaction.riskScore > 0.7
                            ? "bg-red-200"
                            : transaction.riskScore > 0.4
                              ? "bg-yellow-200"
                              : "bg-green-200"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full ${
                            transaction.riskScore > 0.7
                              ? "bg-red-500"
                              : transaction.riskScore > 0.4
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${transaction.riskScore * 100}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={transaction.prediction === "Fraudulent" ? "destructive" : "secondary"}
                      className="font-medium"
                    >
                      {transaction.prediction}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{transaction.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
