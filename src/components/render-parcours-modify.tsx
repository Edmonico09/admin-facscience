import { TypeNiveau, TypeFormation, Mention, InputData } from "@/services/services"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog"
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"
import { DialogHeader, DialogFooter } from "./ui/dialog"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select } from "./ui/select"
import { Label } from "./ui/label"
import { Button } from "./ui/button"

interface RenderParcoursModifyProps {
  formData: InputData;
  mentions: Mention[];
  isEditDialogOpen: boolean;
  niveauxOptions: TypeNiveau[];
  formationOptions: TypeFormation [];
  handleUpdate: () => void;
  setFormData: (formData: InputData) => void;
  setIsEditDialogOpen: (is_edit: boolean) => void;
}

export const RenderParcoursModify = ({
  formData, 
  mentions,
  niveauxOptions,
  isEditDialogOpen, 
  formationOptions,
  setFormData, 
  handleUpdate,
  setIsEditDialogOpen, 
}: RenderParcoursModifyProps) => {
  return(
    // <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier le Parcours</DialogTitle>
          <DialogDescription>Modifiez les informations du parcours sélectionné.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-nom">Nom du parcours *</Label>
            <Input
              id="edit-nom"
              value={formData.nom_parcours}
              onChange={(e) => setFormData({ ...formData, nom_parcours: e.target.value })}
              placeholder="Ex: Génie Logiciel"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-mention">Mention *</Label>
            <Select
              value={formData.id_mention}
              onValueChange={(value) => setFormData({ ...formData, id_mention: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une mention" />
              </SelectTrigger>
              <SelectContent>
                {mentions.map((mention) => (
                  <SelectItem key={mention.id} value={mention.id.toString()}>
                    {mention.nom} ({mention.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-niveau">Niveau *</Label>
              <Select
                value={formData.niveau_parcours}
                onValueChange={(value) => setFormData({ ...formData, niveau_parcours: value as TypeNiveau })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  {niveauxOptions.map((niveau) => (
                    <SelectItem key={niveau} value={niveau}>
                      {niveau}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-formation">Formation *</Label>
              <Select
                value={formData.formation}
                onValueChange={(value) => setFormData({ ...formData, formation: value as TypeFormation })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {formationOptions.map((formation) => (
                    <SelectItem key={formation} value={formation}>
                      {formation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description du parcours..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleUpdate} className="bg-university-primary hover:bg-university-primary/90">
            Mettre à jour
          </Button>
        </DialogFooter>
      </DialogContent>
    // </Dialog>
  )
}

