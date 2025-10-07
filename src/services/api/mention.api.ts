import { baseURL } from "..";
import { mockMentions } from "../mocked-data";
import { Mention } from "../types/mention";

export const get = async () => {
  try {
    // const response = await fetch(`${baseURL}/Mention`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    // if (!response.ok) {
    //   throw new Error(`Erreur HTTP : ${response.status}`);
    // }

    // const data: Mention[] = await response.json();
    // return data;
    return mockMentions;
  } catch (error) {
    console.error('Erreur lors du POST :', error);
    throw error;
  }
}

export const create = async (newMention: Mention) => {
  try {
    // const response = await fetch(`${baseURL}/Mention`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(newMention)
    // });

    // if (!response.ok) {
    //   throw new Error(`Erreur HTTP : ${response.status}`);
    // }

    // const data: Mention = await response.json();
    // return data;
    return newMention;
  } catch (error) {
    console.error('Erreur lors du POST :', error);
    throw error;
  }
}

export const update = async (id_:number, updateMention: Partial<Mention>) => {
  try {
    // const response = await fetch(`${baseURL}/Mention/${id_}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(updateMention)
    // });

    // if (!response.ok) {
    //   throw new Error(`Erreur HTTP : ${response.status}`);
    // }

    // const data: Mention = await response.json();
    // return data;
    return mockMentions[0];
  } catch (error) {
    console.error('Erreur lors du POST :', error);
    throw error;
  }
}

export const remove = async (id_:number) => {
  try {
    // const response = await fetch(`${baseURL}/Mention/${id_}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // });

    // if (!response.ok) {
    //   throw new Error(`Erreur HTTP : ${response.status}`);
    // }

    // const data: Mention = await response.json();
    // return data;
    return mockMentions[0];
  } catch (error) {
    console.error('Erreur lors du POST :', error);
    throw error;
  }
}
