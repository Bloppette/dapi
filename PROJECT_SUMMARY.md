# 📱 Résumé du Projet - PMR Nantes

## 🎯 Vue d'Ensemble

Application web complète de cartographie pour localiser les places de stationnement PMR (Personnes à Mobilité Réduite) à Nantes et sa métropole. Construite avec les meilleures pratiques React/JavaScript modernes.

---

## 📂 Structure du Projet

```
dapi/
├── 📄 index.html                 # Point d'entrée HTML
├── 📄 package.json               # Dépendances du projet
├── 📄 vite.config.js            # Configuration Vite
├── 📄 eslint.config.js          # Configuration ESLint
├── 📄 .env.example              # Variables d'environnement (exemple)
├── 📄 .gitignore                # Fichiers ignorés par Git
│
├── 📁 src/                       # Code source
│   ├── 📄 App.jsx               # Composant principal
│   ├── 📄 main.jsx              # Point d'entrée JavaScript
│   ├── 📄 App.css               # Styles App
│   ├── 📄 index.css             # Styles globaux
│   │
│   ├── 📁 components/           # Composants React
│   │   ├── Map.jsx              # Composant de carte Leaflet
│   │   ├── SearchBar.jsx        # Barre de recherche
│   │   ├── RoutingPanel.jsx     # Panneau d'itinéraires
│   │   ├── FilterBar.jsx        # Filtres de catégories
│   │   ├── AccessibilityPanel.jsx # Options d'accessibilité
│   │   ├── PMRMarkerPopup.jsx   # Popup des marqueurs PMR
│   │   └── index.js             # Exports centralisés
│   │
│   ├── 📁 services/             # Services API
│   │   ├── pmrService.js        # API Nantes Métropole
│   │   ├── routingService.js    # API IGN Routing/Geocoding
│   │   └── index.js             # Exports centralisés
│   │
│   ├── 📁 hooks/                # Hooks React personnalisés
│   │   ├── usePMRLocations.js   # Gestion des places PMR
│   │   └── index.js             # Exports centralisés
│   │
│   ├── 📁 utils/                # Fonctions utilitaires
│   │   ├── animations.js        # Animations et easing
│   │   ├── geoUtils.js          # Calculs géographiques
│   │   └── index.js             # Exports centralisés
│   │
│   ├── 📁 constants/            # Constantes
│   │   └── labels.js            # Textes et labels
│   │
│   ├── 📁 config/               # Configuration
│   │   └── appConfig.js         # Configuration globale
│   │
│   ├── 📁 styles/               # Fichiers CSS
│   │   ├── map.css
│   │   ├── searchBar.css
│   │   ├── routingPanel.css
│   │   ├── filterBar.css
│   │   ├── accessibilityPanel.css
│   │   └── pmrMarker.css
│   │
│   └── 📁 assets/               # Ressources
│       └── react.svg
│
├── 📁 public/                    # Ressources statiques
│   └── vite.svg
│
├── 📁 dist/                      # Build production (généré)
│
├── 📄 README.md                  # Documentation du projet
├── 📄 STYLE_GUIDE.md            # Guide de style et conventions
├── 📄 CONTRIBUTING.md           # Guide de contribution
├── 📄 CHANGELOG.md              # Historique des versions
│
└── 📄 node_modules/             # Dépendances (générées)
```

---

