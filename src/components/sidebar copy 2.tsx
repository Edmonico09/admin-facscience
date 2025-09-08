"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { LayoutDashboard, GraduationCap, BookOpen, Newspaper, FlaskConical, Users, Settings } from "lucide-react"
import type { NavigationItem } from "./university-admin-app"

interface SidebarProps {
  activeSection: NavigationItem
  onSectionChange: (section: NavigationItem) => void
  isMobileOpen?: boolean
  onMobileToggle?: (open: boolean) => void
}

const navigationItems = [
  { id: "dashboard" as NavigationItem, label: "Dashboard", icon: LayoutDashboard },
  { id: "mentions" as NavigationItem, label: "Gestion Mentions", icon: GraduationCap },
  { id: "parcours" as NavigationItem, label: "Gestion Parcours", icon: BookOpen },
  { id: "news" as NavigationItem, label: "Actualités", icon: Newspaper },
  { id: "labs" as NavigationItem, label: "Laboratoires", icon: FlaskConical },
  { id: "people" as NavigationItem, label: "Personnes", icon: Users },
  { id: "global-info" as NavigationItem, label: "Infos Globales", icon: Settings },
]

function SidebarContent({ activeSection, onSectionChange }: Pick<SidebarProps, "activeSection" | "onSectionChange">) {
  return (
    <>
      <div className="p-4 md:p-6 border-b border-border">
        <h1 className="text-lg md:text-xl font-bold text-university-primary truncate">Admin Universitaire</h1>
      </div>

      <nav className="flex-1 p-3 md:p-4 space-y-1 md:space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-2 md:gap-3 h-10 md:h-11 text-sm md:text-base",
                activeSection === item.id && "bg-university-primary text-white hover:bg-university-primary/90",
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Button>
          )
        })}
      </nav>
    </>
  )
}

export function Sidebar({ activeSection, onSectionChange, isMobileOpen, onMobileToggle }: SidebarProps) {
  return (
    <>
      <div className="hidden md:flex w-64 bg-card border-r border-border flex-col">
        <SidebarContent activeSection={activeSection} onSectionChange={onSectionChange} />
      </div>

      <Sheet open={isMobileOpen} onOpenChange={onMobileToggle}>
        <SheetContent side="left" className="w-64 p-0 bg-card">
          <div className="flex flex-col h-full">
            <SidebarContent activeSection={activeSection} onSectionChange={onSectionChange} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
