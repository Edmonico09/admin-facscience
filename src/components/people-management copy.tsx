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
import { Plus, Search, Edit, Trash2, Users, Mail, Phone, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type PersonType = "PAT" | "Professeur" | "COFAC" | "Tete"

interface Person {
  id: number
  nom: string
  prenom: string
  email: string
  tel: string
  type: PersonType
  dateCreation: string
  statut: "active" | "inactive"
  // Specific fields
  postAffectation?: string
  grade?: string
  fonction?: string
  titre?: string
  appartenance?: string
  responsabilite?: string
}

interface SelectOptions {
  postAffectations: string[]
  grades: string[]
  fonctions: string[]
  titres: string[]
  appartenances: string[]
  responsabilites: string[]
}

const mockSelectOptions: SelectOptions = {
  postAffectations: ["Secrétariat", "Bibliothèque", "Laboratoire", "Administration", "Maintenance"],
  grades: ["Grade A", "Grade B", "Grade C", "Grade D"],
  fonctions: ["Secrétaire", "Technicien", "Assistant", "Responsable", "Coordinateur"],
  titres: ["Professeur", "Maître de Conférences", "Professeur Associé", "Professeur Émérite"],
  appartenances: ["Conseil Scientifique", "Conseil Pédagogique", "Commission Recherche", "Commission Formation"],
  responsabilites: ["Doyen", "Vice-Doyen", "Directeur des Études", "Directeur de la Recherche", "Secrétaire Général"],
}

const mockPeople: Person[] = [
  {
    id: 1,
    nom: "Benali",
    prenom: "Ahmed",
    email: "ahmed.benali@univ.ma",
    tel: "+212 6 12 34 56 78",
    type: "Professeur",
    dateCreation: "2020-09-01",
    statut: "active",
    titre: "Professeur",
  },
  {
    id: 2,
    nom: "Zahra",
    prenom: "Fatima",
    email: "fatima.zahra@univ.ma",
    tel: "+212 6 23 45 67 89",
    type: "Professeur",
    dateCreation: "2019-09-01",
    statut: "active",
    titre: "Maître de Conférences",
  },
  {
    id: 3,
    nom: "Alami",
    prenom: "Mohamed",
    email: "mohamed.alami@univ.ma",
    tel: "+212 6 34 56 78 90",
    type: "Tete",
    dateCreation: "2018-09-01",
    statut: "active",
    responsabilite: "Doyen",
  },
  {
    id: 4,
    nom: "Bennani",
    prenom: "Aicha",
    email: "aicha.bennani@univ.ma",
    tel: "+212 6 45 67 89 01",
    type: "COFAC",
    dateCreation: "2021-09-01",
    statut: "active",
    appartenance: "Conseil Scientifique",
  },
  {
    id: 5,
    nom: "Idrissi",
    prenom: "Omar",
    email: "omar.idrissi@univ.ma",
    tel: "+212 6 56 78 90 12",
    type: "PAT",
    dateCreation: "2020-03-15",
    statut: "active",
    postAffectation: "Secrétariat",
    grade: "Grade B",
    fonction: "Secrétaire",
  },
]

export function PeopleManagement() {
  const [people, setPeople] = useState<Person[]>(mockPeople)
  const [selectOptions, setSelectOptions] = useState<SelectOptions>(mockSelectOptions)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<PersonType>("PAT")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddOptionDialogOpen, setIsAddOptionDialogOpen] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const [addOptionType, setAddOptionType] = useState<keyof SelectOptions>("postAffectations")
  const [newOptionValue, setNewOptionValue] = useState("")
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    type: "PAT" as PersonType,
    postAffectation: "",
    grade: "",
    fonction: "",
    titre: "",
    appartenance: "",
    responsabilite: "",
  })
  const { toast } = useToast()

  const filteredPeople = people.filter((person) => {
    const matchesSearch =
      person.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = person.type === activeTab
    return matchesSearch && matchesTab
  })

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      tel: "",
      type: activeTab,
      postAffectation: "",
      grade: "",
      fonction: "",
      titre: "",
      appartenance: "",
      responsabilite: "",
    })
  }

  const handleAddOption = () => {
    if (!newOptionValue.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir une valeur",
        variant: "destructive",
      })
      return
    }

    setSelectOptions({
      ...selectOptions,
      [addOptionType]: [...selectOptions[addOptionType], newOptionValue.trim()],
    })

    setNewOptionValue("")
    setIsAddOptionDialogOpen(false)
    toast({
      title: "Succès",
      description: "Option ajoutée avec succès",
    })
  }

  const openAddOptionDialog = (optionType: keyof SelectOptions) => {
    setAddOptionType(optionType)
    setIsAddOptionDialogOpen(true)
  }

  const handleAdd = () => {
    if (!formData.nom || !formData.prenom || !formData.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newPerson: Person = {
      id: Math.max(...people.map((p) => p.id)) + 1,
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      tel: formData.tel,
      type: formData.type,
      dateCreation: new Date().toISOString().split("T")[0],
      statut: "active",
      ...(formData.type === "PAT" && {
        postAffectation: formData.postAffectation,
        grade: formData.grade,
        fonction: formData.fonction,
      }),
      ...(formData.type === "Professeur" && {
        titre: formData.titre,
      }),
      ...(formData.type === "COFAC" && {
        appartenance: formData.appartenance,
      }),
      ...(formData.type === "Tete" && {
        responsabilite: formData.responsabilite,
      }),
    }

    setPeople([...people, newPerson])
    setIsAddDialogOpen(false)
    resetForm()
    toast({
      title: "Succès",
      description: "Personne ajoutée avec succès",
    })
  }

  const handleEdit = (person: Person) => {
    setEditingPerson(person)
    setFormData({
      nom: person.nom,
      prenom: person.prenom,
      email: person.email,
      tel: person.tel,
      type: person.type,
      postAffectation: person.postAffectation || "",
      grade: person.grade || "",
      fonction: person.fonction || "",
      titre: person.titre || "",
      appartenance: person.appartenance || "",
      responsabilite: person.responsabilite || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = () => {
    if (!formData.nom || !formData.prenom || !formData.email || !editingPerson) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const updatedPeople = people.map((person) =>
      person.id === editingPerson.id
        ? {
            ...person,
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            tel: formData.tel,
            type: formData.type,
            ...(formData.type === "PAT" && {
              postAffectation: formData.postAffectation,
              grade: formData.grade,
              fonction: formData.fonction,
              titre: undefined,
              appartenance: undefined,
              responsabilite: undefined,
            }),
            ...(formData.type === "Professeur" && {
              titre: formData.titre,
              postAffectation: undefined,
              grade: undefined,
              fonction: undefined,
              appartenance: undefined,
              responsabilite: undefined,
            }),
            ...(formData.type === "COFAC" && {
              appartenance: formData.appartenance,
              postAffectation: undefined,
              grade: undefined,
              fonction: undefined,
              titre: undefined,
              responsabilite: undefined,
            }),
            ...(formData.type === "Tete" && {
              responsabilite: formData.responsabilite,
              postAffectation: undefined,
              grade: undefined,
              fonction: undefined,
              titre: undefined,
              appartenance: undefined,
            }),
          }
        : person,
    )

    setPeople(updatedPeople)
    setIsEditDialogOpen(false)
    setEditingPerson(null)
    resetForm()
    toast({
      title: "Succès",
      description: "Personne mise à jour avec succès",
    })
  }

  const handleDelete = (id: number) => {
    setPeople(people.filter((person) => person.id !== id))
    toast({
      title: "Succès",
      description: "Personne supprimée avec succès",
    })
  }

  const getPersonTypeBadge = (type: PersonType) => {
    const colors = {
      PAT: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Professeur: "bg-university-primary/10 text-university-primary",
      COFAC: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Tete: "bg-university-secondary/10 text-university-secondary",
    }
    return <Badge className={colors[type]}>{type}</Badge>
  }

  const getSpecificInfo = (person: Person) => {
    switch (person.type) {
      case "PAT":
        return (
          <div className="text-xs text-muted-foreground space-y-1">
            {person.postAffectation && <div>Poste: {person.postAffectation}</div>}
            {person.grade && <div>Grade: {person.grade}</div>}
            {person.fonction && <div>Fonction: {person.fonction}</div>}
          </div>
        )
      case "Professeur":
        return <div className="text-xs text-muted-foreground">{person.titre && <div>Titre: {person.titre}</div>}</div>
      case "COFAC":
        return (
          <div className="text-xs text-muted-foreground">
            {person.appartenance && <div>Appartenance: {person.appartenance}</div>}
          </div>
        )
      case "Tete":
        return (
          <div className="text-xs text-muted-foreground">
            {person.responsabilite && <div>Responsabilité: {person.responsabilite}</div>}
          </div>
        )
      default:
        return null
    }
  }

  const renderSpecificFields = (isEdit = false) => {
    const prefix = isEdit ? "edit-" : ""

    switch (formData.type) {
      case "PAT":
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor={`${prefix}post`}>Post d'affectation</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.postAffectation}
                  onValueChange={(value) => setFormData({ ...formData, postAffectation: value })}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Sélectionner un poste" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectOptions.postAffectations.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => openAddOptionDialog("postAffectations")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`${prefix}grade`}>Grade</Label>
                <div className="flex gap-2">
                  <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Sélectionner un grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectOptions.grades.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="outline" size="sm" onClick={() => openAddOptionDialog("grades")}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${prefix}fonction`}>Fonction</Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.fonction}
                    onValueChange={(value) => setFormData({ ...formData, fonction: value })}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Sélectionner une fonction" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectOptions.fonctions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="outline" size="sm" onClick={() => openAddOptionDialog("fonctions")}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )
      case "Professeur":
        return (
          <div className="grid gap-2">
            <Label htmlFor={`${prefix}titre`}>Titre</Label>
            <div className="flex gap-2">
              <Select value={formData.titre} onValueChange={(value) => setFormData({ ...formData, titre: value })}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sélectionner un titre" />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.titres.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" size="sm" onClick={() => openAddOptionDialog("titres")}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      case "COFAC":
        return (
          <div className="grid gap-2">
            <Label htmlFor={`${prefix}appartenance`}>Appartenance</Label>
            <div className="flex gap-2">
              <Select
                value={formData.appartenance}
                onValueChange={(value) => setFormData({ ...formData, appartenance: value })}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sélectionner une appartenance" />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.appartenances.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" size="sm" onClick={() => openAddOptionDialog("appartenances")}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      case "Tete":
        return (
          <div className="grid gap-2">
            <Label htmlFor={`${prefix}responsabilite`}>Responsabilité</Label>
            <div className="flex gap-2">
              <Select
                value={formData.responsabilite}
                onValueChange={(value) => setFormData({ ...formData, responsabilite: value })}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Sélectionner une responsabilité" />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.responsabilites.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" size="sm" onClick={() => openAddOptionDialog("responsabilites")}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const getTabCounts = () => {
    return {
      PAT: people.filter((p) => p.type === "PAT").length,
      Professeur: people.filter((p) => p.type === "Professeur").length,
      COFAC: people.filter((p) => p.type === "COFAC").length,
      Tete: people.filter((p) => p.type === "Tete").length,
    }
  }

  const tabCounts = getTabCounts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Personnes</h1>
          <p className="text-muted-foreground">Gérer le personnel universitaire par catégorie</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-university-primary">{people.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {people.filter((p) => p.statut === "active").length}
            </div>
            <div className="text-xs text-muted-foreground">Actifs</div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-university-primary" />
              Personnel Universitaire
            </CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-university-primary hover:bg-university-primary/90"
                  onClick={() => setFormData({ ...formData, type: activeTab })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter {activeTab}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Ajouter une Nouvelle Personne</DialogTitle>
                  <DialogDescription>Remplissez les informations pour ajouter une personne.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        placeholder="Nom de famille"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        placeholder="Prénom"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@univ.ma"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tel">Téléphone</Label>
                    <Input
                      id="tel"
                      value={formData.tel}
                      onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                      placeholder="+212 6 12 34 56 78"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: PersonType) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PAT">PAT</SelectItem>
                        <SelectItem value="Professeur">Professeur</SelectItem>
                        <SelectItem value="COFAC">COFAC</SelectItem>
                        <SelectItem value="Tete">Tête de la Fac</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {renderSpecificFields()}
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
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher une personne..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as PersonType)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="PAT" className="flex items-center gap-2">
                PAT
                <Badge variant="secondary" className="text-xs">
                  {tabCounts.PAT}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="Professeur" className="flex items-center gap-2">
                Professeur
                <Badge variant="secondary" className="text-xs">
                  {tabCounts.Professeur}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="COFAC" className="flex items-center gap-2">
                COFAC
                <Badge variant="secondary" className="text-xs">
                  {tabCounts.COFAC}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="Tete" className="flex items-center gap-2">
                Tête
                <Badge variant="secondary" className="text-xs">
                  {tabCounts.Tete}
                </Badge>
              </TabsTrigger>
            </TabsList>

            {(["PAT", "Professeur", "COFAC", "Tete"] as PersonType[]).map((tabType) => (
              <TabsContent key={tabType} value={tabType} className="space-y-4">
                {filteredPeople.length === 0 ? (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {searchTerm
                        ? `Aucune personne trouvée pour "${searchTerm}"`
                        : `Aucune personne de type ${tabType} disponible`}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Informations spécifiques</TableHead>
                          <TableHead>Date création</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPeople.map((person) => (
                          <TableRow key={person.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">
                                  {person.prenom} {person.nom}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm">
                                  <Mail className="h-3 w-3" />
                                  <span>{person.email}</span>
                                </div>
                                {person.tel && (
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Phone className="h-3 w-3" />
                                    <span>{person.tel}</span>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{getPersonTypeBadge(person.type)}</TableCell>
                            <TableCell>{getSpecificInfo(person)}</TableCell>
                            <TableCell>{new Date(person.dateCreation).toLocaleDateString("fr-FR")}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleEdit(person)}>
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
                                        Êtes-vous sûr de vouloir supprimer "{person.prenom} {person.nom}" ? Cette action
                                        est irréversible.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDelete(person.id)}
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
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier la Personne</DialogTitle>
            <DialogDescription>Modifiez les informations de la personne sélectionnée.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-nom">Nom *</Label>
                <Input
                  id="edit-nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="Nom de famille"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-prenom">Prénom *</Label>
                <Input
                  id="edit-prenom"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  placeholder="Prénom"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@univ.ma"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-tel">Téléphone</Label>
              <Input
                id="edit-tel"
                value={formData.tel}
                onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                placeholder="+212 6 12 34 56 78"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: PersonType) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAT">PAT</SelectItem>
                  <SelectItem value="Professeur">Professeur</SelectItem>
                  <SelectItem value="COFAC">COFAC</SelectItem>
                  <SelectItem value="Tete">Tête de la Fac</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {renderSpecificFields(true)}
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

      <Dialog open={isAddOptionDialogOpen} onOpenChange={setIsAddOptionDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Ajouter une Option</DialogTitle>
            <DialogDescription>Ajoutez une nouvelle option à la liste de sélection.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-option">Nouvelle valeur</Label>
              <Input
                id="new-option"
                value={newOptionValue}
                onChange={(e) => setNewOptionValue(e.target.value)}
                placeholder="Saisir la nouvelle valeur"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOptionDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddOption} className="bg-university-primary hover:bg-university-primary/90">
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
