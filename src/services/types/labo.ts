export interface Laboratory{
    idLabo?:number;
    nomLabo:string;
    mentionRattachement:string;
    responsable:string;
    description : DescriptionItem[];
}

export interface DescriptionItem {
  cle: string
  valeur: string
}
