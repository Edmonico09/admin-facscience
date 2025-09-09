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
import { Plus, Search, Edit, Trash2, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Mention {
  id: number
  nom: string
  description: string
  code: string
  responsable: string
  dateCreation: string
  nombreParcours: number
  statut: "active" | "inactive"
}

const mockMentions: Mention[] = [
  {
    id: 1,
    nom: "Informatique",
    description: "Formation en sciences informatiques et technologies de l'information",
    code: "INFO",
    responsable: "Dr. Ahmed Benali",
    dateCreation: "2020-09-01",
    nombreParcours: 8,
    statut: "active",
  },
  {
    id: 2,
    nom: "Mathématiques",
    description: "Formation en mathématiques pures et appliquées",
    code: "MATH",
    responsable: "Prof. Fatima Zahra",
    dateCreation: "2019-09-01",
    nombreParcours: 5,
    statut: "active",
  },
  {
    id: 3,
    nom: "Physique",
    description: "Formation en physique théorique et expérimentale",
    code: "PHYS",
    responsable: "Dr. Mohamed Alami",
    dateCreation: "2018-09-01",
    nombreParcours: 6,
    statut: "active",
  },
  {
    id: 4,
    nom: "Chimie",
    description: "Formation en chimie générale et spécialisée",
    code: "CHIM",
    responsable: "Prof. Aicha Bennani",
    dateCreation: "2021-09-01",
    nombreParcours: 4,
    statut: "inactive",
  },
]

export function MentionManagement() {
  const [mentions, setMentions] = useState<Mention[]>(mockMentions)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingMention, setEditingMention] = useState<Mention | null>(null)
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    code: "",
    responsable: "",
    statut: "active" as "active" | "inactive",
  })
  const { toast } = useToast()

  const filteredMentions = mentions.filter(
    (mention) =>
      mention.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mention.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mention.responsable.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const resetForm = () => {
    setFormData({
      nom: "",
      description: "",
      code: "",
      responsable: "",
      statut: "active",
    })
  }

  const handleAdd = () => {
    if (!formData.nom || !formData.code || !formData.responsable) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newMention: Mention = {
      id: Math.max(...mentions.map((m) => m.id)) + 1,
      nom: formData.nom,
      description: formData.description,
      code: formData.code.toUpperCase(),
      responsable: formData.responsable,
      dateCreation: new Date().toISOString().split("T")[0],
      nombreParcours: 0,
      statut: formData.statut,
    }

    setMentions([...mentions, newMention])
    setIsAddDialogOpen(false)
    resetForm()
    toast({
      title: "Succès",
      description: "Mention ajoutée avec succès",
    })
  }

  const handleEdit = (mention: Mention) => {
    setEditingMention(mention)
    setFormData({
      nom: mention.nom,
      description: mention.description,
      code: mention.code,
      responsable: mention.responsable,
      statut: mention.statut,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = () => {
    if (!formData.nom || !formData.code || !formData.responsable || !editingMention) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const updatedMentions = mentions.map((mention) =>
      mention.id === editingMention.id
        ? {
            ...mention,
            nom: formData.nom,
            description: formData.description,
            code: formData.code.toUpperCase(),
            responsable: formData.responsable,
            statut: formData.statut,
          }
        : mention,
    )

    setMentions(updatedMentions)
    setIsEditDialogOpen(false)
    setEditingMention(null)
    resetForm()
    toast({
      title: "Succès",
      description: "Mention mise à jour avec succès",
    })
  }

  const handleDelete = (id: number) => {
    setMentions(mentions.filter((mention) => mention.id !== id))
    toast({
      title: "Succès",
      description: "Mention supprimée avec succès",
    })
  }

  const getStatusBadge = (statut: "active" | "inactive") => {
    return (
      <Badge variant={statut === "active" ? "default" : "secondary"}>
        {statut === "active" ? "Active" : "Inactive"}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Mentions</h1>
          <p className="text-muted-foreground">Gérer les mentions académiques de l'université</p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-university-primary">{mentions.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {mentions.filter((m) => m.statut === "active").length}
            </div>
            <div className="text-xs text-muted-foreground">Actives</div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-university-primary" />
              Liste des Mentions
            </CardTitle>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex justify-between rounded-full w-10 h-10 md:w-fit md:rounded-md items-center bg-university-primary hover:bg-university-primary/90">
                  <Plus className="h-4 w-4" />
                  <div className="hidden md:block">Ajouter une Mention</div>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Ajouter une Nouvelle Mention</DialogTitle>
                  <DialogDescription>
                    Remplissez les informations pour créer une nouvelle mention académique.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nom">Nom de la mention *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      placeholder="Ex: Informatique"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="code">Code *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="Ex: INFO"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="responsable">Responsable *</Label>
                    <Input
                      id="responsable"
                      value={formData.responsable}
                      onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
                      placeholder="Ex: Dr. Ahmed Benali"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Description de la mention..."
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
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher une mention..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Version Desktop - Table */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Parcours</TableHead>
                  <TableHead>Date Création</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMentions.map((mention) => (
                  <TableRow key={mention.id}>
                    <TableCell className="font-medium">{mention.code}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{mention.nom}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">{mention.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{mention.responsable}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{mention.nombreParcours}</Badge>
                    </TableCell>
                    <TableCell>{new Date(mention.dateCreation).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell>{getStatusBadge(mention.statut)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(mention)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500 font-bold" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer la mention "{mention.nom}" ? Cette action est
                                irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(mention.id)}
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

          {/* Version Mobile - Cards */}
          <div className="md:hidden space-y-4">
            {filteredMentions.map((mention) => (
              <div key={mention.id} className="bg-card border rounded-lg p-4 shadow-sm">
                {/* Header de la carte avec code et statut */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                      {mention.code}
                    </span>
                    {getStatusBadge(mention.statut)}
                  </div>
                </div>
                
                {/* Nom et description */}
                <div className="mb-4">
                  <h3 className="font-semibold text-base mb-1">{mention.nom}</h3>
                  {mention.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {mention.description}
                    </p>
                  )}
                </div>

                {/* Informations principales */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Responsable:</span>
                    <span className="text-sm font-medium">{mention.responsable}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Parcours:</span>
                    <Badge variant="outline" className="text-xs">{mention.nombreParcours}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Date création:</span>
                    <span className="text-sm">{new Date(mention.dateCreation).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(mention)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger className="text-red-500" asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[90vw] max-w-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir supprimer la mention "{mention.nom}" ? Cette action est
                          irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="w-full sm:w-auto">Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(mention.id)}
                          className="bg-destructive hover:bg-destructive/90 w-full sm:w-auto"
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

          {filteredMentions.length === 0 && (
            <div className="text-center py-8">
              <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm ? "Aucune mention trouvée pour votre recherche" : "Aucune mention disponible"}
              </p>
            </div>
          )}
        </CardContent>

      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier la Mention</DialogTitle>
            <DialogDescription>Modifiez les informations de la mention sélectionnée.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-nom">Nom de la mention *</Label>
              <Input
                id="edit-nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                placeholder="Ex: Informatique"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-code">Code *</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Ex: INFO"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-responsable">Responsable *</Label>
              <Input
                id="edit-responsable"
                value={formData.responsable}
                onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
                placeholder="Ex: Dr. Ahmed Benali"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description de la mention..."
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
