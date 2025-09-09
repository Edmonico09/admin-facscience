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
    idMention: 1,
    nomMention: "Informatique",
    abbreviation: "INFO",
    descriptionMention: "Formation en sciences informatiques et technologies de l'information",
  },
  {
    idMention: 2,
    nomMention: "Mathématiques",
    abbreviation: "MATH",
    descriptionMention: "Formation en mathématiques pures et appliquées",
  },
  {
    idMention: 3,
    nomMention: "Physique",
    abbreviation: "PHYS",
    descriptionMention: "Formation en physique théorique et expérimentale",
  },
  {
    idMention: 4,
    nomMention: "Chimie",
    abbreviation: "CHIM",
    descriptionMention: "Formation en chimie générale et spécialisée",
  },
]

export const mockParcours: Parcours[] = [
  {
    idParcours: 1,
    idMention: 1,
    nomParcours: "Génie Logiciel",
    niveauParcours: NiveauEnum.M1,
    formationType: FormationEnum.Academique,
    descriptionParcours: "Formation spécialisée en développement logiciel et ingénierie des systèmes",
  },
  {
    idParcours: 2,
    idMention: 1,
    nomParcours: "Intelligence Artificielle",
    niveauParcours: NiveauEnum.M1,
    formationType: FormationEnum.Academique,
    descriptionParcours: "Formation avancée en IA, machine learning et data science",
  },
  {
    idParcours: 3,
    idMention: 1,
    nomParcours: "Systèmes et Réseaux",
    niveauParcours: NiveauEnum.M1,
    formationType: FormationEnum.Academique,
    descriptionParcours: "Formation en administration systèmes et réseaux informatiques",
  },
  {
    idParcours: 4,
    idMention: 2,
    nomParcours: "Mathématiques Appliquées",
    niveauParcours: NiveauEnum.M1,
    formationType: FormationEnum.Academique,
    descriptionParcours: "Formation en mathématiques appliquées aux sciences et à l'ingénierie",
  },
  {
    idParcours: 5,
    idMention: 2,
    nomParcours: "Statistiques et Data Science",
    niveauParcours: NiveauEnum.M1,
    formationType: FormationEnum.Academique,
    descriptionParcours: "Formation spécialisée en analyse statistique et science des données",
  },
  {
    idParcours: 6,
    idMention: 3,
    nomParcours: "Physique Théorique",
    niveauParcours: NiveauEnum.M1,
    formationType: FormationEnum.Academique,
    descriptionParcours: "Formation doctorale en physique théorique et recherche fondamentale",
  },
]

export const mockUsers = [
  { id: 1, identifiant: "alice", password: "password123", name: "Alice" },
  { id: 2, identifiant: "bob", password: "secret", name: "Bob" },
];