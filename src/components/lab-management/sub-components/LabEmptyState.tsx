import { FlaskConical } from "lucide-react"

interface LabEmptyStateProps {
  hasFilters: boolean
}

export function LabEmptyState({ hasFilters }: LabEmptyStateProps) {
  return (
    <div className="text-center py-8">
      <FlaskConical className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">
        {hasFilters
          ? "Aucun laboratoire trouvé pour les filtres sélectionnés"
          : "Aucun laboratoire disponible"}
      </p>
    </div>
  )
}