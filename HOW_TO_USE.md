# 📖 Guide d'Utilisation - Routage par les Rues

## 🎯 Comment Ça Marche?

### Étape 1: Ouvrez l'Application
```bash
npm install
npm run dev
# Accédez à http://localhost:5173
```

---

## 🔍 Utilisation des Deux Champs

### Interface Actuelle
```
┌─────────────────────────────────────────┐
│  📍 Départ         🎯 Arrivée           │
├─────────────────────────────────────────┤
│ [Place Royale, N.] [Gare SNCF, Nantes]  │
├─────────────────────────────────────────┤
│   [🔍 Itinéraire]        [✕ Effacer]   │
└─────────────────────────────────────────┘
```

### Flux d'Utilisation

```
1. Entrez l'adresse de DÉPART
   └─ Ex: "Place Royale, Nantes"

2. Entrez l'adresse d'ARRIVÉE
   └─ Ex: "Gare SNCF, Nantes"

3. Cliquez "🔍 Itinéraire"
   └─ OSRM calcule le trajet par les rues
   └─ Nominatim géocode les deux adresses
   └─ Affichage du trajet sur la carte

4. Résultats Affichés
   └─ Trajet réel par les rues
   └─ Distance en km (réelle)
   └─ Durée en minutes (estimée)
   └─ Places PMR à proximité
```

---

## 💡 Exemples d'Adresses à Essayer

### À Nantes
```
Départ: Place Royale, Nantes
Arrivée: Gare SNCF, Nantes
└─ Distance: ~2.3 km
└─ Durée: ~8 minutes

---

Départ: Château des Ducs, Nantes
Arrivée: Parc de la Beaujoire, Nantes
└─ Distance: ~4.5 km
└─ Durée: ~15 minutes

---

Départ: Pont de Pierre, Nantes
Arrivée: Jules Verne Museum, Nantes
└─ Distance: ~3.1 km
└─ Durée: ~11 minutes
```

---

## 🗺️ Ce Que Vous Verrez

### Sur la Carte
```
┌───────────────────────────────┐
│                               │
│  📍 Départ (turquoise)       │
│          \                    │
│    ─────────────────\          │
│  (Trajet par les      \       │
│   rues avec tous      🎯 Arrivée
│   les virages)          (vert) │
│                               │
│  ♿ Places PMR (rouge)        │
│  affichées à proximité        │
│                               │
└───────────────────────────────┘
```

### Dans le Panneau Latéral
```
┌─────────────────────────────┐
│        ITINÉRAIRE           │
├─────────────────────────────┤
│ Départ: Place Royale        │
│ Arrivée: Gare SNCF          │
│                             │
│ 📏 Distance: 2.3 km         │
│ ⏱️  Durée: 8 minutes        │
│ 🚗 Places PMR: 5 à proximité│
└─────────────────────────────┘
```

---

## 🔧 Différence avec l'Ancienne Version

### Avant (Vol d'Oiseau)
```
Point A ────────────── Point B
        (Ligne droite)
        
Distance: 2 km
Durée: Approximation
Problème: Pas réaliste!
```

### Après (Par les Rues)
```
Point A
  │
  ├─────────┐
  │         │
  ├─ ─ ─ ─ ─┤
  │         │
  └─────────┘
           Point B
           
Trajet réel avec tous les virages
Distance: 2.3 km (réelle)
Durée: 8 minutes (estimée)
Avantage: Réaliste et fiable!
```

---

## 📱 Responsive Design

### Desktop (> 768px)
```
Deux champs côte à côte
Pleine largeur disponible
Panneau latéral à gauche
Accessibilité maximale
```

### Tablette (480-768px)
```
Deux champs empilés
Largeur réduite
Panneau latéral réduit
Interface adaptée
```

### Mobile (< 480px)
```
Deux champs empilés
Plein écran
Panneau latéral épuré
Touch-friendly
```

---

## 🚨 Messages d'Erreur

