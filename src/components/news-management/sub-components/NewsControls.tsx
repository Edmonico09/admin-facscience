import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Tag } from "lucide-react"

interface NewsControlsProps {
  onAddOpen: () => void
  onCategoryOpen: () => void
}

export function NewsControls({ onAddOpen, onCategoryOpen }: NewsControlsProps) {
  return (
    <div className="flex gap-2 w-full md:w-auto justify-between">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-10" onClick={onCategoryOpen}>
            <Tag className="h-4 w-4 mr-2" />
            Gérer Catégories
          </Button>
        </DialogTrigger>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-university-primary rounded-full w-10 h-10 sm:w-fit sm:rounded-lg hover:bg-university-primary/90"
            onClick={onAddOpen}
          >
            <Plus className="h-4 w-4" />
            <div className="hidden sm:block">Ajouter une Actualité</div>
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  )
}