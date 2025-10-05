"use client"

import { useState } from "react"
import { SidebarHeader } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Activity,
  Upload,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
  Menu,
} from "lucide-react"
import { useTheme } from "next-themes"
import { AdminDashboard } from "@/components/admin-dashboard"
import { RealTimePredictions } from "@/components/real-time-predictions"
import { UploadTrain } from "@/components/upload-train"
import { ModelPerformance } from "@/components/model-performance"
import { LogsView } from "@/components/logs-view"
import { SettingsPage } from "@/components/settings-page"
import { NodeDashboard } from "@/components/node-dashboard"
import { Shield } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MainLayoutProps {
  user: { role: "admin" | "node"; name: string; nodeId?: string }
  onLogout: () => void
}

export function MainLayout({ user, onLogout }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const adminMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "predictions", label: "Real-Time Predictions", icon: Activity },
    { id: "upload", label: "Upload & Train", icon: Upload },
    { id: "performance", label: "Model Performance", icon: TrendingUp },
    { id: "logs", label: "Logs", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const nodeMenuItems = [
    { id: "dashboard", label: "Node Dashboard", icon: LayoutDashboard },
    { id: "predictions", label: "Local Predictions", icon: Activity },
    { id: "upload", label: "Private Training", icon: Upload },
    { id: "settings", label: "Node Settings", icon: Settings },
  ]

  const menuItems = user.role === "admin" ? adminMenuItems : nodeMenuItems

  const handleMenuItemClick = (tabId: string) => {
    setActiveTab(tabId)
    setMobileMenuOpen(false)
  }

  const renderContent = () => {
    if (user.role === "admin") {
      switch (activeTab) {
        case "dashboard":
          return <AdminDashboard userRole={user.role} />
        case "predictions":
          return <RealTimePredictions />
        case "upload":
          return <UploadTrain />
        case "performance":
          return <ModelPerformance userRole={user.role} />
        case "logs":
          return <LogsView userRole={user.role} />
        case "settings":
          return <SettingsPage userRole={user.role} />
        default:
          return <AdminDashboard userRole={user.role} />
      }
    } else {
      switch (activeTab) {
        case "dashboard":
          return <NodeDashboard nodeId={user.nodeId} />
        case "predictions":
          return <RealTimePredictions nodeId={user.nodeId} />
        case "upload":
          return <UploadTrain nodeId={user.nodeId} />
        case "settings":
          return <SettingsPage userRole={user.role} />
        default:
          return <NodeDashboard nodeId={user.nodeId} />
      }
    }
  }

  const SidebarContent = () => (
    <>
      <SidebarHeader className="border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <div className="font-bold text-lg">Fraud Detection</div>
            <div className="text-xs opacity-90">Enterprise Platform</div>
          </div>
        </div>
      </SidebarHeader>
      <div className="py-2 flex-1">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
              className={`w-full flex items-center gap-3 h-11 px-4 mx-2 rounded-lg transition-all duration-200 text-left ${
                activeTab === item.id
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="border-t p-2 mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 h-12 px-3 mx-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white font-semibold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <div className="font-medium text-sm truncate">{user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {user.role === "admin" ? "Administrator" : `Node ${user.nodeId}`}
                </div>
              </div>
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar - Always visible on lg+ screens */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:bg-background lg:fixed lg:inset-y-0 lg:z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0 lg:hidden">
          <div className="flex flex-col h-full">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
            </Sheet>

            <div className="h-6 w-px bg-border hidden lg:block" />
            <div>
              <h1 className="font-semibold text-lg">{menuItems.find((item) => item.id === activeTab)?.label}</h1>
              <p className="text-sm text-muted-foreground">
                {user.role === "admin" ? "System Administrator" : `Bank Node ${user.nodeId}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="h-9 w-9"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-slate-50/50 dark:bg-slate-900/50">
          <div className="h-full p-4 sm:p-6 lg:p-8">
            <div className="max-w-full mx-auto h-full">{renderContent()}</div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background px-4 sm:px-6 lg:px-8 py-3 mt-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                GDPR Compliant
              </span>
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                DPDP Ready
              </span>
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                HIPAA-Safe AI
              </span>
            </div>
            <div className="text-right">Model v1.4 • Deployed 5 mins ago • All systems operational</div>
          </div>
        </footer>
      </div>
    </div>
  )
}
