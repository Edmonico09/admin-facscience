export type TypeNiveau = "L1" | "L2" | "L3" | "M1" | "M2" | "D1" | "D2" | "D3"
export type TypeFormation = "Initiale" | "Continue" | "Alternance" | "Distance"

export interface Mention {
  id: number
  nom: string
  code: string
}

export interface Parcours {
  id: number
  id_mention: number
  nom_parcours: string
  niveau_parcours: TypeNiveau
  formation: TypeFormation
  description?: string
  dateCreation: string
  nombreEtudiants: number
  statut: "active" | "inactive"
}

export interface InputData {
    nom_parcours: string;
    id_mention: string;
    niveau_parcours:  TypeNiveau | string;
    formation: TypeFormation | "";
    description: string;
  }

export const getParcoursGroupedByMention = (filteredParcours: Parcours[], mentions: Mention[]) => {
    const grouped: { [key: number]: { mention: Mention; parcours: Parcours[] } } = {}

    filteredParcours.forEach((p) => {
      const mention = mentions.find((m) => m.id === p.id_mention)
      if (mention) {
        if (!grouped[mention.id]) {
          grouped[mention.id] = { mention, parcours: [] }
        }
        grouped[mention.id].parcours.push(p)
      }
    })

    return Object.values(grouped)
  }




export const getNiveauBadgeColor = (niveau: TypeNiveau) => {
    if (niveau.startsWith("L")) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    if (niveau.startsWith("M")) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (niveau.startsWith("D")) return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

export const getFormationBadgeColor = (formation: TypeFormation) => {
    switch (formation) {
      case "Initiale":
        return "bg-university-primary/10 text-university-primary"
      case "Continue":
        return "bg-university-secondary/10 text-university-secondary"
      case "Alternance":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Distance":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }