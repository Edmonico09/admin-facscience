import { baseURL } from "..";
import { upcomingEvents } from "../mocked-data";
import { Actualite, Category, Media } from "../types/event";

export const getClosestEvent = async () => {
  try {
    // const response = await fetch(`${baseURL}/recent_events`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    // if (!response.ok) {
    //   throw new Error(`Erreur HTTP : ${response.status}`);
    // }

    // const data: Actualite[] = await response.json();
    // return data;
    return upcomingEvents;
  } catch (error) {
    console.error('Erreur lors du POST :', error);
    throw error;
  }
}


export async function createCategory(name : string) {
    try {

        const response = await fetch(`${baseURL}/envent/category/add/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(name),
        });
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP lors de la création de category : ${response.status}`);
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


export async function getCategory(): Promise<Category[]> {
    try {

        const res = await fetch(`${baseURL}/envent/category/list/`);
        if (!res.ok) throw new Error(`Erreur lors de la récupération des category`);
        const data = await res.json();
        return data;
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


export async function deleteCategory(id : number){
    try {

        const response = await fetch(`${baseURL}/envent/category/delete/${id}`);
        
        if(!response.ok){
            throw new Error(`Erreur HTTP lors de la suppression de category`);
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


export async function createNews(data : Actualite) {

    try {

        const response = await fetch(`${baseURL}/envent/add/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP lors de la création de news`);
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

export async function UpdateNews(data : Actualite) {
    try {

        const response = await fetch(`${baseURL}/envent/update/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP lors de la mis a jour de news`);
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


export async function getNews():  Promise<Actualite[]>{
    try {

        const response = await fetch(`${baseURL}/envent/list/`);
        
        if(!response.ok){
            throw new Error(`Erreur HTTP lors de la récupération d'actualités: ${response.status}`);
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


export async function deleteNews(id : number){
    try {

        const response = await fetch(`${baseURL}/envent/delete/${id}`);
        
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



export async function createMedia(idActualite : number , data : File){

    try {

        const formData = new FormData();
        formData.append(`file` , data);
        const response = await fetch(`${baseURL}/envent/media/add/${idActualite}` , {
          method: "POST",
        //   headers: { "Content-Type": "multipart/form-data" },
            body: formData,
        });
        
        if(!response.ok){
            throw new Error(`Erreur HTTP lors de l'ajout  de medias: ${response.status}`);
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


export async function deleteMedia(idActualite : number , id_media: number ){
    try {

        const response = await fetch(`${baseURL}/envent/media/delete/${idActualite}/${id_media}`);
        
        if(!response.ok){
            throw new Error(`Erreur HTTP lors de la suppression  de mdeias de l'actualités: ${response.status}`);
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


export async function updateStatus(idActualite : number , statut : string) : Promise<Actualite> {

    try {

            const data = {
                "statut" : statut
            }
        const response = await fetch(`${baseURL}/envent/statut/update/${idActualite}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP lors de la création de news`);
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


