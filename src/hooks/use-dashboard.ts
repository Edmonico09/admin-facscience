import { useState, useEffect } from "react"
import { StatDb, StatItem } from "@/services/types/stat"
import { Actualite } from "@/services/types/event"
import { statistic } from "@/services/api/stat.api"
import { BookOpen, FlaskConical, GraduationCap, Newspaper, TrendingUp, Users } from "lucide-react"
import { getClosestEvent } from "@/services/api/event.api"
import { ActivityItem } from "@/services/types/activity"
import { useActivity } from "@/context/activity-context"

export const statConfig: Record<string, { icon: any; color: string }> = {
  Mentions: { icon: GraduationCap, color: "text-university-primary" },
  Parcours: { icon: BookOpen, color: "text-university-secondary" },
  Actualités: { icon: Newspaper, color: "text-blue-600" },
  Laboratoires: { icon: FlaskConical, color: "text-green-600" },
  Personnes: { icon: Users, color: "text-purple-600" },
  Activité: { icon: TrendingUp, color: "text-orange-600" },
}

export function useDashboard() {
  const [stats, setStats] = useState<StatItem[]>([])
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Actualite[]>([])
  const { getRecentActivity, activities } = useActivity()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datas1: StatDb[] = await statistic()
        if (!datas1) throw new Error("Erreur lors de la récupération des statistiques")

        const statsMapped: StatItem[] = datas1.map((stat) => ({
          ...stat,
          ...statConfig[stat.title],
        }))
        setStats(statsMapped)

        setRecentActivities(getRecentActivity(5))

        const datas2 = await getClosestEvent()
        if (!datas2) throw new Error("Erreur lors de la récupération des événements")
        setUpcomingEvents(datas2)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [activities])

  return { stats, recentActivities, upcomingEvents }
}
