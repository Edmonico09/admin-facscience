import { getNiveauBadgeColor, getFormationBadgeColor} from "@/services/parcours"
import { Mention } from "@/services/types/mention";
import { Parcours, FormationEnum, NiveauEnum } from "@/services/types/parcours";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Edit, Trash2 } from "lucide-react";
interface RenderPacoursTableProps {
    filteredParcours: Parcours[];
    mentions: Mention[];
    handleEdit: (p: Parcours) => void;
    handleDelete: (id: number) => void;
}

export const RenderPacoursTable = ({filteredParcours, mentions, handleEdit, handleDelete}: RenderPacoursTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Parcours</TableHead>
          <TableHead>Mention</TableHead>
          <TableHead>Niveau</TableHead>
          <TableHead>Formation</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredParcours.map((p) => {
          const mention = mentions.find((m) => m.idMention === p.idMention)
          return (
            <TableRow key={p.idParcours}>
              <TableCell>
                <div>
                  <div className="font-medium">{p.nomParcours}</div>
                  {p.descriptionParcours && (
                    <div className="text-sm text-muted-foreground truncate max-w-xs">{p.descriptionParcours}</div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {mention?.nomMention} ({mention?.abbreviation})
              </TableCell>
              <TableCell>
                <Badge className={getNiveauBadgeColor(p.niveauParcours||NiveauEnum.L1)}>{p.niveauParcours}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getFormationBadgeColor(p.formationType)}>{p.formationType}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(p)}>
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
                          Êtes-vous sûr de vouloir supprimer le parcours "{p.nomParcours}" ? Cette action
                          est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(p.idParcours||0)}
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
          )
        })}
      </TableBody>
    </Table>
  )
}