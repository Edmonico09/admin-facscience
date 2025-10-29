export interface GlobalInfo {
  id: string
  category: string
  key: string
  value: string
  description?: string
  isActive: boolean
  lastUpdated: string
}

export const categories = [
  "Contact",
  "Adresse",
  "Horaires",
  "Social",
  "Statistiques",
  "Général",
] as const

export type Category = (typeof categories)[number]