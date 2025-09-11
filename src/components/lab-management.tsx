"use client"

import { 
  // useEffect, 
  useState 
} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"
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
import { 
  addDescription, 
  deleteDescription, 
} from "@/services/api/labo.api"

import { DescriptionItem, Laboratory } from "@/services/types/labo"
import { useLabo } from "@/hooks/useLabo"
import { useMention } from "@/hooks/useMention"
import { usePerson } from "@/hooks/usePerson"

export function LabManagement() {
  const {laboratories, createLabo, updateLaboratory, removeLabo} = useLabo();
  const {mentions} = useMention();
  const {persons} = usePerson();

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMention, setSelectedMention] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingLab, setEditingLab] = useState<Laboratory | null>(null)
  const [formData, setFormData] = useState({
    nom_labo: "",
    mention_rattachement: "",
    responsable: "",
    description: [
      {cle: "", valeur: "" },
      {cle: "", valeur: "" },
    ] as DescriptionItem[],
  })
  const { toast } = useToast()

const filteredLaboratories = laboratories.filter((lab) => {
  const matchesSearch =
    lab.nom_labo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentions
      .find((m) => m.toString() === lab.mention_rattachement)
      ?.nom_mention.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    persons
      .find((p) => p.toString() === lab.responsable)
      ?.nom.toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesMention = selectedMention === "all" || lab.mention_rattachement === selectedMention;

  return matchesSearch && matchesMention;
});


  const resetForm = () => {
    setFormData({
      nom_labo: "",
      mention_rattachement: "",
      responsable: "",
      description: [
        {  cle: "", valeur: "" },
        {  cle: "", valeur: "" },
      ],
    })
  }

  const addDescriptionField = () => {
    const newField: DescriptionItem = {
      cle: "",
      valeur: "",
    };
    setFormData({
      ...formData,
      description: [...formData.description, newField],
    });
  };


const removeDescriptionField = async (index: number, cle: string) => {
  if (formData.description.length <= 2) {
    toast({
      title: "Attention",
      description: "Au moins 2 champs de description sont requis",
      variant: "destructive",
    })
    return
  }
  
  if (editingLab?.id_labo) {
    try {
      await deleteDescription(editingLab.id_labo, cle);
      setFormData({
        ...formData,
        description: formData.description.filter((_, i) => i !== index),
      })
    } catch(err) {
      toast({
        title: "Erreur",
        description: (err as Error).message,
        variant: "destructive",
      })
    }
  } else {
    // Mode ajout - suppression locale uniquement
    setFormData({
      ...formData,
      description: formData.description.filter((_, i) => i !== index),
    })
  }
}

const addDescriptionFieldInEditMode = async () => {
  if (editingLab?.id_labo) {
    // Mode édition - appel API + mise à jour locale
    const newField: DescriptionItem = { cle: "", valeur: "" };
    try {
      await addDescription(editingLab.id_labo, newField);
      setFormData({
        ...formData,
        description: [...formData.description, newField],
      });
      toast({ title: "Succès", description: "Description ajoutée" });
    } catch (err) {
      toast({ title: "Erreur", description: (err as Error).message, variant: "destructive" });
    }
  } else {
    addDescriptionField();
  }
};

