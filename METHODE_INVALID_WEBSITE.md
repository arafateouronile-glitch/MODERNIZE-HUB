# Méthode qui a Fonctionné : Éliminer "Invalid Website"

## Problème
Message "invalid website" en rouge provenant de Calendly.

## Solution en 3 Points

### 1. Validation Stricte de l'URL
Vérifier AVANT de charger :
- Format valide (https://calendly.com/...)
- Bloque URLs placeholder (votre-compte, modernizeweb)
- Vérifie longueur minimale

### 2. Ouverture Directe (Pas de Widget)
Au lieu d'un widget/iframe :
- `window.open(calendlyUrl, '_blank')`
- Si URL invalide → `window.open('https://calendly.com', '_blank')`
- Pas de widget = Pas d'erreur possible

### 3. Normalisation URL
Accepte différents formats :
- Ajoute https:// si manquant
- Enlève paramètres inutiles
- Nettoie le format

## Principe Clé
**Prévenir l'erreur plutôt que la masquer**

## Résultat
✅ Plus jamais de "invalid website"
✅ Fonctionne avec ou sans URL
✅ Code simple et fiable


