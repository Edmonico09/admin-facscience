import { baseURL } from "..";
import { Mention } from "../types/mention";

export const get = async (): Promise<Mention[]> => {
  try {
    const response = await fetch(`${baseURL}/api/Mention`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data: Mention[] = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors du GET :', error);
    throw error;
  }
};

export const create = async (newMention: Omit<Mention, "idMention">): Promise<Mention> => {
  try {
    const payload = {
      NomMention: newMention.nomMention,
      Abbreviation: newMention.abbreviation,
      DescriptionMention: newMention.descriptionMention,
      LogoPath: newMention.logoPath,
      Laboratoires: newMention.laboratoires,
      MentionNiveauParcours: newMention.mentionNiveauParcours,
      Preinscriptions: newMention.preinscriptions,
    };

    const response = await fetch(`${baseURL}/api/Mention`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erreur HTTP : ${response.status} - ${text}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors du POST :', error);
    throw error;
  }
};


export const update = async (id_: number, updateMention: Partial<Mention>): Promise<Mention> => {
  const payload = Object.fromEntries(
    Object.entries(updateMention).filter(([_, v]) => v !== undefined)
  );

  const response = await fetch(`${baseURL}/api/Mention/${id_}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erreur HTTP : ${response.status} - ${text}`);
  }

  return await response.json();
};



export const remove = async (id_: number): Promise<void> => {
  try {
    const response = await fetch(`${baseURL}/api/Mention/${id_}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
  } catch (error) {
    console.error('Erreur lors du DELETE :', error);
    throw error;
  }
};