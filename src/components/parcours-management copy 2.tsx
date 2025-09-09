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
import { getFormationBadgeColor, getNiveauBadgeColor, getParcoursGroupedByMention, Mention, Parcours, TypeFormation, TypeNiveau } from "@/services/services"
import { RenderPacoursCardList } from "./render-parcours-cardlist"
import { RenderPacoursTable } from "./render-parcours-table"

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

  const groupedParcours = getParcoursGroupedByMention(filteredParcours, mentions)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Parcours</h1>
          <p className="text-muted-foreground">Gérer les parcours académiques par mention</p>
        </div>
        <div className="hidden md:flex items-center gap-4">
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

      {/* <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-university-primary" />
              Liste des Parcours
            </CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex justify-between rounded-full w-10 h-10 md:w-fit md:rounded-md items-center bg-university-primary hover:bg-university-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  <div className="hidden md:block">Ajouter un Parcours</div>
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

          <Tabs defaultValue="grouped" className="">
            <TabsList className="hidden md:grid w-full grid-cols-2">
              <TabsTrigger value="grouped">Vue par Mention</TabsTrigger>
              <TabsTrigger value="table">Vue Tableau</TabsTrigger>
            </TabsList>

            <TabsContent value="grouped" className="space-y-4 hidden md:block">
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
                  <RenderPacoursCardList mention={mention} mentionParcours={mentionParcours} handleDelete={handleDelete} handleEdit={handleEdit} />
                ))
              )}
            </TabsContent>

            <TabsContent value="table" className="hidden md:block">
              <div className="rounded-md border">
                  <RenderPacoursTable filteredParcours={filteredParcours} mentions={mentions} handleEdit={handleEdit}  handleDelete={handleDelete} />
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

            <TabsContent value="grouped" className="space-y-4 md:hidden">
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
                  <RenderPacoursCardList mention={mention} mentionParcours={mentionParcours} handleDelete={handleDelete} handleEdit={handleEdit} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card> */}
    </div>
  )
}

