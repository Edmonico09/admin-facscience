interface LabHeaderProps {
  totalLabs: number
}

export function LabHeader({ totalLabs }: LabHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Laboratoires</h1>
        <p className="text-muted-foreground">Gérer les laboratoires de recherche de l'université</p>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-university-primary">{totalLabs}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
      </div>
    </div>
  )
}