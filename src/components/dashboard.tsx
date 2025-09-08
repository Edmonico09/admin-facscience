"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  BookOpen,
  Newspaper,
  FlaskConical,
  Users,
  TrendingUp,
  Calendar,
  AlertCircle,
} from "lucide-react"

export function Dashboard() {
  const stats = [
    { title: "Mentions", value: "12", icon: GraduationCap, color: "text-university-primary", change: "+2" },
    { title: "Parcours", value: "45", icon: BookOpen, color: "text-university-secondary", change: "+8" },
    { title: "Actualités", value: "23", icon: Newspaper, color: "text-blue-600", change: "+5" },
    { title: "Laboratoires", value: "8", icon: FlaskConical, color: "text-green-600", change: "+1" },
    { title: "Personnes", value: "156", icon: Users, color: "text-purple-600", change: "+12" },
    { title: "Activité", value: "+15%", icon: TrendingUp, color: "text-orange-600", change: "+3%" },
  ]

  const recentActivities = [
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

  const upcomingEvents = [
    {
      title: "Réunion du conseil pédagogique",
      date: "15 Jan 2025",
      time: "14:00",
      type: "meeting",
    },
    {
      title: "Soutenance de thèse - Informatique",
      date: "18 Jan 2025",
      time: "10:00",
      type: "defense",
    },
    {
      title: "Conférence internationale IA",
      date: "22 Jan 2025",
      time: "09:00",
      type: "conference",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenue dans votre système d'administration universitaire</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Dernière mise à jour</p>
          <p className="text-sm font-medium text-foreground">Aujourd'hui à 14:30</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-university-primary flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Activités Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "warning"
                          ? "bg-yellow-500"
                          : activity.status === "info"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-university-primary flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Événements à Venir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 rounded-lg border border-border">
                  <h4 className="text-sm font-medium text-foreground mb-1">{event.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-university-primary">Progression des Objectifs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Inscriptions 2025</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Publications recherche</span>
                <span className="text-sm text-muted-foreground">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Mise à jour contenus</span>
                <span className="text-sm text-muted-foreground">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-university-primary flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alertes & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    3 parcours nécessitent une validation
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-300">Action requise avant le 20 janvier</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Nouvelle version du système disponible
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-300">Mise à jour recommandée</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
