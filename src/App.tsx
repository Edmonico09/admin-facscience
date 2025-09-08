import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { UniversityAdminApp } from "@/components/university-admin-app"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Routes>
        <Route path="/*" element={<UniversityAdminApp />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
