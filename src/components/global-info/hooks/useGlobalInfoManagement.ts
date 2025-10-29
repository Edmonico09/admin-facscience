
import { useState, useMemo } from "react"
import type { GlobalInfo } from "../types/types"

const mockGlobalInfo: GlobalInfo[] = [
  {
    id: "1",
    category: "Contact",
    key: "email_principal",
    value: "contact@universite.edu",
    description: "Email principal de l'université",
    isActive: true,
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    category: "Contact",
    key: "telephone",
    value: "+33 1 23 45 67 89",
    description: "Numéro de téléphone principal",
    isActive: true,
    lastUpdated: "2024-01-10",
  },
  {
    id: "3",
    category: "Adresse",
    key: "adresse_complete",
    value: "123 Avenue de l'Université, 75001 Paris, France",
    description: "Adresse complète de l'université",
    isActive: true,
    lastUpdated: "2024-01-05",
  },
  {
    id: "4",
    category: "Horaires",
    key: "horaires_ouverture",
    value: "Lundi-Vendredi: 8h00-18h00, Samedi: 9h00-12h00",
    description: "Horaires d'ouverture des services",
    isActive: true,
    lastUpdated: "2024-01-12",
  },
  {
    id: "5",
    category: "Social",
    key: "site_web",
    value: "https://www.universite.edu",
    description: "Site web officiel",
    isActive: true,
    lastUpdated: "2024-01-08",
  },
  {
    id: "6",
    category: "Statistiques",
    key: "nombre_etudiants",
    value: "15000",
    description: "Nombre total d'étudiants",
    isActive: true,
    lastUpdated: "2024-01-20",
  },
]

export function useGlobalInfoManagement() {
    
  const [globalInfos, setGlobalInfos] = useState<GlobalInfo[]>(mockGlobalInfo)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredInfos = useMemo(() => {
    return globalInfos.filter((info) => {
      const matchesSearch =
        info.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        info.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || info.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [globalInfos, searchTerm, selectedCategory])

  const updateInfo = (id: string, updates: Partial<GlobalInfo>) => {
    setGlobalInfos((prev) =>
      prev.map((info) =>
        info.id === id
          ? { ...info, ...updates, lastUpdated: new Date().toISOString().split("T")[0] }
          : info
      )
    )
  }

  const addInfo = (info: Omit<GlobalInfo, "id" | "lastUpdated">) => {
    const newInfo: GlobalInfo = {
      ...info,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setGlobalInfos((prev) => [...prev, newInfo])
  }

  const deleteInfo = (id: string) => {
    setGlobalInfos((prev) => prev.filter((info) => info.id !== id))
  }

  const toggleStatus = (id: string) => {
    setGlobalInfos((prev) =>
      prev.map((info) => (info.id === id ? { ...info, isActive: !info.isActive } : info))
    )
  }

  return {
    globalInfos,
    filteredInfos,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    addInfo,
    updateInfo,
    deleteInfo,
    toggleStatus,
  }
}