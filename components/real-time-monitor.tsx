"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Activity, DollarSign, MapPin, Clock, Shield } from "lucide-react"

interface Transaction {
  id: string
  amount: number
  merchant: string
  location: string
  timestamp: string
  riskScore: number
  status: "Normal" | "Flagged" | "Blocked"
  bank: string
}

export function RealTimeMonitor() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isMonitoring, setIsMonitoring] = useState(true)
  const [flaggedCount, setFlaggedCount] = useState(0)

  // Simulate real-time transactions
  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      const newTransaction: Transaction = {
        id: `TXN${Date.now().toString().slice(-6)}`,
        amount: Math.random() * 5000 + 10,
        merchant: [
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
        ][Math.floor(Math.random() * 12)],
        location: [
          "New York, NY",
          "Los Angeles, CA",
          "Chicago, IL",
          "Houston, TX",
          "Phoenix, AZ",
          "Philadelphia, PA",
          "Unknown Location",
          "Foreign Country",
        ][Math.floor(Math.random() * 8)],
        timestamp: new Date().toLocaleTimeString(),
        riskScore: Math.random(),
        status: "Normal",
        bank: ["Bank A", "Bank B", "Bank C"][Math.floor(Math.random() * 3)],
      }

      // Determine risk based on various factors
      let risk = newTransaction.riskScore
      if (newTransaction.amount > 2000) risk += 0.3
      if (newTransaction.merchant.includes("Crypto") || newTransaction.merchant.includes("Casino")) risk += 0.4
      if (newTransaction.location.includes("Unknown") || newTransaction.location.includes("Foreign")) risk += 0.2
      if (new Date().getHours() < 6 || new Date().getHours() > 23) risk += 0.2

      newTransaction.riskScore = Math.min(risk, 0.99)

      if (newTransaction.riskScore > 0.8) {
        newTransaction.status = "Blocked"
        setFlaggedCount((prev) => prev + 1)
      } else if (newTransaction.riskScore > 0.5) {
        newTransaction.status = "Flagged"
        setFlaggedCount((prev) => prev + 1)
      }

      setTransactions((prev) => [newTransaction, ...prev.slice(0, 19)]) // Keep last 20 transactions
    }, 2000) // New transaction every 2 seconds

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Blocked":
        return "destructive"
      case "Flagged":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getRiskColor = (score: number) => {
    if (score > 0.8) return "text-red-600"
    if (score > 0.5) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-Time Transaction Monitoring
              </CardTitle>
              <CardDescription>
                Live fraud detection using federated model - data stays private, only gradients shared
              </CardDescription>
            </div>
            <Button variant={isMonitoring ? "destructive" : "default"} onClick={() => setIsMonitoring(!isMonitoring)}>
              {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{transactions.length}</div>
                <div className="text-xs text-muted-foreground">Total Processed</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{flaggedCount}</div>
                <div className="text-xs text-muted-foreground">Flagged/Blocked</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-xs text-muted-foreground">Data Privacy</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{"<1s"}</div>
                <div className="text-xs text-muted-foreground">Response Time</div>
              </div>
            </div>
          </div>

          {flaggedCount > 0 && (
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>{flaggedCount} suspicious transactions</strong> detected and flagged for review.
              </AlertDescription>
            </Alert>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      {isMonitoring ? "Waiting for transactions..." : "Monitoring stopped"}
                    </TableCell>
                  </TableRow>
                ) : (
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id} className={transaction.status !== "Normal" ? "bg-red-50" : ""}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.bank}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {transaction.amount.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.merchant}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {transaction.location}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.timestamp}</TableCell>
                      <TableCell>
                        <span className={getRiskColor(transaction.riskScore)}>
                          {(transaction.riskScore * 100).toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(transaction.status) as any}>{transaction.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
