import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { Mention } from "@/services/types/mention"

interface LabFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedMention: string
  onMentionChange: (value: string) => void
  mentions: Mention[]
}

export function LabFilters({
  searchTerm,
  onSearchChange,
  selectedMention,
  onMentionChange,
  mentions,
}: LabFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Rechercher un laboratoire..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={selectedMention} onValueChange={onMentionChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Toutes mentions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes mentions</SelectItem>
          {mentions.map((mention) => (
            <SelectItem key={mention.IdMention} value={mention.IdMention!.toString()}>
              {mention.NomMention}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}