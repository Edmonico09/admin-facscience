import { useState, useEffect, useCallback } from "react";
import { useActivity } from "@/context/activity-context";
import * as actualityApi from "@/services/api/event.api";
import { Actuality } from "@/services/types/event";
import { mockActualities } from "@/services/mocked-data";

export function useActuality() {
  const [actualities, setActualities] = useState<Actuality[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addActivity } = useActivity();

  // Charger toutes les mentions
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    // try {
    //   const data = await actualityApi.getNews();
    //   setActualities(data);
    // } catch (err: any) {
    //   setError(err.message || "Erreur lors du chargement des mentions");
    // } finally {
    //   setLoading(false);
    // }
    setActualities(mockActualities)
  }, []);

  // Ajouter une nouvelle actualité
  const addActuality = useCallback(async (newActuality: Actuality) => {
    setLoading(true);
    setError(null);
    try {
      const data: Actuality = await actualityApi.createNews(newActuality);
      const activity = {
        title: "Ajout mention",
        time: new Date().toDateString(),
        status: "success",
      };
      addActivity(activity);
      setActualities(prev => [data, ...prev]);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création de la mention");
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour une actualité
  const updateActuality = useCallback(async (id_: number, updateData: Actuality) => {
    setLoading(true);
    setError(null);
    try {
      const data = await actualityApi.updateNews(id_, updateData);
  
      const activity = {
        title: "Mise à jour mention",
        time: new Date().toDateString(),
        status: "success",
      };
      addActivity(activity);
  
      // Remplace la mention mise à jour dans la liste
      setActualities(prev =>
        prev.map(a => (a.id_actuality === id_ ? data : a))
      );
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour de la mention");
    } finally {
      setLoading(false);
    }
  }, []);
  

  // Supprimer une mention
  const removeActuality = useCallback(async (id_: number) => {
    setLoading(true);
    setError(null);
    try {
      await actualityApi.deleteNews(id_);
  
      const activity = {
        title: "Suppression mention",
        time: new Date().toDateString(),
        status: "success",
      };
      addActivity(activity);
  
      setActualities(prev => prev.filter(a => a.id_actuality !== id_));
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression de la mention");
    } finally {
      setLoading(false);
    }
  }, []);  

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    actualities,
    loading,
    error,
    fetchAll,
    addActuality,
    updateActuality,
    removeActuality,
  };
}
