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
import { Upload, Play, Pause, CheckCircle, AlertCircle, FileText, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function NodeControlPanel() {
  const [file, setFile] = useState<File | null>(null)
  const [isTraining, setIsTraining] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadStatus("uploading")

      // Simulate upload
      setTimeout(() => {
        setUploadStatus("success")
        toast({
          title: "File uploaded successfully",
          description: `${selectedFile.name} has been validated and uploaded.`,
        })
      }, 2000)
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
    toast({
      title: "Training started",
      description: "Local model training has begun.",
    })

    // Simulate training completion
    setTimeout(() => {
      setIsTraining(false)
      toast({
        title: "Training completed",
        description: "Local model weights are ready for synchronization.",
      })
    }, 5000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bank Node Control Panel</h1>
        <p className="text-muted-foreground">Manage your local training data and participate in federated learning</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Data Upload
            </CardTitle>
            <CardDescription>
              Upload your transaction data for local training - raw data never leaves your premises
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-upload">Transaction Data (CSV)</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={uploadStatus === "uploading"}
              />
            </div>

            {uploadStatus === "uploading" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Validating file format...
                </div>
                <Progress value={65} className="w-full" />
              </div>
            )}

            {uploadStatus === "success" && file && (
              <>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{file.name}</strong> uploaded successfully. Format validated: Amount, Time, Merchant,
                    Location, is_fraud
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Privacy Protected:</strong> Your raw data stays on your local system. Only encrypted
                    gradients and model weights will be shared during federated training.
                  </AlertDescription>
                </Alert>
              </>
            )}

            {uploadStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Upload failed. Please check file format and try again.</AlertDescription>
              </Alert>
            )}

            <div className="text-sm text-muted-foreground">
              <p>Required columns: Amount, Time, Merchant, Location, is_fraud</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Node Status</CardTitle>
            <CardDescription>Current training status and performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Current Round</Label>
                <div className="text-2xl font-bold">6</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Local Accuracy</Label>
                <div className="text-2xl font-bold">87.4%</div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Local Contribution</Label>
              <div className="text-2xl font-bold">32.1%</div>
              <p className="text-xs text-muted-foreground">of global model weights</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Training Status</Label>
              <Badge variant={isTraining ? "default" : "secondary"}>
                {isTraining ? "Training in Progress" : "Ready"}
              </Badge>
            </div>

            {file && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data File</Label>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4" />
                  {file.name}
                  <Badge variant="outline">Validated</Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training Controls</CardTitle>
          <CardDescription>Train locally and share only gradients - your data remains private</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={handleStartTraining} disabled={isTraining || !file} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Start Training Round
            </Button>

            <Button
              variant="outline"
              disabled={!isTraining}
              onClick={() => setIsTraining(false)}
              className="flex items-center gap-2"
            >
              <Pause className="h-4 w-4" />
              Stop Training
            </Button>
          </div>

          {isTraining && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Training local model on {file?.name}...
              </div>
              <Progress value={75} className="w-full" />
              <p className="text-xs text-muted-foreground">Estimated time remaining: 2 minutes</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
