import React, { useState } from 'react';
import '../styles/accessibilityPanel.css';

/**
 * Composant pour afficher les options d'accessibilité et les contrôles rapides
 */
const AccessibilityPanel = ({ onSettingsClick, onAddMarker }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortcuts = [
    {
      id: 'add-marker',
      label: 'Ajouter',
      icon: '➕',
      description: 'Ajouter un point difficile',
      action: 'add-marker',
      color: '#ff6b6b',
    },
  ];

  const handleShortcutClick = (shortcut) => {
    if (shortcut.action === 'add-marker') {
      onAddMarker?.();
    } else {
      onSettingsClick?.(shortcut.action);
    }
    // Fermer le menu après le clic
    setIsExpanded(false);
  };

  return (
    <div className="accessibility-panel">
      {/* Bouton burger */}
      <button
        className={`accessibility-panel__burger ${
          isExpanded ? 'accessibility-panel__burger--active' : ''
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        title="Ouvrir le menu"
        aria-label="Menu des raccourcis"
        aria-expanded={isExpanded}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Menu déroulant */}
      {isExpanded && (
        <div className="accessibility-panel__menu">
          <div className="accessibility-panel__shortcuts">
            {shortcuts.map((shortcut) => (
              <button
                key={shortcut.id}
                className="accessibility-panel__shortcut"
                style={{ backgroundColor: shortcut.color }}
                onClick={() => handleShortcutClick(shortcut)}
                title={shortcut.description}
                aria-label={shortcut.description}
              >
                <span className="accessibility-panel__shortcut-icon">
                  {shortcut.icon}
                </span>
                <span className="accessibility-panel__shortcut-label">
                  {shortcut.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityPanel;

