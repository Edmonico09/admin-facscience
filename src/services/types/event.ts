export interface Actualite {
  idActualite?: number;          
  titre: string;                 
  categorie: string;          
  description?: string;          
  contenu?: string;              
  dateCreation?: Date;          
  dateMiseAJour?: Date;       
  dateCommencement?: Date;      
  dateFin?: Date;               
  lieu?: string;    
  statut:string;
  medias: Media[]             
}


export interface Category {
    id : number;
    name : string;
}

export interface Media {
  id? : number,
  url:string,
  type:string,
  // media:string
}