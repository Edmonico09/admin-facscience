import { baseURL } from "..";
import { mockUsers } from "../mocked-data";
import { User } from "../types/user";

type Credentials = {
  identifiant: string;
  password: string;
};

export function auth({ identifiant, password }: Credentials): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.identifiant === identifiant && u.password === password
      );

      if (user) {
        resolve({
          id: user.id,
          identifiant: user.identifiant,
          password: user.password,
        });
      } else {
        reject(new Error("Identifiant ou mot de passe incorrect"));
      }
    }, 700);
  });
}
  
export async function authReal({ identifiant, password }: Credentials): Promise<User> {
    try {
      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifiant, password }),
      });
  
      if (!response.ok) {
        // si le serveur renvoie une erreur (ex: 401)
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur de connexion");
      }
  
      const data: User = await response.json();
      return data;
    } catch (err: any) {
      throw new Error(err.message || "Erreur réseau");
    }
}
