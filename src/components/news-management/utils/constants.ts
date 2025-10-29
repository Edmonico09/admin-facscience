import { Actuality } from "@/services/types/event"

export const INITIAL_FORM_DATA: Partial<Actuality> = {
  titre: "",
  categorie: "",
  description: undefined,
  contenu: undefined,
  date_commencement: undefined,
  date_fin: undefined,
  lieu: undefined,
  statut: "draft",
  medias: [],
}

export const STATUS_OPTIONS = [
  { value: "all", label: "Tous statuts" },
  { value: "published", label: "Publié" },
  { value: "draft", label: "Brouillon" },
  { value: "archived", label: "Archivé" },
] as const