import { FormationEnum, NiveauEnum } from "./types/parcours"

export const getFormationBadgeColor = (formation: FormationEnum) => {
    switch (formation) {
      case "Academique":
        return "bg-university-primary/10 text-university-primary"
      case "Professionnalisante":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

export const getNiveauBadgeColor = (niveau: NiveauEnum) => { 
    if (niveau.startsWith("L")) 
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" 
    if (niveau.startsWith("M")) 
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
    if (niveau.startsWith("D")) 
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" 
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" }
