"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus } from "lucide-react"
import { GlobalInfoCard } from "./sub-components/GlobalInfoCard"
import { GlobalInfoForm } from "./sub-components/GlobalInfoForm"
import { useGlobalInfoManagement } from "./hooks/useGlobalInfoManagement"
import { categories } from "./types/types"
import { Globe } from "lucide-react"

export function GlobalInfoManagement() {
  const {
    filteredInfos,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    addInfo,
    updateInfo,
    deleteInfo,
    toggleStatus,
  } = useGlobalInfoManagement()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingInfo, setEditingInfo] = useState<any>(null)
  const [formData, setFormData] = useState({
    category: "",
    key: "",
    value: "",
    description: "",
    isActive: true,
  })

  const handleSubmit = () => {
    if (editingInfo) {
      updateInfo(editingInfo.id, formData)
    } else {
      addInfo(formData)
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ category: "", key: "", value: "", description: "", isActive: true })
    setEditingInfo(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (info: any) => {
    setEditingInfo(info)
    setFormData({
      category: info.category,
      key: info.key,
      value: info.value,
      description: info.description || "",
      isActive: info.isActive,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Informations Globales</h1>
        <p className="text-muted-foreground">Gérer les informations générales du site universitaire</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrer par catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="bg-university-primary text-white hover:bg-university-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingInfo ? "Modifier" : "Ajouter"} une information</DialogTitle>
            </DialogHeader>
            <GlobalInfoForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={resetForm}
              isEditing={!!editingInfo}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInfos.map((info) => (
          <GlobalInfoCard
            key={info.id}
            info={info}
            onEdit={handleEdit}
            onDelete={deleteInfo}
            onToggleStatus={toggleStatus}
          />
        ))}
      </div>

      {filteredInfos.length === 0 && (
        <div className="text-center py-12">
          <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Aucune information trouvée</p>
        </div>
      )}
    </div>
  )
}