import { baseURL } from "..";
import { option, options } from "../types/option";

export async function getSelectOptions(type: keyof options): Promise<string[]> {
    const res = await fetch(`${baseURL}/options/${type}`);
    if (!res.ok) throw new Error(`Erreur lors de la récupération des options ${type}`);
    const data = await res.json();
    return data;
}


export async function createOptions( type: keyof options , data : option): Promise<string[]> {
const response = await fetch(`${baseURL}/options/add/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
});

if (!response.ok) {
    throw new Error(`Erreur HTTP lors de la création de option : ${response.status}`);
}

return response.json();
}
