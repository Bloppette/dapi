import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import RoutingPanel from './components/RoutingPanel';
import FilterBar from './components/FilterBar';
import AccessibilityPanel from './components/AccessibilityPanel';
import MarkerSelector from './components/MarkerSelector';
import { getPMRByCommune, getAllPMRLocations, formatPMRData } from './services/pmrService';
import { geocodeAddress, calculateRoute } from './services/routingService';
import { findPMRAlongRoute } from './services/pmrProximityService';
import {
  createMarker,
  saveMarkersToLocalStorage,
  getMarkersFromLocalStorage,
  deleteMarker,
  MARKER_TYPES,
} from './services/customMarkerService';
import './App.css';

/**
 * Composant principal de l'application PMR
 * Gère l'état global et la logique de l'application
 */
function App() {
  const [pmrLocations, setPMRLocations] = useState([]);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [route, setRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('bank');
  const [routePath, setRoutePath] = useState(null);
  const [error, setError] = useState(null);
  const [showPMR, setShowPMR] = useState(false);
  const [showRoutingPanel, setShowRoutingPanel] = useState(false);
  const [pmrNearbyRoute, setPMRNearbyRoute] = useState([]);
  const [customMarkers, setCustomMarkers] = useState([]); // Marqueurs personnalisés
  const [showMarkerSelector, setShowMarkerSelector] = useState(false); // État du sélecteur
  const [pendingMarkerType, setPendingMarkerType] = useState(null); // Type de marqueur en attente
  const [pendingMarkerLocation, setPendingMarkerLocation] = useState(null); // Localisation en attente // Places PMR proches du trajet

  // Charger les places PMR au montage du composant
  useEffect(() => {
    loadPMRLocations();
    // Charger les marqueurs personnalisés sauvegardés
    const savedMarkers = getMarkersFromLocalStorage();
    setCustomMarkers(savedMarkers);
  }, []);

  // Afficher le panneau quand un itinéraire est calculé
  useEffect(() => {
    if (route && routePath) {
      setShowRoutingPanel(true);
    }
  }, [route, routePath]);

  // Calculer les places PMR proches du trajet quand le trajet change
  useEffect(() => {
    if (routePath && pmrLocations.length > 0) {
      const nearby = findPMRAlongRoute(pmrLocations, routePath, 0.5); // Rayon de 500m
      setPMRNearbyRoute(nearby);
    } else {
      setPMRNearbyRoute([]);
    }
  }, [routePath, pmrLocations]);

  /**
   * Charge toutes les places PMR
   */
  const loadPMRLocations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAllPMRLocations();
      const formatted = formatPMRData(data);
      setPMRLocations(formatted);
    } catch (error) {
      console.error('Erreur lors du chargement des places PMR:', error);
      loadPMRByNantes();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Charge les places PMR pour Nantes spécifiquement
   */
  const loadPMRByNantes = async () => {
    try {
      setIsLoading(true);
      const data = await getPMRByCommune('Nantes');
      const formatted = formatPMRData(data);
      setPMRLocations(formatted);
    } catch (error) {
      console.error('Erreur lors du chargement des places PMR de Nantes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Effectue la recherche des adresses et calcule l'itinéraire
   */
  const handleSearch = async (addresses) => {
    try {
      setIsLoading(true);
      setError(null);

      // Récupérer les coordonnées du départ
      let startGeo = addresses.depart;
      if (!startGeo.latitude || !startGeo.longitude) {
        startGeo = await geocodeAddress(addresses.depart.address);
      }
      setStartLocation(startGeo);

      // Récupérer les coordonnées de l'arrivée
      let endGeo = addresses.arrivee;
      if (!endGeo.latitude || !endGeo.longitude) {
        endGeo = await geocodeAddress(addresses.arrivee.address);
      }
      setEndLocation(endGeo);

      // Calculer l'itinéraire
      const routeData = await calculateRoute(startGeo, endGeo);
      setRoute(routeData);
      setRoutePath(routeData.geometry);
      // Le panneau s'affichera automatiquement via useEffect

    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setError(err.message || 'Erreur lors du calcul de l\'itinéraire');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Gère la sélection d'une place PMR
   */
  const handlePMRMarkerClick = (location) => {
    console.log('Place sélectionnée:', location);
  };

  /**
   * Gère le clic sur la carte pour ajouter un marqueur
   */
  const handleMapClick = (coordinates) => {
    console.log('🗺️ Clic sur la carte:', coordinates, 'Type en attente:', pendingMarkerType);

    if (pendingMarkerType) {
      // Créer immédiatement le marqueur
      const newMarker = createMarker(
        coordinates.latitude,
        coordinates.longitude,
        pendingMarkerType,
        '' // Pas de description
      );

      console.log('✅ Marqueur créé:', newMarker);

      const updatedMarkers = [...customMarkers, newMarker];
      setCustomMarkers(updatedMarkers);
      saveMarkersToLocalStorage(updatedMarkers);

      // Réinitialiser
      setPendingMarkerType(null);
      setPendingMarkerLocation(null);
      setShowMarkerSelector(false);
    }
  };

  /**
   * Gère la sélection du type de marqueur
   */
  const handleMarkerTypeSelected = (type) => {
    console.log('🎯 Type sélectionné:', type);
    setPendingMarkerType(type);
    // L'utilisateur doit maintenant cliquer sur la carte
  };

  /**
   * Supprime un marqueur personnalisé
   */
  const handleDeleteCustomMarker = (markerId) => {
    const updatedMarkers = deleteMarker(customMarkers, markerId);
    setCustomMarkers(updatedMarkers);
    saveMarkersToLocalStorage(updatedMarkers);
  };

  /**
   * Affiche le sélecteur de type de marqueur
   */
  const handleShowMarkerSelector = () => {
    setShowMarkerSelector(true);
  };

  /**
   * Ferme le sélecteur de marqueur et réinitialise les états
   */
  const handleCloseMarkerSelector = () => {
    setShowMarkerSelector(false);
    setPendingMarkerType(null);
    setPendingMarkerLocation(null);
  };

  /**
   * Gère le clic sur un marqueur personnalisé
   */
  const handleCustomMarkerClick = (marker) => {
    console.log('Marqueur personnalisé cliqué:', marker);
  };

  /**
   * Réinitialise complètement l'itinéraire et le trajet
   */
  const handleClearRoute = () => {
    setStartLocation(null);
    setEndLocation(null);
    setRoute(null);
    setRoutePath(null);
    setShowRoutingPanel(false);
    setPMRNearbyRoute([]);
    setError(null);
  };

  /**
   * Ferme simplement le panneau sans effacer le trajet
   */
  const handleCloseRoutingPanel = () => {
    setShowRoutingPanel(false);
  };

  /**
   * Gère les changements de filtre
   */
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
  };

  /**
   * Gère l'affichage/masquage des places PMR
   */
  const handlePMRToggle = (checked) => {
    setShowPMR(checked);
  };

  /**
   * Gère le clic sur l'icône fauteuil roulant pour afficher les PMR proches
   */
  const handleShowPMRNearby = () => {
    // Afficher SEULEMENT les places PMR proches du trajet
    if (pmrNearbyRoute.length > 0) {
      setShowPMR(true);
    }
  };

  /**
   * Gère les clics sur les raccourcis d'accessibilité
   */
  const handleAccessibilitySettings = (action) => {
    console.log('Action accessibilité:', action);
  };

  // Déterminer quelles places PMR afficher
  let visiblePMRLocations = [];
  if (showPMR) {
    if (pmrNearbyRoute.length > 0) {
      // Si on a des PMR proches du trajet, afficher seulement celles-là
      visiblePMRLocations = pmrNearbyRoute;
    } else if (routePath) {
      // Si on a un trajet mais pas de PMR proches, afficher vide
      visiblePMRLocations = [];
    } else {
      // Sinon, afficher toutes les PMR (comportement normal)
      visiblePMRLocations = pmrLocations;
    }
  }

  return (
    <div className="app">
      {error && (
        <div className="app__error">
          ⚠️ {error}
        </div>
      )}
      <Map
        pmrLocations={visiblePMRLocations}
        startLocation={startLocation}
        endLocation={endLocation}
        routePath={routePath}
        customMarkers={customMarkers}
        onMarkerClick={handlePMRMarkerClick}
        onMapClick={handleMapClick}
        onCustomMarkerClick={handleCustomMarkerClick}
      />
      <SearchBar
        onSearch={handleSearch}
        isLoading={isLoading}
        startLocation={startLocation}
        endLocation={endLocation}
      />
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        onPMRToggle={handlePMRToggle}
        showPMR={showPMR}
      />
      {showRoutingPanel && (
        <RoutingPanel
          startLocation={startLocation}
          endLocation={endLocation}
          route={route}
          isLoading={isLoading}
          onClear={handleClearRoute}
          onClose={handleCloseRoutingPanel}
          pmrNearbyCount={pmrNearbyRoute.length}
          onShowPMRNearby={handleShowPMRNearby}
        />
      )}
      <AccessibilityPanel
        onSettingsClick={handleAccessibilitySettings}
        onAddMarker={handleShowMarkerSelector}
      />

      {/* Sélecteur de type de marqueur personnalisé */}
      <MarkerSelector
        onMarkerTypeSelected={handleMarkerTypeSelected}
        isActive={showMarkerSelector}
        onClose={handleCloseMarkerSelector}
      />
    </div>
  );
}

export default App;
