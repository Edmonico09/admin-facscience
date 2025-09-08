import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { UniversityAdminApp } from "@/components/university-admin-app"
import { ActivityProvider } from "./context/activity-context"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ActivityProvider>
        <Routes>
          <Route path="/*" element={<UniversityAdminApp />} />
        </Routes>
      </ActivityProvider>
    </ThemeProvider>
  )
}

export default App
