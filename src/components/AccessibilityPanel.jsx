import React from 'react';
import '../styles/accessibilityPanel.css';

/**
 * Composant pour afficher les options d'accessibilité et les contrôles rapides
 */
const AccessibilityPanel = ({ onSettingsClick, onAddMarker }) => {
    return (
        <div className="accessibility-panel">
            {/* Bouton d'alerte/exclamation */}
            <button
                className="accessibility-panel__alert-button"
                onClick={onAddMarker}
                title="Signaler un obstacle"
                aria-label="Menu de signalement"
            >
                <span className="accessibility-panel__alert-icon">!</span>
            </button>
        </div>
    );
};

export default AccessibilityPanel;
