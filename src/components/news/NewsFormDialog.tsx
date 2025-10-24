import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ImageIcon, X } from "lucide-react"
import { Actualite, Category } from "@/services/types/event"

interface NewsFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: Actualite
  categories: Category[]
  isEdit?: boolean
  onFormChange: (data: Actualite) => void
  onSubmit: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveMedia: (mediaId: number) => void
}

export function NewsFormDialog({
  open,
  onOpenChange,
  formData,
  categories,
  isEdit = false,
  onFormChange,
  onSubmit,
  onFileChange,
  onRemoveMedia,
}: NewsFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Modifier l'Actualité" : "Ajouter une Nouvelle Actualité"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modifiez les informations de l'actualité sélectionnée."
              : "Remplissez les informations pour créer une nouvelle actualité."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="titre">Titre *</Label>
            <Input
              id="titre"
              value={formData.titre}
              onChange={(e) => onFormChange({ ...formData, titre: e.target.value })}
              placeholder="Titre de l'actualité"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="categorie">Catégorie *</Label>
            <Select
              value={formData.categorie}
              onValueChange={(value) => onFormChange({ ...formData, categorie: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      <div className="flex items-center gap-2">{category.name}</div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
              placeholder="Description courte de l'actualité"
              rows={2}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contenu">Contenu *</Label>
            <Textarea
              id="contenu"
              value={formData.contenu}
              onChange={(e) => onFormChange({ ...formData, contenu: e.target.value })}
              placeholder="Contenu détaillé de l'actualité"
              rows={4}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date-debut">Date de début *</Label>
              <Input
                id="date-debut"
                type="datetime-local"
                value={formData.dateCommencement?.toISOString().slice(0, 16) ?? ""}
                onChange={(e) => onFormChange({ ...formData, dateCommencement: new Date(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date-fin">Date de fin</Label>
              <Input
                id="date-fin"
                type="datetime-local"
                value={formData.dateFin?.toISOString().slice(0, 16) ?? ""}
                onChange={(e) => onFormChange({ ...formData, dateFin: new Date(e.target.value) })}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lieu">Lieu</Label>
            <Input
              id="lieu"
              value={formData.lieu}
              onChange={(e) => onFormChange({ ...formData, lieu: e.target.value })}
              placeholder="Lieu de l'événement"
            />
          </div>
          <div className="grid gap-2">
            <Label>Médias</Label>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <label htmlFor="media-upload" className="cursor-pointer flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Ajouter un média
                  <input
                    id="media-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onFileChange}
                  />
                </label>
              </Button>

              {formData.medias.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {formData.medias.map((media) => (
                    <div key={media.idMedia} className="relative border rounded-lg p-2">
                      <img
                        src={media.chemin || "/placeholder.svg"}
                        alt={media.media}
                        className="w-full h-20 object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => {
                          if (media.idMedia !== undefined) {
                            onRemoveMedia(media.idMedia)
                          }
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{media.media}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={onSubmit} className="bg-university-primary hover:bg-university-primary/90">
            {isEdit ? "Mettre à jour" : "Ajouter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}