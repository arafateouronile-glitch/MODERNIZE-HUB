# Configuration Vidéos Témoignages

## Comment ajouter vos vidéos YouTube

1. **Créer/Uploader vos vidéos**
   - Télécharger vos vidéos témoignages sur YouTube
   - Noter l'ID de chaque vidéo (ex: `dQw4w9WgXcQ`)

2. **Mettre à jour le fichier**
   - Ouvrir `src/components/sections/VideoTestimonials.jsx`
   - Remplacer `YOUTUBE_VIDEO_ID_1`, `YOUTUBE_VIDEO_ID_2`, etc. par vos vrais IDs

3. **Ajouter des thumbnails** (optionnel)
   - Créer un dossier `public/images/video-thumbs/`
   - Ajouter des images pour chaque vidéo
   - Mettre à jour les chemins dans `videoTestimonials`

## Exemple de configuration

```javascript
{
  id: 1,
  client: 'Pierre - Avocat',
  thumbnail: '/images/video-thumbs/pierre.jpg',
  youtubeId: 'dQw4w9WgXcQ', // ← Votre vraie ID YouTube
  title: 'Transformation complète de mon cabinet',
  duration: '2:34',
  quote: '"+230% de demandes en 30 jours. Incroyable."',
}
```

## Trouver l'ID d'une vidéo YouTube

L'ID est dans l'URL : `https://www.youtube.com/watch?v=**dQw4w9WgXcQ**`
La partie après `?v=` est l'ID.

## Alternative : Vimeo

Pour utiliser Vimeo au lieu de YouTube, remplacez l'iframe :
- YouTube: `https://www.youtube.com/embed/${youtubeId}`
- Vimeo: `https://player.vimeo.com/video/${vimeoId}`



