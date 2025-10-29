"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { addDescription, deleteDescription } from "@/services/api/labo.api"
import { DescriptionItem, Laboratory } from "@/services/types/labo"
import { useLabo } from "@/hooks/useLabo"
import { useMention } from "@/hooks/useMention"
import { usePerson } from "@/hooks/usePerson"

import { LabHeader } from "./sub-components/LabHeader"
import { LabCardHeader } from "./sub-components/LabCardHeader"
import { LabFilters } from "./sub-components/LabFilters"
import { LabFormDialog } from "./sub-components/LabFormDialog"
import { LabCard } from "./sub-components/LabCard"
import { LabEmptyState } from "./sub-components/LabEmptyState"

const INITIAL_FORM_DATA = {
  nom_labo: "",
  mention_rattachement: "",
  responsable: "",
  description: [
    { cle: "", valeur: "" },
    { cle: "", valeur: "" },
  ] as DescriptionItem[],
}

export function LabManagement() {
  const { laboratories, createLabo, updateLaboratory, removeLabo } = useLabo()
  const { mentions } = useMention()
  const { persons } = usePerson()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMention, setSelectedMention] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingLab, setEditingLab] = useState<Laboratory | null>(null)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const { toast } = useToast()

  const filteredLaboratories = laboratories.filter((lab) => {
    const matchesSearch =
      lab.nom_labo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentions
        .find((m) => m.toString() === lab.mention_rattachement)
        ?.NomMention.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      persons
        .find((p) => p.toString() === lab.responsable)
        ?.nom.toLowerCase()
        .includes(searchTerm.toLowerCase())

    const matchesMention = selectedMention === "all" || lab.mention_rattachement === selectedMention

    return matchesSearch && matchesMention
  })

  const resetForm = () => setFormData(INITIAL_FORM_DATA)

  const validateForm = () => {
    if (!formData.nom_labo || !formData.mention_rattachement || !formData.responsable) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const addDescriptionField = () => {
    const newField: DescriptionItem = { cle: "", valeur: "" }
    setFormData({
      ...formData,
      description: [...formData.description, newField],
    })
  }

  const removeDescriptionField = async (index: number, cle: string) => {
    if (formData.description.length <= 2) {
      toast({
        title: "Attention",
        description: "Au moins 2 champs de description sont requis",
        variant: "destructive",
      })
      return
    }

    if (editingLab?.id_labo) {
      try {
        await deleteDescription(editingLab.id_labo, cle)
        setFormData({
          ...formData,
          description: formData.description.filter((_, i) => i !== index),
        })
      } catch (err) {
        toast({
          title: "Erreur",
          description: (err as Error).message,
          variant: "destructive",
        })
      }
    } else {
      setFormData({
        ...formData,
        description: formData.description.filter((_, i) => i !== index),
      })
    }
  }

  const addDescriptionFieldInEditMode = async () => {
    if (editingLab?.id_labo) {
      const newField: DescriptionItem = { cle: "", valeur: "" }
      try {
        await addDescription(editingLab.id_labo, newField)
        setFormData({
          ...formData,
          description: [...formData.description, newField],
        })
        toast({ title: "Succès", description: "Description ajoutée" })
      } catch (err) {
        toast({ title: "Erreur", description: (err as Error).message, variant: "destructive" })
      }
    } else {
      addDescriptionField()
    }
  }

  const handleAdd = async () => {
    if (!validateForm()) return

    try {
      const validDescriptions = formData.description.filter(
        (item) => item.cle.trim() && item.valeur.trim()
      )

      const newLab: Laboratory = {
        id_labo: laboratories.length === 0 ? laboratories.length + 1 : 0,
        nom_labo: formData.nom_labo,
        mention_rattachement: formData.mention_rattachement,
        responsable: formData.responsable,
        description: validDescriptions.map((item) => ({ ...item })),
      }

      await createLabo(newLab)
      setIsAddDialogOpen(false)
      resetForm()

      toast({
        title: "Succès",
        description: "Laboratoire ajouté avec succès",
      })
    } catch (error) {
      console.error("Erreur lors de l'ajout du laboratoire:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le laboratoire. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (lab: Laboratory) => {
    setEditingLab(lab)
    setFormData({
      nom_labo: lab.nom_labo,
      mention_rattachement: lab.mention_rattachement.toString(),
      responsable: lab.responsable.toString(),
      description:
        lab.description.length > 0
          ? [...lab.description]
          : [
              { cle: "", valeur: "" },
              { cle: "", valeur: "" },
            ],
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async () => {
    if (!validateForm() || !editingLab) return

    const validDescriptions = formData.description.filter(
      (item) => item.cle.trim() && item.valeur.trim()
    )

    const updatedLabData: Laboratory = {
      ...editingLab,
      nom_labo: formData.nom_labo,
      mention_rattachement: formData.mention_rattachement,
      responsable: formData.responsable,
      description: validDescriptions,
    }

    try {
      await updateLaboratory(editingLab.id_labo!, updatedLabData)

      setIsEditDialogOpen(false)
      setEditingLab(null)
      resetForm()

      toast({
        title: "Succès",
        description: "Laboratoire mis à jour avec succès",
      })
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le laboratoire",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id_labo: number) => {
    try {
      await removeLabo(id_labo)

      toast({
        title: "Succès",
        description: "Laboratoire supprimé avec succès",
      })
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer le laboratoire",
        variant: "destructive",
      })
    }
  }

  const handleCancelAdd = () => {
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false)
    setEditingLab(null)
    resetForm()
  }

  return (
    <div className="space-y-6">
      <LabHeader totalLabs={laboratories.length} />

      <Card>
        <CardHeader>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <LabCardHeader />
            <LabFormDialog
              isOpen={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
              mode="add"
              formData={formData}
              onFormChange={setFormData}
              onSubmit={handleAdd}
              onCancel={handleCancelAdd}
              mentions={mentions}
              persons={persons}
              onAddDescription={addDescriptionFieldInEditMode}
              onRemoveDescription={removeDescriptionField}
            />
          </Dialog>
        </CardHeader>

        <CardContent>
          <LabFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedMention={selectedMention}
            onMentionChange={setSelectedMention}
            mentions={mentions}
          />

          <div className="space-y-4">
            {filteredLaboratories.length === 0 ? (
              <LabEmptyState hasFilters={searchTerm !== "" || selectedMention !== "all"} />
            ) : (
              <div className="grid gap-4">
                {filteredLaboratories.map((lab) => (
                  <LabCard key={lab.id_labo} lab={lab} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <LabFormDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        formData={formData}
        onFormChange={setFormData}
        onSubmit={handleUpdate}
        onCancel={handleCancelEdit}
        mentions={mentions}
        persons={persons}
        onAddDescription={addDescriptionField}
        onRemoveDescription={removeDescriptionField}
      />
    </div>
  )
}