import { BookOpen, FlaskConical, GraduationCap, Newspaper, TrendingUp, Users } from "lucide-react"
import { Actuality } from "./types/event";
import { StatItem } from "./types/stat";
import { Mention } from "@/services/types/mention";
import { FormationEnum, NiveauEnum, Parcours } from "@/services/types/parcours"
import { Speciality } from "./types/speciality";

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

export const upcomingEvents: Actuality[] = [
  {
    id_actuality: 1,
    titre: "Réunion du conseil pédagogique",
    categorie: 'Reunion',
    description: "Réunion pour discuter des nouvelles orientations pédagogiques.",
    date_creation: new Date(),
    date_commencement: new Date("2025-01-15T14:00:00"),
    date_fin: new Date("2025-01-15T15:00:00"),
    lieu: "Salle A",
    statut: "",
    medias: []
  },
  {
    id_actuality: 2,
    titre: "Soutenance de thèse - Informatique",
    categorie: 'Soutenance',
    description: "Soutenance de thèse pour le département d'informatique.",
    date_creation: new Date(),
    date_commencement: new Date("2025-01-18T10:00:00"),
    date_fin: new Date("2025-01-18T12:00:00"),
    lieu: "Amphi B",
    statut: "",
    medias: []
  },
  {
    id_actuality: 3,
    titre: "Conférence internationale IA",
    categorie: 'Conference',
    description: "Conférence internationale sur l'intelligence artificielle.",
    date_creation: new Date(),
    date_commencement: new Date("2025-01-22T09:00:00"),
    date_fin: new Date("2025-01-22T17:00:00"),
    lieu: "Centre de conférence",
    statut: "",
    medias: []
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

export const mockSpecialities: Speciality[] = [
  {
    id_speciality: 1,
    name_speciality: "Informatique",
    parcours: "Développement Web et Mobile",
    description: "Formation axée sur les technologies front-end et back-end modernes."
  },
  {
    id_speciality: 2,
    name_speciality: "Biotechnologie",
    parcours: "Génie biologique",
    description: "Étude des processus biologiques appliqués à l'industrie et à la santé."
  },
  {
    id_speciality: 3,
    name_speciality: "Management",
    parcours: "Gestion des organisations",
    description: "Approche stratégique de la gestion d’entreprise et du leadership."
  },
  {
    id_speciality: 4,
    name_speciality: "Design graphique",
    parcours: "Création visuelle",
    description: ""
  },
  {
    id_speciality: 5,
    name_speciality: "Énergies renouvelables",
    parcours: "Ingénierie environnementale",
    description: "Focus sur les technologies durables et la transition énergétique."
  }
];

export const mockActualities: Actuality[] = [
  {
    id_actuality: 1,
    titre: "Conférence sur la Santé Digitale",
    categorie: "Événement",
    description: "Une conférence sur l'impact du digital dans le secteur médical.",
    contenu: "Experts et professionnels discuteront des dernières avancées en e-santé.",
    date_creation: new Date("2025-08-20T10:00:00"),
    date_update: new Date("2025-08-25T14:30:00"),
    date_commencement: new Date("2025-09-15T09:00:00"),
    date_fin: new Date("2025-09-15T17:00:00"),
    lieu: "Auditorium Clinique Centrale",
    statut: "Publié",
    medias: [
      {
        id: 101,
        type: "image",
        url: "https://picsum.photos/600/400?random=1"
        // description: "Affiche de la conférence"
      }
    ]
  },
  {
    id_actuality: 2,
    titre: "Nouvelle Aile de Pédiatrie Ouverte",
    categorie: "Annonce",
    description: "Ouverture officielle d’une nouvelle aile pédiatrique moderne.",
    contenu: "La clinique inaugure une aile équipée de 20 chambres supplémentaires.",
    date_creation: new Date("2025-09-01T08:00:00"),
    date_update: new Date("2025-09-05T12:00:00"),
    date_commencement: new Date("2025-09-10T10:00:00"),
    statut: "Publié",
    lieu: "Clinique Médicale",
    medias: [
      {
        id: 102,
        type: "video",
        url: "https://www.example.com/video.mp4",
        // description: "Présentation de la nouvelle aile"
      }
    ]
  },
  {
    id_actuality: 3,
    titre: "Campagne de Vaccination Gratuite",
    categorie: "Santé Publique",
    description: "Vaccination gratuite pour enfants de moins de 5 ans.",
    contenu: "La campagne durera 2 semaines et couvrira toutes les communes de la ville.",
    date_creation: new Date("2025-09-05T09:00:00"),
    date_update: new Date("2025-09-07T15:00:00"),
    date_commencement: new Date("2025-09-20T08:00:00"),
    date_fin: new Date("2025-10-04T16:00:00"),
    lieu: "Centres de santé partenaires",
    statut: "En attente",
    medias: [
      {
        id: 103,
        type: "image",
        url: "https://picsum.photos/600/400?random=2"
      },
      {
        id: 104,
        type: "document",
        url: "https://www.example.com/plan-campagne.pdf",
        // description: "Détails de la campagne"
      }
    ]
  },
  {
    id_actuality: 4,
    titre: "Article: Nutrition et Prévention",
    categorie: "Article",
    description: "Les bases de la nutrition pour prévenir les maladies chroniques.",
    contenu: "Une alimentation équilibrée peut réduire les risques cardiovasculaires...",
    date_creation: new Date("2025-09-08T11:00:00"),
    statut: "Brouillon",
    medias: []
  }
];
