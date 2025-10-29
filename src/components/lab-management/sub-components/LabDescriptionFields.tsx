import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X } from "lucide-react"
import { DescriptionItem } from "@/services/types/labo"

interface LabDescriptionFieldsProps {
  descriptions: DescriptionItem[]
  onUpdate: (descriptions: DescriptionItem[]) => void
  onAdd: () => void
  onRemove: (index: number, cle: string) => void
  isEditMode?: boolean
  minFields?: number
}

export function LabDescriptionFields({
  descriptions,
  onUpdate,
  onAdd,
  onRemove,
  isEditMode = false,
  minFields = 2,
}: LabDescriptionFieldsProps) {
  const updateField = (index: number, field: "cle" | "valeur", value: string) => {
    const updated = [...descriptions]
    updated[index] = { ...updated[index], [field]: value }
    onUpdate(updated)
  }

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label>Description (Clé-Valeur)</Label>
        <Button type="button" variant="outline" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-1" />
          Ajouter
        </Button>
      </div>
      <div className={`space-y-3 ${isEditMode ? "max-h-60 overflow-y-auto" : ""}`}>
        {descriptions.map((item, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <Input
                placeholder="Clé (ex: Mission)"
                value={item.cle}
                onChange={(e) => updateField(index, "cle", e.target.value)}
              />
              <Input
                placeholder="Valeur (ex: Recherche en IA)"
                value={item.valeur}
                onChange={(e) => updateField(index, "valeur", e.target.value)}
              />
            </div>
            {descriptions.length > minFields && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onRemove(index, item.cle)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}