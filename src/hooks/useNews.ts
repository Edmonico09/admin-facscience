import { createCategory, createMedia, createNews, deleteMedia, deleteNews, getCategory, getNews, UpdateNews, updateStatus } from "@/services/api/event.api";
import { Actualite, Category } from "@/services/types/event";
import { useState, useEffect, useCallback } from "react";


export function useNews(){
    const [news, setNews] = useState<Actualite[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([])
  
    
    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
          const [newsData, categoriesData] = await Promise.all([
            getNews(),
            getCategory(),
          ]);

        console.log('ON the HOOKS >>>>> ', JSON.stringify(newsData, null, 2))
          
          setNews(newsData);
          setCategories(categoriesData);

        } catch (err: any) {
          setError(err.message || "Erreur lors du chargement des données");
        } finally {
          setLoading(false);
        }
        // setNews(upcomingEvents)
      }, []);


    const createCategories = useCallback(async (category: string) => {
        setLoading(true);
        setError(null);
        try {
        const data = await createCategory(category);
        
        setCategories((prev) => [...prev, data]);
    } catch (err: any) {
        setError(err.message || "Erreur lors de la création de la category");
        } finally {
        setLoading(false);
        }
    }, []);
    
    
    const createMedias = useCallback(async (file : File , idActualite : number) => {
        setLoading(true);
        setError(null);
        try {
        const newMedia = await createMedia(idActualite , file);
        setNews((prev) =>
            prev.map((item) =>
              item.idActualite === idActualite
                ? { ...item, medias: [...(item.medias || []), newMedia] }
                : item
            )
          );
          return newMedia;
    } catch (err: any) {
        setError(err.message || "Erreur lors de la création de la média");
        } finally {
        setLoading(false);
        }
    }, []);


    const removeMedia = useCallback(async ( idActualite : number , mediaId: number) => {
    setLoading(true);
    setError(null);
    try {
        await deleteMedia(idActualite , mediaId);
        

        setNews((prev) =>
        prev.map((item) =>
            item.idActualite === idActualite
            ? { ...item, medias: item.medias?.filter((m) => m.id !== mediaId) || [] }
            : item
        )
        );
        return true;
        
    } catch (err: any) {
        setError(err.message || "Erreur lors de la suppression du médias");
        throw err;
      } finally {
        setLoading(false);
    }
    }, []);  


    const createActualite = useCallback(async (newItem: Actualite) => {
        setLoading(true);
        setError(null);
        try {
        const data = await createNews(newItem);
        
        setNews((prev) => [...prev, data]); 
    } catch (err: any) {
        setError(err.message || "Erreur lors de la création de l'actualité");
        } finally {
        setLoading(false);
        }
    }, []);
    

      const updateActus = useCallback(async (actus : Actualite) => {
        setLoading(true);
        setError(null);
        try {
          const savedNews = await UpdateNews(actus);
      
          
          setNews((prev) =>
            prev.map((n) => (n.idActualite === savedNews.idActualite ? savedNews : n)),
          )
        } catch (err: any) {
          setError(err.message || "Erreur lors de la mise à jour de l'actualite");
        } finally {
          setLoading(false);
        }
      }, []);
    

    const removeNews = useCallback(async ( idActualite : number) => {
      setLoading(true);
      setError(null);
      try {
          await deleteNews(idActualite);
          
  
          setNews((prev) => prev.filter((n) => n.idActualite !== idActualite));

          return true;
      } catch (err: any) {
          setError(err.message || "Erreur lors de la suppression de l'actualité");
          throw err;
        } finally {
          setLoading(false);
      }
      }, []);  
    
    
      const changeStatus = useCallback(async (    
        idActualite: number,
        newStatus: "draft" | "published" | "archived"
    ) => {
        setLoading(true);
        setError(null);
        try {
        const updatedNews = await updateStatus(idActualite, newStatus);
        setNews((prev) =>
          prev.map((n) => (n.idActualite === idActualite ? updatedNews : n))
        );
        return updatedNews;
    } catch (err: any) {
        setError(err.message || "Erreur lors de la création de la média");
        throw err;  
      } finally {
        setLoading(false);
        }
    }, []);


      useEffect(() => {
        fetchAll();
      }, [fetchAll ]);
    
      return{
        news,
        loading,
        error,
        categories,
        fetchAll,
        createCategories,
        createMedias,
        removeMedia,
        createActualite,
        updateActus,
        removeNews,
        changeStatus
      }
}