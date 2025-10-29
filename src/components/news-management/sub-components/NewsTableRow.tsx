import { TableRow, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Edit, Trash2 } from "lucide-react"
import { Actuality } from "@/services/types/event"

interface NewsTableRowProps {
  actuality: Actuality
  onEdit: (a: Actuality) => void
  onDelete: (id: number) => void
  getStatusBadge: (s: string) => React.ReactNode
  getCategoryBadge: (c: string) => React.ReactNode
}

export function NewsTableRow({ actuality: n, onEdit, onDelete, getStatusBadge, getCategoryBadge }: NewsTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div>
          <div className="font-medium">{n.titre}</div>
          <div className="text-sm text-muted-foreground truncate max-w-xs">{n.description}</div>
        </div>
      </TableCell>
      <TableCell>{getCategoryBadge(n.categorie)}</TableCell>
      <TableCell>
        <div className="text-sm">
          <div>{new Date(n.date_commencement!).toLocaleDateString("fr-FR")}</div>
          {n.date_fin && (
            <div className="text-muted-foreground">
              → {new Date(n.date_fin).toLocaleDateString("fr-FR")}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>{n.lieu || "-"}</TableCell>
      <TableCell>{getStatusBadge(n.statut)}</TableCell>
      <TableCell>
        <Badge variant="outline">{n.medias?.length || 0}</Badge>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(n)}>
            <Edit className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer "{n.titre}" ? Cette action est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(n.id_actuality!)} className="bg-destructive">
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  )
}