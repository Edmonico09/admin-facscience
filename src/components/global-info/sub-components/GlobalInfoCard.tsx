
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import type { GlobalInfo } from "../types/types"
import { getCategoryIcon, getCategoryColor } from "../utils"

interface GlobalInfoCardProps {
  info: GlobalInfo
  onEdit: (info: GlobalInfo) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

export function GlobalInfoCard({
  info,
  onEdit,
  onDelete,
  onToggleStatus,
}: GlobalInfoCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getCategoryIcon(info.category)}
            <Badge className={getCategoryColor(info.category)}>{info.category}</Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleStatus(info.id)}
            className={info.isActive ? "text-green-600" : "text-red-600"}
          >
            {info.isActive ? "Actif" : "Inactif"}
          </Button>
        </div>
        <CardTitle className="text-lg">{info.key}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Valeur:</p>
            <p className="text-sm break-words">{info.value}</p>
          </div>
          {info.description && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Description:</p>
              <p className="text-xs text-muted-foreground">{info.description}</p>
            </div>
          )}
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-xs text-muted-foreground">Modifié: {info.lastUpdated}</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => onEdit(info)}>
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(info.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}