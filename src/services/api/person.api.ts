import { id } from "date-fns/locale";
import { baseURL } from "..";
import { BasePerson, BasePersonWithoutId, Person, PersonType } from "../types/person";

function getCreateUrl(type : string){
    switch (type) {
        case "pat":
          return `${baseURL}/person/add/pat`;
        case "professeur":
          return `${baseURL}/person/add/professeur`;
        case "cofac":
          return `${baseURL}/person/add/cofac`;
        case "doyen_et_vice":
          return `${baseURL}/person/add/doyen`;
        default:
          throw new Error("Type inconnu : " + type);
      }
}  


function getListUrl(type : string){
    switch (type) {
        case "pat":
          return `${baseURL}/person/list/pat`;
        case "professeur":
          return `${baseURL}/person/list/professeur`;
        case "cofac":
          return `${baseURL}/person/list/cofac`;
        case "doyen_et_vice":
          return `${baseURL}/person/list/doyen`;
        default:
          throw new Error("Type inconnu : " + type);
      }
}  

function getUpdateUrl(type : string){
    const low_type = type.toLowerCase();

    switch (low_type) {
        case "pat":
          return `${baseURL}/person/update/pat`;
        case "professeur":
          return `${baseURL}/person/update/professeur`;
        case "cofac":
          return `${baseURL}/person/update/cofac`;
        case "doyen_et_vice":
          return `${baseURL}/person/update/doyen`;
        default:
          throw new Error("Type inconnu : " + type);
      }
}  

function getDeleteUrl(type : string){
    switch (type) {
        case "pat":
          return `${baseURL}/person/delete/pat`;
        case "professeur":
          return `${baseURL}/person/delete/professeur`;
        case "cofac":
          return `${baseURL}/person/delete/cofac`;
        case "doyen_et_vice":
          return `${baseURL}/person/delete/doyen`;
        default:
          throw new Error("Type inconnu : " + type);
      }
}  


export async function createPerson<T extends BasePersonWithoutId & { type: PersonType }>(
  person: T
): Promise<T & { id: number }> {

  try {

    const url = getCreateUrl(person.type);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    });
  
    if (!response.ok) {
      throw new Error(`Erreur HTTP lors de la création de personne : ${response.status}`);
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

export async function getPersonsByType<T extends BasePerson>(type : string): Promise<T[]> {
    const url = getListUrl(type);
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`Erreur HTTP lors de la récupération des ${type}: ${response.status}`);
    }
  
    return response.json(); 
  }

export async function getAllPersons(): Promise<Person[]> {

  try {
    const response = await fetch(`${baseURL}/person/list`);
  
    if (!response.ok) {
      throw new Error(`Erreur HTTP lors de la récupération des personnes: ${response.status}`);
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

export async function getPerson<T extends BasePerson>(type : string , id : number):  Promise<T>{
  try {

    const url = getListUrl(type);

    const response = await fetch(`${url}/${id}`);
    
    if(!response.ok){
        throw new Error(`Erreur HTTP lors de la récupération de personne: ${response.status}`);
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


export async function updatePerson(id_: number, updatePerson: Person): Promise<Person> {
    try {
      const url = getUpdateUrl(updatePerson.type);
      const response = await fetch(`${url}/${id_}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_person: id,
        }),
      });
    
      if (!response.ok) {
        throw new Error(`Erreur HTTP lors de update de personne : ${response.status}`);
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
  
export async function deletePerson(type : string , id : number){
  try {

    const url = getDeleteUrl(type);

    const response = await fetch(`${url}/${id}`);
    
    if(!response.ok){
        throw new Error(`Erreur HTTP lors de la suppression de personne: ${response.status}`);
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
