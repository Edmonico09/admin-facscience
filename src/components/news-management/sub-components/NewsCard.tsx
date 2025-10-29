import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Calendar, MapPin, Edit, Trash2 } from "lucide-react"
import { Actuality } from "@/services/types/event"

interface NewsCardProps {
  actuality: Actuality
  onEdit: (a: Actuality) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, status: "draft" | "published" | "archived") => void
  getStatusBadge: (s: string) => React.ReactNode
  getCategoryBadge: (c: string) => React.ReactNode
}

export function NewsCard({
  actuality: a,
  onEdit,
  onDelete,
  onStatusChange,
  getStatusBadge,
  getCategoryBadge,
}: NewsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{a.titre}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              {getCategoryBadge(a.categorie)}
              {getStatusBadge(a.statut)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {a.medias && a.medias.length > 0 && (
          <img src={a.medias[0].url || "/icon.png"} alt={a.titre} className="w-full h-32 object-cover rounded-md" />
        )}
        <p className="text-sm text-muted-foreground line-clamp-2">{a.description}</p>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{a.date_commencement ? new Date(a.date_commencement).toLocaleDateString("fr-FR") : "-"}</span>
            {a.date_fin && (
              <>
                <span>-</span>
                <span>{new Date(a.date_fin).toLocaleDateString("fr-FR")}</span>
              </>
            )}
          </div>
          {a.lieu && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{a.lieu}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-1">
            <Button variant="outline" size="sm" onClick={() => onEdit(a)}>
              <Edit className="h-3 w-3" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir supprimer "{a.titre}" ? Cette action est irréversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(a.id_actuality!)} className="bg-destructive">
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Select value={a.statut} onValueChange={(v) => onStatusChange(a.id_actuality!, v as any)}>
            <SelectTrigger className="w-24 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="published">Publier</SelectItem>
              <SelectItem value="archived">Archiver</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}