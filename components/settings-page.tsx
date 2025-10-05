"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Shield, Key, Users, Save, AlertTriangle, CheckCircle, Globe, Database } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SettingsPageProps {
  userRole: "admin" | "node"
}

export function SettingsPage({ userRole }: SettingsPageProps) {
  const [settings, setSettings] = useState({
    // Federated Learning Settings
    aggregationType: "FedAvg",
    maxRounds: "10",
    learningRate: "0.001",
    batchSize: "32",
    autoRetrain: true,

    // Privacy Settings
    encryptionLevel: "AES-256",
    differentialPrivacy: true,
    privacyBudget: "1.0",

    // Node Management
    maxNodes: "10",
    nodeTimeout: "300",

    // API Settings
    apiKey: "sk-fed-fraud-2024-***************",
    webhookUrl: "",

    // Compliance
    gdprCompliance: true,
    auditLogging: true,
    dataRetention: "90",
  })

  const { toast } = useToast()

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved successfully",
      description: "All configuration changes have been applied to the federated system.",
    })
  }

  const handleGenerateApiKey = () => {
    const newKey = `sk-fed-fraud-2024-${Math.random().toString(36).substring(2, 15)}`
    setSettings((prev) => ({ ...prev, apiKey: newKey }))
    toast({
      title: "New API key generated",
      description: "Please save your new API key securely.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure federated learning parameters, privacy settings, and system preferences
        </p>
      </div>

      <Tabs defaultValue="federated" className="space-y-4">
        {userRole === "admin" ? (
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="federated">Federated Learning</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            <TabsTrigger value="nodes">Node Management</TabsTrigger>
            <TabsTrigger value="api">API & Integration</TabsTrigger>
          </TabsList>
        ) : (
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            <TabsTrigger value="local">Local Settings</TabsTrigger>
          </TabsList>
        )}

        <TabsContent value="federated" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                Federated Learning Configuration
              </CardTitle>
              <CardDescription>Configure global training parameters for all participating nodes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="aggregationType">Aggregation Algorithm</Label>
                  <Select
                    value={settings.aggregationType}
                    onValueChange={(value) => handleSettingChange("aggregationType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FedAvg">FedAvg (Federated Averaging)</SelectItem>
                      <SelectItem value="FedProx">FedProx (Federated Proximal)</SelectItem>
                      <SelectItem value="FedNova">FedNova (Federated Nova)</SelectItem>
                      <SelectItem value="SCAFFOLD">SCAFFOLD</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Algorithm for aggregating model weights across nodes</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxRounds">Maximum Training Rounds</Label>
                  <Input
                    id="maxRounds"
                    type="number"
                    value={settings.maxRounds}
                    onChange={(e) => handleSettingChange("maxRounds", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Maximum number of federated learning rounds</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="learningRate">Learning Rate</Label>
                  <Input
                    id="learningRate"
                    type="number"
                    step="0.0001"
                    value={settings.learningRate}
                    onChange={(e) => handleSettingChange("learningRate", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Learning rate for local model training</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batchSize">Batch Size</Label>
                  <Input
                    id="batchSize"
                    type="number"
                    value={settings.batchSize}
                    onChange={(e) => handleSettingChange("batchSize", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Number of samples per training batch</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="space-y-1">
                  <Label htmlFor="autoRetrain" className="text-sm font-medium">
                    Auto-Retrain on New Data
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically trigger training when new data is uploaded
                  </p>
                </div>
                <Switch
                  id="autoRetrain"
                  checked={settings.autoRetrain}
                  onCheckedChange={(checked) => handleSettingChange("autoRetrain", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Privacy & Security Settings
              </CardTitle>
              <CardDescription>Configure data protection and privacy-preserving mechanisms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  <strong>Privacy Guaranteed:</strong> Raw data never leaves individual nodes. Only encrypted gradients
                  and aggregated weights are shared.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="encryptionLevel">Encryption Level</Label>
                  <Select
                    value={settings.encryptionLevel}
                    onValueChange={(value) => handleSettingChange("encryptionLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AES-128">AES-128</SelectItem>
                      <SelectItem value="AES-256">AES-256 (Recommended)</SelectItem>
                      <SelectItem value="RSA-2048">RSA-2048</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Encryption standard for data transmission</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="privacyBudget">Privacy Budget (ε)</Label>
                  <Input
                    id="privacyBudget"
                    type="number"
                    step="0.1"
                    value={settings.privacyBudget}
                    onChange={(e) => handleSettingChange("privacyBudget", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Differential privacy budget (lower = more private)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor="differentialPrivacy" className="text-sm font-medium">
                      Differential Privacy
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Add calibrated noise to gradients for enhanced privacy
                    </p>
                  </div>
                  <Switch
                    id="differentialPrivacy"
                    checked={settings.differentialPrivacy}
                    onCheckedChange={(checked) => handleSettingChange("differentialPrivacy", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor="gdprCompliance" className="text-sm font-medium">
                      GDPR Compliance Mode
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Enable additional privacy protections for GDPR compliance
                    </p>
                  </div>
                  <Switch
                    id="gdprCompliance"
                    checked={settings.gdprCompliance}
                    onCheckedChange={(checked) => handleSettingChange("gdprCompliance", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="space-y-1">
                    <Label htmlFor="auditLogging" className="text-sm font-medium">
                      Audit Logging
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Maintain detailed logs for compliance and security audits
                    </p>
                  </div>
                  <Switch
                    id="auditLogging"
                    checked={settings.auditLogging}
                    onCheckedChange={(checked) => handleSettingChange("auditLogging", checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataRetention">Data Retention Period (days)</Label>
                <Input
                  id="dataRetention"
                  type="number"
                  value={settings.dataRetention}
                  onChange={(e) => handleSettingChange("dataRetention", e.target.value)}
                  className="max-w-xs"
                />
                <p className="text-xs text-muted-foreground">
                  How long to retain logs and metadata (not raw transaction data)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nodes" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Node Management
              </CardTitle>
              <CardDescription>Manage participating nodes and connection settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="maxNodes">Maximum Nodes</Label>
                  <Input
                    id="maxNodes"
                    type="number"
                    value={settings.maxNodes}
                    onChange={(e) => handleSettingChange("maxNodes", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Maximum number of nodes allowed in federation</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nodeTimeout">Node Timeout (seconds)</Label>
                  <Input
                    id="nodeTimeout"
                    type="number"
                    value={settings.nodeTimeout}
                    onChange={(e) => handleSettingChange("nodeTimeout", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Timeout for node communication and synchronization</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Active Nodes</h4>
                <div className="space-y-2">
                  {["Bank A", "Bank B", "Bank C", "Bank D"].map((node, index) => (
                    <div key={node} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium">{node}</span>
                        <Badge variant="outline" className="text-xs">
                          NODE_{String.fromCharCode(65 + index)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Last seen: 2 min ago</span>
                        <Button variant="ghost" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-orange-600" />
                API & Integration Settings
              </CardTitle>
              <CardDescription>Configure API access and external integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex gap-2">
                    <Input id="apiKey" type="password" value={settings.apiKey} readOnly className="font-mono" />
                    <Button variant="outline" onClick={handleGenerateApiKey}>
                      Generate New
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    API key for programmatic access to the federated system
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    type="url"
                    placeholder="https://your-system.com/webhook"
                    value={settings.webhookUrl}
                    onChange={(e) => handleSettingChange("webhookUrl", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Receive notifications about training events and alerts
                  </p>
                </div>
              </div>

              <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 dark:text-orange-200">
                  <strong>Security Notice:</strong> Keep your API keys secure and rotate them regularly. Never share API
                  keys in public repositories or unsecured channels.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Integration Status</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">REST API</span>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Webhooks</span>
                    </div>
                    <Badge variant="outline">Configured</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {userRole === "node" && (
          <TabsContent value="local" className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  Local Node Configuration
                </CardTitle>
                <CardDescription>Configure local training and data handling settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    <strong>Privacy First:</strong> All settings apply only to local processing. No configuration data
                    is shared with other nodes or the central aggregator.
                  </AlertDescription>
                </Alert>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="localBatchSize">Local Batch Size</Label>
                    <Input id="localBatchSize" type="number" value="32" className="max-w-xs" />
                    <p className="text-xs text-muted-foreground">Batch size for local model training</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="localLearningRate">Local Learning Rate</Label>
                    <Input id="localLearningRate" type="number" step="0.0001" value="0.001" className="max-w-xs" />
                    <p className="text-xs text-muted-foreground">Learning rate for local training</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Auto-sync with Global Model</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically download global model updates when available
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Local Data Encryption</Label>
                      <p className="text-xs text-muted-foreground">Encrypt all local data files and model weights</p>
                    </div>
                    <Switch defaultChecked disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="gap-2" size="lg">
          <Save className="h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  )
}
