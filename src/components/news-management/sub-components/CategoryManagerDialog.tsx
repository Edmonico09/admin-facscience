import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { createCategory } from "@/services/api/event.api"
import { Category } from "@/services/types/category"

interface CategoryManagerDialogProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

export function CategoryManagerDialog({ isOpen, onClose, categories, setCategories }: CategoryManagerDialogProps) {
  const [categoryForm, setCategoryForm] = useState({ nom: "" })
  const { toast } = useToast()

  const handleAddCategory = async () => {
    if (!categoryForm.nom) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un nom pour la catégorie",
        variant: "destructive",
      })
      return
    }

    try {
      const newCategory = await createCategory(categoryForm.nom)
      setCategories([...categories, newCategory])
      setCategoryForm({ nom: "" })
      onClose()
      toast({ title: "Succès", description: "Catégorie ajoutée avec succès" })
    } catch (err) {
      toast({
        title: "Erreur",
        description: (err as Error).message,
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Ajouter une Catégorie</DialogTitle>
          <DialogDescription>Créez une nouvelle catégorie pour organiser vos actualités.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="category-name">Nom de la catégorie</Label>
            <Input
              id="category-name"
              value={categoryForm.nom}
              onChange={(e) => setCategoryForm({ ...categoryForm, nom: e.target.value })}
              placeholder="Ex: Événements"
            />
          </div>
          <div className="space-y-2">
            <Label>Catégories existantes</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category.id} className="border">
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Fermer</Button>
          <Button onClick={handleAddCategory} className="bg-university-primary hover:bg-university-primary/90">
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}