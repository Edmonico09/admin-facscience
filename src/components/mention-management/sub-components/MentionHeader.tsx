interface MentionHeaderProps {
  totalMentions: number
}

export function MentionHeader({ totalMentions }: MentionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Mentions</h1>
        <p className="text-muted-foreground">Gérer les mentions académiques de l'université</p>
      </div>
      <div className="hidden lg:flex items-center gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-university-primary">{totalMentions}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
      </div>
    </div>
  )
}