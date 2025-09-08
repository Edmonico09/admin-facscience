"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { MentionManagement } from "@/components/mention-management"
import { ParcoursManagement } from "@/components/parcours-management"
import { NewsManagement } from "@/components/news-management"
import { LabManagement } from "@/components/lab-management"
import { PeopleManagement } from "@/components/people-management"
import { GlobalInfoManagement } from "@/components/global-info-management"

export type NavigationItem = "dashboard" | "mentions" | "parcours" | "news" | "labs" | "people" | "global-info"

export function UniversityAdminApp() {
  const [activeSection, setActiveSection] = useState<NavigationItem>("dashboard")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "mentions":
        return <MentionManagement />
      case "parcours":
        return <ParcoursManagement />
      case "news":
        return <NewsManagement />
      case "labs":
        return <LabManagement />
      case "people":
        return <PeopleManagement />
      case "global-info":
        return <GlobalInfoManagement />
      default:
        return <Dashboard />
    }
  }

  const handleSectionChange = (section: NavigationItem) => {
    setActiveSection(section)
    setIsMobileSidebarOpen(false) // Close mobile sidebar when section changes
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isMobileOpen={isMobileSidebarOpen}
        onMobileToggle={setIsMobileSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
