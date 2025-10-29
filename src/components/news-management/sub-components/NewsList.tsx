// news-management/NewsList.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Newspaper } from "lucide-react"
import { NewsCard } from "./NewsCard"
import { NewsTable } from "./NewsTable"
import { Actuality } from "@/services/types/event"

interface NewsListProps {
  filteredNews: Actuality[]
  onEdit: (a: Actuality) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, status: "draft" | "published" | "archived") => void
  getStatusBadge: (s: string) => React.ReactNode
  getCategoryBadge: (c: string) => React.ReactNode
}

export function NewsList({
  filteredNews,
  onEdit,
  onDelete,
  onStatusChange,
  getStatusBadge,
  getCategoryBadge,
}: NewsListProps) {
  const EmptyState = () => (
    <div className="text-center py-8">
      <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">
        {filteredNews.length === 0 ? "Aucune actualité disponible" : "Aucune actualité trouvée"}
      </p>
    </div>
  )

  return (
    <Tabs defaultValue="cards" className="w-full">
      <TabsList className="hidden lg:grid w-full grid-cols-2">
        <TabsTrigger value="cards">Vue Cartes</TabsTrigger>
        <TabsTrigger value="table">Vue Tableau</TabsTrigger>
      </TabsList>

      <TabsContent value="cards" className="space-y-4">
        {filteredNews.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((a) => (
              <NewsCard
                key={a.id_actuality}
                actuality={a}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
                getStatusBadge={getStatusBadge}
                getCategoryBadge={getCategoryBadge}
              />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="table">
        <NewsTable
          filteredNews={filteredNews}
          onEdit={onEdit}
          onDelete={onDelete}
          getStatusBadge={getStatusBadge}
          getCategoryBadge={getCategoryBadge}
        />
        {filteredNews.length === 0 && <EmptyState />}
      </TabsContent>
    </Tabs>
  )
}