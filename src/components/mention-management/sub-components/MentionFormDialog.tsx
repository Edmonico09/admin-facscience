import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mention } from "@/services/types/mention"

interface MentionFormDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  mode: "add" | "edit"
  formData: Mention
  onFormChange: (data: Mention) => void
  onSubmit: () => void
  onCancel: () => void
}

export function MentionFormDialog({
  isOpen,
  onOpenChange,
  mode,
  formData,
  onFormChange,
  onSubmit,
  onCancel,
}: MentionFormDialogProps) {
  const isEditMode = mode === "edit"

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Modifier la Mention" : "Ajouter une Nouvelle Mention"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifiez les informations de la mention sélectionnée."
              : "Remplissez les informations pour créer une nouvelle mention académique."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor={`${mode}-nom`}>Nom de la mention *</Label>
            <Input
              id={`${mode}-nom`}
              value={formData.NomMention}
              onChange={(e) => onFormChange({ ...formData, NomMention: e.target.value })}
              placeholder="Ex: Informatique"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor={`${mode}-abbreviation`}>Abbreviation *</Label>
            <Input
              id={`${mode}-abbreviation`}
              value={formData.Abbreviation}
              onChange={(e) => onFormChange({ ...formData, Abbreviation: e.target.value })}
              placeholder="Ex: INFO"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor={`${mode}-description`}>Description</Label>
            <Textarea
              id={`${mode}-description`}
              value={formData.DescriptionMention}
              onChange={(e) => onFormChange({ ...formData, DescriptionMention: e.target.value })}
              placeholder="Description de la mention..."
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor={`${mode}-image`}>{isEditMode ? "Logo" : "Image"}</Label>
            <input
              type="file"
              id={`${mode}-image`}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0])
                  onFormChange({ ...formData, LogoPath: e.target.files[0] })
              }}
              className="border rounded-md p-2"
            />
          </div>
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