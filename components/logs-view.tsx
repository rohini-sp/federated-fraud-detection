"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Search, Filter, CheckCircle, AlertCircle, Clock, RefreshCw } from "lucide-react"

const logEntries = [
  {
    id: 1,
    timestamp: "2024-01-15 14:35:22",
    event: "Model Sync Completed",
    user: "NODE_A",
    status: "Success",
    details: "Encrypted weights synchronized with global aggregator",
    level: "info",
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:33:15",
    event: "Training Round Started",
    user: "NODE_B",
    status: "Success",
    details: "Local training initiated on 15,000 transactions",
    level: "info",
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:30:08",
    event: "High Risk Transaction Flagged",
    user: "NODE_C",
    status: "Alert",
    details: "Transaction TXN-2024-001247 flagged with 95% risk score",
    level: "warning",
  },
  {
    id: 4,
    timestamp: "2024-01-15 14:28:45",
    event: "Data Upload Completed",
    user: "NODE_A",
    status: "Success",
    details: "CSV file validated and encrypted: transactions_batch_47.csv",
    level: "info",
  },
  {
    id: 5,
    timestamp: "2024-01-15 14:25:33",
    event: "Global Model Updated",
    user: "System",
    status: "Success",
    details: "Model v1.4 deployed via CI/CD pipeline",
    level: "info",
  },
  {
    id: 6,
    timestamp: "2024-01-15 14:22:17",
    event: "Node Authentication",
    user: "NODE_D",
    status: "Success",
    details: "Node successfully authenticated and joined federation",
    level: "info",
  },
  {
    id: 7,
    timestamp: "2024-01-15 14:20:09",
    event: "Training Round Completed",
    user: "NODE_B",
    status: "Success",
    details: "Round 6 completed with 91.2% local accuracy",
    level: "info",
  },
  {
    id: 8,
    timestamp: "2024-01-15 14:18:44",
    event: "Privacy Audit Passed",
    user: "System",
    status: "Success",
    details: "GDPR compliance check completed successfully",
    level: "info",
  },
  {
    id: 9,
    timestamp: "2024-01-15 14:15:22",
    event: "Connection Timeout",
    user: "NODE_C",
    status: "Warning",
    details: "Temporary connection loss during sync - auto-retry successful",
    level: "warning",
  },
  {
    id: 10,
    timestamp: "2024-01-15 14:12:55",
    event: "Fraud Pattern Detected",
    user: "Global Model",
    status: "Alert",
    details: "New fraud pattern identified across multiple nodes",
    level: "warning",
  },
]

interface LogsViewProps {
  userRole: "admin" | "node"
}

export function LogsView({ userRole }: LogsViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  const filteredLogs = logEntries.filter((log) => {
    const matchesSearch =
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || log.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesLevel = levelFilter === "all" || log.level === levelFilter

    return matchesSearch && matchesStatus && matchesLevel
  })

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return (
          <Badge variant="secondary" className="text-green-700 bg-green-100 dark:bg-green-950">
            Success
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="text-yellow-700 border-yellow-300">
            Warning
          </Badge>
        )
      case "alert":
        return <Badge variant="destructive">Alert</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Logs</h1>
          <p className="text-muted-foreground mt-1">Monitor system events, training activities, and security alerts</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Filters
          </CardTitle>
          <CardDescription>Filter logs by search term, status, or event level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events, users, or details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="alert">Alert</SelectItem>
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Event Log
          </CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {logEntries.length} log entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Timestamp</TableHead>
                  <TableHead className="font-semibold">Event</TableHead>
                  <TableHead className="font-semibold">User/Node</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No logs match your current filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell className="font-medium">{log.event}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium">
                          {log.user}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          {getStatusBadge(log.status)}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="text-sm text-muted-foreground truncate">{log.details}</div>
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
