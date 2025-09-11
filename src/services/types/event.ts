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
  idMedia? : number,
  chemin:string,
  mimetype:string,
  media:string
}