"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Activity, Clock, CheckCircle, AlertCircle, Shield, RotateCcw } from "lucide-react"

const nodeData = [
  { name: "Bank A", status: "Training", lastSync: "2 min ago", accuracy: 0.891, contribution: 35.2 },
  { name: "Bank B", status: "Synced", lastSync: "5 min ago", accuracy: 0.874, contribution: 32.1 },
  { name: "Bank C", status: "Training", lastSync: "1 min ago", accuracy: 0.883, contribution: 32.7 },
]

const rocData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.1, tpr: 0.65 },
  { fpr: 0.2, tpr: 0.78 },
  { fpr: 0.3, tpr: 0.85 },
  { fpr: 0.4, tpr: 0.89 },
  { fpr: 0.5, tpr: 0.92 },
  { fpr: 0.6, tpr: 0.94 },
  { fpr: 0.7, tpr: 0.96 },
  { fpr: 0.8, tpr: 0.97 },
  { fpr: 0.9, tpr: 0.98 },
  { fpr: 1, tpr: 1 },
]

const precisionRecallData = [
  { recall: 0, precision: 1 },
  { recall: 0.1, precision: 0.95 },
  { recall: 0.2, precision: 0.92 },
  { recall: 0.3, precision: 0.89 },
  { recall: 0.4, precision: 0.87 },
  { recall: 0.5, precision: 0.85 },
  { recall: 0.6, precision: 0.82 },
  { recall: 0.7, precision: 0.78 },
  { recall: 0.8, precision: 0.73 },
  { recall: 0.9, precision: 0.65 },
  { recall: 1, precision: 0.45 },
]

const trainingLogs = [
  { timestamp: "2024-01-15 14:35", node: "Bank A", event: "Training Started", result: "Success" },
  { timestamp: "2024-01-15 14:33", node: "Bank B", event: "Weights Synchronized", result: "Success" },
  { timestamp: "2024-01-15 14:30", node: "Bank C", event: "Training Completed", result: "Success" },
  { timestamp: "2024-01-15 14:28", node: "Bank A", event: "Data Validation", result: "Success" },
  { timestamp: "2024-01-15 14:25", node: "Bank B", event: "Training Started", result: "Success" },
  { timestamp: "2024-01-15 14:22", node: "Global", event: "Model Aggregation", result: "Success" },
  { timestamp: "2024-01-15 14:20", node: "Bank C", event: "Weights Synchronized", result: "Success" },
]

export function TrainingMonitor() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Federated Training Monitor</h1>
        <p className="text-muted-foreground">
          Monitor gradient sharing and model aggregation across all participating nodes - no raw data is ever shared
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-sm font-medium">Data Privacy</div>
                <div className="text-xs text-muted-foreground">Raw data never shared</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-sm font-medium">Gradients</div>
                <div className="text-xs text-muted-foreground">Encrypted & aggregated</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-sm font-medium">Model Weights</div>
                <div className="text-xs text-muted-foreground">Federated averaging</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-sm font-medium">Compliance</div>
                <div className="text-xs text-muted-foreground">GDPR & PCI DSS</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Active Nodes
          </CardTitle>
          <CardDescription>Real-time status of all participating bank nodes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Node Name</TableHead>
                <TableHead>Training Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Local Accuracy</TableHead>
                <TableHead>Contribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nodeData.map((node) => (
                <TableRow key={node.name}>
                  <TableCell className="font-medium">{node.name}</TableCell>
                  <TableCell>
                    <Badge variant={node.status === "Training" ? "default" : "secondary"}>
                      {node.status === "Training" && (
                        <div className="animate-spin rounded-full h-3 w-3 border-b border-white mr-1"></div>
                      )}
                      {node.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    {node.lastSync}
                  </TableCell>
                  <TableCell>{(node.accuracy * 100).toFixed(1)}%</TableCell>
                  <TableCell>{node.contribution.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Global Model Metrics</TabsTrigger>
          <TabsTrigger value="logs">Training Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>ROC Curve</CardTitle>
                <CardDescription>Receiver Operating Characteristic curve showing model performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={rocData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="fpr"
                      label={{ value: "False Positive Rate", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis label={{ value: "True Positive Rate", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value, name) => [Number(value).toFixed(3), name === "tpr" ? "TPR" : "FPR"]} />
                    <Line type="monotone" dataKey="tpr" stroke="#2563eb" strokeWidth={2} dot={false} />
                    <Line
                      type="monotone"
                      dataKey="fpr"
                      stroke="#dc2626"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Precision-Recall Curve</CardTitle>
                <CardDescription>Precision vs Recall trade-off for fraud detection</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={precisionRecallData}>
                    <CartesianGrid strokeDasharray="3 3" />
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

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Training Event Log</CardTitle>
              <CardDescription>Chronological log of all training events and synchronizations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Node</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainingLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>{log.node}</TableCell>
                      <TableCell>{log.event}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {log.result === "Success" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span className={log.result === "Success" ? "text-green-600" : "text-red-600"}>
                            {log.result}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
