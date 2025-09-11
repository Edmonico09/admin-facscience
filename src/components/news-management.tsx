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
import { Plus, Search, Edit, Trash2, Newspaper, Calendar, MapPin, ImageIcon, X, Tag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Actuality } from "@/services/types/event"
import { 
  createCategory, 
  createMedia, 
  // createNews, 
  deleteMedia, 
  // deleteNews, 
  // getCategory, 
  // getNews, 
  updateNews, 
  updateStatus 
} from "@/services/api/event.api"
import { useActuality } from "@/hooks/useActuality"
import { Category } from "@/services/types/category"

// interface MediaFile {
//   id: string
//   type: "image" | "video"
//   url: string
//   name: string
// }

// interface News {
//   id: number
//   titre: string
//   categorie: number
//   description: string
//   contenu: string
//   date_commencement: string
//   date_fin: string | null
//   lieu: string
//   date_creation: string
//   auteur: string
//   statut: "draft" | "published" | "archived"
//   medias: MediaFile[]
// }

export function NewsManagement() {

  const {actualities, addActuality, removeActuality} = useActuality();

  const [categories, setCategories] = useState<Category[]>([])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<Actuality | null>(null)
  const [formData, setFormData] = useState<Actuality>({
      titre: "" ,          
      categorie: "" ,         
      description: undefined ,          
      contenu: undefined ,          
      date_creation: undefined,      
      date_update: undefined,       
      date_commencement: undefined,      
      date_fin: undefined,               
      lieu: undefined,    
      statut:"",
      medias: []             

  })
  const [categoryForm, setCategoryForm] = useState({
    nom: "",
  })
  const { toast } = useToast()

  const filteredNews = actualities.filter((a: Actuality) => {
    const matchesSearch =
      a.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.lieu?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || a.categorie.toString() === selectedCategory
    const matchesStatus = selectedStatus === "all" || a.statut === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const resetForm = () => {
    setFormData({
     titre: "" ,          
      categorie: "" ,         
      description: undefined ,          
      contenu: undefined ,          
      date_creation: undefined,      
      date_update: undefined,       
      date_commencement: undefined,      
      date_fin: undefined,               
      lieu: undefined,    
      statut:"",
      medias: []        
    })
  }

  const handleAddCategory = async () => {
    if (!categoryForm.nom) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un nom pour la catégorie",
        variant: "destructive",
      })
      return
    }

    try{
      const newCategory =  await createCategory(categoryForm.nom);
    
      setCategories([...categories, newCategory])
      setCategoryForm({ nom: ""})
      setIsCategoryDialogOpen(false)
      toast({
        title: "Succès",
        description: "Catégorie ajoutée avec succès",
      })
    } catch(err){
      toast({
         title: "Erreur",
        description: (err as Error).message,
        variant: "destructive",
      })
    }



  }

  const handleAddMedia = async (file : File) => {
    try {
      if(!editingNews?.id_actuality){
        throw new Error("Aucune actualité sélectionnée pour uploader un média");
      }
      const newMedia = await createMedia(editingNews.id_actuality , file);
  
  
      setFormData({
        ...formData,
        medias: [...formData?.medias || [], newMedia],
      })

      toast({
        title: "Succés",
        description : "Média ajouté avec succés",
      })
    }catch(err){
       toast({
        title: "Erreur",
        description : (err as Error).message,
        variant : "destructive"
      })
    }

  }

  const handleRemoveMedia = async (mediaId: number) => {
  try {
    if (!editingNews?.id_actuality) {
      throw new Error("Aucune actualité sélectionnée");
    }

    await deleteMedia(editingNews.id_actuality, mediaId);

    setFormData({
      ...formData,
      medias: formData?.medias?.filter((m) => m.id !== mediaId),
    });

    toast({
      title: "Succès",
      description: "Média supprimé avec succès",
    });
  } catch (err) {
    toast({
      title: "Erreur",
      description: (err as Error).message,
      variant: "destructive",
    });
  }
};