const handleAdd = async () => {
  try {
    if (!formData.nom_labo || !formData.mention_rattachement || !formData.responsable) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // Filtrer les champs description vides
    const validDescriptions = formData.description.filter(
      (item) => item.cle.trim() && item.valeur.trim()
    );
  
    const newLab: Laboratory = {
      id_labo: laboratories.length === 0 ? laboratories.length + 1 : 0,
      nom_labo: formData.nom_labo,
      mention_rattachement: formData.mention_rattachement,
      responsable: formData.responsable,
      description: validDescriptions.map((item) => ({
        ...item,
      })),
    };

    await createLabo(newLab);
    setIsAddDialogOpen(false);
    resetForm();

    toast({
      title: "Succès",
      description: "Laboratoire ajouté avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du laboratoire:", error);
    toast({
      title: "Erreur",
      description: "Impossible d'ajouter le laboratoire. Veuillez réessayer.",
      variant: "destructive",
    });
  }
};

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
              { cle: "", valeur: "" },
              { cle: "", valeur: "" },
            ],
    })
    setIsEditDialogOpen(true)
  }

 const handleUpdate = async () => {
  if (!formData.nom_labo || !formData.mention_rattachement || !formData.responsable || !editingLab) {
    toast({
      title: "Erreur",
      description: "Veuillez remplir tous les champs obligatoires",
      variant: "destructive",
    });
    return;
  }

  // Filter out empty description fields
  const validDescriptions = formData.description.filter(
    (item) => item.cle.trim() && item.valeur.trim()
  );

  const updatedLabData: Laboratory = {
    ...editingLab,
    nom_labo: formData.nom_labo,
    mention_rattachement: formData.mention_rattachement,
    responsable: formData.responsable,
    description: validDescriptions,
  };

  try {
    await updateLaboratory(editingLab.id_labo!, updatedLabData);

    // // Met à jour le tableau local
    // setLaboratories(
    //   laboratories.map((lab) =>
    //     lab.id_labo === updatedLab.id_labo ? updatedLab : lab
    //   )
    // );

    setIsEditDialogOpen(false);
    setEditingLab(null);
    resetForm();

    toast({
      title: "Succès",
      description: "Laboratoire mis à jour avec succès",
    });
  } catch (error: any) {
    toast({
      title: "Erreur",
      description: error.message || "Impossible de mettre à jour le laboratoire",
      variant: "destructive",
    });
  }
};

  const handleDelete = async (id_labo: number) => {
  try {
    await removeLabo(id_labo);

    // setLaboratories(laboratories.filter((lab) => lab.id_labo !== id_labo));

    toast({
      title: "Succès",
      description: "Laboratoire supprimé avec succès",
    });
  } catch (error: any) {
    toast({
      title: "Erreur",
      description: error.message || "Impossible de supprimer le laboratoire",
      variant: "destructive",
    });
  }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Laboratoires</h1>
          <p className="text-muted-foreground">Gérer les laboratoires de recherche de l'université</p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-university-primary">{laboratories.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
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
                <Button className="bg-university-primary rounded-full w-10 h-10 sm:w-fit sm:rounded-lg hover:bg-university-primary/90">
                  <Plus className="h-4 w-4" />
                  <div className="hidden sm:block">Ajouter un Laboratoire</div>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
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
                            <SelectItem key={mention.id_mention} value={mention.id_mention!.toString()}>
                              {mention.nom_mention} ({mention.abbreviation})
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
               <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addDescriptionFieldInEditMode}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter
                  </Button>

              </div>
          {formData.description.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Clé"
                value={item.cle}
                onChange={(e) => {
                  const updated = [...formData.description];
                  updated[index] = { ...updated[index], cle: e.target.value };
                  setFormData({ ...formData, description: updated });
                }}
              />
              <Input
                placeholder="Valeur"
                value={item.valeur}
                onChange={(e) => {
                  const updated = [...formData.description];
                  updated[index] = { ...updated[index], valeur: e.target.value };
                  setFormData({ ...formData, description: updated });
                }}
              />
              <Button onClick={() => removeDescriptionField(index , item.cle )}>
                Supprimer
              </Button>
            </div>
          ))}
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
            <div className="relative flex-1 max-w-sm">
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
                  <SelectItem key={mention.id_mention} value={mention.id_mention!.toString()}>
                    {mention.nom_mention}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredLaboratories.length === 0 ? (
              <div className="text-center py-8">
                <FlaskConical className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                {/* <p className="text-muted-foreground">
                  {searchTerm || selectedMention !== "all" || selectedStatus !== "all"
                    ? "Aucun laboratoire trouvé pour les filtres sélectionnés"
                    : "Aucun laboratoire disponible"}
                </p> */}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredLaboratories.map((lab) => (
                  <Card key={lab.id_labo} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-university-primary mb-2">{lab.nom_labo}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <FlaskConical className="h-4 w-4" />
                              <span>{(lab.mention_rattachement)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{(lab.responsable)}</span>
                            </div>
                            {/* <Badge variant="outline">{lab.nombreChercheurs} chercheurs</Badge>
                            {getStatusBadge(lab.statut)} */}
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
                                  onClick={() => handleDelete(lab.id_labo!)}
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
                              <div key={desc.cle} className="flex gap-3 text-sm">
                                <span className="font-medium text-university-primary min-w-[100px]">{desc.cle}:</span>
                                <span className="text-muted-foreground flex-1">{desc.valeur}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                        <span>Créé le {new Date(lab.dateCreation).toLocaleDateString("fr-FR")}</span>
                      </div> */}
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
                      <SelectItem key={mention.id_mention} value={mention.id_mention!.toString()}>
                        {mention.nom_mention} ({mention.abbreviation})
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
           <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addDescriptionField}
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>

              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {formData.description.map((item, index) => (
                  <div key={item.cle} className="flex gap-2 items-start">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      {/* <Input
                        placeholder="Clé (ex: Mission)"
                        value={item.cle}
                        onChange={(e) => updateDescriptionField( "cle", e.target.value)}
                      />
                      <Input
                        placeholder="Valeur (ex: Recherche en IA)"
                        value={item.valeur}
                        onChange={(e) => updateDescriptionField("valeur", e.target.value)}
                      /> */}
                    </div>
                    {formData.description.length > 2 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeDescriptionField(index , item.cle)}>
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
