import React from 'react';
import '../styles/routingPanel.css';

/**
 * Composant pour afficher le panneau de routage avec les itinéraires
 * et les informations de distance/durée
 */
const RoutingPanel = ({
  startLocation,
  endLocation,
  route,
  isLoading,
  onClear,
  onClose,
  pmrNearbyCount = 0,
  onShowPMRNearby,
}) => {
  if (!startLocation && !endLocation) {
    return (
      <div className="routing-panel routing-panel--empty">
        <div className="routing-panel__placeholder">
          <p>✓ Sélectionnez un point de départ et une destination</p>
        </div>
      </div>
    );
  }

  return (
    <div className="routing-panel">
      <div className="routing-panel__header">
        <h2>Itinéraire</h2>
        <button
          className="routing-panel__close-button"
          onClick={onClose}
          aria-label="Fermer le panneau"
        >
          ✕
        </button>
      </div>

      <div className="routing-panel__locations">
        {startLocation && (
          <div className="routing-panel__location">
            <span className="routing-panel__location-label">Départ:</span>
            <span className="routing-panel__location-value">
              {startLocation.adresse || startLocation.address}
            </span>
          </div>
        )}

        {endLocation && (
          <div className="routing-panel__location">
            <span className="routing-panel__location-label">Arrivée:</span>
            <span className="routing-panel__location-value">
              {endLocation.adresse || endLocation.address}
            </span>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="routing-panel__loading">
          Calcul de l'itinéraire...
        </div>
      )}

      {route && !isLoading && (
        <div className="routing-panel__info">
          <div className="routing-panel__stat">
            <span className="routing-panel__stat-icon">📏</span>
            <div className="routing-panel__stat-content">
              <span className="routing-panel__stat-label">Distance</span>
              <span className="routing-panel__stat-value">
                {route.distance} km
              </span>
            </div>
          </div>

          <div className="routing-panel__stat">
            <span className="routing-panel__stat-icon">⏱️</span>
            <div className="routing-panel__stat-content">
              <span className="routing-panel__stat-label">Durée estimée</span>
              <span className="routing-panel__stat-value">
                {route.duration} min
              </span>
            </div>
          </div>

          {endLocation && endLocation.nombrePlaces !== undefined && (
            <div className="routing-panel__stat">
              <span className="routing-panel__stat-icon">🚗</span>
              <div className="routing-panel__stat-content">
                <span className="routing-panel__stat-label">Places disponibles</span>
                <span className="routing-panel__stat-value">
                  {endLocation.nombrePlaces}
                </span>
              </div>
            </div>
          )}

          {pmrNearbyCount > 0 && (
            <button
              className="routing-panel__pmr-button"
              onClick={onShowPMRNearby}
              aria-label={`Afficher ${pmrNearbyCount} places PMR à proximité`}
            >
              <span className="routing-panel__pmr-icon">♿</span>
              <span className="routing-panel__pmr-label">
                {pmrNearbyCount} place{pmrNearbyCount > 1 ? 's' : ''} PMR
              </span>
            </button>
          )}

          <button
            className="routing-panel__clear-button"
            onClick={onClear}
            aria-label="Effacer l'itinéraire"
          >
            🗑️ Effacer l'itinéraire
          </button>
        </div>
      )}

      {!route && !isLoading && (startLocation && endLocation) && (
        <div className="routing-panel__empty">
          Impossible de calculer l'itinéraire
        </div>
      )}
    </div>
  );
};

export default RoutingPanel;

