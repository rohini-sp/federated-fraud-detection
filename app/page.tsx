"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/login-screen"
import { MainLayout } from "@/components/main-layout"

export default function App() {
  const [user, setUser] = useState<{ role: "admin" | "node"; name: string; nodeId?: string } | null>(null)

  const handleLogin = (email: string, password: string) => {
    // Mock authentication
    if (email.includes("admin")) {
      setUser({ role: "admin", name: "System Administrator" })
    } else {
      setUser({ role: "node", name: "Bank Node Operator", nodeId: "NODE_A" })
    }
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return <MainLayout user={user} onLogout={handleLogout} />
}
