import { addLabo, deleteLabo, getLabos, updateLabo } from "@/services/api/labo.api";
import { get } from "@/services/api/mention.api";
import { getAllPersons } from "@/services/api/person.api";
import { Laboratory } from "@/services/types/labo";
import { Mention } from "@/services/types/mention";
import { BasePerson } from "@/services/types/person";
import { useCallback, useEffect, useState } from "react";

export function useLabo() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mentions, setMention] = useState<Mention[]>([]);
  const [persons, setPerson] = useState<BasePerson[]>([]);
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [mentionsData, personsData, labosData] = await Promise.all([
        get(),
        getAllPersons(),
        getLabos(),
      ]);
      setMention(mentionsData);
      setPerson(personsData);
      setLaboratories(labosData);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  }, []);

  const createLaboratory = useCallback(async (newLab: Laboratory) => {
    setLoading(true);
    setError(null);
    try {
      const addedLabo = await addLabo(newLab);
      setLaboratories((prev) => [...prev, addedLabo]);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création du laboratoire");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLabos = useCallback(async (idLabo: number, updatedLabData: Laboratory) => {
    setLoading(true);
    setError(null);
    try {
      const updatedLab = await updateLabo(idLabo, updatedLabData);
      setLaboratories((prev) =>
        prev.map((lab) => (lab.idLabo === updatedLab.idLabo ? updatedLab : lab))
      );
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour du laboratoire");
    } finally {
      setLoading(false);
    }
  }, []);

  const removeLabos = useCallback(async (idLabo: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteLabo(idLabo);
      setLaboratories((prev) => prev.filter((lab) => lab.idLabo !== idLabo));
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression du laboratoire");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    loading,
    error,
    mentions,
    persons,
    laboratories,
    createLaboratory,
    updateLabos,
    removeLabos,
  };
}
