# ADR 001 — Choix de Docker Compose plutôt que K3s pour la production actuelle

## Statut
Accepted

## Contexte
Le projet DAPI comporte aujourd'hui une stack modulaire avec un frontend, un backend et une base de données. La charge attendue est raisonnable pour un usage pédagogique ou associatif, et l'objectif initial est de livrer une solution simple à déployer sur un VPS ou un environnement de pré-production.

## Décision
Nous utilisons Docker Compose pour la production actuelle plutôt qu'un cluster K3s. Cette décision favorise la simplicité de déploiement, la maintenance réduite et un temps de mise en œuvre plus court.

## Conséquences

### Positives
- Déploiement simple et rapide sur une seule machine
- Moins de complexité opérationnelle que Kubernetes
- Facile à reproduire localement et en production
- Intégration naturelle avec les fichiers Docker Compose existants

### Négatives
- Moins adapté à une montée en charge horizontale importante
- Pas de fonctionnalités natives de self-healing et d'orchestration avancées
- Limité à une seule machine sans mécanismes de cluster natifs

## Notes
Cette décision peut être révisée si le projet évolue vers plusieurs services critiques, une forte disponibilité ou une évolution vers un besoin de scalabilité plus important.
