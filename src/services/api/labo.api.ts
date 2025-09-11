import { baseURL } from "..";
import { DescriptionItem, Laboratory } from "../types/labo";

export async function getLabos(): Promise<Laboratory[]> {
    try {

        const response = await fetch(`${baseURL}/labo/list`);
      
        if (!response.ok) {
          throw new Error(`Erreur HTTP lors de la récupération des laboraoires: ${response.status}`);
        }
      
        return response.json(); 
    }catch (error) {
    // Si c'est une erreur de réseau ou de parsing JSON
    if (error instanceof TypeError) {
      throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
    }
    
    // Si c'est une erreur de parsing JSON
    if (error instanceof SyntaxError) {
      throw new Error('Erreur de format des données reçues du serveur.');
    }
    
    // Relancer l'erreur si elle est déjà personnalisée (erreur HTTP)
    if (error instanceof Error) {
      throw error;
    }
    
    // Erreur inconnue
    throw new Error('Une erreur inattendue s\'est produite lors de la récupération des laboratoires.');
  }
}

export async function  addDescription(id_labo:number , data : DescriptionItem): Promise<[]> {
    try {

        const response = await fetch(`${baseURL}/labo/decription/add/${id_labo}` , {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify(data)
        });
      
        if (!response.ok) {
          throw new Error(`Erreur HTTP lors de l'ajout des descriptions: ${response.status}`);
        }
      
        return response.json(); 
    }catch (error) {
    // Si c'est une erreur de réseau ou de parsing JSON
    if (error instanceof TypeError) {
      throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
    }
    
    // Si c'est une erreur de parsing JSON
    if (error instanceof SyntaxError) {
      throw new Error('Erreur de format des données reçues du serveur.');
    }
    
    // Relancer l'erreur si elle est déjà personnalisée (erreur HTTP)
    if (error instanceof Error) {
      throw error;
    }
    
    // Erreur inconnue
    throw new Error('Une erreur inattendue s\'est produite lors de la récupération des laboratoires.');
  }
}


export async function deleteDescription(id_labo:number, cle: string){
    try {

        const response = await fetch(`${baseURL}/labo/decription/delete/${id_labo}/${cle}`);
        
        if(!response.ok){
            throw new Error(`Erreur HTTP lors de la suppression  d' actualités: ${response.status}`);
        }
    
        return response.json();
    }catch (error) {
    // Si c'est une erreur de réseau ou de parsing JSON
    if (error instanceof TypeError) {
      throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
    }
    
    // Si c'est une erreur de parsing JSON
    if (error instanceof SyntaxError) {
      throw new Error('Erreur de format des données reçues du serveur.');
    }
    
    // Relancer l'erreur si elle est déjà personnalisée (erreur HTTP)
    if (error instanceof Error) {
      throw error;
    }
    
    // Erreur inconnue
    throw new Error('Une erreur inattendue s\'est produite lors de la récupération des laboratoires.');
  }
}


export async function updateDescription(id_labo: number, data: DescriptionItem): Promise<DescriptionItem> {
    try {

        const response = await fetch(`${baseURL}/labo/decription/update/${id_labo}`, {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      
        if (!response.ok) {
          throw new Error(`Erreur HTTP lors de l'update des descriptions: ${response.status}`);
        }
      
        return response.json(); 
    }catch (error) {
    // Si c'est une erreur de réseau ou de parsing JSON
    if (error instanceof TypeError) {
      throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
    }
    
    // Si c'est une erreur de parsing JSON
    if (error instanceof SyntaxError) {
      throw new Error('Erreur de format des données reçues du serveur.');
    }
    
    // Relancer l'erreur si elle est déjà personnalisée (erreur HTTP)
    if (error instanceof Error) {
      throw error;
    }
    
    // Erreur inconnue
    throw new Error('Une erreur inattendue s\'est produite lors de la récupération des laboratoires.');
  }
}


export async function  addLabo(data : Laboratory): Promise<Laboratory> {
    try {

        const response = await fetch(`${baseURL}/laboadd/}` , {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify(data)
        });
      
        if (!response.ok) {
          throw new Error(`Erreur HTTP lors de l'ajout de laboratoire: ${response.status}`);
        }
      
        return response.json(); 
    }catch (error) {
    // Si c'est une erreur de réseau ou de parsing JSON
    if (error instanceof TypeError) {
      throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
    }
    
    // Si c'est une erreur de parsing JSON
    if (error instanceof SyntaxError) {
      throw new Error('Erreur de format des données reçues du serveur.');
    }
    
    // Relancer l'erreur si elle est déjà personnalisée (erreur HTTP)
    if (error instanceof Error) {
      throw error;
    }
    
    // Erreur inconnue
    throw new Error('Une erreur inattendue s\'est produite lors de la récupération des laboratoires.');
  }
}

export async function updateLabo(id_labo: number, data: Laboratory): Promise<Laboratory> {
    try {

        const response = await fetch(`${baseURL}/labo/update/${id_labo}`, {
          method: "PUT", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      
        if (!response.ok) {
          throw new Error(`Erreur HTTP lors de la mise à jour du laboratoire: ${response.status}`);
        }
      
        return response.json(); 
    }catch (error) {
    // Si c'est une erreur de réseau ou de parsing JSON
    if (error instanceof TypeError) {
      throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
    }
    
    // Si c'est une erreur de parsing JSON
    if (error instanceof SyntaxError) {
      throw new Error('Erreur de format des données reçues du serveur.');
    }
    
    // Relancer l'erreur si elle est déjà personnalisée (erreur HTTP)
    if (error instanceof Error) {
      throw error;
    }
    
    // Erreur inconnue
    throw new Error('Une erreur inattendue s\'est produite lors de la récupération des laboratoires.');
  }
}


export async function deleteLabo(id_labo:number){
    try {

        const response = await fetch(`${baseURL}/labo/delete/${id_labo}`);
        
        if(!response.ok){
            throw new Error(`Erreur HTTP lors de la suppression  de labo: ${response.status}`);
        }
    
        return response.json();
    } catch (error) {
    // Si c'est une erreur de réseau ou de parsing JSON
    if (error instanceof TypeError) {
      throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
    }
    
    // Si c'est une erreur de parsing JSON
    if (error instanceof SyntaxError) {
      throw new Error('Erreur de format des données reçues du serveur.');
    }
    
    // Relancer l'erreur si elle est déjà personnalisée (erreur HTTP)
    if (error instanceof Error) {
      throw error;
    }
    
    // Erreur inconnue
    throw new Error('Une erreur inattendue s\'est produite lors de la récupération des laboratoires.');
  }
}
