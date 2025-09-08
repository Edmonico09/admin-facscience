"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Edit, Trash2, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type TypeNiveau = "L1" | "L2" | "L3" | "M1" | "M2" | "D1" | "D2" | "D3"
type TypeFormation = "Initiale" | "Continue" | "Alternance" | "Distance"

interface Mention {
  id: number
  nom: string
  code: string
}

interface Parcours {
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

const mockMentions: Mention[] = [
  { id: 1, nom: "Informatique", code: "INFO" },
  { id: 2, nom: "Mathématiques", code: "MATH" },
  { id: 3, nom: "Physique", code: "PHYS" },
  { id: 4, nom: "Chimie", code: "CHIM" },
]

const mockParcours: Parcours[] = [
  {
    id: 1,
    id_mention: 1,
    nom_parcours: "Génie Logiciel",
    niveau_parcours: "M1",
    formation: "Initiale",
    description: "Formation spécialisée en développement logiciel et ingénierie des systèmes",
    dateCreation: "2021-09-01",
    nombreEtudiants: 45,
    statut: "active",
  },
  {
    id: 2,
    id_mention: 1,
    nom_parcours: "Intelligence Artificielle",
    niveau_parcours: "M2",
    formation: "Initiale",
    description: "Formation avancée en IA, machine learning et data science",
    dateCreation: "2020-09-01",
    nombreEtudiants: 38,
    statut: "active",
  },
  {
    id: 3,
    id_mention: 1,
    nom_parcours: "Systèmes et Réseaux",
    niveau_parcours: "L3",
    formation: "Alternance",
    description: "Formation en administration systèmes et réseaux informatiques",
    dateCreation: "2019-09-01",
    nombreEtudiants: 52,
    statut: "active",
  },
  {
    id: 4,
    id_mention: 2,
    nom_parcours: "Mathématiques Appliquées",
    niveau_parcours: "M1",
    formation: "Initiale",
    description: "Formation en mathématiques appliquées aux sciences et à l'ingénierie",
    dateCreation: "2020-09-01",
    nombreEtudiants: 28,
    statut: "active",
  },
  {
    id: 5,
    id_mention: 2,
    nom_parcours: "Statistiques et Data Science",
    niveau_parcours: "M2",
    formation: "Continue",
    description: "Formation spécialisée en analyse statistique et science des données",
    dateCreation: "2021-09-01",
    nombreEtudiants: 22,
    statut: "active",
  },
  {
    id: 6,
    id_mention: 3,
    nom_parcours: "Physique Théorique",
    niveau_parcours: "D1",
    formation: "Initiale",
    description: "Formation doctorale en physique théorique et recherche fondamentale",
    dateCreation: "2018-09-01",
    nombreEtudiants: 8,
    statut: "active",
  },
]

const niveauxOptions: TypeNiveau[] = ["L1", "L2", "L3", "M1", "M2", "D1", "D2", "D3"]
const formationOptions: TypeFormation[] = ["Initiale", "Continue", "Alternance", "Distance"]

export function ParcoursManagement() {
  const [parcours, setParcours] = useState<Parcours[]>(mockParcours)
  const [mentions] = useState<Mention[]>(mockMentions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMention, setSelectedMention] = useState<string>("all")
  const [selectedNiveau, setSelectedNiveau] = useState<string>("all")
  const [selectedFormation, setSelectedFormation] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingParcours, setEditingParcours] = useState<Parcours | null>(null)
  const [formData, setFormData] = useState({
    nom_parcours: "",
    id_mention: "",
    niveau_parcours: "" as TypeNiveau | "",
    formation: "" as TypeFormation | "",
    description: "",
  })
  const { toast } = useToast()

  const filteredParcours = parcours.filter((p) => {
    const matchesSearch =
      p.nom_parcours.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentions
        .find((m) => m.id === p.id_mention)
        ?.nom.toLowerCase()
        .includes(searchTerm.toLowerCase())
    const matchesMention = selectedMention === "all" || p.id_mention.toString() === selectedMention
    const matchesNiveau = selectedNiveau === "all" || p.niveau_parcours === selectedNiveau
    const matchesFormation = selectedFormation === "all" || p.formation === selectedFormation

    return matchesSearch && matchesMention && matchesNiveau && matchesFormation
  })

