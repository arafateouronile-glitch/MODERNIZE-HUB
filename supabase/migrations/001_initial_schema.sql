-- Migration initiale pour Modernize Web
-- Créer ces tables dans Supabase Dashboard > SQL Editor

-- Table: leads (demandes de devis et rendez-vous)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('quote', 'appointment')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  budget TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: blog_posts (articles de blog)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT,
  read_time TEXT,
  slug TEXT UNIQUE NOT NULL,
  featured BOOLEAN DEFAULT false,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: testimonials (témoignages clients)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar TEXT,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  results TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_type ON leads(type);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - À activer après création de l'utilisateur admin
-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Politique: Lecture publique pour testimonials (affichés sur le site)
-- CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);

-- Politique: Lecture publique pour blog_posts
-- CREATE POLICY "Public read access" ON blog_posts FOR SELECT USING (true);

-- Politique: Les leads sont privés (seuls les admins peuvent les voir)
-- CREATE POLICY "Admins only" ON leads FOR ALL 
--   USING (auth.jwt() ->> 'email' = 'admin@modernizeweb.com');

-- Commentaires
COMMENT ON TABLE leads IS 'Demandes de devis et rendez-vous Calendly';
COMMENT ON TABLE blog_posts IS 'Articles de blog pour le site';
COMMENT ON TABLE testimonials IS 'Témoignages clients affichés sur le site';


