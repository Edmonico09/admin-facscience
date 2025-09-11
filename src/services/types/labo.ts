export interface Laboratory{
    id_labo:number;
    nom_labo:string;
    mention_rattachement: string;
    responsable:string;
    description : DescriptionItem[];
}

export interface DescriptionItem {
  cle: string
  valeur: string
}
