import { GraduationCap } from "lucide-react"

interface MentionEmptyStateProps {
  hasSearchTerm: boolean
}

export function MentionEmptyState({ hasSearchTerm }: MentionEmptyStateProps) {
  return (
    <div className="text-center py-8">
      <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">
        {hasSearchTerm ? "Aucune mention trouvée pour votre recherche" : "Aucune mention disponible"}
      </p>
    </div>
  )
}