"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { Plus, Search, Edit, Trash2, Layers } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Type de données
interface Specialite {
  id: number
  nom: string
  description: string
  parcours: string
  mention: string
  statut: "active" | "inactive"
}

// Mock data
const mockSpecialites: Specialite[] = [
  {
    id: 1,
    nom: "Machine Learning",
    description: "Spécialité axée sur l’apprentissage automatique et l’IA",
    parcours: "Informatique",
    mention: "Sciences et Technologies",
    statut: "active",
  },
  {
    id: 2,
    nom: "Analyse Numérique",
    description: "Spécialité en mathématiques appliquées et calcul scientifique",
    parcours: "Mathématiques",
    mention: "Sciences Fondamentales",
    statut: "active",
  },
  {
    id: 3,
    nom: "Biotechnologies",
    description: "Spécialité dans les sciences du vivant et la bio-ingénierie",
    parcours: "Biologie",
    mention: "Sciences de la Vie",
    statut: "inactive",
  },
]

export function SpecialityManagement() {
  const [specialites, setSpecialites] = useState<Specialite[]>(mockSpecialites)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingSpecialite, setEditingSpecialite] = useState<Specialite | null>(null)
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    parcours: "",
    mention: "",
    statut: "active" as "active" | "inactive",
  })
  const { toast } = useToast()


  const getStatusBadge = (statut: "active" | "inactive") => {
    return (
      <Badge variant={statut === "active" ? "default" : "secondary"}>
        {statut === "active" ? "Active" : "Inactive"}
      </Badge>
    )
  }
  // Filtrage
  const filteredSpecialites = specialites.filter(
    (s) =>
      s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.parcours.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.mention.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Reset form
  const resetForm = () =>
    setFormData({
      nom: "",
      description: "",
      parcours: "",
      mention: "",
      statut: "active",
    })

  // Ajouter
  const handleAdd = () => {
    if (!formData.nom || !formData.parcours || !formData.mention) {
      toast({ title: "Erreur", description: "Champs obligatoires manquants", variant: "destructive" })
      return
    }

    const newSpecialite: Specialite = {
      id: Math.max(...specialites.map((s) => s.id)) + 1,
      ...formData,
    }

    setSpecialites([...specialites, newSpecialite])
    setIsAddDialogOpen(false)
    resetForm()
    toast({ title: "Succès", description: "Spécialité ajoutée avec succès" })
  }

  // Modifier
  const handleEdit = (specialite: Specialite) => {
    setEditingSpecialite(specialite)
    setFormData({
      nom: specialite.nom,
      description: specialite.description,
      parcours: specialite.parcours,
      mention: specialite.mention,
      statut: specialite.statut,
    })
    setIsEditDialogOpen(true)
  }

  // Mettre à jour
  const handleUpdate = () => {
    if (!formData.nom || !formData.parcours || !formData.mention || !editingSpecialite) {
      toast({ title: "Erreur", description: "Champs obligatoires manquants", variant: "destructive" })
      return
    }

    setSpecialites((prev) =>
      prev.map((s) =>
        s.id === editingSpecialite.id ? { ...editingSpecialite, ...formData } : s,
      ),
    )

    setIsEditDialogOpen(false)
    setEditingSpecialite(null)
    resetForm()
    toast({ title: "Succès", description: "Spécialité mise à jour avec succès" })
  }

  // Supprimer
  const handleDelete = (id: number) => {
    setSpecialites(specialites.filter((s) => s.id !== id))
    toast({ title: "Succès", description: "Spécialité supprimée avec succès" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Spécialités</h1>
          <p className="text-muted-foreground">Gérez les spécialités académiques</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-university-primary" />
              Liste des Spécialités
            </CardTitle>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex justify-center items-center bg-university-primary rounded-full md:items-start md:rounded-lg hover:bg-university-primary/90">
                  <Plus className="h-4 w-4" />
                  <div className="hidden md:block">Ajouter une Spécialité</div>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouvelle Spécialité</DialogTitle>
                  <DialogDescription>Remplissez les informations</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Label>Nom *</Label>
                  <Input
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  />
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <Label>Parcours *</Label>
                  <Input
                    value={formData.parcours}
                    onChange={(e) => setFormData({ ...formData, parcours: e.target.value })}
                  />
                  <Label>Mention *</Label>
                  <Input
                    value={formData.mention}
                    onChange={(e) => setFormData({ ...formData, mention: e.target.value })}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAdd} className="bg-university-primary">Ajouter</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une spécialité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>

          {/* Table Desktop */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Parcours</TableHead>
                  <TableHead>Mention</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSpecialites.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.nom}</TableCell>
                    <TableCell>{s.parcours}</TableCell>
                    <TableCell>{s.mention}</TableCell>
                    <TableCell className="truncate max-w-xs">{s.description}</TableCell>
                    <TableCell>
                      <Badge variant={s.statut === "active" ? "default" : "secondary"}>
                        {getStatusBadge(s.statut)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(s)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                            <AlertDialogDescription>
                              Supprimer {s.nom} ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(s.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {filteredSpecialites.map((s) => (
              <div key={s.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between">
                  <span className="font-bold">{s.nom}</span>
                  <Badge variant={s.statut === "active" ? "default" : "secondary"}>
                    {s.statut}
                  </Badge>
                </div>
                <div className="flex px-2 my-1 text-sm text-muted-foreground">{s.description}</div>
                <div className="flex px-2 my-1 text-sm">Parcours: {s.parcours}</div>
                <div className="flex px-2 my-1 text-sm">Mention: {s.mention}</div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground text-end">{s.description}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Mention:</span>
                    <span className="text-sm font-medium text-end overflow-auto">{s.mention}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Parcours:</span>
                    <span className="text-sm font-medium">{s.parcours}</span>
                  </div>
                </div> 
                <div className="grid grid-cols-2 gap-1 mt-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(s)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(s.id)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la Spécialité</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label>Nom *</Label>
            <Input
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            />
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <Label>Parcours *</Label>
            <Input
              value={formData.parcours}
              onChange={(e) => setFormData({ ...formData, parcours: e.target.value })}
            />
            <Label>Mention *</Label>
            <Input
              value={formData.mention}
              onChange={(e) => setFormData({ ...formData, mention: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdate} className="bg-university-primary">Mettre à jour</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
