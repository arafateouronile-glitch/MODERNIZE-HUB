import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '../public/images/portfolio');

const projects = [
  {
    id: 'cabinet-avocats',
    title: 'Cabinet d\'Avocats Premium',
    colors: { bg: '#1A1A1A', text: '#D4AF37', accent: '#FFFFFF' },
    layout: 'elegant',
    files: ['thumb', 'desktop-1', 'desktop-2', 'desktop-3', 'mobile-1', 'mobile-2']
  },
  {
    id: 'restaurant-gastronomique',
    title: 'Restaurant Gastronomique',
    colors: { bg: '#2D1810', text: '#F4E4C1', accent: '#C41E3A' },
    layout: 'visual',
    files: ['thumb', 'desktop-1', 'desktop-2', 'desktop-3', 'mobile-1', 'mobile-2']
  },
  {
    id: 'agence-immobiliere',
    title: 'Agence Immobilière',
    colors: { bg: '#0A2E4D', text: '#F7F9FB', accent: '#FF6B35' },
    layout: 'grid',
    files: ['thumb', 'desktop-1', 'desktop-2', 'desktop-3', 'mobile-1']
  },
  {
    id: 'coach-sportif',
    title: 'Coach Sportif',
    colors: { bg: '#0F0F0F', text: '#00FF88', accent: '#FF0080' },
    layout: 'bold',
    files: ['thumb', 'desktop-1', 'desktop-2', 'mobile-1']
  },
  {
    id: 'artisan-premium',
    title: 'Artisan Premium',
    colors: { bg: '#2C2416', text: '#D9C6B0', accent: '#8B7355' },
    layout: 'classic',
    files: ['thumb', 'desktop-1', 'desktop-2', 'mobile-1']
  },
  {
    id: 'startup-tech',
    title: 'Startup SaaS',
    colors: { bg: '#6366F1', text: '#FFFFFF', accent: '#14B8A6' },
    layout: 'modern',
    files: ['thumb', 'desktop-1', 'desktop-2', 'mobile-1']
  },
  {
    id: 'ecommerce-mode',
    title: 'Mode Lifestyle',
    colors: { bg: '#FFFFFF', text: '#000000', accent: '#FF6B6B' },
    layout: 'minimal',
    files: ['thumb', 'desktop-1', 'desktop-2', 'mobile-1']
  },
  {
    id: 'agence-marketing',
    title: 'Agence Créative',
    colors: { bg: '#111111', text: '#D9FF00', accent: '#FF00CC' },
    layout: 'artistic',
    files: ['thumb', 'desktop-1', 'desktop-2', 'mobile-1']
  }
];