  const getParcoursGroupedByMention = () => {
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

  const resetForm = () => {
    setFormData({
      nom_parcours: "",
      id_mention: "",
      niveau_parcours: "",
      formation: "",
      description: "",
    })
  }

  const handleAdd = () => {
    if (!formData.nom_parcours || !formData.id_mention || !formData.niveau_parcours || !formData.formation) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newParcours: Parcours = {
      id: Math.max(...parcours.map((p) => p.id)) + 1,
      nom_parcours: formData.nom_parcours,
      id_mention: Number.parseInt(formData.id_mention),
      niveau_parcours: formData.niveau_parcours as TypeNiveau,
      formation: formData.formation as TypeFormation,
      description: formData.description,
      dateCreation: new Date().toISOString().split("T")[0],
      nombreEtudiants: 0,
      statut: "active",
    }

    setParcours([...parcours, newParcours])
    setIsAddDialogOpen(false)
    resetForm()
    toast({
      title: "Succès",
      description: "Parcours ajouté avec succès",
    })
  }

  const handleEdit = (p: Parcours) => {
    setEditingParcours(p)
    setFormData({
      nom_parcours: p.nom_parcours,
      id_mention: p.id_mention.toString(),
      niveau_parcours: p.niveau_parcours,
      formation: p.formation,
      description: p.description || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = () => {
    if (
      !formData.nom_parcours ||
      !formData.id_mention ||
      !formData.niveau_parcours ||
      !formData.formation ||
      !editingParcours
    ) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const updatedParcours = parcours.map((p) =>
      p.id === editingParcours.id
        ? {
            ...p,
            nom_parcours: formData.nom_parcours,
            id_mention: Number.parseInt(formData.id_mention),
            niveau_parcours: formData.niveau_parcours as TypeNiveau,
            formation: formData.formation as TypeFormation,
            description: formData.description,
          }
        : p,
    )

    setParcours(updatedParcours)
    setIsEditDialogOpen(false)
    setEditingParcours(null)
    resetForm()
    toast({
      title: "Succès",
      description: "Parcours mis à jour avec succès",
    })
  }

  const handleDelete = (id: number) => {
    setParcours(parcours.filter((p) => p.id !== id))
    toast({
      title: "Succès",
      description: "Parcours supprimé avec succès",
    })
  }

  const getNiveauBadgeColor = (niveau: TypeNiveau) => {
    if (niveau.startsWith("L")) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    if (niveau.startsWith("M")) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (niveau.startsWith("D")) return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  const getFormationBadgeColor = (formation: TypeFormation) => {
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

  const groupedParcours = getParcoursGroupedByMention()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Parcours</h1>
          <p className="text-muted-foreground">Gérer les parcours académiques par mention</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-university-primary">{parcours.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {parcours.filter((p) => p.statut === "active").length}
            </div>
            <div className="text-xs text-muted-foreground">Actifs</div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-university-primary" />
              Liste des Parcours
            </CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-university-primary hover:bg-university-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un Parcours
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Ajouter un Nouveau Parcours</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations pour créer un nouveau parcours académique.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nom">Nom du parcours *</Label>
                    <Input
                      id="nom"
                      value={formData.nom_parcours}
                      onChange={(e) => setFormData({ ...formData, nom_parcours: e.target.value })}
                      placeholder="Ex: Génie Logiciel"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mention">Mention *</Label>
                    <Select
                      value={formData.id_mention}
                      onValueChange={(value) => setFormData({ ...formData, id_mention: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une mention" />
                      </SelectTrigger>
                      <SelectContent>
                        {mentions.map((mention) => (
                          <SelectItem key={mention.id} value={mention.id.toString()}>
                            {mention.nom} ({mention.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="niveau">Niveau *</Label>
                      <Select
                        value={formData.niveau_parcours}
                        onValueChange={(value) => setFormData({ ...formData, niveau_parcours: value as TypeNiveau })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          {niveauxOptions.map((niveau) => (
                            <SelectItem key={niveau} value={niveau}>
                              {niveau}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="formation">Formation *</Label>
                      <Select
                        value={formData.formation}
                        onValueChange={(value) => setFormData({ ...formData, formation: value as TypeFormation })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {formationOptions.map((formation) => (
                            <SelectItem key={formation} value={formation}>
                              {formation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description du parcours..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAdd} className="bg-university-primary hover:bg-university-primary/90">
                    Ajouter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un parcours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedMention} onValueChange={setSelectedMention}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Toutes mentions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes mentions</SelectItem>
                {mentions.map((mention) => (
                  <SelectItem key={mention.id} value={mention.id.toString()}>
                    {mention.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedNiveau} onValueChange={setSelectedNiveau}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous niveaux</SelectItem>
                {niveauxOptions.map((niveau) => (
                  <SelectItem key={niveau} value={niveau}>
                    {niveau}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedFormation} onValueChange={setSelectedFormation}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Formation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes formations</SelectItem>
                {formationOptions.map((formation) => (
                  <SelectItem key={formation} value={formation}>
                    {formation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="grouped" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grouped">Vue par Mention</TabsTrigger>
              <TabsTrigger value="table">Vue Tableau</TabsTrigger>
            </TabsList>

            <TabsContent value="grouped" className="space-y-4">
              {groupedParcours.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchTerm || selectedMention !== "all" || selectedNiveau !== "all" || selectedFormation !== "all"
                      ? "Aucun parcours trouvé pour les filtres sélectionnés"
                      : "Aucun parcours disponible"}
                  </p>
                </div>
              ) : (
                groupedParcours.map(({ mention, parcours: mentionParcours }) => (
                  <Card key={mention.id}>
                    <CardHeader>
                      <CardTitle className="text-lg text-university-primary">
                        {mention.nom} ({mention.code})
                        <Badge variant="outline" className="ml-2">
                          {mentionParcours.length} parcours
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {mentionParcours.map((p) => (
                          <div key={p.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-medium text-foreground">{p.nom_parcours}</h4>
                                <Badge className={getNiveauBadgeColor(p.niveau_parcours)}>{p.niveau_parcours}</Badge>
                                <Badge className={getFormationBadgeColor(p.formation)}>{p.formation}</Badge>
                              </div>
                              {p.description && <p className="text-sm text-muted-foreground mb-2">{p.description}</p>}
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>{p.nombreEtudiants} étudiants</span>
                                <span>Créé le {new Date(p.dateCreation).toLocaleDateString("fr-FR")}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(p)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Êtes-vous sûr de vouloir supprimer le parcours "{p.nom_parcours}" ? Cette action
                                      est irréversible.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(p.id)}
                                      className="bg-destructive hover:bg-destructive/90"
                                    >
                                      Supprimer
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="table">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parcours</TableHead>
                      <TableHead>Mention</TableHead>
                      <TableHead>Niveau</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Étudiants</TableHead>
                      <TableHead>Date Création</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParcours.map((p) => {
                      const mention = mentions.find((m) => m.id === p.id_mention)
                      return (
                        <TableRow key={p.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{p.nom_parcours}</div>
                              {p.description && (
                                <div className="text-sm text-muted-foreground truncate max-w-xs">{p.description}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {mention?.nom} ({mention?.code})
                          </TableCell>
                          <TableCell>
                            <Badge className={getNiveauBadgeColor(p.niveau_parcours)}>{p.niveau_parcours}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getFormationBadgeColor(p.formation)}>{p.formation}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{p.nombreEtudiants}</Badge>
                          </TableCell>
                          <TableCell>{new Date(p.dateCreation).toLocaleDateString("fr-FR")}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(p)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Êtes-vous sûr de vouloir supprimer le parcours "{p.nom_parcours}" ? Cette action
                                      est irréversible.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(p.id)}
                                      className="bg-destructive hover:bg-destructive/90"
                                    >
                                      Supprimer
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {filteredParcours.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchTerm || selectedMention !== "all" || selectedNiveau !== "all" || selectedFormation !== "all"
                      ? "Aucun parcours trouvé pour les filtres sélectionnés"
                      : "Aucun parcours disponible"}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le Parcours</DialogTitle>
            <DialogDescription>Modifiez les informations du parcours sélectionné.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-nom">Nom du parcours *</Label>
              <Input
                id="edit-nom"
                value={formData.nom_parcours}
                onChange={(e) => setFormData({ ...formData, nom_parcours: e.target.value })}
                placeholder="Ex: Génie Logiciel"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-mention">Mention *</Label>
              <Select
                value={formData.id_mention}
                onValueChange={(value) => setFormData({ ...formData, id_mention: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une mention" />
                </SelectTrigger>
                <SelectContent>
                  {mentions.map((mention) => (
                    <SelectItem key={mention.id} value={mention.id.toString()}>
                      {mention.nom} ({mention.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-niveau">Niveau *</Label>
                <Select
                  value={formData.niveau_parcours}
                  onValueChange={(value) => setFormData({ ...formData, niveau_parcours: value as TypeNiveau })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {niveauxOptions.map((niveau) => (
                      <SelectItem key={niveau} value={niveau}>
                        {niveau}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-formation">Formation *</Label>
                <Select
                  value={formData.formation}
                  onValueChange={(value) => setFormData({ ...formData, formation: value as TypeFormation })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {formationOptions.map((formation) => (
                      <SelectItem key={formation} value={formation}>
                        {formation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description du parcours..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdate} className="bg-university-primary hover:bg-university-primary/90">
              Mettre à jour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
