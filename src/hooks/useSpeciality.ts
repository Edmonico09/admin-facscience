import { useState, useEffect, useCallback } from "react";
import { Speciality } from "@/services/types/speciality";
import { useActivity } from "@/context/activity-context";
import * as specialityApi from "@/services/api/speciality.api";

export function useSpeciality() {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addActivity } = useActivity();

  // Charger toutes les specialities
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await specialityApi.get();
      setSpecialities(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des specialities");
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer une nouvelle mention
  const createSpeciality = useCallback(async (newSpeciality: Speciality) => {
    setLoading(true);
    setError(null);
    try {
      const data: Speciality = await specialityApi.create(newSpeciality);
      const activity = {
        title: "Ajout mention",
        time: new Date().toDateString(),
        status: "success",
      };
      addActivity(activity);
      setSpecialities(prev => [data, ...prev]);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création de la mention");
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour une mention
  const updateSpeciality = useCallback(async (id_: number, updateData: Partial<Speciality>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await specialityApi.update(id_, updateData);
  
      const activity = {
        title: "Mise à jour mention",
        time: new Date().toDateString(),
        status: "success",
      };
      addActivity(activity);
  
      // Remplace la mention mise à jour dans la liste
      setSpecialities(prev =>
        prev.map(s => (s.id_speciality === id_ ? data : s))
      );
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour de la mention");
    } finally {
      setLoading(false);
    }
  }, []);
  

  // Supprimer une mention
  const removeSpeciality = useCallback(async (id_: number) => {
    setLoading(true);
    setError(null);
    try {
      await specialityApi.remove(id_);
  
      const activity = {
        title: "Suppression mention",
        time: new Date().toDateString(),
        status: "success",
      };
      addActivity(activity);
  
      // Supprime localement la mention du state
      setSpecialities(prev => prev.filter(m => m.id_speciality !== id_));
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
    specialities,
    loading,
    error,
    fetchAll,
    createSpeciality,
    updateSpeciality,
    removeSpeciality,
  };
}