const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0]
    const uploadedMedia = await createMedia(editingNews?.id_actuality ?? 0, file)
    setFormData({
      ...formData,
      medias: [...formData?.medias || [], uploadedMedia],
    })
  }
}

  const handleAdd = async () => {
    if (
      !formData.titre ||
      !formData.categorie ||
      !formData.description ||
      !formData.contenu ||
      !formData.date_commencement
    ) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newNews: Actuality = {
      titre: formData.titre,
      categorie: formData.categorie,
      description: formData.description,
      contenu: formData.contenu,
      date_commencement: formData.date_commencement,
      date_fin: formData.date_fin,
      lieu: formData.lieu,
      date_creation: formData.date_creation,
      statut: "draft",
      medias: formData.medias,
    }

    await addActuality(newNews);
    setIsAddDialogOpen(false)
    resetForm()
    toast({
      title: "Succès",
      description: "Actualité ajoutée avec succès",
    })
  }

  const handleEdit = (n: Actuality) => {
    setEditingNews(n)
    setFormData({
      titre: n.titre,
      categorie: n.categorie,
      description: n.description,
      contenu: n.contenu,
      date_commencement: n.date_commencement,
      date_fin: n.date_fin || undefined,
      lieu: n.lieu,
      statut:n.statut,
      medias: n.medias ? [...n.medias] : []
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async () => {
    if (
      !formData.titre ||
      !formData.categorie||
      !formData.description ||
      !formData.contenu ||
      !formData.date_commencement ||
      !editingNews
    ) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const updatedActuality: Actuality = {
    ...editingNews,
    titre: formData.titre,
    categorie: formData.categorie,
    description: formData.description,
    contenu: formData.contenu,
    date_commencement: formData.date_commencement || null,
    date_fin: formData.date_fin || undefined,
    date_creation: formData.date_creation || undefined,
    date_update: formData.date_update || undefined,
    lieu: formData.lieu,
    statut: formData.statut,
    medias: formData.medias,
  }


    await updateNews(updatedActuality?.id_actuality || 0 , updatedActuality)
    // setNews((prev) =>
    //   prev.map((n) => (n.id_actuality === savedNews.id_actuality ? savedNews : n)),
    // )
    setIsEditDialogOpen(false)
    setEditingNews(null)
    resetForm()
    toast({
      title: "Succès",
      description: "Actualité mise à jour avec succès",
    })
  }

  const handleDelete = async (id: number) => {
    try {
      await removeActuality(id);

      // setNews((prev) => prev.filter((n) => n.id_actuality !== id));

      toast({
        title: "Succès",
        description: "Actualité supprimée avec succès",
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };


 const handleStatusChange = async (
    id_actuality: number,
    newStatus: "draft" | "published" | "archived"
  ) => {
    try {
      await updateStatus(id_actuality, newStatus);

      // setNews((prev) =>
      //   prev.map((n) => (n.id_actuality === id_actuality ? updatedNews : n))
      // );

      toast({
        title: "Succès",
        description: `Statut mis à jour vers ${newStatus}`,
      });
    } catch (err) {
      toast({
        title: "Erreur",
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (statut: "draft" | "published" | "archived") => {
    switch (statut) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Publié</Badge>
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Brouillon</Badge>
        )
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Archivé</Badge>
      default:
        return <Badge variant="outline">{statut}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    // const category = categories.find((c) => c.id === categoryId)
    // if (!category) return <Badge variant="outline">Inconnue</Badge>

    return (
      <Badge
      //   style={{ backgroundColor: `${category.couleur}20`, color: category.couleur, borderColor: category.couleur }}
      //   className="border"
      >
        {category}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Actualités</h1>
          <p className="text-muted-foreground">Gérer les actualités et événements de l'université</p>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-university-primary">{actualities.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {actualities.filter((a: Actuality) => a.statut === "published").length}
            </div>
            <div className="text-xs text-muted-foreground">Publiées</div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 justify-between">
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-university-primary" />
              Liste des Actualités
            </CardTitle>
            <div className="flex gap-2 w-full md:w-auto justify-between">
              <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-10">
                    <Tag className="h-4 w-4 mr-2" />
                    Gérer Catégories
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter une Catégorie</DialogTitle>
                    <DialogDescription>Créez une nouvelle catégorie pour organiser vos actualités.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category-name">Nom de la catégorie</Label>
                      <Input
                        id="category-name"
                        value={categoryForm.nom}
                        onChange={(e) => setCategoryForm({ ...categoryForm, nom: e.target.value })}
                        placeholder="Ex: Événements"
                      />
                    </div>
                    {/* <div className="grid gap-2">
                      <Label htmlFor="category-color">Couleur</Label>
                      <div className="flex gap-2">
                        <Input
                          id="category-color"
                          type="color"
                          value={categoryForm.couleur}
                          onChange={(e) => setCategoryForm({ ...categoryForm, couleur: e.target.value })}
                          className="w-16 h-10"
                        />
                        <Input
                          value={categoryForm.couleur}
                          onChange={(e) => setCategoryForm({ ...categoryForm, couleur: e.target.value })}
                          placeholder="#780376"
                          className="flex-1"
                        />
                      </div>
                    </div> */}
                    <div className="space-y-2">
                      <Label>Catégories existantes</Label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Badge
                            key={category.id}
                            // style={{
                            //   backgroundColor: `${category.couleur}20`,
                            //   color: category.couleur,
                            //   borderColor: category.couleur,
                            // }}
                            className="border"
                          >
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                      Fermer
                    </Button>
                    <Button
                      onClick={handleAddCategory}
                      className="bg-university-primary hover:bg-university-primary/90"
                    >
                      Ajouter
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-university-primary rounded-full w-10 h-10 sm:w-fit sm:rounded-lg hover:bg-university-primary/90">
                    <Plus className="h-4 w-4" />
                    <div className="hidden sm:block">Ajouter une Actualité</div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Ajouter une Nouvelle Actualité</DialogTitle>
                    <DialogDescription>
                      Remplissez les informations pour créer une nouvelle actualité.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="titre">Titre *</Label>
                      <Input
                        id="titre"
                        value={formData.titre}
                        onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                        placeholder="Titre de l'actualité"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="categorie">Catégorie *</Label>
                      <Select
                        value={formData.categorie}
                        onValueChange={(value) => setFormData({ ...formData, categorie: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              <div className="flex items-center gap-2">
                                {/* <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.couleur }} /> */}
                                {category.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Description courte de l'actualité"
                        rows={2}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="contenu">Contenu *</Label>
                      <Textarea
                        id="contenu"
                        value={formData.contenu}
                        onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                        placeholder="Contenu détaillé de l'actualité"
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date-debut">Date de début *</Label>
                        <Input
                            id="date-debut"
                            type="datetime-local"
                            value={formData.date_commencement?.toISOString().slice(0,16) ?? ""}
                            onChange={(e) =>
                              setFormData({ ...formData, date_commencement: new Date(e.target.value) })
                            }
                          />

                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="date-fin">Date de fin</Label>
                        <Input
                          id="date-fin"
                          type="datetime-local"
                          value={formData.date_fin?.toISOString().slice(0,16) ?? ""}
                          onChange={(e) => setFormData({ ...formData, date_fin:new Date(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lieu">Lieu</Label>
                      <Input
                        id="lieu"
                        value={formData.lieu}
                        onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                        placeholder="Lieu de l'événement"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Médias</Label>
                      <div className="space-y-2">

                       <Button asChild variant="outline" className="w-full bg-transparent">
                          <label htmlFor="media-upload" className="cursor-pointer flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" />
                            Ajouter un média
                            <input
                              id="media-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </label>
                        </Button>



                        {formData?.medias?.length || 0 > 0 && (
                          <div className="grid grid-cols-2 gap-2">
                            {formData.medias ? formData.medias.map((media) => (
                              <div key={media.id} className="relative border rounded-lg p-2">
                                <img
                                  src={media.url || "/placeholder.svg"}
                                  // alt={media.media}
                                  className="w-full h-20 object-cover rounded"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-1 right-1 h-6 w-6 p-0"
                                  onClick={() => {
                                    if (media.id !== undefined) {
                                      handleRemoveMedia(media.id)
                                    }
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                                {/* <p className="text-xs text-muted-foreground mt-1 truncate">{media.media}</p> */}
                              </div>
                            )) : ""}
                          </div>
                        )}
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[50%]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher une actualité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Toutes catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    <div className="flex items-center gap-2">
                      {/* <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.couleur }} /> */}
                      {category.name}
                    </div>
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
                <SelectItem value="published">Publié</SelectItem>
                <SelectItem value="draft">Brouillon</SelectItem>
                <SelectItem value="archived">Archivé</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="cards" className="w-full">
            <TabsList className="hidden lg:grid w-full grid-cols-2 ">
              <TabsTrigger value="cards">Vue Cartes</TabsTrigger>
              <TabsTrigger value="table">Vue Tableau</TabsTrigger>
            </TabsList>

            <TabsContent value="cards" className="space-y-4">
              {filteredNews.length === 0 ? (
                <div className="text-center py-8">
                  <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                      ? "Aucune actualité trouvée pour les filtres sélectionnés"
                      : "Aucune actualité disponible"}
                  </p>
                </div>
              ) : (
                <div className="grid lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.map((a: Actuality) => (
                    <Card key={a.id_actuality} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg line-clamp-2">{a.titre}</CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                              {getCategoryBadge(a.categorie)}
                              {getStatusBadge(a.statut as "draft" | "published" | "archived")}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {a?.medias?.length! > 0 && (
                          <img
                            // src={a.medias ? a.medias[0].url :  "/placeholder.svg"}
                            src={"/icon.png"}
                            alt={a.titre}
                            className="w-full h-32 object-cover rounded-md"
                          />
                        )}
                        <p className="text-sm text-muted-foreground line-clamp-2">{a.description}</p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{a.date_commencement ? new Date(a.date_commencement).toLocaleDateString("fr-FR") : "-"}</span>
                            {a.date_fin && (
                              <>
                                <span>-</span>
                                <span>{new Date(a.date_fin).toLocaleDateString("fr-FR")}</span>
                              </>
                            )}
                          </div>
                          {a.lieu && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{a.lieu}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(a)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Êtes-vous sûr de vouloir supprimer l'actualité "{a.titre}" ? Cette action est
                                    irréversible.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(a.id_actuality!)}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Supprimer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                          <Select
                            value={a.statut}
                            onValueChange={(value: "draft" | "published" | "archived") =>
                              handleStatusChange(a.id_actuality!, value)
                            }
                          >
                            <SelectTrigger className="w-24 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Brouillon</SelectItem>
                              <SelectItem value="published">Publier</SelectItem>
                              <SelectItem value="archived">Archiver</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="table">
              <div className="hidden lg:block rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead className="text-center">Date</TableHead>
                      <TableHead className="text-center">Lieu</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="hidden xl:flex items-center">Médias</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNews.map((n: Actuality) => (
                      <TableRow key={n.id_actuality}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{n.titre}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-xs">{n.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getCategoryBadge(n.categorie)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{new Date(n.date_commencement!).toLocaleDateString("fr-FR")}</div>
                            {n.date_fin && (
                              <div className="text-muted-foreground">
                                → {new Date(n.date_fin).toLocaleDateString("fr-FR")}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{n.lieu || "-"}</TableCell>
                        <TableCell>{getStatusBadge(n.statut as "draft" | "published" | "archived")}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{n?.medias?.length || 0}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(n)}>
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
                                    Êtes-vous sûr de vouloir supprimer l'actualité "{n.titre}" ? Cette action est
                                    irréversible.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(n.id_actuality!)}
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

              {filteredNews.length === 0 && (
                <div className="text-center py-8">
                  <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                      ? "Aucune actualité trouvée pour les filtres sélectionnés"
                      : "Aucune actualité disponible"}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier l'Actualité</DialogTitle>
            <DialogDescription>Modifiez les informations de l'actualité sélectionnée.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-titre">Titre *</Label>
              <Input
                id="edit-titre"
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                placeholder="Titre de l'actualité"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-categorie">Catégorie *</Label>
              <Select
                value={formData.categorie}
                onValueChange={(value) => setFormData({ ...formData, categorie: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      <div className="flex items-center gap-2">
                        {/* <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.couleur }} /> */}
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description courte de l'actualité"
                rows={2}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-contenu">Contenu *</Label>
              <Textarea
                id="edit-contenu"
                value={formData.contenu}
                onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                placeholder="Contenu détaillé de l'actualité"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-date-debut">Date de début *</Label>
                <Input
                  id="edit-date-debut"
                  type="datetime-local"
                 value={formData.date_commencement?.toISOString().slice(0,16) ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, date_commencement: new Date(e.target.value) })
                }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date-fin">Date de fin</Label>
                <Input
                  id="edit-date-fin"
                  type="datetime-local"
                  value={formData.date_fin?.toISOString().slice(0,16) ?? ""}
                  onChange={(e) => setFormData({ ...formData, date_fin: new Date(e.target.value)})}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-lieu">Lieu</Label>
              <Input
                id="edit-lieu"
                value={formData.lieu}
                onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                placeholder="Lieu de l'événement"
              />
            </div>
            <div className="grid gap-2">
              <Label>Médias</Label>
              <div className="space-y-2">
                <Label>
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Ajouter un média
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleAddMedia(e.target.files[0])
                      }
                    }}
                  />
                </Label>

                {formData?.medias ? formData?.medias.length  > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {formData.medias.map((media) => (
                      <div key={media.id} className="relative border rounded-lg p-2">
                        <img
                          src={media.url || "/placeholder.svg"}
                          className="w-full h-20 object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => handleRemoveMedia(media.id!)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{media.url}</p>
                      </div>
                    ))}
                  </div>
                ): ""}
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