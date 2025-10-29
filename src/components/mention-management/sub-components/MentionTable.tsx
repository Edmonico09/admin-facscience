import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

interface MentionTableProps {
  mentions: Mention[]
  onEdit: (mention: Mention) => void
  onDelete: (id: number) => void
}

export function MentionTable({ mentions, onEdit, onDelete }: MentionTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Abbreviation</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mentions.map((mention) => (
            <TableRow key={mention.IdMention}>
              <TableCell>
                {mention.LogoPath && (
                  <img
                    src={
                      mention.LogoPath
                        ? typeof mention.LogoPath === "string"
                          ? mention.LogoPath
                          : mention.LogoPath.name
                        : ""
                    }
                    alt="Logo de la mention"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                )}
              </TableCell>
              <TableCell className="font-medium">{mention.Abbreviation}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{mention.NomMention}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-xs">
                    {mention.DescriptionMention}
                  </div>
                </div>
              </TableCell>
              <TableCell>{mention.DescriptionMention}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => onEdit(mention)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500 font-bold" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir supprimer la mention "{mention.NomMention}" ? Cette action est
                          irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(mention.IdMention || 0)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}