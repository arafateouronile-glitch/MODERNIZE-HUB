# 🔍 Diagnostic "Invalid Website"

## Étape 1 : Identifier la Source du Message

1. **Ouvrez les DevTools** (F12)

2. **Cherchez le message** :
   - Utilisez Ctrl+F (Cmd+F sur Mac) dans la console
   - Tapez : "invalid website"
   - Voyez où il apparaît

3. **Inspectez l'élément** :
   - Clic droit sur le texte "invalid website" dans la page
   - Cliquez sur "Inspecter" ou "Inspect"
   - Regardez l'élément HTML dans les DevTools

4. **Vérifiez les propriétés** :
   - Quelle est la balise ? (`<div>`, `<span>`, `<p>`, etc.)
   - Quelles sont les classes CSS ?
   - Y a-t-il un `id` ou des `data-*` attributs ?

## Étape 2 : Trouver le Script Responsable

1. **Onglet Network** :
   - Rechargez la page (F5)
   - Filtrez par "calendly"
   - Voyez quels scripts se chargent

2. **Onglet Sources** :
   - Cherchez les fichiers contenant "invalid" ou "calendly"
   - Identifiez le code qui génère le message

3. **Onglet Console** :
   - Regardez les erreurs en rouge
   - Voyez d'où elles viennent (fichier + ligne)

## Étape 3 : Solutions selon la Source

### Si c'est un iframe Calendly

Le CSS et les scripts devraient le masquer. Si ce n'est pas le cas, ajoutez dans `index.html` :

```javascript
// Dans le script inline, ajoutez :
document.querySelectorAll('iframe').forEach(function(iframe) {
  if (iframe.src && iframe.src.includes('calendly')) {
    iframe.style.display = 'none';
    iframe.remove();
  }
});
```

### Si c'est un script externe

1. Identifiez le script dans l'onglet Network
2. Ajoutez un blocage dans `index.html` :

```javascript
// Bloquer le script avant qu'il ne charge
const originalAppendChild = Node.prototype.appendChild;
Node.prototype.appendChild = function(child) {
  if (child.tagName === 'SCRIPT' && child.src && child.src.includes('calendly')) {
    console.log('Script Calendly bloqué:', child.src);
    return child; // Ne pas ajouter
  }
  return originalAppendChild.call(this, child);
};
```

### Si c'est une extension de navigateur

1. Désactivez toutes les extensions
2. Testez en navigation privée
3. Si le message disparaît, une extension en est la cause

## Étape 4 : Masquage Ultimate

Ajoutez ce code dans `index.html` avant la fermeture de `</body>` :

```javascript
<script>
// Masquage ultimate de "invalid website"
(function() {
  const hide = () => {
    // Masquer tous les éléments contenant "invalid website"
    document.querySelectorAll('*').forEach(el => {
      if (el.closest('#root')) return; // Ignorer React
      const text = (el.textContent || '').toLowerCase();
      if (text.includes('invalid website')) {
        el.style.cssText = 'display:none!important;visibility:hidden!important;opacity:0!important;height:0!important;width:0!important;position:absolute!important;left:-9999px!important;';
        el.remove();
      }
    });
    
    // Masquer tous les iframes Calendly
    document.querySelectorAll('iframe[src*="calendly"]').forEach(iframe => {
      iframe.style.display = 'none';
      iframe.remove();
    });
  };
  
  // Exécuter immédiatement et en continu
  setInterval(hide, 100);
  hide();
})();
</script>
```

---

*Guide créé le 3 Décembre 2024*