const generateSVG = (project, type) => {
  const isMobile = type.includes('mobile');
  const width = isMobile ? 375 : 1200;
  const height = isMobile ? 812 : 800;
  const { bg, text, accent } = project.colors;
  
  // Base SVG structure
  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${bg}"/>`;

  // Browser/Phone Frame
  if (isMobile) {
    // Phone notch and bar
    svg += `<rect x="0" y="0" width="100%" height="40" fill="#000000" opacity="0.2"/>
            <path d="M0 0 L${width} 0 L${width} 30 L0 30 Z" fill="#000000" opacity="0.5"/>
            <rect x="${width/2 - 50}" y="0" width="100" height="30" rx="0" ry="0" fill="#000000"/>`;
  } else {
    // Browser bar
    svg += `<rect x="0" y="0" width="100%" height="40" fill="#000000" opacity="0.1"/>
            <circle cx="20" cy="20" r="6" fill="#FF5F56"/>
            <circle cx="40" cy="20" r="6" fill="#FFBD2E"/>
            <circle cx="60" cy="20" r="6" fill="#27C93F"/>
            <rect x="80" y="8" width="${width - 100}" height="24" rx="4" fill="#FFFFFF" opacity="0.1"/>`;
  }

  // Content Patterns based on Layout
  const contentY = isMobile ? 50 : 60;
  
  // Hero Section Title
  svg += `<text x="${width/2}" y="${contentY + 100}" font-family="Arial, sans-serif" font-weight="bold" font-size="${isMobile ? 32 : 64}" fill="${text}" text-anchor="middle">${project.title.toUpperCase()}</text>`;
  
  // Hero Subtitle/Tagline
  svg += `<rect x="${width/2 - 100}" y="${contentY + 130}" width="200" height="4" fill="${accent}"/>`;

  // Layout Specifics
  if (project.layout === 'elegant') {
    // Elegant: Centered, serif-like feel, borders
    svg += `<rect x="40" y="${contentY + 200}" width="${width - 80}" height="200" fill="none" stroke="${accent}" stroke-width="1"/>
            <text x="${width/2}" y="${contentY + 300}" font-family="serif" font-size="24" fill="${accent}" text-anchor="middle" opacity="0.8">L'EXCELLENCE JURIDIQUE</text>`;
  } 
  else if (project.layout === 'visual') {
    // Visual: Big image placeholders
    svg += `<rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" opacity="0.3"/>
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${bg};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${accent};stop-opacity:0.5" />
              </linearGradient>
            </defs>`;
  }
  else if (project.layout === 'grid') {
    // Grid: Cards
    const cols = isMobile ? 1 : 3;
    const gap = 20;
    const cardW = (width - 80 - (cols-1)*gap) / cols;
    const cardH = 150;
    
    for(let i=0; i<cols; i++) {
      svg += `<rect x="${40 + i*(cardW+gap)}" y="${contentY + 250}" width="${cardW}" height="${cardH}" fill="${accent}" opacity="0.1"/>
              <rect x="${40 + i*(cardW+gap)}" y="${contentY + 250 + cardH - 40}" width="${cardW}" height="40" fill="${bg}" opacity="0.8"/>
              <text x="${40 + i*(cardW+gap) + 20}" y="${contentY + 250 + cardH - 15}" font-family="Arial" font-size="14" fill="${text}">Propriété ${i+1}</text>`;
    }
  }
  else if (project.layout === 'bold') {
    // Bold: Angled shapes
    svg += `<path d="M0 ${height} L${width} ${height} L${width} ${height/2} L0 ${height/2 + 100} Z" fill="${accent}" opacity="0.2"/>
            <text x="${width/2}" y="${height - 100}" font-family="Arial" font-weight="900" font-size="${isMobile ? 40 : 80}" fill="none" stroke="${text}" stroke-width="2" text-anchor="middle">PERFORMANCE</text>`;
  }
  else if (project.layout === 'modern') {
    // Modern: Cards with shadow simulation, rounded
    svg += `<rect x="${width/2 - 150}" y="${contentY + 200}" width="300" height="200" rx="10" fill="#FFFFFF" opacity="0.1"/>
            <circle cx="${width/2}" cy="${contentY + 280}" r="40" fill="${accent}" opacity="0.8"/>
            <rect x="${width/2 - 100}" y="${contentY + 340}" width="200" height="10" rx="5" fill="${text}" opacity="0.5"/>`;
  }
  else if (project.layout === 'minimal') {
    // Minimal: Clean lines, lots of whitespace
    svg += `<rect x="${width/2 - (isMobile?100:200)}" y="${contentY + 200}" width="${isMobile?200:400}" height="${isMobile?250:400}" fill="#F5F5F5"/>
            <text x="${width/2}" y="${contentY + (isMobile?480:650)}" font-family="Arial" font-size="16" fill="#000000" text-anchor="middle">NOUVELLE COLLECTION</text>`;
  }
  else if (project.layout === 'artistic') {
    // Artistic: Random shapes
    svg += `<circle cx="${width*0.2}" cy="${height*0.3}" r="${width*0.1}" fill="${accent}" opacity="0.5"/>
            <circle cx="${width*0.8}" cy="${height*0.7}" r="${width*0.15}" fill="${text}" opacity="0.3"/>
            <path d="M${width/2} ${height/2} Q${width*0.8} ${height/2} ${width*0.8} ${height*0.8}" stroke="${accent}" stroke-width="5" fill="none"/>`;
  }
  else {
    // Classic
    svg += `<rect x="40" y="${contentY + 200}" width="${width/2 - 50}" height="300" fill="${accent}" opacity="0.2"/>
            <rect x="${width/2 + 10}" y="${contentY + 200}" width="${width/2 - 50}" height="300" fill="${text}" opacity="0.1"/>`;
  }

  // Footer/Bottom fake content
  svg += `<rect x="0" y="${height - 60}" width="100%" height="60" fill="${text}" opacity="0.05"/>`;

  // Type label (Desktop 1, Mobile 2, etc)
  svg += `<text x="20" y="${height - 20}" font-family="monospace" font-size="12" fill="${text}" opacity="0.5">${type.toUpperCase()}</text>`;

  svg += `</svg>`;
  return svg;
};

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate images
projects.forEach(project => {
  project.files.forEach(file => {
    const fileName = `${project.id}-${file}.jpg`; // Generating SVGs but naming them .jpg for the code to work if it handles suffixes, but actually the code expects specific extensions. 
    // Wait, the code expects .jpg paths in the data file.
    // I should create .jpg files? I can't easily create JPGs without canvas/sharp.
    // However, browsers can render .svg files. 
    // I should rename them to .svg and UPDATE the data file to point to .svg
    // OR, I can name them .svg and the browser might handle it if I update the references.
    
    // Let's generate SVGs and update the data file references in a separate step or just save as .svg
    // Actually, saving SVG content into a .jpg file won't work.
    // I MUST save them as .svg
    
    const svgContent = generateSVG(project, file);
    fs.writeFileSync(path.join(outputDir, `${project.id}-${file}.svg`), svgContent);
    console.log(`Generated ${project.id}-${file}.svg`);
  });
});

