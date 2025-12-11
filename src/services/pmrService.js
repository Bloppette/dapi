import axios from 'axios';

// API Nantes Métropole pour les places PMR
const NANTES_METROPOLE_API = 'https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_emplacements-pmr-nantes-metropole/records';

/**
 * Récupère les places PMR à proximité d'une localité
 * @param {Object} options - Options de recherche
 * @param {number} options.limit - Nombre de résultats à retourner
 * @param {number} options.offset - Décalage pour la pagination
 * @returns {Promise<Array>} - Tableau des places PMR
 */
export const getPMRLocations = async (options = {}) => {
  try {
    const { limit = 100, offset = 0 } = options;
    const response = await axios.get(NANTES_METROPOLE_API, {
      params: {
        limit,
        offset,
        order_by: 'commune',
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des places PMR:', error);
    throw error;
  }
};

/**
 * Récupère les places PMR avec filtrage par commune
 * @param {string} commune - Nom de la commune
 * @returns {Promise<Array>} - Tableau des places PMR filtrées
 */
export const getPMRByCommune = async (commune) => {
  try {
    const response = await axios.get(NANTES_METROPOLE_API, {
      params: {
        where: `commune like "${commune}"`,
        limit: 100,
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error(`Erreur lors de la récupération des places PMR pour ${commune}:`, error);
    throw error;
  }
};

/**
 * Récupère toutes les places PMR de Nantes Métropole
 * @returns {Promise<Array>} - Tableau de toutes les places PMR
 */
export const getAllPMRLocations = async () => {
  try {
    const response = await axios.get(NANTES_METROPOLE_API, {
      params: {
        limit: 1000,
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error('Erreur lors de la récupération de toutes les places PMR:', error);
    throw error;
  }
};

/**
 * Formatte les données de l'API pour la carte
 * @param {Array} pmrData - Données brutes de l'API
 * @returns {Array} - Données formatées
 */
export const formatPMRData = (pmrData) => {
  return pmrData.map((location) => ({
    id: location.record_id,
    latitude: location.geo_point_2d?.lat || 0,
    longitude: location.geo_point_2d?.lon || 0,
    commune: location.commune || 'Commune inconnue',
    adresse: location.adresse || 'Adresse inconnue',
    nombrePlaces: location.nombre_places || 0,
    duree: location.duree_stationnement || 'Non spécifiée',
    type: location.type_de_stationnement || 'Non spécifié',
  }));
};

