"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { useToast } from "@/hooks/use-toast";
import { Mention } from "@/services/types/mention"
import { useMention } from "@/hooks/useMention"

export function MentionManagement() {
  const {mentions, createMention, updateMention, removeMention} = useMention();
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingMention, setEditingMention] = useState<Mention | null>(null)
  const [formData, setFormData] = useState({
    nom_mention: "",
    description_mention: "",
    abbreviation: "",
  })
  const { toast } = useToast()

  const filteredMentions = mentions.filter(
    (mention) =>
      mention.nom_mention.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mention.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mention.description_mention?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const resetForm = () => {
    setFormData({
      nom_mention: "",
      description_mention: "",
      abbreviation: "",
    })
  }

  const handleAdd = async () => {
    if (!formData.nom_mention || !formData.abbreviation || !formData.description_mention) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newMention: Mention = {
      nom_mention: formData.nom_mention,
      description_mention: formData.description_mention,
      abbreviation: formData.abbreviation.toUpperCase(),
    }

    await createMention(newMention)
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
      nom_mention: mention.nom_mention,
      description_mention: mention.description_mention||"",
      abbreviation: mention.abbreviation,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async() => {
    if (!formData.nom_mention || !formData.abbreviation || !formData.description_mention || !editingMention) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    await updateMention(editingMention.id_mention||0, formData)
    setIsEditDialogOpen(false)
    setEditingMention(null)
    resetForm()
    toast({
      title: "Succès",
      description: "Mention mise à jour avec succès",
    })
  }

  const handleDelete = async (id: number) => {
    await removeMention(id)
    toast({
      title: "Succès",
      description: "Mention supprimée avec succès",
    })
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
                      value={formData.nom_mention}
                      onChange={(e) => setFormData({ ...formData, nom_mention: e.target.value })}
                      placeholder="Ex: Informatique"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="abbreviation">Abbreviation *</Label>
                    <Input
                      id="abbreviation"
                      value={formData.abbreviation}
                      onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value })}
                      placeholder="Ex: INFO"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description_mention}
                      onChange={(e) => setFormData({ ...formData, description_mention: e.target.value })}
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
                  <TableHead>abbreviation</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMentions.map((mention) => (
                  <TableRow key={mention.id_mention}>
                    <TableCell className="font-medium">{mention.abbreviation}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{mention.nom_mention}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">{mention.description_mention}</div>
                      </div>
                    </TableCell>
                    <TableCell>{mention.description_mention}</TableCell>
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
                                Êtes-vous sûr de vouloir supprimer la mention "{mention.nom_mention}" ? Cette action est
                                irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(mention.id_mention||0)}
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
              <div key={mention.id_mention} className="bg-card border rounded-lg p-4 shadow-sm">
                {/* Header de la carte avec abbreviation et statut */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                      {mention.abbreviation}
                    </span>
                    {/* {getStatusBadge(mention.statut)} */}
                  </div>
                </div>
                
                {/* nom_mention et description */}
                <div className="mb-4">
                  <h3 className="font-semibold text-base mb-1">{mention.nom_mention}</h3>
                  {mention.description_mention && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {mention.description_mention}
                    </p>
                  )}
                </div>

                {/* Informations principales */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">description_mention:</span>
                    <span className="text-sm font-medium">{mention.description_mention}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Parcours:</span>
                    {/* <Badge variant="outline" className="text-xs">{mention.nombreParcours}</Badge> */}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Date création:</span>
                    {/* <span className="text-sm">{new Date(mention.dateCreation).toLocaleDateString("fr-FR")}</span> */}
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
                          Êtes-vous sûr de vouloir supprimer la mention "{mention.nom_mention}" ? Cette action est
                          irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="w-full sm:w-auto">Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(mention.id_mention||0)}
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
                value={formData.nom_mention}
                onChange={(e) => setFormData({ ...formData, nom_mention: e.target.value })}
                placeholder="Ex: Informatique"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-abbreviation">Abbreviation *</Label>
              <Input
                id="edit-abbreviation"
                value={formData.abbreviation}
                onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value })}
                placeholder="Ex: INFO"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description_mention}
                onChange={(e) => setFormData({ ...formData, description_mention: e.target.value })}
                placeholder="description_mention de la mention..."
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
