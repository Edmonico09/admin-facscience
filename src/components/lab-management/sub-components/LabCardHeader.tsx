import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import { DialogTrigger } from "@/components/ui/dialog"
import { Plus, FlaskConical } from "lucide-react"

export function LabCardHeader() {
  return (
    <div className="flex items-center justify-between">
      <CardTitle className="flex items-center gap-2">
        <FlaskConical className="h-5 w-5 text-university-primary" />
        Liste des Laboratoires
      </CardTitle>
      <DialogTrigger asChild>
        <Button className="bg-university-primary rounded-full w-10 h-10 sm:w-fit sm:rounded-lg hover:bg-university-primary/90">
          <Plus className="h-4 w-4" />
          <div className="hidden sm:block">Ajouter un Laboratoire</div>
        </Button>
      </DialogTrigger>
    </div>
  )
}