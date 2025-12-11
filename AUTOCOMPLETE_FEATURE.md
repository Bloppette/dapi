# ✅ Autocomplétion avec API Nominatim - Données Limitées à Nantes

## 🎯 Fonctionnalité Implementée

### ✨ Autocomplétion en Temps Réel

Dès que vous commencez à taper une rue ou une adresse, une liste de suggestions s'affiche pour vous aider à remplir les champs.

---

## 🗺️ Zone Géographique: Nantes

L'autocomplétion est **limitée à la région de Nantes et ses alentours**:

```
Limites de recherche:
├─ Latitude: 47.15 à 47.30
├─ Longitude: -1.65 à -1.45
└─ Ville principale: Nantes (44)
```

Les suggestions retournées concernent uniquement les adresses à proximité de Nantes.

---

## 📋 Fichiers Créés

### 1. `autocompleteService.js` (Nouveau)
**Service pour récupérer les suggestions**

```javascript
// Récupère les suggestions à proximité de Nantes
getAutocompleteSuggestions(query)

// Récupère spécifiquement les rues
getStreetSuggestions(query)

// Retourne l'emoji approprié par type d'adresse
getIconForType(type)
```

### 2. `Autocomplete.jsx` (Nouveau)
**Composant réutilisable pour l'autocomplétion**

```jsx
<Autocomplete
  value={input}
  onChange={setInput}
  onSelect={handleSelect}
  placeholder="Commencez à taper..."
  label="📍 Départ"
  disabled={false}
/>
```

### 3. `autocomplete.css` (Nouveau)
**Styles pour le composant Autocomplete**

---

## 🚀 Fonctionnement

### Étape 1: Utilisateur tape une adresse
```
Utilisateur: "Rue d"
         ↓
Liste de suggestions:
├─ Rue de la Paix, Nantes
├─ Rue du Port, Nantes
├─ Rue de Strasbourg, Nantes
└─ ...
```

### Étape 2: Les suggestions s'affichent
```
┌──────────────────────────────────┐
│ Rue d                             │
├──────────────────────────────────┤
│ 🛣️  Rue de la Paix, Nantes      │
│ 🛣️  Rue du Port, Nantes         │
│ 🛣️  Rue de Strasbourg, Nantes   │
│ 🛣️  Rue des Olivettes, Nantes   │
└──────────────────────────────────┘
```

### Étape 3: Utilisateur clique ou sélectionne
```
Utilisateur clique sur: "Rue de la Paix"
         ↓
Le champ se remplit automatiquement
Les coordonnées GPS sont récupérées
```

---

## 🎨 Interface

### Autocomplétion Visuelle

```
Départ: [Rue de la Paix........]  ✕
        └─ Suggestions ────────
           🛣️  Rue de la Paix
           🛣️  Rue du Port
           🏠 Place Royale
           🏙️  Nantes Centre

Arrivée: [Gare SN..............]  ⏳
        └─ Recherche en cours...
```

---

## ⌨️ Navigation au Clavier

| Touche | Action |
|--------|--------|
| `↓` | Sélectionner la suggestion suivante |
| `↑` | Sélectionner la suggestion précédente |
| `Entrée` | Valider la sélection |
| `Échap` | Fermer la liste |
| `Backspace` | Supprimer un caractère |

---

## 🔍 Types de Lieux Supportés

L'autocomplétion retourne différents types de lieux avec des icônes:

| Type | Icône | Exemple |
|------|-------|---------|
| Rue | 🛣️ | Rue de la Paix |
| Maison | 🏠 | 25 Rue du Port |
| Zone résidentielle | 🏘️ | Quartier Contrescarpe |
| Place | 📍 | Place Royale |
| Ville | 🏙️ | Nantes |
| Aménité | 🏢 | Centre Ville |
| Magasin | 🏪 | Carrefour Nantes |
| Restaurant | 🍽️ | Crêperie Nantaise |
| Parking | 🅿️ | Parking Centre |
| Hôpital | 🏥 | CHU Nantes |
| École | 🎓 | École Primaire |
| Bibliothèque | 📚 | Bibliothèque Nantes |
| Musée | 🖼️ | Musée des Beaux-Arts |
| Gare | 🚂 | Gare SNCF Nantes |
| Arrêt bus | 🚌 | Ligne 1 Bus |

---

## 💡 Caractéristiques Principales

