import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import '../styles/map.css';
import PMRMarkerPopup from './PMRMarkerPopup';
import MapClickHandler from './MapClickHandler';

// Désactiver les avertissements de Leaflet sur MouseEvent obsolète
// Leaflet utilise les anciennes APIs, mais cela ne cause pas de problèmes
if (typeof window !== 'undefined') {
  // Suppression des avertissements de console pour MouseEvent.mozPressure et mozInputSource
  const originalConsoleWarn = console.warn;
  console.warn = function(...args) {
    if (args[0]?.includes?.('mozPressure') || args[0]?.includes?.('mozInputSource')) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

// ...existing code...
const createPMRIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: #ff6b6b;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        font-size: 20px;
      ">
        ♿
      </div>
    `,
    iconSize: [40, 40],
    popupAnchor: [0, -20],
  });
};

const createStartMarkerIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: #4ecdc4;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        font-size: 20px;
      ">
        📍
      </div>
    `,
    iconSize: [40, 40],
    popupAnchor: [0, -20],
  });
};

const createEndMarkerIcon = () => {
  return L.divIcon({
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: #95e1d3;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        font-size: 20px;
      ">
        🎯
      </div>
    `,
    iconSize: [40, 40],
    popupAnchor: [0, -20],
  });
};

/**
 * Crée une icône personnalisée pour les marqueurs (banc, voiture, poubelle)
 * @param {Object} marker - Objet marqueur
 * @returns {L.Icon} - Icône Leaflet
 */
const createCustomMarkerIcon = (marker) => {
  return L.divIcon({
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: ${marker.color};
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        font-size: 20px;
        cursor: pointer;
      ">
        ${marker.icon}
      </div>
    `,
    iconSize: [40, 40],
    popupAnchor: [0, -20],
  });
};

/**
 * Composant principal de la carte
 * Affiche les places PMR, les points de départ/arrivée et les itinéraires
 */
const Map = ({
  pmrLocations,
  startLocation,
  endLocation,
  routePath,
  onMarkerClick,
  onMapClick,
  customMarkers = [],
  onCustomMarkerClick,
  onMapRightClick,
}) => {
  const [center, setCenter] = React.useState([47.2173, -1.5534]); // Coordonnées de Nantes
  const [zoom, setZoom] = React.useState(13);
  const mapRef = useRef(null);

  // Centre la carte sur les marqueurs
  useEffect(() => {
    if (startLocation && endLocation) {
      const bounds = L.latLngBounds([
        [startLocation.latitude, startLocation.longitude],
        [endLocation.latitude, endLocation.longitude],
      ]);

      // Ajouter les localisations PMR aux limites si présentes
      if (pmrLocations.length > 0) {
        pmrLocations.forEach((location) => {
          bounds.extend([location.latitude, location.longitude]);
        });
      }

      if (mapRef.current) {
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    } else if (startLocation) {
      setCenter([startLocation.latitude, startLocation.longitude]);
      setZoom(14);
    }
  }, [startLocation, endLocation, pmrLocations]);

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        className="map"
        ref={mapRef}
      >
        {/* Gestionnaire de clics sur la carte */}
        <MapClickHandler onMapClick={onMapClick} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {/* Marqueurs PMR */}
        {pmrLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={createPMRIcon()}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(location);
                }
              },
            }}
          >
            <Popup maxWidth={280} minWidth={200} autoPan={true} autoPanPaddingTopLeft={[50, 50]}>
              <PMRMarkerPopup
                location={location}
                onSelect={onMarkerClick}
              />
            </Popup>
          </Marker>
        ))}

        {/* Marqueur de départ */}
        {startLocation && (
          <Marker
            position={[startLocation.latitude, startLocation.longitude]}
            icon={createStartMarkerIcon()}
          >
            <Popup maxWidth={280} minWidth={200} autoPan={true} autoPanPaddingTopLeft={[50, 50]}>
              <div className="location-popup">
                <strong>Départ</strong>
                <p>{startLocation.adresse || startLocation.address}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marqueur d'arrivée */}
        {endLocation && (
          <Marker
            position={[endLocation.latitude, endLocation.longitude]}
            icon={createEndMarkerIcon()}
          >
            <Popup maxWidth={280} minWidth={200} autoPan={true} autoPanPaddingTopLeft={[50, 50]}>
              <div className="location-popup">
                <strong>Arrivée</strong>
                <p>{endLocation.adresse || endLocation.address}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marqueurs personnalisés (banc, voiture, poubelle) */}
        {customMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
            icon={createCustomMarkerIcon(marker)}
            eventHandlers={{
              click: () => {
                if (onCustomMarkerClick) {
                  onCustomMarkerClick(marker);
                }
              },
            }}
          >
            <Popup maxWidth={280} minWidth={200} autoPan={true} autoPanPaddingTopLeft={[50, 50]}>
              <div className="location-popup">
                <strong>{marker.label}</strong>
                <p>{marker.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Affichage du trajet */}
        {routePath && routePath.length > 1 && (
          <Polyline
            positions={routePath}
            color="#4a90e2"
            weight={4}
            opacity={0.8}
            dashArray="5, 5"
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;

