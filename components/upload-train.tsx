"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  FileText,
  Shield,
  Lock,
  Database,
  Cpu,
  Wifi,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UploadTrainProps {
  nodeId?: string
}

export function UploadTrain({ nodeId = "NODE_A" }: UploadTrainProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isTraining, setIsTraining] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [trainingProgress, setTrainingProgress] = useState(0)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadStatus("uploading")

      // Simulate upload with progress
      let progress = 0
      const uploadInterval = setInterval(() => {
        progress += Math.random() * 20
        if (progress >= 100) {
          clearInterval(uploadInterval)
          setUploadStatus("success")
          toast({
            title: "File uploaded successfully",
            description: `${selectedFile.name} has been validated and is ready for training.`,
          })
        }
      }, 200)
    }
  }

  const handleStartTraining = () => {
    if (!file) {
      toast({
        title: "No data file",
        description: "Please upload transaction data before starting training.",
        variant: "destructive",
      })
      return
    }

    setIsTraining(true)
    setTrainingProgress(0)
    toast({
      title: "Training started",
      description: "Local model training has begun. Raw data stays secure on your node.",
    })

    // Simulate training progress
    const trainingInterval = setInterval(() => {
      setTrainingProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(trainingInterval)
          setIsTraining(false)
          toast({
            title: "Training completed",
            description: "Encrypted model weights are ready for synchronization.",
          })
          return 100
        }
        return newProgress
      })
    }, 300)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Private Local Training</h1>
        <p className="text-muted-foreground mt-1">
          Upload and train on your private transaction data for {nodeId} - data never leaves this node
        </p>
      </div>

      {/* Enhanced Privacy Assurance Banner */}
      <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          <strong>🔒 Maximum Privacy:</strong> Your raw transaction data is encrypted and never leaves this node. Only
          encrypted gradient updates are shared with the global aggregator.
          <br />
          <span className="text-xs mt-1 block">✅ GDPR Compliant • ✅ DPDP Ready • ✅ Zero Data Leakage</span>
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Section */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-600" />
              Data Upload
            </CardTitle>
            <CardDescription>Upload your private transaction dataset for local model training</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload" className="text-sm font-medium">
                Transaction Data (CSV)
              </Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                <Input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  disabled={uploadStatus === "uploading"}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">CSV files only</p>
                </label>
              </div>
            </div>

            {uploadStatus === "uploading" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Validating file format and encrypting data...
                </div>
                <Progress value={65} className="w-full" />
              </div>
            )}

            {uploadStatus === "success" && file && (
              <div className="space-y-3">
                <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    <strong>{file.name}</strong> uploaded successfully!
                    <br />
                    <span className="text-xs">Columns validated: Amount, Time, Merchant, Location, is_fraud</span>
                  </AlertDescription>
                </Alert>

                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{file.name}</span>
                  <Badge variant="outline" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Encrypted
                  </Badge>
                </div>
              </div>
            )}

            {uploadStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Upload failed. Please check file format and try again.</AlertDescription>
              </Alert>
            )}

            <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
              <p className="font-medium mb-1">Required CSV columns:</p>
              <p>Amount, Time, Merchant, Location, is_fraud</p>
            </div>
          </CardContent>
        </Card>

        {/* Node Status */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-600" />
              {nodeId} Status
            </CardTitle>
            <CardDescription>Local training status and global model synchronization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Local Accuracy</div>
                <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">87.4%</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">On private data</div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-sm font-medium text-green-700 dark:text-green-300">Global Model</div>
                <div className="text-2xl font-bold text-green-900 dark:text-green-100">v1.4</div>
                <div className="text-xs text-green-600 dark:text-green-400">Synced 2 min ago</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Training Status</span>
                <Badge variant={isTraining ? "default" : "secondary"}>
                  {isTraining ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b border-white mr-1"></div>
                      Training Locally
                    </>
                  ) : (
                    "Ready"
                  )}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Data Privacy</span>
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-green-600" />
                  <span className="text-sm text-green-600">Encrypted</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Global Sync</span>
                <div className="flex items-center gap-1">
                  <Wifi className="h-3 w-3 text-green-600" />
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              </div>
            </div>

            {file && (
              <div className="p-3 bg-muted rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{file.name}</span>
                  <Badge variant="outline" className="text-xs">
                    <Lock className="h-3 w-3 mr-1" />
                    Encrypted
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  🔒 Locally encrypted • Ready for private training
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Training Controls */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-orange-600" />
            Training Controls
          </CardTitle>
          <CardDescription>
            Start local model training and sync encrypted weights to the global aggregator
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              onClick={handleStartTraining}
              disabled={isTraining || !file}
              className="flex items-center gap-2"
              size="lg"
            >
              <Play className="h-4 w-4" />
              Start Local Training
            </Button>

            <Button
              variant="outline"
              disabled={!isTraining}
              onClick={() => {
                setIsTraining(false)
                setTrainingProgress(0)
              }}
              className="flex items-center gap-2"
              size="lg"
            >
              <Pause className="h-4 w-4" />
              Stop Training
            </Button>
          </div>

          {isTraining && (
            <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Training local model on {file?.name}...
              </div>
              <Progress value={trainingProgress} className="w-full" />
              <div className="flex justify-between text-xs text-blue-600 dark:text-blue-400">
                <span>Progress: {trainingProgress.toFixed(1)}%</span>
                <span>Est. time remaining: {Math.max(0, Math.ceil((100 - trainingProgress) / 10))} minutes</span>
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                🔒 Raw data remains on your node • Only encrypted gradients will be shared
              </div>
            </div>
          )}

          {!isTraining && trainingProgress === 100 && (
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                <strong>Training completed successfully!</strong>
                <br />
                Encrypted model weights have been synchronized with the global aggregator.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