## 🚀 Démarrage Rapide

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
# Accédez à http://localhost:5173
```

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

---

## 🎨 Fonctionnalités Principales

### 1. 🗺️ Cartographie Interactive
- Affichage des places PMR sur une carte Leaflet
- Zoom, panoramique, couches de tuiles
- Marqueurs personnalisés avec emojis
- Popups informatifs

### 2. 🔍 Recherche d'Adresses
- Entrée de destination
- Modes: Départ → Arrivée
- Intégration avec géocodage

### 3. 📍 Calcul d'Itinéraires
- Distance en km
- Durée estimée
- Trajet sur la carte
- Affichage dans un panneau latéral

### 4. ♿ Localisation PMR
- Affichage de toutes les places PMR
- Nombre de places
- Durée de stationnement
- Type de place

### 5. 🎛️ Filtres et Catégories
- PMR, Banc, Restaurant, Parking, Toilettes
- Filtrage en temps réel
- Interface intuitive

### 6. ♿ Accessibilité
- Boutons d'accessibilité rapide
- Options (contraste, texte agrandi)
- Navigation au clavier
- ARIA labels

---

## 🛠️ Technologies

### Frontend
- **React 19** - Framework UI
- **Vite 7** - Bundler ultra-rapide
- **Leaflet** - Cartographie
- **react-leaflet** - Intégration React
- **Axios** - Client HTTP
- **CSS3** - Styles modernes

### Développement
- **ESLint** - Linting
- **Babel** - Transpilation (via Vite)

### APIs Intégrées
- **Nantes Métropole** - Données PMR
- **IGN** - Cartographie et routage

---

## 📝 Conventions et Normes

### Nommage
- **Composants** : `PascalCase.jsx`
- **Fichiers** : `camelCase.js`
- **Classes CSS** : `kebab-case` (BEM)
- **Variables** : `camelCase`

### Styles CSS
- Méthodologie BEM
- Variables CSS pour thème
- Responsive mobile-first
- Animations fluides

### Documentation
- JSDoc pour toutes les fonctions
- Commentaires pour logique complexe
- README et guides

---

## 🎯 Architecture

### État Global
```
App (État parent)
├── pmrLocations (Places PMR)
├── startLocation (Départ)
├── endLocation (Destination)
├── route (Itinéraire)
├── routePath (Trajet sur carte)
└── activeFilter (Filtre actif)
```

### Flux de Données
```
SearchBar → App → Map/RoutingPanel
           ↓
      calculateSimulatedRoute
           ↓
      Route calculée + Trajet
```

---

## 🔄 Processus de Recherche

1. **Recherche Départ** : Utilisateur entre une adresse
2. **Géocodage** : Conversion en coordonnées GPS
3. **Affichage Carte** : Centrage sur le point
4. **Recherche Destination** : Utilisateur entre destination
5. **Calcul Itinéraire** : Distance et durée
6. **Affichage Trajet** : Ligne sur la carte
7. **Affichage PMR** : Places à proximité
8. **Sélection PMR** : Utilisateur choisit une place

---

## 📊 Performance

### Optimisations
- Code splitting via Vite
- Lazy loading possible pour composants
- Debounce/throttle pour événements
- CSS optimisé (11.18 KB)
- JS minifié (398.29 KB)

### Métriques Build
- HTML : 1.68 kB
- CSS : 11.18 kB (gzip: 2.46 kB)
- JS : 398.29 kB (gzip: 124.44 kB)
- Temps build : ~2 secondes

---

## ♿ Accessibilité

### WCAG Compliance
- Labels ARIA sur tous les boutons
- HTML sémantique
- Contraste de couleurs respecté
- Navigation au clavier possible
- Lecteur d'écran compatible

### Fonctionnalités
- Mode contraste élevé
- Texte agrandi
- Support lecteur d'écran
- Préférence mouvement réduit

---

## 🧪 Tests et Qualité

### Linting
```bash
npm run lint
```

### Compilation
```bash
npm run build
```

### Prévisualisation
```bash
npm run preview
```

---

## 🔐 Sécurité

- Pas de données sensibles exposées
- HTTPS recommandé en production
- Validation des entrées utilisateur
- APIs publiques (pas de clés secrètes)

---

## 📱 Responsivité

### Breakpoints
- **Mobile** : < 480px
- **Tablette** : 480px - 768px
- **Desktop** : > 768px

### Adaptations
- Recherche: Réduction de width sur mobile
- Panneau: Réorganisation verticale
- Filtres: Scroll horizontal sur mobile
- Accessibilité: Boutons plus grands

---

## 🚀 Déploiement

### Plateforme Recommandées
- **Vercel** : Déploiement Vite optimisé
- **Netlify** : CI/CD intégré
- **GitHub Pages** : Gratuit et simple
- **AWS** : Scalabilité entreprise

### Commandes
```bash
npm run build      # Créer la build
npm run preview    # Tester localement
# Déployer le dossier dist/
```

---

## 📚 Ressources

- [React Docs](https://react.dev)
- [Vite Docs](https://vite.dev)
- [Leaflet Docs](https://leafletjs.com)
- [Axios Docs](https://axios-http.com)
- [BEM CSS](http://getbem.com)

---

## 📞 Support

Consultez:
- README.md - Documentation générale
- STYLE_GUIDE.md - Conventions de code
- CONTRIBUTING.md - Contribution
- CHANGELOG.md - Historique

---

**Version** : 1.0.0  
**Statut** : Production Ready  
**Dernière Mise à Jour** : 11 Janvier 2024

