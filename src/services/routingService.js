import axios from 'axios';

// API OSRM pour le routage par les rues (gratuit et open source)
const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1/car';
// Alternative OSRM en cas de problème
const OSRM_ALTERNATIVE_URL = 'https://routing.openstreetmap.de/routed-osrm/car/route/v1/driving';

// API Nominatim pour le géocodage (gratuit)
const NOMINATIM_GEOCODE_URL = 'https://nominatim.openstreetmap.org/search';
const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse';

/**
 * Effectue le géocodage d'une adresse avec Nominatim
 * @param {string} address - L'adresse à géocoder
 * @returns {Promise<Object>} - Objet contenant les coordonnées
 */
export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(NOMINATIM_GEOCODE_URL, {
      params: {
        q: address,
        format: 'json',
        limit: 1,
        countrycodes: 'fr', // Limiter à la France
      },
    });

    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        address: result.display_name,
      };
    }
    throw new Error('Adresse non trouvée');
  } catch (error) {
    console.error('Erreur lors du géocodage:', error);
    throw error;
  }
};

/**
 * Calcule un itinéraire avec une API OSRM donnée
 */
const calculateRouteWithOSRM = async (url, start, end) => {
  const coordinates = `${start.longitude},${start.latitude};${end.longitude},${end.latitude}`;

  const response = await axios.get(`${url}/${coordinates}`, {
    params: {
      overview: 'full',
      geometries: 'geojson',
      steps: true,
      continue_straight: false,
      alternatives: false,
    },
    timeout: 15000,
  });

  if (response.data && response.data.routes && response.data.routes.length > 0) {
    const route = response.data.routes[0];

    if (!route.geometry || !route.geometry.coordinates) {
      throw new Error('Géométrie d\'itinéraire invalide');
    }

    const geometry = route.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
    const durationMinutes = Math.round(route.duration / 60);
    const distanceKm = (route.distance / 1000).toFixed(1);

    return {
      distance: parseFloat(distanceKm),
      duration: durationMinutes,
      geometry: geometry,
      steps: route.legs ? route.legs[0].steps : [],
      isRealRoute: true,
    };
  }

  throw new Error('Aucune route trouvée');
};

/**
 * Calcule un itinéraire entre deux points avec OSRM (par les rues)
 * Essaie deux serveurs OSRM avant de fallback
 * @param {Object} start - Point de départ {latitude, longitude}
 * @param {Object} end - Point d'arrivée {latitude, longitude}
 * @returns {Promise<Object>} - Objet contenant l'itinéraire, distance et durée réels
 */
export const calculateRoute = async (start, end) => {
  try {
    if (!start || !end || !start.longitude || !start.latitude || !end.longitude || !end.latitude) {
      throw new Error('Coordonnées invalides');
    }

    // Essayer le serveur OSRM principal
    try {
      console.log('🚀 Tentative OSRM principal...');
      const result = await calculateRouteWithOSRM(OSRM_BASE_URL, start, end);
      console.log('✓ Itinéraire OSRM réussi (principal)');
      return result;
    } catch (osrmMainError) {
      console.warn('⚠️ OSRM principal échoué, tentative alternative:', osrmMainError.message);

      // Essayer le serveur OSRM alternatif
      try {
        console.log('🚀 Tentative OSRM alternative...');
        const result = await calculateRouteWithOSRM(OSRM_ALTERNATIVE_URL, start, end);
        console.log('✓ Itinéraire OSRM réussi (alternative)');
        return result;
      } catch (osrmAltError) {
        console.warn('⚠️ OSRM alternatif échoué, utilisation du fallback:', osrmAltError.message);
        return calculateRouteFallback(start, end);
      }
    }

  } catch (error) {
    console.error('Erreur lors du calcul de l\'itinéraire:', error);
    throw error;
  }
};

/**
 * Fallback: Calcule un itinéraire simplifié entre deux points
 * @param {Object} start - Point de départ
 * @param {Object} end - Point d'arrivée
 * @returns {Object} - Itinéraire simplifié
 */
const calculateRouteFallback = (start, end) => {
  // Calcul simple de la distance (Haversine)
  const distance = calculateDistance(
    start.latitude,
    start.longitude,
    end.latitude,
    end.longitude
  );

  // Estimation du temps (40 km/h moyenne)
  const duration = Math.round((distance / 40) * 60);

  // Créer un trajet interpolé simple
  const steps = 50;
  const geometry = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    geometry.push([
      start.latitude + (end.latitude - start.latitude) * t,
      start.longitude + (end.longitude - start.longitude) * t,
    ]);
  }

  return {
    distance: parseFloat(distance.toFixed(1)),
    duration,
    geometry,
    steps: [],
    isRealRoute: false, // Indique que c'est un fallback
  };
};

/**
 * Calcule la distance à vol d'oiseau entre deux points (pour info seulement)
 * @param {number} lat1 - Latitude du point 1
 * @param {number} lon1 - Longitude du point 1
 * @param {number} lat2 - Latitude du point 2
 * @param {number} lon2 - Longitude du point 2
 * @returns {number} - Distance en km
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};

