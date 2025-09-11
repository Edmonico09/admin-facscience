import { baseURL } from "..";
import { mockSpecialities } from "../mocked-data";
import { Speciality } from "../types/speciality";

export const get = async () => {
  try {
    // const response = await fetch(`${baseURL}/speciality`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    // if (!response.ok) {
    //   throw new Error(`Erreur HTTP : ${response.status}`);
    // }

    // const data: Speciality[] = await response.json();
    // return data;
    return mockSpecialities;
  } catch (error) {
    console.error('Erreur lors du POST :', error);
    throw error;
  }
}

export const create = async (newSpeciality: Speciality) => {
  try {
    // const response = await fetch(`${baseURL}/speciality`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(newSpeciality)
    // });

    // if (!response.ok) {
    //   throw new Error(`Erreur HTTP : ${response.status}`);
    // }

    // const data: Speciality = await response.json();
    // return data;
    return newSpeciality;
  } catch (error) {
    console.error('Erreur lors du POST :', error);
    throw error;
  }
}

export const update = async (id_:number, updateSpeciality: Partial<Speciality>) => {
  try {
    // const response = await fetch(`${baseURL}/speciality/${id_}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(updateSpeciality)
    // });

    // if (!response.ok) {
    //   throw new Error(`Erreur HTTP : ${response.status}`);
    // }

    // const data: Speciality = await response.json();
    // return data;
    return mockSpecialities[0];
  } catch (error) {
    console.error('Erreur lors du POST :', error);
    throw error;
  }
}

export const remove = async (id_:number) => {
  try {
    // const response = await fetch(`${baseURL}/speciality/${id_}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // });

    // if (!response.ok) {
    //   throw new Error(`Erreur HTTP : ${response.status}`);
    // }

    // const data: Speciality = await response.json();
    // return data;
    return mockSpecialities[0];
  } catch (error) {
    console.error('Erreur lors du POST :', error);
    throw error;
  }
}