### ✅ Debouncing
```javascript
// Attente de 300ms après la dernière saisie
// Évite les requêtes API inutiles
debounce(300)
```

### ✅ Limitation Géographique
```javascript
// Limiter à Nantes et ses alentours
viewbox: "minLon, maxLat, maxLon, minLat"
bounded: 1
```

### ✅ Sélection Intelligente
- Clics sur une suggestion
- Navigation au clavier
- Recherche libre si aucune suggestion

### ✅ Indicateurs Visuels
- ⏳ Icône "chargement" pendant la requête
- ✕ Bouton pour effacer
- Surlignage de la suggestion sélectionnée

---

## 🔧 Code Exemple

### Utiliser l'Autocomplete

```jsx
import Autocomplete from './components/Autocomplete';

function MyComponent() {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(null);

  const handleSelect = (suggestion) => {
    console.log('Sélectionné:', suggestion);
    // {
    //   id: 123,
    //   label: "Rue de la Paix, 44000 Nantes, France",
    //   address: "Rue de la Paix, 44000 Nantes, France",
    //   latitude: 47.2150,
    //   longitude: -1.5533,
    //   type: "road",
    //   icon: "🛣️"
    // }
    setSelected(suggestion);
  };

  return (
    <Autocomplete
      value={value}
      onChange={setValue}
      onSelect={handleSelect}
      placeholder="Entrez une adresse..."
      label="Destination"
    />
  );
}
```

---

## 🌐 API Utilisée

### Nominatim (OpenStreetMap)

```javascript
// URL
https://nominatim.openstreetmap.org/search

// Paramètres
{
  q: "Rue de la Paix",              // Texte à chercher
  format: "json",                   // Format de réponse
  limit: 10,                        // Nombre de résultats max
  viewbox: "lon1,lat2,lon2,lat1",   // Zone de recherche
  bounded: 1,                       // Restreindre à la zone
  countrycodes: "fr",               // Limiter à la France
  "accept-language": "fr"           // Langue
}
```

**Avantage:** Gratuit, pas de clé API requise!

---

## 📊 Exemple de Réponse

```json
{
  "id": 123456789,
  "label": "Rue de la Paix, 44000 Nantes, Pays de la Loire, France",
  "address": "Rue de la Paix, 44000 Nantes, Pays de la Loire, France",
  "latitude": 47.2150,
  "longitude": -1.5533,
  "type": "road",
  "icon": "🛣️"
}
```

---

## 🎯 Utilisation dans la SearchBar

### Avant (Sans Autocomplétion)
```
Champ: [Place Royale.........]
Utilisateur doit taper manuellement
Risque d'erreur d'orthographe
```

### Après (Avec Autocomplétion)
```
Champ: [Place Roy............]
Liste: ├─ 🏙️  Place Royale, Nantes
       ├─ 🛣️  Rue Royale, Nantes
       └─ 🏘️  Quartier Royal, Nantes

Sélection immédiate
Coordonnées GPS automatiques
Pas d'erreur possible
```

---

## ✨ Performances

```
Temps de réponse API: ~500ms
Debounce: 300ms
Délai ressenti par l'utilisateur: ~800ms
```

**C'est rapide et ne ralentit pas l'application!**

---

## 🔐 Sécurité

- ✅ API Nominatim n'a besoin d'aucune clé
- ✅ Requêtes HTTPS sécurisées
- ✅ Pas de données sensibles transmises
- ✅ Conforme RGPD (pas de tracage)

---

## 📱 Responsive

```
Desktop:    Suggestions en dropdown
Tablette:   Suggestions adaptées
Mobile:     Liste défilable verticale
```

---

## 🚀 Utilisation

```bash
npm install
npm run dev
```

**Testez immédiatement:**
1. Commencez à taper: "Rue de"
2. Voyez les suggestions s'afficher
3. Cliquez ou naviguez au clavier
4. Les coordonnées se remplissent automatiquement!

---

## 🎉 Résultat Final

**L'application offre maintenant:**
- ✅ Autocomplétion en temps réel
- ✅ Données limitées à Nantes
- ✅ Liste de suggestions intéressantes
- ✅ Sélection facile (souris ou clavier)
- ✅ Icônes pour identifier les types de lieux
- ✅ Aucune API clé requise
- ✅ Responsive sur mobile

**Prête pour utilisation! 🎉**

