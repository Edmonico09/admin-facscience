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
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FormationEnum, NiveauEnum, Parcours } from "@/services/types/parcours"
import { useMention } from "@/hooks/useMention"
import { Mention } from "@/services/types/mention"
import { useParcours } from "@/hooks/useParcours"
import { RenderPacoursTable } from "./render-parcours-table"
import { RenderPacoursCardList } from "./render-parcours-cardlist"

export function ParcoursManagement() {
 const { parcours, createParcours, updateParcours, removeParcours } = useParcours()
  const { mentions } = useMention()
  const { toast } = useToast()

  // States pour le filtrage et formulaire
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
    niveau_parcours: "" as NiveauEnum | "",
    formation_type: "" as FormationEnum | "",
    description_parcours: "",
  })

  const niveauxOptions = Object.values(NiveauEnum)
  const formationOptions = Object.values(FormationEnum)


  const resetForm = () => setFormData({ nom_parcours: "", id_mention: "", niveau_parcours: "", formation_type: "", description_parcours: "" })

  const handleAdd = async () => {
    if (!formData.nom_parcours || !formData.id_mention || !formData.niveau_parcours || !formData.formation_type) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs obligatoires", variant: "destructive" })
      return
    }
    try {
      await createParcours({
        nom_parcours: formData.nom_parcours,
        id_mention: Number(formData.id_mention),
        niveau_parcours: formData.niveau_parcours as NiveauEnum,
        formation_type: formData.formation_type as FormationEnum,
        description_parcours: formData.description_parcours,
      })
      setIsAddDialogOpen(false)
      resetForm()
      toast({ title: "Succès", description: "Parcours ajouté avec succès" })
    } catch (err) {
      toast({ title: "Erreur", description: "Impossible d'ajouter le parcours", variant: "destructive" })
    }
  }

  const handleEdit = (p: Parcours) => {
    setEditingParcours(p)
    setFormData({
      nom_parcours: p.nom_parcours,
      id_mention: p.id_mention.toString(),
      niveau_parcours: p.niveau_parcours||"",
      formation_type: p.formation_type||"Academique",
      description_parcours: p.description_parcours || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = async () => {
    if (!formData.nom_parcours || !formData.id_mention || !formData.niveau_parcours || !formData.formation_type || !editingParcours) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs obligatoires", variant: "destructive" })
      return
    }
    try {
      await updateParcours(editingParcours.id_parcours||0, {
        nom_parcours: formData.nom_parcours,
        id_mention: Number(formData.id_mention),
        niveau_parcours: formData.niveau_parcours as NiveauEnum,
        formation_type: formData.formation_type as FormationEnum,
        description_parcours: formData.description_parcours,
      })
      setIsEditDialogOpen(false)
      setEditingParcours(null)
      resetForm()
      toast({ title: "Succès", description: "Parcours mis à jour avec succès" })
    } catch (err) {
      toast({ title: "Erreur", description: "Impossible de mettre à jour le parcours", variant: "destructive" })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await removeParcours(id)
      toast({ title: "Succès", description: "Parcours supprimé avec succès" })
    } catch (err) {
      toast({ title: "Erreur", description: "Impossible de supprimer le parcours", variant: "destructive" })
    }
  }

  // Filtrage
  const filteredParcours = parcours.filter((p:Parcours) => {
    const matchesSearch = p.nom_parcours.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentions.find((m) => m.id_mention === p.id_mention)?.nom_mention.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMention = selectedMention === "all" || p.id_mention.toString() === selectedMention
    const matchesNiveau = selectedNiveau === "all" || p.niveau_parcours === selectedNiveau
    const matchesFormation = selectedFormation === "all" || p.formation_type === selectedFormation
    return matchesSearch && matchesMention && matchesNiveau && matchesFormation
  })

  const getParcoursGroupedByMention = () => {
    const grouped: { [key: number]: { mention: Mention; parcours: Parcours[] } } = {}
    filteredParcours.forEach((p:Parcours) => {
      const mention = mentions.find((m) => m.id_mention === p.id_mention)
      if (mention) {
        if (!grouped[mention.id_mention||0]) grouped[mention.id_mention||0] = { mention, parcours: [] }
        grouped[mention.id_mention||0].parcours.push(p)
      }
    })
    return Object.values(grouped)
  }

  const groupedParcours = getParcoursGroupedByMention()

  const getNiveauBadgeColor = (niveau: NiveauEnum) => { 
    if (niveau.startsWith("L")) 
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" 
    if (niveau.startsWith("M")) 
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
    if (niveau.startsWith("D")) 
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" 
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300" }

  const getFormationBadgeColor = (formation: FormationEnum) => {
    switch (formation) {
      case "Academique":
        return "bg-university-primary/10 text-university-primary"
      case "Professionnalisante":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

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
                          <SelectItem key={mention.id_mention} value={mention.id_mention?.toString()||""}>
                            {mention.nom_mention} ({mention.abbreviation})
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
                        onValueChange={(value) => setFormData({ ...formData, niveau_parcours: value as NiveauEnum })}
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
                        value={formData.formation_type}
                        onValueChange={(value) => setFormData({ ...formData, formation_type: value as FormationEnum })}
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
                      value={formData.description_parcours}
                      onChange={(e) => setFormData({ ...formData, description_parcours: e.target.value })}
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
                  <SelectItem key={mention.id_mention} value={mention.id_mention?.toString()||""}>
                    {mention.nom_mention} {mention.abbreviation}
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
            <TabsList className="hidden md:grid w-full grid-cols-2">
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
                  <RenderPacoursCardList 
                    mention={mention} 
                    mentionParcours={mentionParcours} 
                    handleDelete={handleDelete} 
                    handleEdit={handleEdit}                    
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="table">
              <div className="rounded-md border">
                <RenderPacoursTable filteredParcours={filteredParcours} mentions={mentions} handleEdit={handleEdit} handleDelete={handleDelete} />
                
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
                    <SelectItem key={mention.id_mention} value={mention.id_mention?.toString()||""}>
                      {mention.nom_mention} ({mention.abbreviation})
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
                  onValueChange={(value) => setFormData({ ...formData, niveau_parcours: value as NiveauEnum })}
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
                  value={formData.formation_type}
                  onValueChange={(value) => setFormData({ ...formData, formation_type: value as FormationEnum })}
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
                value={formData.description_parcours}
                onChange={(e) => setFormData({ ...formData, description_parcours: e.target.value })}
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
      {/* <div className="w-[100%] min-h-96 bg-yellow-200 grid grid-rows-11 grid-cols-7 items-center gap-0">
        <div className="row-span-1 col-span-7 flex justify-center items-center">
            <div className="p-2 bg-white">COFAC</div>
        </div>
        <div className="col-span-7 h-[100%] bg-red-200 flex justify-center items-center">
            <hr className="rotate-90 w-10 border-2 border-black"/>
        </div>

        <div className="col-span-7 flex justify-center">
          <div className="grid grid-cols-5 justify-center">
            
            <div className="flex justify-center items-center bg-white w-[100%] px-5 py-2">CONSEIL</div>
            
            <div className="flex justify-center items-center w-[100%] bg-green-300">
              <hr className="flex justify-center w-[100%] border-2 border-black "/>
            </div>
            
            <div className="flex justify-center items-center bg-white w-[100%] px-5 py-2">DOYEN</div>
            
            <div className="flex justify-center items-center w-[100%] bg-green-300">
              <hr className="flex justify-center w-[100%] border-2 border-black "/>
            </div>
            
            <div className="flex justify-center items-center bg-white w-[100%] px-5 py-2">COLLEGE</div>
          </div>
        </div>

        <div className="col-span-7 flex justify-center items-center bg-red-100 h-[100%] w-[100%]">
          <div className="grid grid-cols-5 h-[100%] justify-center gap-7">
            <div className="flex justify-center items-center bg-white w-[100%] h-[100%] px-5 py-2 col-span-1">
              <hr className="rotate-90 w-10 border-2 border-black"/>
            </div>
            <div className="flex justify-center items-center w-[100%] bg-green-300 px-5">
            </div>
            <div className="flex justify-center items-center bg-white  px-5 py-2 h-full w-[100%]">
              <hr className="rotate-90 w-10 border-2 border-black"/>
            </div>
            <div className="flex justify-center items-center w-[100%] bg-green-300 px-5"></div>
            <div className="flex justify-center items-center bg-white w-[100%] px-5 py-2 col-span-1">
              <hr className="rotate-90 w-10 border-2 border-black"/>
            </div>
          </div>
        </div>
        <div className="col-span-7 flex justify-center h-[100%]">
          <div className="grid grid-cols-5 w-[90%] h-[100%]">
            <hr className="col-span-7 border-2 border-black w-full"/>
          </div>
        </div>
        <div className="col-span-1">AAAAA</div>
        <div>AAAAA</div>
        <div>AAAAA</div>
        <div>AAAAA</div>
        <div>AAAAA</div>
        <div>AAAAA</div>
      </div> */}
    </div>
  )
}
