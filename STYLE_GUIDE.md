# Guide de Style - Application PMR Nantes

## 🎯 Conventions React/JavaScript

### Structure des Composants

```jsx
// Import des dépendances
import React, { useState, useEffect } from 'react';
import './ComponentName.css';

/**
 * Description du composant
 * @param {Object} props - Props du composant
 * @param {string} props.prop1 - Description de prop1
 * @returns {JSX.Element} - Élément JSX rendu
 */
const ComponentName = ({ prop1, prop2, onAction }) => {
  // État
  const [state, setState] = useState(initialValue);

  // Effets
  useEffect(() => {
    // Logique de l'effet
  }, [dependencies]);

  // Handlers
  const handleAction = (value) => {
    // Logique du handler
  };

  // Rendu
  return (
    <div className="component-name">
      {/* Contenu */}
    </div>
  );
};

export default ComponentName;
```

### Nommage des Fichiers

- **Composants** : `PascalCase.jsx` (ex: `SearchBar.jsx`)
- **Hooks** : `use[HookName].js` (ex: `usePMRLocations.js`)
- **Services** : `camelCase.js` (ex: `pmrService.js`)
- **Utilitaires** : `camelCase.js` (ex: `geoUtils.js`)
- **Styles** : `kebab-case.css` (ex: `search-bar.css`)

### Nommage des Variables et Fonctions

```javascript
// Variables
const maxLocations = 100;
const isLoading = false;
const pmrLocations = [];

// Fonctions
const calculateDistance = (lat1, lon1, lat2, lon2) => {};
const formatAddress = (address) => {};
const handleSearch = (query) => {};

// Événements
const onSearch = (query) => {};
const onClick = () => {};
const onChange = (value) => {};
```

### Nommage des Classes CSS

Utiliser BEM (Block Element Modifier) :

```css
/* Block */
.search-bar {
  /* Styles */
}

/* Element */
.search-bar__input {
  /* Styles */
}

.search-bar__button {
  /* Styles */
}

/* Modifier */
.search-bar__button--active {
  /* Styles */
}

.search-bar__button--disabled {
  /* Styles */
}
```

## 📐 Structure des Répertoires

```
src/
├── components/           # Composants React réutilisables
│   ├── Map.jsx
│   ├── SearchBar.jsx
│   └── index.js          # Export centralisé
├── services/            # Logique métier et API
│   ├── pmrService.js
│   └── routingService.js
├── hooks/               # Hooks personnalisés
│   └── usePMRLocations.js
├── utils/               # Fonctions utilitaires
│   ├── animations.js
│   └── geoUtils.js
├── constants/           # Constantes et labels
│   └── labels.js
├── config/              # Configuration
│   └── appConfig.js
├── styles/              # CSS global
│   ├── map.css
│   └── searchBar.css
├── App.jsx              # Composant principal
├── main.jsx             # Point d'entrée
└── index.css            # Styles globaux
```

## 🎨 Conventions de Style CSS

### Variables CSS

```css
:root {
  /* Couleurs */
  --color-primary: #4a90e2;
  --color-success: #7ed321;
  --color-warning: #f5a623;
  --color-error: #ff6b6b;
  
  /* Espacements */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Typographie */
  --font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
}
```

### Ordre des Propriétés CSS

```css
.element {
  /* Positionnement */
  position: relative;
  top: 0;
  left: 0;
  z-index: 10;

  /* Dimensions */
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;

  /* Affichage */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Apparence */
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  /* Typographie */
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  color: #333;

  /* Transitions */
  transition: all var(--transition-normal);
}
```

## 📝 Documentation

### JSDoc

```javascript
/**
 * Décrit brièvement la fonction
 * Description plus longue si nécessaire
 * 
 * @param {type} paramName - Description du paramètre
 * @param {type} optionalParam - Description (optionnel)
 * @returns {type} Description de la valeur retournée
 * @throws {Error} Description des erreurs possibles
 * 
 * @example
 * const result = myFunction(value);
 */
const myFunction = (paramName, optionalParam = null) => {};
```

### Commentaires

```javascript
// Commentaire pour une ligne
const variable = value;

/**
 * Commentaire pour un bloc
 */
const complexLogic = () => {
  // Étape 1: ...
  // Étape 2: ...
};
```

## ♿ Accessibilité

### ARIA Labels

```jsx
<button aria-label="Rechercher une adresse">
  <span>🔍</span>
</button>
```

### Sémantique HTML

```jsx
// ✓ Bon
<button onClick={handleClick}>Cliquez-moi</button>

// ✗ Mauvais
<div onClick={handleClick}>Cliquez-moi</div>
```

## 🧪 Gestion d'Erreur

```javascript
try {
  const data = await fetchData();
  // Traiter les données
} catch (error) {
  console.error('Message d\'erreur:', error);
  // Gestion de l'erreur
  throw error; // Re-lever si nécessaire
}
```

## 📱 Responsive Design

Breakpoints:
- Desktop: 1024px+
- Tablette: 768px - 1023px
- Mobile: < 768px

```css
/* Mobile first */
.component {
  /* Styles mobiles */
}

@media (min-width: 768px) {
  .component {
    /* Styles tablette */
  }
}

@media (min-width: 1024px) {
  .component {
    /* Styles desktop */
  }
}
```

## 🔗 Ressources

- [React Documentation](https://react.dev)
- [Leaflet Documentation](https://leafletjs.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [Web Accessibility](https://www.w3.org/WAI/)

