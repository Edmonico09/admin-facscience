import { BookOpen, FlaskConical, GraduationCap, Newspaper, TrendingUp, Users } from "lucide-react"
import { Actualite } from "./types/event";
import { StatItem } from "./types/stat";
import { Mention } from "@/services/types/mention";
import { FormationEnum, NiveauEnum, Parcours } from "@/services/types/parcours"

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

export const mockMentions: Mention[] = [
  {
    id_mention: 1,
    nom_mention: "Informatique",
    abbreviation: "INFO",
    description_mention: "Formation en sciences informatiques et technologies de l'information",
  },
  {
    id_mention: 2,
    nom_mention: "Mathématiques",
    abbreviation: "MATH",
    description_mention: "Formation en mathématiques pures et appliquées",
  },
  {
    id_mention: 3,
    nom_mention: "Physique",
    abbreviation: "PHYS",
    description_mention: "Formation en physique théorique et expérimentale",
  },
  {
    id_mention: 4,
    nom_mention: "Chimie",
    abbreviation: "CHIM",
    description_mention: "Formation en chimie générale et spécialisée",
  },
]

export const mockParcours: Parcours[] = [
  {
    id_parcours: 1,
    id_mention: 1,
    nom_parcours: "Génie Logiciel",
    niveau_parcours: NiveauEnum.M1,
    formation_type: FormationEnum.Academique,
    description_parcours: "Formation spécialisée en développement logiciel et ingénierie des systèmes",
  },
  {
    id_parcours: 2,
    id_mention: 1,
    nom_parcours: "Intelligence Artificielle",
    niveau_parcours: NiveauEnum.M1,
    formation_type: FormationEnum.Academique,
    description_parcours: "Formation avancée en IA, machine learning et data science",
  },
  {
    id_parcours: 3,
    id_mention: 1,
    nom_parcours: "Systèmes et Réseaux",
    niveau_parcours: NiveauEnum.M1,
    formation_type: FormationEnum.Academique,
    description_parcours: "Formation en administration systèmes et réseaux informatiques",
  },
  {
    id_parcours: 4,
    id_mention: 2,
    nom_parcours: "Mathématiques Appliquées",
    niveau_parcours: NiveauEnum.M1,
    formation_type: FormationEnum.Academique,
    description_parcours: "Formation en mathématiques appliquées aux sciences et à l'ingénierie",
  },
  {
    id_parcours: 5,
    id_mention: 2,
    nom_parcours: "Statistiques et Data Science",
    niveau_parcours: NiveauEnum.M1,
    formation_type: FormationEnum.Academique,
    description_parcours: "Formation spécialisée en analyse statistique et science des données",
  },
  {
    id_parcours: 6,
    id_mention: 3,
    nom_parcours: "Physique Théorique",
    niveau_parcours: NiveauEnum.M1,
    formation_type: FormationEnum.Academique,
    description_parcours: "Formation doctorale en physique théorique et recherche fondamentale",
  },
]

export const mockUsers = [
  { id: 1, identifiant: "alice", password: "password123", name: "Alice" },
  { id: 2, identifiant: "bob", password: "secret", name: "Bob" },
];