### Adresse Non Trouvée
```
⚠️ Adresse non trouvée

Solution:
- Vérifier l'orthographe
- Essayer un format: "Rue, Ville"
- Vérifier que c'est en France
```

### Itinéraire Non Trouvable
```
⚠️ Impossible de calculer l'itinéraire

Solution:
- Vérifier les coordonnées
- S'assurer que c'est accessible en voiture
- Essayer d'autres points
```

### Connexion API
```
⚠️ Erreur de connexion à l'API

Solution:
- Vérifier la connexion internet
- Essayer plus tard
- Signaler le bug
```

---

## 🎮 Contrôles

### Clavier
```
[Entrée] dans les champs → Soumet la recherche
[Tab] → Navigate entre les champs
[Échap] → Fermer les popups
```

### Souris
```
Clic sur la carte → Voir les marqueurs (déprécié)
Clic sur un marqueur PMR → Affiche les détails
Drag sur la carte → Panoramique
Scroll → Zoom in/out
```

### Mobile
```
Tap sur les champs → Clavier virtuel
Pinch → Zoom
Drag → Panoramique
Tap sur un marqueur → Affiche les détails
```

---

## 🔍 Filtres

Après avoir calculé un itinéraire, vous pouvez filtrer par catégorie:

```
[PMR] [Banc] [Resto] [Parking] [Toilettes]

Cliquez sur une catégorie pour filtrer
```

---

## ♿ Accessibilité

### Clavier
```
[Tab] → Naviguer entre les éléments
[Entrée] → Activer les boutons
[Espace] → Cocher les cases
[Flèches] → Naviguer sur la carte
```

### Lecteur d'Écran
```
Tous les boutons ont des labels ARIA
Les images ont des descriptions
Les formulaires sont structurés
```

### Options
```
Cliquez sur ⚙️ pour:
- Contraste élevé
- Texte agrandi
- Support lecteur d'écran
```

---

## 📊 Données Affichées

### À partir de Nominatim
```
Adresse complète
Coordonnées GPS (latitude/longitude)
```

### À partir d'OSRM
```
Distance en km (précise)
Durée en minutes (estimée)
Trajet complet avec tous les virages
Étapes du trajet détaillées
```

### À partir de Nantes Métropole
```
Places PMR à proximité
Nombre de places
Durée de stationnement
Type de stationnement
Localisation exacte
```

---

## 🎓 Cas d'Usage

### 1. Personne en Fauteuil Roulant
```
Départ: Mon domicile
Arrivée: Rendez-vous médecin
↓
Voir l'itinéraire réel
Chercher places PMR à proximité
Planifier le trajet
```

### 2. Parent avec Enfant
```
Départ: Maison
Arrivée: École
↓
Calculer le chemin le plus court
Vérifier les places de parking
Évaluer la durée
```

### 3. Touriste
```
Départ: Hôtel
Arrivée: Monument touristique
↓
Voir le trajet réaliste
Chercher stationnement accessible
Planifier son visite
```

---

## 💾 Données Persistantes

Actuellement:
- ❌ Historique de recherche: Non sauvegardé
- ❌ Favoris: Non sauvegardés
- ❌ Préférences: Non persistantes

**Prochaine version** pourrait ajouter:
- ✅ LocalStorage pour historique
- ✅ Sauvegarde des trajets favoris
- ✅ Paramètres utilisateur

---

## 🐛 Problèmes Connus

### OSRM peut être lent
- Parfois 2-3 secondes
- Dépend de la connexion internet

### Nominatim peut avoir des homophones
- Plusieurs rues du même nom
- Solution: Être plus spécifique

### Sur mobile
- Clavier virtuel peut réduire l'espace
- Solution: Responsive adaptée

---

## 📈 Performance

```
Chargement initial: ~1 secondes
Géocodage: ~500ms par adresse
Routage OSRM: ~1 seconde
Affichage carte: Temps réel
```

---

## 🎉 Prêt?

```bash
npm install
npm run dev

# Accédez à: http://localhost:5173
```

Essayez maintenant! 🚀

