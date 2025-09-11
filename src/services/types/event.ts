import { Media } from "./media";

export interface Actuality {
  id_actuality?: number;          
  titre: string;                 
  categorie: string;          
  description?: string;          
  contenu?: string;              
  date_creation?: Date;          
  date_update?: Date;       
  date_commencement?: Date;      
  date_fin?: Date;               
  lieu?: string;    
  statut:string;
  medias?: Media[]             
}




