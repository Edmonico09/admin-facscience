import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DescriptionItem } from "@/services/types/labo"
import { Mention } from "@/services/types/mention"
import { Person } from "@/services/types/person"
import { LabDescriptionFields } from "./LabDescriptionFields"

interface LabFormData {
  nom_labo: string
  mention_rattachement: string
  responsable: string
  description: DescriptionItem[]
}

interface LabFormDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  mode: "add" | "edit"
  formData: LabFormData
  onFormChange: (data: LabFormData) => void
  onSubmit: () => void
  onCancel: () => void
  mentions: Mention[]
  persons: Person[]
  onAddDescription: () => void
  onRemoveDescription: (index: number, cle: string) => void
}

export function LabFormDialog({
  isOpen,
  onOpenChange,
  mode,
  formData,
  onFormChange,
  onSubmit,
  onCancel,
  mentions,
  persons,
  onAddDescription,
  onRemoveDescription,
}: LabFormDialogProps) {
  const isEditMode = mode === "edit"

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Modifier le Laboratoire" : "Ajouter un Nouveau Laboratoire"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifiez les informations du laboratoire sélectionné."
              : "Remplissez les informations pour créer un nouveau laboratoire de recherche."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor={`${mode}-nom`}>Nom du laboratoire *</Label>
            <Input
              id={`${mode}-nom`}
              value={formData.nom_labo}
              onChange={(e) => onFormChange({ ...formData, nom_labo: e.target.value })}
              placeholder="Ex: Laboratoire de Recherche en Intelligence Artificielle"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor={`${mode}-mention`}>Mention de rattachement *</Label>
              <Select
                value={formData.mention_rattachement}
                onValueChange={(value) => onFormChange({ ...formData, mention_rattachement: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une mention" />
                </SelectTrigger>
                <SelectContent>
                  {mentions.map((mention) => (
                    <SelectItem key={mention.IdMention} value={mention.IdMention!.toString()}>
                      {mention.NomMention} ({mention.Abbreviation})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor={`${mode}-responsable`}>Responsable *</Label>
              <Select
                value={formData.responsable}
                onValueChange={(value) => onFormChange({ ...formData, responsable: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un responsable" />
                </SelectTrigger>
                <SelectContent>
                  {persons.map((person) => (
                    <SelectItem key={person.id} value={person.id.toString()}>
                      {person.prenom} {person.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <LabDescriptionFields
            descriptions={formData.description}
            onUpdate={(descriptions) => onFormChange({ ...formData, description: descriptions })}
            onAdd={onAddDescription}
            onRemove={onRemoveDescription}
            isEditMode={isEditMode}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button onClick={onSubmit} className="bg-university-primary hover:bg-university-primary/90">
            {isEditMode ? "Mettre à jour" : "Ajouter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}