import { BookOpen, FlaskConical, GraduationCap, Newspaper, TrendingUp, Users } from "lucide-react"
import { Actualite } from "./types/event";
import { StatItem } from "./types/stat";

export const stats : StatItem[] = [
{ title: "Mentions", value: "12", icon: GraduationCap, color: "text-university-primary", change: "+2" },
{ title: "Parcours", value: "45", icon: BookOpen, color: "text-university-secondary", change: "+8" },
{ title: "Actualités", value: "23", icon: Newspaper, color: "text-blue-600", change: "+5" },
{ title: "Laboratoires", value: "8", icon: FlaskConical, color: "text-green-600", change: "+1" },
{ title: "Personnes", value: "156", icon: Users, color: "text-purple-600", change: "+12" },
{ title: "Activité", value: "+15%", icon: TrendingUp, color: "text-orange-600", change: "+3%" },
]

export const recentActivities = [
{
    type: "mention",
    title: "Nouvelle mention 'Informatique' ajoutée",
    time: "Il y a 2 heures",
    status: "success",
},
{
    type: "parcours",
    title: "Parcours 'IA et Data Science' mis à jour",
    time: "Il y a 4 heures",
    status: "info",
},
{
    type: "news",
    title: "3 nouvelles actualités publiées",
    time: "Il y a 6 heures",
    status: "success",
},
{
    type: "lab",
    title: "Laboratoire 'LRIT' - Nouveau responsable assigné",
    time: "Il y a 1 jour",
    status: "warning",
},
{
    type: "people",
    title: "5 nouveaux professeurs ajoutés",
    time: "Il y a 2 jours",
    status: "success",
},
]

export const upcomingEvents: Actualite[] = [
  {
    id_actualite: 1,
    titre: "Réunion du conseil pédagogique",
    id_categorie: 'Reunion',
    description: "Réunion pour discuter des nouvelles orientations pédagogiques.",
    date_creation: new Date(),
    date_commencement: new Date("2025-01-15T14:00:00"),
    date_fin: new Date("2025-01-15T15:00:00"),
    lieu: "Salle A",
  },
  {
    id_actualite: 2,
    titre: "Soutenance de thèse - Informatique",
    id_categorie: 'Soutenance',
    description: "Soutenance de thèse pour le département d'informatique.",
    date_creation: new Date(),
    date_commencement: new Date("2025-01-18T10:00:00"),
    date_fin: new Date("2025-01-18T12:00:00"),
    lieu: "Amphi B",
  },
  {
    id_actualite: 3,
    titre: "Conférence internationale IA",
    id_categorie: 'Conference',
    description: "Conférence internationale sur l'intelligence artificielle.",
    date_creation: new Date(),
    date_commencement: new Date("2025-01-22T09:00:00"),
    date_fin: new Date("2025-01-22T17:00:00"),
    lieu: "Centre de conférence",
  },
];
