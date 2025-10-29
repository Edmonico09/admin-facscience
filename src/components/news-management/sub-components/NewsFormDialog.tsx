import { Button } from "@/components/ui/button"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, X } from "lucide-react"
import { Actuality } from "@/services/types/event"
import { Category } from "@/services/types/category"

interface NewsFormDialogProps {
  isOpen: boolean
  onClose: () => void
  formData: Partial<Actuality>
  setFormData: (data: Partial<Actuality>) => void
  categories: Category[]
  onSubmit: () => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveMedia: (id: number) => void
  isEdit?: boolean
}

export function NewsFormDialog({
  isOpen,
  onClose,
  formData,
  setFormData,
  categories,
  onSubmit,
  onFileChange,
  onRemoveMedia,
  isEdit = false,
}: NewsFormDialogProps) {
  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{isEdit ? "Modifier" : "Ajouter"} une Actualité</DialogTitle>
        <DialogDescription>
          {isEdit ? "Modifiez les informations" : "Remplissez les informations pour créer une nouvelle actualité"}.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        {/* Titre */}
        <div className="grid gap-2">
          <Label htmlFor="titre">Titre *</Label>
          <Input
            id="titre"
            value={formData.titre || ""}
            onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
            placeholder="Titre de l'actualité"
          />
        </div>

        {/* Catégorie */}
        <div className="grid gap-2">
          <Label htmlFor="categorie">Catégorie *</Label>
          <Select
            value={formData.categorie}
            onValueChange={(v) => setFormData({ ...formData, categorie: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description & Contenu */}
        <div className="grid gap-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description courte"
            rows={2}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contenu">Contenu *</Label>
          <Textarea
            id="contenu"
            value={formData.contenu || ""}
            onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
            placeholder="Contenu détaillé"
            rows={4}
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="date-debut">Date de début *</Label>
            <Input
              id="date-debut"
              type="datetime-local"
              value={formData.date_commencement?.toISOString().slice(0, 16) ?? ""}
              onChange={(e) => setFormData({ ...formData, date_commencement: new Date(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date-fin">Date de fin</Label>
            <Input
              id="date-fin"
              type="datetime-local"
              value={formData.date_fin?.toISOString().slice(0, 16) ?? ""}
              onChange={(e) => setFormData({ ...formData, date_fin: new Date(e.target.value) })}
            />
          </div>
        </div>

        {/* Lieu */}
        <div className="grid gap-2">
          <Label htmlFor="lieu">Lieu</Label>
          <Input
            id="lieu"
            value={formData.lieu || ""}
            onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
            placeholder="Lieu de l'événement"
          />
        </div>

        {/* Médias */}
        <div className="grid gap-2">
          <Label>Médias</Label>
          <Button asChild variant="outline" className="w-full bg-transparent">
            <label htmlFor="media-upload" className="cursor-pointer flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Ajouter un média
              <input id="media-upload" type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            </label>
          </Button>

          {formData.medias && formData.medias.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {formData.medias.map((media) => (
                <div key={media.id} className="relative border rounded-lg p-2">
                  <img src={media.url || "/placeholder.svg"} className="w-full h-20 object-cover rounded" />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => media.id && onRemoveMedia(media.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Annuler</Button>
        <Button onClick={onSubmit} className="bg-university-primary hover:bg-university-primary/90">
          {isEdit ? "Mettre à jour" : "Ajouter"}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}