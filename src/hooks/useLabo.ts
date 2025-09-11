import * as laboApi from "@/services/api/labo.api";
import { Laboratory } from "@/services/types/labo";
import { useActivity } from "@/context/activity-context";
import { useState, useEffect, useCallback } from "react";


export function useLabo() {
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {addActivity} = useActivity();

  // Charger tous les labo
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await laboApi.getLabos();
      setLaboratories(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des labo");
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer un nouveau labo
  const createLabo = useCallback(async (newLabo: Laboratory) => {
    setLoading(true);
    setError(null);
    try {
      const data = await laboApi.addLabo(newLabo);
      const activity = {
        title: "Ajout labo",
        time: new Date().toDateString(),
        status: "success",
      }
      addActivity(activity);
      setLaboratories(prev => [data, ...prev]);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création du labo");
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour un labo
  const updateLaboratory = useCallback(async (id_: number, updateData: Laboratory) => {
    setLoading(true);
    setError(null);
    try {
      const data = await laboApi.updateLabo(id_, updateData);
      const activity = {
        title: "Mise a jour labo",
        time: new Date().toDateString(),
        status: "success",
      }
      addActivity(activity);
      setLaboratories(prev =>
        prev.map(l => (l.id_labo === id_ ? data : l))
      );
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour du labo");
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer un labo
  const removeLabo = useCallback(async (id_: number) => {
    setLoading(true);
    setError(null);
    try {
      await laboApi.deleteLabo(id_);
      const activity = {
        title: "Suppression labo",
        time: new Date().toDateString(),
        status: "success",
      }
      addActivity(activity);
      setLaboratories(prev => prev.filter(m => m.id_labo !== id_));
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression du labo");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    laboratories,
    loading,
    error,
    fetchAll,
    createLabo,
    updateLaboratory,
    removeLabo,
  };
}
