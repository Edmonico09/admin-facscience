import { baseURL } from "..";
import { stats, upcomingEvents } from "../mocked-data";
import { StatDb } from "../types/stat";

export const statistic = async () => {
  try {
    // const response = await fetch(`${baseURL}/statistic`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    // if (!response.ok) {
    //   throw new Error(`Erreur HTTP : ${response.status}`);
    // }

    // const data: StatDb[] = await response.json();
    // return data;
    return stats;
  } catch (error) {
    console.error('Erreur lors du POST :', error);
    throw error;
  }
}