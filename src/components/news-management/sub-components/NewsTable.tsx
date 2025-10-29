import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { NewsTableRow } from "./NewsTableRow"
import { Actuality } from "@/services/types/event"

interface NewsTableProps {
  filteredNews: Actuality[]
  onEdit: (a: Actuality) => void
  onDelete: (id: number) => void
  getStatusBadge: (s: string) => React.ReactNode
  getCategoryBadge: (c: string) => React.ReactNode
}

export function NewsTable({ filteredNews, onEdit, onDelete, getStatusBadge, getCategoryBadge }: NewsTableProps) {
  return (
    <>
      <div className="hidden lg:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead className="text-center">Catégorie</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="hidden xl:flex items-center">Médias</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNews.map((n) => (
              <NewsTableRow
                key={n.id_actuality}
                actuality={n}
                onEdit={onEdit}
                onDelete={onDelete}
                getStatusBadge={getStatusBadge}
                getCategoryBadge={getCategoryBadge}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}