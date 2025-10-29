"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Mention } from "@/services/types/mention"
import { useMention } from "@/hooks/useMention"

import { MentionHeader } from "./sub-components/MentionHeader"
import { MentionCardHeader } from "./sub-components/MentionCardHeader"
import { MentionSearchBar } from "./sub-components/MentionSearchBar"
import { MentionTable } from "./sub-components/MentionTable"
import { MentionMobileCard } from "./sub-components/MentionMobileCard"
import { MentionFormDialog } from "./sub-components/MentionFormDialog"
import { MentionEmptyState } from "./sub-components/MentionEmptyState"

const INITIAL_FORM_DATA: Mention = {
  NomMention: "",
  DescriptionMention: "",
  Abbreviation: "",
  LogoPath: null,
}

export function MentionManagement() {
  const { mentions, createMention, updateMention, removeMention } = useMention()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingMention, setEditingMention] = useState<Mention | null>(null)
  const [formData, setFormData] = useState<Mention>(INITIAL_FORM_DATA)
  const { toast } = useToast()

  const filteredMentions = mentions.filter(
    (mention) =>
      mention.NomMention.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mention.Abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mention.DescriptionMention?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const resetForm = () => setFormData(INITIAL_FORM_DATA)

  const validateForm = () => {
    if (!formData.NomMention || !formData.Abbreviation || !formData.DescriptionMention) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handleAdd = async () => {
    if (!validateForm()) return

    const newMention: Mention = {
      NomMention: formData.NomMention,
      DescriptionMention: formData.DescriptionMention,
      Abbreviation: formData.Abbreviation.toUpperCase(),
      LogoPath: formData.LogoPath,
    }

    await createMention(newMention)
    setIsAddDialogOpen(false)
    resetForm()
    toast({
      title: "Succès",
      description: "Mention ajoutée avec succès",
    })
  }

  const handleEdit = (mention: Mention) => {
    setEditingMention(mention)
    setFormData({
      NomMention: mention.NomMention,
      DescriptionMention: mention.DescriptionMention || "",
      Abbreviation: mention.Abbreviation,
      LogoPath: mention.LogoPath || null,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async () => {
    if (!validateForm() || !editingMention) return

    await updateMention(editingMention.IdMention || 0, formData)
    setIsEditDialogOpen(false)
    setEditingMention(null)
    resetForm()
    toast({
      title: "Succès",
      description: "Mention mise à jour avec succès",
    })
  }

  const handleDelete = async (id: number) => {
    await removeMention(id)
    toast({
      title: "Succès",
      description: "Mention supprimée avec succès",
    })
  }

  const handleCancelAdd = () => {
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false)
    setEditingMention(null)
    resetForm()
  }

  return (
    <div className="space-y-6">
      <MentionHeader totalMentions={mentions.length} />
      <Card>
        <CardHeader>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <MentionCardHeader />
            <MentionFormDialog
              isOpen={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
              mode="add"
              formData={formData}
              onFormChange={setFormData}
              onSubmit={handleAdd}
              onCancel={handleCancelAdd}
            />
          </Dialog>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <MentionSearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          <div className="hidden lg:block">
            <MentionTable mentions={filteredMentions} onEdit={handleEdit} onDelete={handleDelete} />
          </div>

          <div className="lg:hidden space-y-4">
            {filteredMentions.map((mention) => (
              <MentionMobileCard
                key={mention.IdMention}
                mention={mention}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {filteredMentions.length === 0 && <MentionEmptyState hasSearchTerm={!!searchTerm} />}
        </CardContent>
      </Card>

      <MentionFormDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        formData={formData}
        onFormChange={setFormData}
        onSubmit={handleUpdate}
        onCancel={handleCancelEdit}
      />
    </div>
  )
}