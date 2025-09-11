import { baseURL } from "..";
import { upcomingEvents } from "../mocked-data";
import { Actualite } from "../types/event";

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