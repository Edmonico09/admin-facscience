// news-management/NewsManagement.tsx
"use client"

import { useState, useCallback } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Dialog } from "@/components/ui/dialog"
import { Newspaper } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useActuality } from "@/hooks/useActuality"
import { Actuality } from "@/services/types/event"
import { Category } from "@/services/types/category"
import { Badge } from "@/components/ui/badge"
import {
  createMedia,
  deleteMedia,
  updateNews,
  updateStatus,
} from "@/services/api/event.api"

import { NewsHeader } from "./sub-components/NewsHeader"
import { NewsControls } from "./sub-components/NewsControls"
import { NewsFilters } from "./sub-components/NewsFilters"
import { NewsList } from "./sub-components/NewsList"
import { NewsFormDialog } from "./sub-components/NewsFormDialog"
import { CategoryManagerDialog } from "./sub-components/CategoryManagerDialog"
import { INITIAL_FORM_DATA } from "./utils/constants"

export function NewsManagement() {
  // States
  const { actualities, addActuality, removeActuality } = useActuality()
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<Actuality | null>(null)
  const [formData, setFormData] = useState<Partial<Actuality>>(INITIAL_FORM_DATA)
  const { toast } = useToast()

  // Computed
  const filteredNews = actualities.filter((a: Actuality) => {
    const matchesSearch =
      a.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.lieu?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || a.categorie.toString() === selectedCategory
    const matchesStatus = selectedStatus === "all" || a.statut === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Utils
  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA)
  }, [])

  const getStatusBadge = useCallback((statut: string) => {
    const badges = {
      published: <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Publié</Badge>,
      draft: <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Brouillon</Badge>,
      archived: <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Archivé</Badge>,
    }
    return badges[statut as keyof typeof badges] || <Badge variant="outline">{statut}</Badge>
  }, [])

  const getCategoryBadge = useCallback((category: string) => {
    return <Badge>{category}</Badge>
  }, [])

  // Media Handlers
  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (editingNews?.id_actuality) {
        const uploadedMedia = await createMedia(editingNews.id_actuality, file)
        setFormData({
          ...formData,
          medias: [...(formData.medias || []), uploadedMedia],
        })
      }
    }
  }, [formData, editingNews])

  const handleRemoveMedia = useCallback(async (mediaId: number) => {
    if (!editingNews?.id_actuality) return
    await deleteMedia(editingNews.id_actuality, mediaId)
    setFormData({
      ...formData,
      medias: formData.medias?.filter((m) => m.id !== mediaId) || [],
    })
    toast({ title: "Succès", description: "Média supprimé avec succès" })
  }, [formData, editingNews, toast])

  // Form Actions
  const handleAdd = useCallback(async () => {
    if (
      !formData.titre || !formData.categorie || !formData.description ||
      !formData.contenu || !formData.date_commencement
    ) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newNews: Actuality = {
      ...formData,
      statut: "draft",
      medias: formData.medias || [],
    } as Actuality

    await addActuality(newNews)
    setIsAddOpen(false)
    resetForm()
    toast({ title: "Succès", description: "Actualité ajoutée avec succès" })
  }, [formData, addActuality, resetForm, toast])

  const handleEdit = useCallback((n: Actuality) => {
    setEditingNews(n)
    setFormData({
      titre: n.titre,
      categorie: n.categorie,
      description: n.description,
      contenu: n.contenu,
      date_commencement: n.date_commencement,
      date_fin: n.date_fin,
      lieu: n.lieu,
      statut: n.statut,
      medias: n.medias ? [...n.medias] : [],
    })
    setIsEditOpen(true)
  }, [])

  const handleUpdate = useCallback(async () => {
    if (!editingNews || !formData.titre || !formData.categorie || !formData.description || !formData.contenu) {
      toast({ title: "Erreur", description: "Champs obligatoires manquants", variant: "destructive" })
      return
    }

    const updatedActuality = { ...editingNews, ...formData }
    await updateNews(updatedActuality.id_actuality!, updatedActuality)
    setIsEditOpen(false)
    setEditingNews(null)
    resetForm()
    toast({ title: "Succès", description: "Actualité mise à jour" })
  }, [formData, editingNews, resetForm, toast])

  const handleDelete = useCallback(async (id: number) => {
    await removeActuality(id)
    toast({ title: "Succès", description: "Actualité supprimée" })
  }, [removeActuality, toast])

  const handleStatusChange = useCallback(async (id: number, newStatus: "draft" | "published" | "archived") => {
    await updateStatus(id, newStatus)
    toast({ title: "Succès", description: `Statut mis à jour vers ${newStatus}` })
  }, [toast])

  return (
    <div className="space-y-6">
      <NewsHeader
        total={actualities.length}
        published={actualities.filter((a) => a.statut === "published").length}
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Newspaper className="h-5 w-5 text-university-primary" />
              Liste des Actualités
            </h3>
            <NewsControls
              onAddOpen={() => setIsAddOpen(true)}
              onCategoryOpen={() => setIsCategoryOpen(true)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <NewsFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            categories={categories}
          />
          <NewsList
            filteredNews={filteredNews}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            getStatusBadge={getStatusBadge}
            getCategoryBadge={getCategoryBadge}
          />
        </CardContent>
      </Card>

      {/* Dialogs */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <NewsFormDialog
          isOpen={isAddOpen}
          onClose={() => { setIsAddOpen(false); resetForm() }}
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          onSubmit={handleAdd}
          onFileChange={handleFileChange}
          onRemoveMedia={handleRemoveMedia}
        />
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <NewsFormDialog
          isOpen={isEditOpen}
          onClose={() => { setIsEditOpen(false); setEditingNews(null); resetForm() }}
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          onSubmit={handleUpdate}
          onFileChange={handleFileChange}
          onRemoveMedia={handleRemoveMedia}
          isEdit
        />
      </Dialog>

      <CategoryManagerDialog
        isOpen={isCategoryOpen}
        onClose={() => setIsCategoryOpen(false)}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  )
}