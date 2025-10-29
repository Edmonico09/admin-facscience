
import { Mail, MapPin, Clock, Globe, Users } from "lucide-react"

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Contact": return <Mail className="h-4 w-4" />
    case "Adresse": return <MapPin className="h-4 w-4" />
    case "Horaires": return <Clock className="h-4 w-4" />
    case "Social": return <Globe className="h-4 w-4" />
    case "Statistiques": return <Users className="h-4 w-4" />
    default: return <Globe className="h-4 w-4" />
  }
}

export const getCategoryColor = (category: string) => {
  switch (category) {
    case "Contact": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Adresse": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Horaires": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "Social": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case "Statistiques": return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}