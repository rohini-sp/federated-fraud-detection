"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Activity, AlertTriangle, DollarSign, MapPin, Clock, Shield, Play, Pause, Zap, Globe, Wifi } from "lucide-react"

interface Transaction {
  id: string
  amount: number
  merchant: string
  location: string
  timestamp: string
  riskScore: number
  status: "Normal" | "Fraudulent"
  explanation?: string
}

interface RealTimePredictionsProps {
  nodeId?: string
}

export function RealTimePredictions({ nodeId = "NODE_A" }: RealTimePredictionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isStreaming, setIsStreaming] = useState(true)
  const [highRiskAlert, setHighRiskAlert] = useState<Transaction | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    fraudulent: 0,
    normal: 0,
  })

  // Simulate real-time transactions
  useEffect(() => {
    if (!isStreaming) return

    const interval = setInterval(() => {
      const merchants = [
        "Amazon.com",
        "Walmart",
        "Target",
        "Best Buy",
        "Starbucks",
        "McDonald's",
        "Shell Gas",
        "Crypto Exchange",
        "Online Casino",
        "Unknown Merchant",
        "ATM Withdrawal",
        "Wire Transfer",
        "PayPal",
        "Stripe",
        "Square",
      ]

      const locations = [
        "New York, NY",
        "Los Angeles, CA",
        "Chicago, IL",
        "Houston, TX",
        "Phoenix, AZ",
        "Philadelphia, PA",
        "San Antonio, TX",
        "San Diego, CA",
        "Dallas, TX",
        "San Jose, CA",
        "Unknown Location",
        "Foreign Country",
      ]

      const newTransaction: Transaction = {
        id: nodeId ? `${nodeId}-${Date.now().toString().slice(-8)}` : `TXN-${Date.now().toString().slice(-8)}`,
        amount: Math.random() * 5000 + 10,
        merchant: merchants[Math.floor(Math.random() * merchants.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        timestamp: new Date().toLocaleTimeString(),
        riskScore: Math.random(),
        status: "Normal",
      }

      // Calculate risk based on various factors
      let risk = newTransaction.riskScore
      const explanations = []

      if (newTransaction.amount > 2000) {
        risk += 0.3
        explanations.push("High amount")
      }

      if (newTransaction.merchant.includes("Crypto") || newTransaction.merchant.includes("Casino")) {
        risk += 0.4
        explanations.push("Unusual merchant")
      }

      if (newTransaction.location.includes("Unknown") || newTransaction.location.includes("Foreign")) {
        risk += 0.2
        explanations.push("Suspicious location")
      }

      const hour = new Date().getHours()
      if (hour < 6 || hour > 23) {
        risk += 0.2
        explanations.push("Off-hours transaction")
      }

      newTransaction.riskScore = Math.min(risk, 0.99)
      newTransaction.status = newTransaction.riskScore > 0.5 ? "Fraudulent" : "Normal"

      if (explanations.length > 0) {
        newTransaction.explanation = explanations.join(" + ")
      }

      // Trigger high-risk alert
      if (newTransaction.riskScore > 0.9) {
        setHighRiskAlert(newTransaction)
        setTimeout(() => setHighRiskAlert(null), 5000)
      }

      setTransactions((prev) => [newTransaction, ...prev.slice(0, 19)])
      setStats((prev) => ({
        total: prev.total + 1,
        fraudulent: prev.fraudulent + (newTransaction.status === "Fraudulent" ? 1 : 0),
        normal: prev.normal + (newTransaction.status === "Normal" ? 1 : 0),
      }))
    }, 2500)

    return () => clearInterval(interval)
  }, [isStreaming])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {nodeId ? "Local Fraud Predictions" : "Real-Time Predictions"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {nodeId
              ? `Local fraud detection for ${nodeId} using global federated model weights`
              : "Live fraud detection stream for all nodes using global federated model"}
          </p>
        </div>
        <Button
          onClick={() => setIsStreaming(!isStreaming)}
          variant={isStreaming ? "destructive" : "default"}
          className="gap-2"
        >
          {isStreaming ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isStreaming ? "Pause Stream" : "Resume Stream"}
        </Button>
      </div>

      {nodeId && (
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>🔒 Local Processing:</strong> All predictions are processed locally using global model weights. Your
            transaction data never leaves this node and remains fully encrypted.
          </AlertDescription>
        </Alert>
      )}

      {/* High Risk Alert */}
      {highRiskAlert && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-950 animate-pulse">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>🚨 High-risk transaction flagged — take action.</strong>
            <br />
            Transaction {highRiskAlert.id} • Risk Score: {(highRiskAlert.riskScore * 100).toFixed(1)}% • Amount: $
            {highRiskAlert.amount.toFixed(2)}
          </AlertDescription>
        </Alert>
      )}

      {/* Global Model Info */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Global Model</div>
                <div className="text-lg font-bold text-blue-900 dark:text-blue-100">v1.4</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Wifi className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-green-700 dark:text-green-300">Last Synced</div>
                <div className="text-lg font-bold text-green-900 dark:text-green-100">2 mins ago</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-purple-700 dark:text-purple-300">Global Accuracy</div>
                <div className="text-lg font-bold text-purple-900 dark:text-purple-100">92.4%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-orange-700 dark:text-orange-300">Node Latency</div>
                <div className="text-lg font-bold text-orange-900 dark:text-orange-100">~80ms</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Processed</div>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.fraudulent}</div>
                <div className="text-sm text-muted-foreground">Fraudulent</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.normal}</div>
                <div className="text-sm text-muted-foreground">Normal</div>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Transaction Stream */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Live Transaction Stream
            {isStreaming && <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />}
          </CardTitle>
          <CardDescription>
            Real-time fraud detection results • Data privacy maintained • Only predictions shared
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {isStreaming ? "Waiting for transactions..." : "Stream paused"}
              </div>
            ) : (
              transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`p-4 rounded-lg border transition-all duration-500 ${
                    transaction.status === "Fraudulent"
                      ? "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
                      : "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                  } ${index === 0 ? "animate-in slide-in-from-top-2" : ""}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={transaction.status === "Fraudulent" ? "destructive" : "secondary"}
                        className="font-medium"
                      >
                        {transaction.status}
                      </Badge>
                      <span className="font-mono text-sm text-muted-foreground">{transaction.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">Risk: {(transaction.riskScore * 100).toFixed(1)}%</div>
                      <Progress value={transaction.riskScore * 100} className="w-16 h-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">${transaction.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Merchant:</span>
                      <span className="font-medium truncate">{transaction.merchant}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium truncate">{transaction.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{transaction.timestamp}</span>
                    </div>
                  </div>

                  {transaction.explanation && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <strong>Explanation:</strong> {transaction.explanation}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
