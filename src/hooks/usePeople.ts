import { useState, useEffect } from 'react';
import { BasePerson, Person, PersonType } from '@/services/types/person';
import { getAllPersons, createPerson, updatePerson, deletePerson } from '@/services/api/person.api';
import { options } from '@/services/types/option';

interface UsePeopleReturn {
    people: Person[];
    loading: boolean;
    error: string | null;
    selectOptions: options;
    createOpt: (optionType: keyof options, data: { nom: string }) => Promise<void>;
    createNewPerson: (personData: Omit<Person, "id">) => Promise<BasePerson>;
    updatePersons: (person: BasePerson & { type: string }) => Promise<BasePerson>;
    removePerson: (person: BasePerson) => Promise<void>;
    refresh: () => Promise<void>;
}

export function usePeople(activeTab: PersonType): UsePeopleReturn {
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    // Options par défaut pour éviter l'erreur
    const selectOptions: options = {
        postAffectations: [],
        grades: [],
        fonctions: [],
        titres: [],
        appartenances: [],
        responsabilites: []
    };

    const loadPeople = async () => {
        setLoading(true);
        setError(null);
        try {
            const allPeople = await getAllPersons();
            // Filtrer par le type actif dans le frontend et convertir en Person[]
            const filteredPeople = allPeople
                .filter(person => person.type === activeTab)
                .map(person => person as Person); // Conversion de BasePerson vers Person
                
            setPeople(filteredPeople);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue');
        } finally {
            setLoading(false);
        }
    };

    // Fonction createOpt temporaire
    const createOpt = async (optionType: keyof options, data: { nom: string }): Promise<void> => {
        console.log('Creating option:', optionType, data);
        // À implémenter selon votre API d'options
    };

    const createNewPerson = async (personData: Omit<Person, "id">) => {
        try {
            const newPerson = await createPerson(personData);
            await loadPeople(); // Recharger la liste
            return newPerson;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur lors de la création');
            throw err;
        }
    };

    const updatePersons = async (person: BasePerson & { type: string }) => {
        try {
            const updatedPerson = await updatePerson(person);
            await loadPeople(); // Recharger la liste
            return updatedPerson;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
            throw err;
        }
    };

    const removePerson = async (person: BasePerson) => {
        try {
            await deletePerson(person.id);
            await loadPeople(); // Recharger la liste
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
            throw err;
        }
    };

    useEffect(() => {
        loadPeople();
    }, [activeTab]);

    return {
        people,
        loading,
        error,
        selectOptions,
        createOpt,
        createNewPerson,
        updatePersons,
        removePerson,
        refresh: loadPeople
    };
}