interface NewsHeaderProps {
  total: number
  published: number
}

export function NewsHeader({ total, published }: NewsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Actualités</h1>
        <p className="text-muted-foreground">Gérer les actualités et événements de l'université</p>
      </div>
      <div className="hidden sm:flex items-center gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-university-primary">{total}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{published}</div>
          <div className="text-xs text-muted-foreground">Publiées</div>
        </div>
      </div>
    </div>
  )
}