import { Button } from "@/components/ui/button"
import { CardTitle } from "@/components/ui/card"
import { DialogTrigger } from "@/components/ui/dialog"
import { Plus, GraduationCap } from "lucide-react"

export function MentionCardHeader() {
  return (
    <div className="flex items-center justify-between">
      <CardTitle className="flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-university-primary" />
        Liste des Mentions
      </CardTitle>

      <DialogTrigger asChild>
        <Button className="flex justify-between rounded-full w-10 h-10 lg:w-fit lg:rounded-md items-center bg-university-primary hover:bg-university-primary/90">
          <Plus className="h-4 w-4" />
          <div className="hidden lg:block">Ajouter une Mention</div>
        </Button>
      </DialogTrigger>
    </div>
  )
}