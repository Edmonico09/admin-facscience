import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {  NiveauEnum, Parcours } from "@/services/types/parcours";
import { Mention } from "@/services/types/mention";
import { getFormationBadgeColor, getNiveauBadgeColor } from "@/services/parcours";


interface RenderPacoursCardListProps {
    mention: Mention;
    mentionParcours: Parcours[];
    handleDelete:  (id: number) => void;
    handleEdit: (p: Parcours) => void;
}

export function RenderPacoursCardList({mention, mentionParcours, handleDelete, handleEdit}: RenderPacoursCardListProps) {

    // const getNiveauBadgeColor = (niveau: TypeNiveau) => {
    //     if (niveau.startsWith("L")) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    //     if (niveau.startsWith("M")) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    //     if (niveau.startsWith("D")) return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    //     return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    // } 

    return(
    <Card key={mention.idMention}>
      <CardHeader>
        <CardTitle className="text-lg text-university-primary">
          {mention.nomMention} ({mention.abbreviation})
          <Badge variant="outline" className="ml-2">
            {mentionParcours.length} parcours
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {mentionParcours.map((p) => (
            <div key={p.idParcours} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-foreground">{p.nomParcours}</h4>
                  <Badge className={getNiveauBadgeColor(p.niveauParcours || NiveauEnum.L1)}>{p.niveauParcours}</Badge>
                  <Badge className={getFormationBadgeColor(p.formationType)}>{p.formationType}</Badge>
                </div>
                {p.descriptionParcours && <p className="text-sm text-muted-foreground mb-2">{p.descriptionParcours}</p>}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{p.niveauParcours}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}