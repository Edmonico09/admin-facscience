import { useActivity } from "@/context/activity-context";
import { Person } from "@/services/types/person";
import { useState, useEffect, useCallback } from "react";
import * as personApi from "@/services/api/person.api"

export function usePerson() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {addActivity} = useActivity();

  // Charger tous les person
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await personApi.getAllPersons();
      setPersons(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des person");
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer un nouveau person
  const createPerson = useCallback(async (newPerson: Person) => {
    setLoading(true);
    setError(null);
    try {
      const data = await personApi.createPerson(newPerson);
      const activity = {
        title: "Ajout person",
        time: new Date().toDateString(),
        status: "success",
      }
      addActivity(activity);
      setPersons(prev => [data, ...prev] );
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création du person");
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour un person
  const updatePerson = useCallback(async (id_: number, updateData: Person) => {
    setLoading(true);
    setError(null);
    try {
      const data = await personApi.updatePerson(id_, updateData);
      const activity = {
        title: "Mise a jour person",
        time: new Date().toDateString(),
        status: "success",
      }
      addActivity(activity);
      setPersons(prev =>
        prev.map(p => (p.id === id_ ? data : p))
      );
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour du person");
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer un person
  const removePerson = useCallback(async (id_: number, type: string) => {
    setLoading(true);
    setError(null);
    try {
      await personApi.deletePerson(type, id_);
      const activity = {
        title: "Suppression person",
        time: new Date().toDateString(),
        status: "success",
      }
      addActivity(activity);
      setPersons(prev => prev.filter(p => p.id !== id_));
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression du person");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    persons,
    loading,
    error,
    fetchAll,
    createPerson,
    updatePerson,
    removePerson,
  };
}
