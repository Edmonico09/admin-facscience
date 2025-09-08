export interface Actualite {
  id_actualite?: number;          
  titre: string;                 
  id_categorie: string;          
  description?: string;          
  contenu?: string;              
  date_creation?: Date;          
  date_mise_a_jour?: Date;       
  date_commencement?: Date;      
  date_fin?: Date;               
  lieu?: string;                 
}
