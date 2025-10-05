"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Target, AlertTriangle, CheckCircle, Info } from "lucide-react"

interface PredictionResult {
  riskScore: number
  prediction: "Fraud" | "Normal"
  confidence: number
  explanation: string
}

export function PredictTransaction() {
  const [formData, setFormData] = useState({
    amount: "",
    merchant: "",
    location: "",
    time: "",
  })
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePredict = async () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const amount = Number.parseFloat(formData.amount)
      const isHighAmount = amount > 1000
      const isUnusualMerchant =
        formData.merchant.toLowerCase().includes("crypto") || formData.merchant.toLowerCase().includes("casino")
      const isLateHour =
        formData.time.includes("23:") ||
        formData.time.includes("00:") ||
        formData.time.includes("01:") ||
        formData.time.includes("02:")

      let riskScore = 0.1
      let explanation = "Normal transaction pattern"

      if (isHighAmount) {
        riskScore += 0.3
        explanation = "High transaction amount"
      }

      if (isUnusualMerchant) {
        riskScore += 0.4
        explanation = "Unusual merchant category"
      }

      if (isLateHour) {
        riskScore += 0.2
        explanation = "Late hour transaction"
      }

      if (isHighAmount && isUnusualMerchant) {
        riskScore = 0.92
        explanation = "High amount at unusual merchant"
      }

      const result: PredictionResult = {
        riskScore: Math.min(riskScore, 0.99),
        prediction: riskScore > 0.5 ? "Fraud" : "Normal",
        confidence: riskScore > 0.5 ? riskScore : 1 - riskScore,
        explanation,
      }

      setPrediction(result)
      setIsLoading(false)
    }, 1500)
  }

  const isFormValid = formData.amount && formData.merchant && formData.location && formData.time

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Predict Transaction Risk</h1>
        <p className="text-muted-foreground">
          Real-time fraud detection using federated model trained on private gradients
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Transaction Details
            </CardTitle>
            <CardDescription>Enter transaction information for fraud risk assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="1250.00"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="merchant">Merchant</Label>
              <Input
                id="merchant"
                placeholder="Amazon.com"
                value={formData.merchant}
                onChange={(e) => handleInputChange("merchant", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="New York, NY"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time of Transaction</Label>
              <Input
                id="time"
                type="datetime-local"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
              />
            </div>

            <Button onClick={handlePredict} disabled={!isFormValid || isLoading} className="w-full">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                "Predict Fraud Risk"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prediction Result</CardTitle>
            <CardDescription>AI-powered fraud risk assessment</CardDescription>
          </CardHeader>
          <CardContent>
            {!prediction ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter transaction details and click predict to see results</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">{(prediction.riskScore * 100).toFixed(1)}%</div>
                  <p className="text-muted-foreground">Risk Score</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Prediction:</span>
                    <Badge variant={prediction.prediction === "Fraud" ? "destructive" : "secondary"}>
                      {prediction.prediction === "Fraud" ? (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      ) : (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      )}
                      {prediction.prediction}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Confidence:</span>
                    <span className="text-sm">{(prediction.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>

                <Separator />

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Explanation:</strong> {prediction.explanation}
                  </AlertDescription>
                </Alert>

                <div className="text-xs text-muted-foreground">
                  <p>Model Version: v1.6 (Federated)</p>
                  <p>Prediction Time: {new Date().toLocaleString()}</p>
                  <p>Privacy: Raw data never shared</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
