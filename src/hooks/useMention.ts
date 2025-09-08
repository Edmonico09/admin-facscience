import { useState, useEffect, useCallback } from "react";
import { Mention } from "@/services/types/mention";
import { useActivity } from "@/context/activity-context";
import * as mentionApi from "@/services/api/mention.api";

export function useMention() {
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addActivity } = useActivity();

  // Charger toutes les mentions
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mentionApi.get();
      setMentions(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des mentions");
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer une nouvelle mention
  const createMention = useCallback(async (newMention: Mention) => {
    setLoading(true);
    setError(null);
    try {
      const data = await mentionApi.create(newMention);
      const activity = {
        title: "Ajout mention",
        time: new Date().toISOString(),
        status: "success",
      };
      addActivity(activity);
      setMentions(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création de la mention");
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour une mention
  const updateMention = useCallback(async (id_: number, updateData: Partial<Mention>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await mentionApi.update(id_, updateData);
      const activity = {
        title: "Mise à jour mention",
        time: new Date().toISOString(),
        status: "success",
      };
      addActivity(activity);
      setMentions(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour de la mention");
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer une mention
  const removeMention = useCallback(async (id_: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await mentionApi.remove(id_);
      const activity = {
        title: "Suppression mention",
        time: new Date().toISOString(),
        status: "success",
      };
      addActivity(activity);
      setMentions(data);
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
    mentions,
    loading,
    error,
    fetchAll,
    createMention,
    updateMention,
    removeMention,
  };
}
