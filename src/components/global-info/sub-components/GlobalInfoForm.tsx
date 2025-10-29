
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { categories } from "../types/types"

interface FormData {
  category: string
  key: string
  value: string
  description: string
  isActive: boolean
}

interface GlobalInfoFormProps {
  formData: FormData
  setFormData: (data: FormData) => void
  onSubmit: () => void
  onCancel: () => void
  isEditing: boolean
}

export function GlobalInfoForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEditing,
}: GlobalInfoFormProps) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit() }} className="space-y-4">
      <div>
        <Label htmlFor="category">Catégorie</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="key">Clé</Label>
        <Input
          id="key"
          value={formData.key}
          onChange={(e) => setFormData({ ...formData, key: e.target.value })}
          placeholder="ex: email_principal"
          required
        />
      </div>

      <div>
        <Label htmlFor="value">Valeur</Label>
        <Textarea
          id="value"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          placeholder="Valeur de l'information"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description (optionnel)</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description de l'information"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="bg-university-primary hover:bg-university-primary">
          {isEditing ? "Modifier" : "Ajouter"}
        </Button>
      </div>
    </form>
  )
}