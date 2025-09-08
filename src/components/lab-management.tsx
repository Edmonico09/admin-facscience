"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Plus, Search, Edit, Trash2, FlaskConical, X, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Mention {
  id: number
  nom: string
  code: string
}

interface Person {
  id: number
  nom: string
  prenom: string
  email: string
}

interface DescriptionItem {
  id: string
  cle: string
  valeur: string
}

interface Laboratory {
  id: number
  nom_labo: string
  mention_rattachement: number
  responsable: number
  description: DescriptionItem[]
  dateCreation: string
  nombreChercheurs: number
  statut: "active" | "inactive"
}

const mockMentions: Mention[] = [
  { id: 1, nom: "Informatique", code: "INFO" },
  { id: 2, nom: "Mathématiques", code: "MATH" },
  { id: 3, nom: "Physique", code: "PHYS" },
  { id: 4, nom: "Chimie", code: "CHIM" },
]

const mockPersons: Person[] = [
  { id: 1, nom: "Benali", prenom: "Ahmed", email: "ahmed.benali@univ.ma" },
  { id: 2, nom: "Zahra", prenom: "Fatima", email: "fatima.zahra@univ.ma" },
  { id: 3, nom: "Alami", prenom: "Mohamed", email: "mohamed.alami@univ.ma" },
  { id: 4, nom: "Bennani", prenom: "Aicha", email: "aicha.bennani@univ.ma" },
  { id: 5, nom: "Idrissi", prenom: "Omar", email: "omar.idrissi@univ.ma" },
]

const mockLaboratories: Laboratory[] = [
  {
    id: 1,
    nom_labo: "Laboratoire de Recherche en Intelligence Artificielle",
    mention_rattachement: 1,
    responsable: 1,
    description: [
      { id: "1", cle: "Mission", valeur: "Développer des solutions IA innovantes pour l'industrie et la recherche" },
      { id: "2", cle: "Domaines", valeur: "Machine Learning, Deep Learning, Computer Vision, NLP" },
      { id: "3", cle: "Équipements", valeur: "Serveurs GPU, Clusters de calcul, Laboratoire de vision" },
    ],
    dateCreation: "2020-09-01",
    nombreChercheurs: 15,
    statut: "active",
  },
  {
    id: 2,
    nom_labo: "Laboratoire de Mathématiques Appliquées",
    mention_rattachement: 2,
    responsable: 2,
    description: [
      { id: "4", cle: "Objectif", valeur: "Recherche en mathématiques appliquées aux sciences et à l'ingénierie" },
      { id: "5", cle: "Spécialités", valeur: "Analyse numérique, Optimisation, Statistiques" },
    ],
    dateCreation: "2019-09-01",
    nombreChercheurs: 12,
    statut: "active",
  },
  {
    id: 3,
    nom_labo: "Laboratoire de Physique des Matériaux",
    mention_rattachement: 3,
    responsable: 3,
    description: [
      { id: "6", cle: "Focus", valeur: "Étude des propriétés physiques des matériaux avancés" },
      { id: "7", cle: "Techniques", valeur: "Spectroscopie, Diffraction X, Microscopie électronique" },
      { id: "8", cle: "Applications", valeur: "Nanotechnologies, Énergies renouvelables, Électronique" },
    ],
    dateCreation: "2018-09-01",
    nombreChercheurs: 18,
    statut: "active",
  },
  {
    id: 4,
    nom_labo: "Laboratoire de Chimie Organique",
    mention_rattachement: 4,
    responsable: 4,
    description: [
      { id: "9", cle: "Recherche", valeur: "Synthèse et caractérisation de composés organiques" },
      { id: "10", cle: "Secteurs", valeur: "Pharmaceutique, Cosmétique, Agroalimentaire" },
    ],
    dateCreation: "2021-09-01",
    nombreChercheurs: 8,
    statut: "inactive",
  },
]

