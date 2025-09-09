import { baseURL } from "..";
import { BasePerson, BasePersonWithoutId, COFAC, doyenEtVice, PAT , Professeur , } from "../types/person";

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
    switch (type) {
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


export async function createPerson<T extends BasePersonWithoutId & { type: string }>(
  person: T
): Promise<T & { id: number }> {
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
}

export async function getPersonsByType<T extends BasePerson>(type : string): Promise<T[]> {
    const url = getListUrl(type);
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`Erreur HTTP lors de la récupération des ${type}: ${response.status}`);
    }
  
    return response.json(); 
  }

export async function getPerson<T extends BasePerson>(type : string , id : number):  Promise<T>{
    const url = getListUrl(type);

    const response = await fetch(`${url}/${id}`);
    
    if(!response.ok){
        throw new Error(`Erreur HTTP lors de la récupération de personne: ${response.status}`);
    }

    return response.json();
}


export async function updatePerson<T extends BasePerson & { type: string }>(
    person: T
  ): Promise<T> {
    const url = getUpdateUrl(person.type);
    const response = await fetch(`${url}/${person.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    });
  
    if (!response.ok) {
      throw new Error(`Erreur HTTP lors de update de personne : ${response.status}`);
    }
  
    return response.json();
}
  
export async function deletePerson(type : string , id : number){
    const url = getDeleteUrl(type);

    const response = await fetch(`${url}/${id}`);
    
    if(!response.ok){
        throw new Error(`Erreur HTTP lors de la suppression de personne: ${response.status}`);
    }

    return response.json();
}
