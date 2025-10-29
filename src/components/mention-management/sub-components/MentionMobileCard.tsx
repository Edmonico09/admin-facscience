import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2 } from "lucide-react"
import { Mention } from "@/services/types/mention"

interface MentionMobileCardProps {
  mention: Mention
  onEdit: (mention: Mention) => void
  onDelete: (id: number) => void
}

export function MentionMobileCard({ mention, onEdit, onDelete }: MentionMobileCardProps) {
  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
            {mention.Abbreviation}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-base mb-1">{mention.NomMention}</h3>
        {mention.DescriptionMention && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {mention.DescriptionMention}
          </p>
        )}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">DescriptionMention:</span>
          <span className="text-sm font-medium">{mention.DescriptionMention}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Parcours:</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Date création:</span>
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t">
        <Button variant="outline" size="sm" onClick={() => onEdit(mention)} className="flex-1">
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </Button>
        <AlertDialog>
          <AlertDialogTrigger className="text-red-500" asChild>
            <Button variant="outline" size="sm" className="flex-1">
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="w-[90vw] max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer la mention "{mention.NomMention}" ? Cette action est
                irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col lg:flex-row gap-2">
              <AlertDialogCancel className="w-full lg:w-auto">Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(mention.IdMention || 0)}
                className="bg-destructive hover:bg-destructive/90 w-full lg:w-auto"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}