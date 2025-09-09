// import { BookOpen, Plus, Search } from "lucide-react"
// import { RenderPacoursCardList } from "./render-parcours-cardlist"
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
// import { Button } from "./ui/button"
// import { Label } from "./ui/label"
// import { Input } from "./ui/input"
// import { TypeNiveau, TypeFormation, InputData, Mention } from "@/services/services"
// import { RenderPacoursTable } from "./render-parcours-table"
// import { Textarea } from "./ui/textarea"

// interface RenderPacoursProps {
//     isAddDialogOpen: boolean;
//     formData: InputData;
//     mentions: Mention[];
//     niveauxOptions: TypeNiveau[];
//     formationOptions: TypeFormation[];
//     selectedNiveau: TypeNiveau;
//     selectedFormation: TypeFormation;
//     selectedMention: Mention;

//     handleAdd: () => void;
//     setFormData: (FormData: InputData) => void;
//     setIsAddDialogOpen: (is_add_dialog: boolean) => void;

// }

// export const RenderParcours = ({
//     isAddDialogOpen,
//     setIsAddDialogOpen,
//     formData,
//     setFormData,
//     mentions,
//     niveauxOptions,
//     formationOptions,
//     handleAdd,
//     selectedNiveau,
//     selectedMention,
//     selectedFormation,
//     setSelectedFormation,
//     groupedParcours,
//     filteredParcours,
//     searchTerm,
//     handleEdit,
//     handleDelete,
//     handleUpdate,
// }: RenderPacoursProps
// ) => {

//     return (
//          <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle className="flex items-center gap-2">
//               <BookOpen className="h-5 w-5 text-university-primary" />
//               Liste des Parcours
//             </CardTitle>
//             <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//               <DialogTrigger asChild>
//                 <Button className="flex justify-between rounded-full w-10 h-10 md:w-fit md:rounded-md items-center bg-university-primary hover:bg-university-primary/90">
//                   <Plus className="h-4 w-4 mr-2" />
//                   <div className="hidden md:block">Ajouter un Parcours</div>
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[500px]">
//                 <DialogHeader>
//                   <DialogTitle>Ajouter un Nouveau Parcours</DialogTitle>
//                   <DialogDescription>
//                     Remplissez les informations pour créer un nouveau parcours académique.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor="nom">Nom du parcours *</Label>
//                     <Input
//                       id="nom"
//                       value={formData.nom_parcours}
//                       onChange={(e) => setFormData({ ...formData, nom_parcours: e.target.value })}
//                       placeholder="Ex: Génie Logiciel"
//                     />
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="mention">Mention *</Label>
//                     <Select
//                       value={formData.id_mention}
//                       onValueChange={(value) => setFormData({ ...formData, id_mention: value })}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Sélectionner une mention" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {mentions.map((mention) => (
//                           <SelectItem key={mention.id} value={mention.id.toString()}>
//                             {mention.nom} ({mention.code})
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="grid gap-2">
//                       <Label htmlFor="niveau">Niveau *</Label>
//                       <Select
//                         value={formData.niveau_parcours}
//                         onValueChange={(value) => setFormData({ ...formData, niveau_parcours: value as TypeNiveau })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Niveau" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {niveauxOptions.map((niveau) => (
//                             <SelectItem key={niveau} value={niveau}>
//                               {niveau}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="formation">Formation *</Label>
//                       <Select
//                         value={formData.formation}
//                         onValueChange={(value) => setFormData({ ...formData, formation: value as TypeFormation })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {formationOptions.map((formation) => (
//                             <SelectItem key={formation} value={formation}>
//                               {formation}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="description">Description</Label>
//                     <Textarea
//                       id="description"
//                       value={formData.description}
//                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                       placeholder="Description du parcours..."
//                     />
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
//                     Annuler
//                   </Button>
//                   <Button onClick={handleAdd} className="bg-university-primary hover:bg-university-primary/90">
//                     Ajouter
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <div className="flex flex-wrap items-center gap-4 mb-6">
//             <div className="relative flex-1 min-w-[200px]">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//               <Input
//                 placeholder="Rechercher un parcours..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={selectedMention} onValueChange={setSelectedMention}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Toutes mentions" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Toutes mentions</SelectItem>
//                 {mentions.map((mention) => (
//                   <SelectItem key={mention.id} value={mention.id.toString()}>
//                     {mention.nom}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <Select value={selectedNiveau} onValueChange={setSelectedNiveau}>
//               <SelectTrigger className="w-[120px]">
//                 <SelectValue placeholder="Niveau" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Tous niveaux</SelectItem>
//                 {niveauxOptions.map((niveau) => (
//                   <SelectItem key={niveau} value={niveau}>
//                     {niveau}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <Select value={selectedFormation} onValueChange={setSelectedFormation}>
//               <SelectTrigger className="w-[140px]">
//                 <SelectValue placeholder="Formation" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Toutes formations</SelectItem>
//                 {formationOptions.map((formation) => (
//                   <SelectItem key={formation} value={formation}>
//                     {formation}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <Tabs defaultValue="grouped" className="">
//             <TabsList className="hidden md:grid w-full grid-cols-2">
//               <TabsTrigger value="grouped">Vue par Mention</TabsTrigger>
//               <TabsTrigger value="table">Vue Tableau</TabsTrigger>
//             </TabsList>

//             <TabsContent value="grouped" className="space-y-4 hidden md:block">
//               {groupedParcours.length === 0 ? (
//                 <div className="text-center py-8">
//                   <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                   <p className="text-muted-foreground">
//                     {searchTerm || selectedMention !== "all" || selectedNiveau !== "all" || selectedFormation !== "all"
//                       ? "Aucun parcours trouvé pour les filtres sélectionnés"
//                       : "Aucun parcours disponible"}
//                   </p>
//                 </div>
//               ) : (
//                 groupedParcours.map(({ mention, parcours: mentionParcours }) => (
//                   <RenderPacoursCardList mention={mention} mentionParcours={mentionParcours} handleDelete={handleDelete} handleEdit={handleEdit} />
//                 ))
//               )}
//             </TabsContent>

//             <TabsContent value="table" className="hidden md:block">
//               <div className="rounded-md border">
//                   <RenderPacoursTable filteredParcours={filteredParcours} mentions={mentions} handleEdit={handleEdit}  handleDelete={handleDelete} />
//               </div>

//               {filteredParcours.length === 0 && (
//                 <div className="text-center py-8">
//                   <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                   <p className="text-muted-foreground">
//                     {searchTerm || selectedMention !== "all" || selectedNiveau !== "all" || selectedFormation !== "all"
//                       ? "Aucun parcours trouvé pour les filtres sélectionnés"
//                       : "Aucun parcours disponible"}
//                   </p>
//                 </div>
//               )}
//             </TabsContent>

//             <TabsContent value="grouped" className="space-y-4 md:hidden">
//               {groupedParcours.length === 0 ? (
//                 <div className="text-center py-8">
//                   <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                   <p className="text-muted-foreground">
//                     {searchTerm || selectedMention !== "all" || selectedNiveau !== "all" || selectedFormation !== "all"
//                       ? "Aucun parcours trouvé pour les filtres sélectionnés"
//                       : "Aucun parcours disponible"}
//                   </p>
//                 </div>
//               ) : (
//                 groupedParcours.map(({ mention, parcours: mentionParcours }) => (
//                   <RenderPacoursCardList mention={mention} mentionParcours={mentionParcours} handleDelete={handleDelete} handleEdit={handleEdit} />
//                 ))
//               )}
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     )
// }