export function LabManagement() {
  const [laboratories, setLaboratories] = useState<Laboratory[]>(mockLaboratories)
  const [mentions] = useState<Mention[]>(mockMentions)
  const [persons] = useState<Person[]>(mockPersons)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMention, setSelectedMention] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingLab, setEditingLab] = useState<Laboratory | null>(null)
  const [formData, setFormData] = useState({
    nom_labo: "",
    mention_rattachement: "",
    responsable: "",
    description: [
      { id: "temp1", cle: "", valeur: "" },
      { id: "temp2", cle: "", valeur: "" },
    ] as DescriptionItem[],
  })
  const { toast } = useToast()

  const filteredLaboratories = laboratories.filter((lab) => {
    const matchesSearch =
      lab.nom_labo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentions
        .find((m) => m.id === lab.mention_rattachement)
        ?.nom.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      persons
        .find((p) => p.id === lab.responsable)
        ?.nom.toLowerCase()
        .includes(searchTerm.toLowerCase())
    const matchesMention = selectedMention === "all" || lab.mention_rattachement.toString() === selectedMention
    const matchesStatus = selectedStatus === "all" || lab.statut === selectedStatus

    return matchesSearch && matchesMention && matchesStatus
  })

  const resetForm = () => {
    setFormData({
      nom_labo: "",
      mention_rattachement: "",
      responsable: "",
      description: [
        { id: "temp1", cle: "", valeur: "" },
        { id: "temp2", cle: "", valeur: "" },
      ],
    })
  }

  const addDescriptionField = () => {
    const newField: DescriptionItem = {
      id: `temp${Date.now()}`,
      cle: "",
      valeur: "",
    }
    setFormData({
      ...formData,
      description: [...formData.description, newField],
    })
  }

  const removeDescriptionField = (id: string) => {
    if (formData.description.length <= 2) {
      toast({
        title: "Attention",
        description: "Au moins 2 champs de description sont requis",
        variant: "destructive",
      })
      return
    }
    setFormData({
      ...formData,
      description: formData.description.filter((item) => item.id !== id),
    })
  }

  const updateDescriptionField = (id: string, field: "cle" | "valeur", value: string) => {
    setFormData({
      ...formData,
      description: formData.description.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  const handleAdd = () => {
    if (!formData.nom_labo || !formData.mention_rattachement || !formData.responsable) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    // Filter out empty description fields
    const validDescriptions = formData.description.filter((item) => item.cle.trim() && item.valeur.trim())

    const newLab: Laboratory = {
      id: Math.max(...laboratories.map((l) => l.id)) + 1,
      nom_labo: formData.nom_labo,
      mention_rattachement: Number.parseInt(formData.mention_rattachement),
      responsable: Number.parseInt(formData.responsable),
      description: validDescriptions.map((item) => ({
        ...item,
        id: `desc${Date.now()}_${Math.random()}`,
      })),
      dateCreation: new Date().toISOString().split("T")[0],
      nombreChercheurs: 0,
      statut: "active",
    }

    setLaboratories([...laboratories, newLab])
    setIsAddDialogOpen(false)
    resetForm()
    toast({
      title: "Succès",
      description: "Laboratoire ajouté avec succès",
    })
  }

  const handleEdit = (lab: Laboratory) => {
    setEditingLab(lab)
    setFormData({
      nom_labo: lab.nom_labo,
      mention_rattachement: lab.mention_rattachement.toString(),
      responsable: lab.responsable.toString(),
      description:
        lab.description.length > 0
          ? [...lab.description]
          : [
              { id: "temp1", cle: "", valeur: "" },
              { id: "temp2", cle: "", valeur: "" },
            ],
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = () => {
    if (!formData.nom_labo || !formData.mention_rattachement || !formData.responsable || !editingLab) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    // Filter out empty description fields
    const validDescriptions = formData.description.filter((item) => item.cle.trim() && item.valeur.trim())

    const updatedLabs = laboratories.map((lab) =>
      lab.id === editingLab.id
        ? {
            ...lab,
            nom_labo: formData.nom_labo,
            mention_rattachement: Number.parseInt(formData.mention_rattachement),
            responsable: Number.parseInt(formData.responsable),
            description: validDescriptions,
          }
        : lab,
    )

    setLaboratories(updatedLabs)
    setIsEditDialogOpen(false)
    setEditingLab(null)
    resetForm()
    toast({
      title: "Succès",
      description: "Laboratoire mis à jour avec succès",
    })
  }

  const handleDelete = (id: number) => {
    setLaboratories(laboratories.filter((lab) => lab.id !== id))
    toast({
      title: "Succès",
      description: "Laboratoire supprimé avec succès",
    })
  }

  const getStatusBadge = (statut: "active" | "inactive") => {
    return (
      <Badge variant={statut === "active" ? "default" : "secondary"}>{statut === "active" ? "Actif" : "Inactif"}</Badge>
    )
  }

  const getMentionName = (mentionId: number) => {
    const mention = mentions.find((m) => m.id === mentionId)
    return mention ? `${mention.nom} (${mention.code})` : "Inconnue"
  }

  const getPersonName = (personId: number) => {
    const person = persons.find((p) => p.id === personId)
    return person ? `${person.prenom} ${person.nom}` : "Inconnu"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Laboratoires</h1>
          <p className="text-muted-foreground">Gérer les laboratoires de recherche de l'université</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-university-primary">{laboratories.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {laboratories.filter((l) => l.statut === "active").length}
            </div>
            <div className="text-xs text-muted-foreground">Actifs</div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-university-primary" />
              Liste des Laboratoires
            </CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-university-primary hover:bg-university-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un Laboratoire
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Ajouter un Nouveau Laboratoire</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations pour créer un nouveau laboratoire de recherche.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nom">Nom du laboratoire *</Label>
                    <Input
                      id="nom"
                      value={formData.nom_labo}
                      onChange={(e) => setFormData({ ...formData, nom_labo: e.target.value })}
                      placeholder="Ex: Laboratoire de Recherche en Intelligence Artificielle"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="mention">Mention de rattachement *</Label>
                      <Select
                        value={formData.mention_rattachement}
                        onValueChange={(value) => setFormData({ ...formData, mention_rattachement: value })}
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
                    <div className="grid gap-2">
                      <Label htmlFor="responsable">Responsable *</Label>
                      <Select
                        value={formData.responsable}
                        onValueChange={(value) => setFormData({ ...formData, responsable: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un responsable" />
                        </SelectTrigger>
                        <SelectContent>
                          {persons.map((person) => (
                            <SelectItem key={person.id} value={person.id.toString()}>
                              {person.prenom} {person.nom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label>Description (Clé-Valeur)</Label>
                      <Button type="button" variant="outline" size="sm" onClick={addDescriptionField}>
                        <Plus className="h-4 w-4 mr-1" />
                        Ajouter
                      </Button>
                    </div>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {formData.description.map((item) => (
                        <div key={item.id} className="flex gap-2 items-start">
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Clé (ex: Mission)"
                              value={item.cle}
                              onChange={(e) => updateDescriptionField(item.id, "cle", e.target.value)}
                            />
                            <Input
                              placeholder="Valeur (ex: Recherche en IA)"
                              value={item.valeur}
                              onChange={(e) => updateDescriptionField(item.id, "valeur", e.target.value)}
                            />
                          </div>
                          {formData.description.length > 2 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeDescriptionField(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
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
                placeholder="Rechercher un laboratoire..."
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
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Tous statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous statuts</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="inactive">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredLaboratories.length === 0 ? (
              <div className="text-center py-8">
                <FlaskConical className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm || selectedMention !== "all" || selectedStatus !== "all"
                    ? "Aucun laboratoire trouvé pour les filtres sélectionnés"
                    : "Aucun laboratoire disponible"}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredLaboratories.map((lab) => (
                  <Card key={lab.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-university-primary mb-2">{lab.nom_labo}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <FlaskConical className="h-4 w-4" />
                              <span>{getMentionName(lab.mention_rattachement)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{getPersonName(lab.responsable)}</span>
                            </div>
                            <Badge variant="outline">{lab.nombreChercheurs} chercheurs</Badge>
                            {getStatusBadge(lab.statut)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(lab)}>
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
                                  Êtes-vous sûr de vouloir supprimer le laboratoire "{lab.nom_labo}" ? Cette action est
                                  irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(lab.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {lab.description.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-foreground">Informations détaillées</h4>
                          <div className="grid gap-2">
                            {lab.description.map((desc) => (
                              <div key={desc.id} className="flex gap-3 text-sm">
                                <span className="font-medium text-university-primary min-w-[100px]">{desc.cle}:</span>
                                <span className="text-muted-foreground flex-1">{desc.valeur}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                        <span>Créé le {new Date(lab.dateCreation).toLocaleDateString("fr-FR")}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le Laboratoire</DialogTitle>
            <DialogDescription>Modifiez les informations du laboratoire sélectionné.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-nom">Nom du laboratoire *</Label>
              <Input
                id="edit-nom"
                value={formData.nom_labo}
                onChange={(e) => setFormData({ ...formData, nom_labo: e.target.value })}
                placeholder="Ex: Laboratoire de Recherche en Intelligence Artificielle"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-mention">Mention de rattachement *</Label>
                <Select
                  value={formData.mention_rattachement}
                  onValueChange={(value) => setFormData({ ...formData, mention_rattachement: value })}
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
              <div className="grid gap-2">
                <Label htmlFor="edit-responsable">Responsable *</Label>
                <Select
                  value={formData.responsable}
                  onValueChange={(value) => setFormData({ ...formData, responsable: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un responsable" />
                  </SelectTrigger>
                  <SelectContent>
                    {persons.map((person) => (
                      <SelectItem key={person.id} value={person.id.toString()}>
                        {person.prenom} {person.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Description (Clé-Valeur)</Label>
                <Button type="button" variant="outline" size="sm" onClick={addDescriptionField}>
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter
                </Button>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {formData.description.map((item) => (
                  <div key={item.id} className="flex gap-2 items-start">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Clé (ex: Mission)"
                        value={item.cle}
                        onChange={(e) => updateDescriptionField(item.id, "cle", e.target.value)}
                      />
                      <Input
                        placeholder="Valeur (ex: Recherche en IA)"
                        value={item.valeur}
                        onChange={(e) => updateDescriptionField(item.id, "valeur", e.target.value)}
                      />
                    </div>
                    {formData.description.length > 2 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeDescriptionField(item.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
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
