/**
 * Netlify Function — POST /api/blog-post
 *
 * Permet à n'importe quel agent IA (n8n, Make, Zapier AI, Claude tool use, GPT Actions...)
 * de publier, modifier ou lister des articles de blog directement sur le site.
 *
 * Auth : Header  Authorization: Bearer <API_KEY>
 *        La clé doit correspondre à BLOG_API_KEY dans les variables d'env Netlify.
 *
 * Méthodes :
 *   POST   → créer ou mettre à jour un article
 *   GET    → lister les articles publiés
 *   DELETE → supprimer un article (body JSON : { id })
 */

const { createClient } = require('@supabase/supabase-js')

// ─── Auth ─────────────────────────────────────────────────────────────────────

const authenticate = (event) => {
  const auth = event.headers['authorization'] || event.headers['Authorization'] || ''
  const token = auth.replace(/^Bearer\s+/i, '').trim()
  const validKey = process.env.BLOG_API_KEY
  if (!validKey) return { ok: false, error: 'BLOG_API_KEY non configurée sur le serveur.' }
  if (!token || token !== validKey) return { ok: false, error: 'Clé API invalide ou manquante.' }
  return { ok: true }
}

// ─── Supabase ─────────────────────────────────────────────────────────────────

const getSupabase = () => {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

// ─── Slug helper ─────────────────────────────────────────────────────────────

const slugify = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)

// ─── CORS headers ────────────────────────────────────────────────────────────

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', ...CORS },
  body: JSON.stringify(body),
})

// ─── Handler ──────────────────────────────────────────────────────────────────

exports.handler = async (event) => {
  // Preflight
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' }

  // Auth check
  const auth = authenticate(event)
  if (!auth.ok) return json(401, { error: auth.error })

  const supabase = getSupabase()
  if (!supabase) return json(500, { error: 'Supabase non configuré sur ce serveur.' })

  // ── GET — lister les articles ────────────────────────────────────────────
  if (event.httpMethod === 'GET') {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, category, published, created_at')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) return json(500, { error: error.message })
    return json(200, { posts: data || [], count: (data || []).length })
  }

  // ── POST — créer / mettre à jour un article ──────────────────────────────
  if (event.httpMethod === 'POST') {
    let body
    try { body = JSON.parse(event.body || '{}') }
    catch { return json(400, { error: 'Corps JSON invalide.' }) }

    const {
      id,
      title,
      content,
      excerpt,
      category = 'IA & Automatisation',
      tags = [],
      author = 'Agent IA Modernize Hub',
      image,
      published = true,
      // Support field mapping personnalisé (même nommage que dans l'admin)
      heading,  // alias pour title
      body: bodyAlias, // alias pour content
      summary,  // alias pour excerpt
    } = body

    const resolvedTitle   = title   || heading
    const resolvedContent = content || bodyAlias
    const resolvedExcerpt = excerpt || summary || (resolvedContent ? resolvedContent.slice(0, 160) + '…' : '')

    if (!resolvedTitle || !resolvedContent) {
      return json(400, {
        error: 'Champs requis manquants.',
        required: ['title (ou heading)', 'content (ou body)'],
        received: Object.keys(body),
      })
    }

    const slug = slugify(resolvedTitle) + '-' + Date.now().toString(36)

    const postData = {
      title: resolvedTitle,
      content: resolvedContent,
      excerpt: resolvedExcerpt,
      slug,
      category,
      tags,
      author,
      image: image || null,
      published,
      updated_at: new Date().toISOString(),
    }

    let data, error

    if (id) {
      // Mise à jour
      const { data: d, error: e } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single()
      data = d; error = e
    } else {
      // Création
      const { data: d, error: e } = await supabase
        .from('blog_posts')
        .insert({ ...postData, created_at: new Date().toISOString() })
        .select()
        .single()
      data = d; error = e
    }

    if (error) return json(500, { error: error.message })

    return json(id ? 200 : 201, {
      success: true,
      action: id ? 'updated' : 'created',
      post: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        published: data.published,
        url: `https://modernizehub.com/blog/${data.slug}`,
      },
    })
  }

  // ── DELETE — supprimer un article ────────────────────────────────────────
  if (event.httpMethod === 'DELETE') {
    let body
    try { body = JSON.parse(event.body || '{}') }
    catch { return json(400, { error: 'Corps JSON invalide.' }) }

    const { id } = body
    if (!id) return json(400, { error: 'Champ id requis.' })

    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) return json(500, { error: error.message })

    return json(200, { success: true, action: 'deleted', id })
  }

  return json(405, { error: 'Méthode non autorisée.' })
}
