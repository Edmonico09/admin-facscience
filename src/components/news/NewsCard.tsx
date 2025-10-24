import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Edit } from "lucide-react"
import { Actualite } from "@/services/types/event"
import { DeleteNewsDialog } from "./DeleteNewsDialog"

interface NewsCardProps {
  news: Actualite
  onEdit: (news: Actualite) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, status: "draft" | "published" | "archived") => void
  getStatusBadge: (status: "draft" | "published" | "archived") => React.ReactNode
}

export function NewsCard({ news, onEdit, onDelete, onStatusChange, getStatusBadge }: NewsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{news.titre}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              {getStatusBadge(news.statut as "draft" | "published" | "archived")}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {news.medias.length > 0 && (
          <img
            src={news.medias[0].chemin || "/placeholder.svg"}
            alt={news.titre}
            className="w-full h-32 object-cover rounded-md"
          />
        )}
        <p className="text-sm text-muted-foreground line-clamp-2">{news.description}</p>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              {news.dateCommencement ? new Date(news.dateCommencement).toLocaleDateString("fr-FR") : "-"}
            </span>
            {news.dateFin && (
              <>
                <span>-</span>
                <span>{new Date(news.dateFin).toLocaleDateString("fr-FR")}</span>
              </>
            )}
          </div>
          {news.lieu && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{news.lieu}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-1">
            <Button variant="outline" size="sm" onClick={() => onEdit(news)}>
              <Edit className="h-3 w-3" />
            </Button>
            <DeleteNewsDialog
              newsTitle={news.titre}
              onConfirm={() => onDelete(news.idActualite!)}
            />
          </div>
          <Select
            value={news.statut}
            onValueChange={(value: "draft" | "published" | "archived") =>
              onStatusChange(news.idActualite!, value)
            }
          >
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