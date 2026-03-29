import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Key, Webhook, Copy, Trash2, Plus, Eye, EyeOff, Check, RefreshCw, Terminal, Zap } from 'lucide-react'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const generateApiKey = () => {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return 'mhub_' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

const STORAGE_KEY_APIKEYS = 'mhub_api_keys'
const STORAGE_KEY_WEBHOOKS = 'mhub_webhooks'

const loadApiKeys = () => JSON.parse(localStorage.getItem(STORAGE_KEY_APIKEYS) || '[]')
const saveApiKeys = (keys) => localStorage.setItem(STORAGE_KEY_APIKEYS, JSON.stringify(keys))

const loadWebhooks = () => JSON.parse(localStorage.getItem(STORAGE_KEY_WEBHOOKS) || '[]')
const saveWebhooks = (hooks) => localStorage.setItem(STORAGE_KEY_WEBHOOKS, JSON.stringify(hooks))

// ─── CopyButton ──────────────────────────────────────────────────────────────

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-[#88A9C3] text-white/60 hover:text-[#88A9C3] transition-all font-mono text-xs"
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copié' : 'Copier'}
    </button>
  )
}

// ─── ApiKeysTab ───────────────────────────────────────────────────────────────

const ApiKeysTab = () => {
  const [keys, setKeys] = useState(loadApiKeys)
  const [showKey, setShowKey] = useState({})
  const [newLabel, setNewLabel] = useState('')

  const createKey = () => {
    if (!newLabel.trim()) return
    const newKey = {
      id: crypto.randomUUID(),
      label: newLabel.trim(),
      key: generateApiKey(),
      createdAt: new Date().toISOString(),
      lastUsed: null,
    }
    const updated = [...keys, newKey]
    setKeys(updated)
    saveApiKeys(updated)
    setNewLabel('')
  }

  const revokeKey = (id) => {
    const updated = keys.filter(k => k.id !== id)
    setKeys(updated)
    saveApiKeys(updated)
  }

  const toggleShow = (id) => setShowKey(prev => ({ ...prev, [id]: !prev[id] }))

  const maskKey = (key) => key.slice(0, 10) + '••••••••••••••••••••••••' + key.slice(-4)

  return (
    <div className="space-y-6">
      {/* Create Key */}
      <div className="border border-white/10 bg-white/3 p-6">
        <h3 className="font-mono text-sm text-white uppercase tracking-widest mb-4">Générer une nouvelle clé</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && createKey()}
            placeholder="Label (ex: Zapier, Make, CRM interne...)"
            className="flex-1 bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] font-mono text-sm transition-colors"
          />
          <button
            onClick={createKey}
            disabled={!newLabel.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-[#88A9C3] text-black font-bold hover:bg-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Générer
          </button>
        </div>
      </div>

      {/* Keys List */}
      {keys.length === 0 ? (
        <div className="border border-white/10 p-12 text-center">
          <Key className="w-10 h-10 text-white/20 mx-auto mb-3" />
          <p className="font-mono text-sm text-white/40">Aucune clé API générée.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {keys.map((k) => (
            <motion.div
              key={k.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-white/10 bg-white/3 p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-mono text-sm font-bold text-white">{k.label}</div>
                  <div className="font-mono text-xs text-white/40 mt-1">
                    Créée le {new Date(k.createdAt).toLocaleDateString('fr-FR')}
                    {k.lastUsed && ` · Dernière utilisation : ${new Date(k.lastUsed).toLocaleDateString('fr-FR')}`}
                  </div>
                </div>
                <button
                  onClick={() => revokeKey(k.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all font-mono text-xs"
                >
                  <Trash2 className="w-3 h-3" />
                  Révoquer
                </button>
              </div>
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 px-4 py-3">
                <Key className="w-4 h-4 text-[#88A9C3] flex-shrink-0" />
                <code className="flex-1 font-mono text-sm text-[#88A9C3] truncate">
                  {showKey[k.id] ? k.key : maskKey(k.key)}
                </code>
                <button onClick={() => toggleShow(k.id)} className="text-white/40 hover:text-white transition-colors">
                  {showKey[k.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <CopyButton text={k.key} />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Usage Note */}
      <div className="border border-[#88A9C3]/20 bg-[#88A9C3]/5 p-5">
        <p className="font-mono text-xs text-[#88A9C3] uppercase tracking-wider mb-3">Utilisation — Header d'authentification</p>
        <code className="block bg-black/50 border border-white/10 px-4 py-3 font-mono text-xs text-white/70">
          Authorization: Bearer {'<votre_clé_api>'}
        </code>
      </div>
    </div>
  )
}

// ─── WebhooksTab ──────────────────────────────────────────────────────────────

const DEFAULT_FIELD_MAPPING = JSON.stringify({ title: 'title', content: 'content', excerpt: 'excerpt' }, null, 2)

const WebhooksTab = () => {
  const [webhooks, setWebhooks] = useState(loadWebhooks)
  const [form, setForm] = useState({
    label: '',
    url: '',
    token: '',
    fieldMapping: DEFAULT_FIELD_MAPPING,
    events: ['new_lead'],
  })
  const [showForm, setShowForm] = useState(false)
  const [testResult, setTestResult] = useState({})
  const [mappingError, setMappingError] = useState('')

  const eventOptions = [
    { value: 'new_lead', label: 'Nouveau lead reçu' },
    { value: 'new_blog_post', label: 'Article de blog publié' },
    { value: 'new_testimonial', label: 'Témoignage ajouté' },
  ]

  const validateMapping = (val) => {
    try { JSON.parse(val); setMappingError(''); return true }
    catch { setMappingError('JSON invalide'); return false }
  }

  const saveWebhook = () => {
    if (!form.label || !form.url) return
    if (!validateMapping(form.fieldMapping)) return
    const newHook = {
      id: crypto.randomUUID(),
      ...form,
      fieldMapping: JSON.parse(form.fieldMapping),
      createdAt: new Date().toISOString(),
      active: true,
    }
    const updated = [...webhooks, newHook]
    setWebhooks(updated)
    saveWebhooks(updated)
    setForm({ label: '', url: '', token: '', fieldMapping: DEFAULT_FIELD_MAPPING, events: ['new_lead'] })
    setShowForm(false)
  }

  const deleteWebhook = (id) => {
    const updated = webhooks.filter(w => w.id !== id)
    setWebhooks(updated)
    saveWebhooks(updated)
  }

  const toggleActive = (id) => {
    const updated = webhooks.map(w => w.id === id ? { ...w, active: !w.active } : w)
    setWebhooks(updated)
    saveWebhooks(updated)
  }

  const testWebhook = async (webhook) => {
    setTestResult(prev => ({ ...prev, [webhook.id]: 'loading' }))
    const payload = {
      [webhook.fieldMapping.title || 'title']: 'Test Modernize Hub',
      [webhook.fieldMapping.content || 'content']: 'Ceci est un test de webhook depuis votre dashboard.',
      [webhook.fieldMapping.excerpt || 'excerpt']: 'Test webhook',
      _source: 'modernizehub',
      _event: 'test',
      _timestamp: new Date().toISOString(),
    }
    try {
      const res = await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(webhook.token ? { Authorization: `Bearer ${webhook.token}` } : {}),
        },
        body: JSON.stringify(payload),
      })
      setTestResult(prev => ({ ...prev, [webhook.id]: res.ok ? 'success' : `error_${res.status}` }))
    } catch {
      setTestResult(prev => ({ ...prev, [webhook.id]: 'network_error' }))
    }
    setTimeout(() => setTestResult(prev => ({ ...prev, [webhook.id]: null })), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Add button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-3 bg-[#88A9C3] text-black font-bold hover:bg-white transition-all"
        >
          <Plus className="w-4 h-4" />
          Ajouter un webhook
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-[#88A9C3]/30 bg-[#88A9C3]/5 p-6 space-y-4"
        >
          <h3 className="font-mono text-sm text-white uppercase tracking-widest">Nouveau webhook</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs text-white/50 uppercase mb-2">Label</label>
              <input
                type="text"
                value={form.label}
                onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                placeholder="ex: Zapier, Make, n8n..."
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] font-mono text-sm"
              />
            </div>
            <div>
              <label className="block font-mono text-xs text-white/50 uppercase mb-2">Token d'authentification</label>
              <input
                type="text"
                value={form.token}
                onChange={e => setForm(f => ({ ...f, token: e.target.value }))}
                placeholder="Bearer token (optionnel)"
                className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs text-white/50 uppercase mb-2">URL Endpoint</label>
            <input
              type="url"
              value={form.url}
              onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
              placeholder="https://api.monsite.com/posts"
              className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#88A9C3] font-mono text-sm"
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-white/50 uppercase mb-2">
              Field Mapping JSON{' '}
              <span className="text-white/30 normal-case">(noms de champs personnalisés)</span>
            </label>
            <textarea
              value={form.fieldMapping}
              onChange={e => { setForm(f => ({ ...f, fieldMapping: e.target.value })); validateMapping(e.target.value) }}
              rows={4}
              className="w-full bg-black/50 border border-white/20 px-4 py-3 text-white/80 focus:outline-none focus:border-[#88A9C3] font-mono text-xs resize-none"
            />
            {mappingError && <p className="font-mono text-xs text-red-400 mt-1">{mappingError}</p>}
          </div>

          <div>
            <label className="block font-mono text-xs text-white/50 uppercase mb-2">Déclencher sur</label>
            <div className="flex flex-wrap gap-3">
              {eventOptions.map(opt => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.events.includes(opt.value)}
                    onChange={e => {
                      const updated = e.target.checked
                        ? [...form.events, opt.value]
                        : form.events.filter(v => v !== opt.value)
                      setForm(f => ({ ...f, events: updated }))
                    }}
                    className="accent-[#88A9C3]"
                  />
                  <span className="font-mono text-sm text-white/70">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={saveWebhook} className="px-6 py-3 bg-[#88A9C3] text-black font-bold hover:bg-white transition-all">
              Enregistrer
            </button>
            <button onClick={() => setShowForm(false)} className="px-6 py-3 border border-white/20 text-white/70 hover:border-white hover:text-white transition-all font-mono text-sm">
              Annuler
            </button>
          </div>
        </motion.div>
      )}

      {/* Webhooks List */}
      {webhooks.length === 0 && !showForm ? (
        <div className="border border-white/10 p-12 text-center">
          <Webhook className="w-10 h-10 text-white/20 mx-auto mb-3" />
          <p className="font-mono text-sm text-white/40">Aucun webhook configuré.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {webhooks.map(hook => (
            <motion.div
              key={hook.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`border p-5 transition-all ${hook.active ? 'border-white/10 bg-white/3' : 'border-white/5 bg-white/1 opacity-50'}`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${hook.active ? 'bg-green-400' : 'bg-white/20'}`} />
                    <span className="font-mono text-sm font-bold text-white">{hook.label}</span>
                  </div>
                  <div className="font-mono text-xs text-white/40 mt-1 ml-4">
                    {hook.events.join(' · ')}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => testWebhook(hook)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-[#88A9C3]/30 text-[#88A9C3] hover:bg-[#88A9C3]/10 transition-all font-mono text-xs"
                  >
                    {testResult[hook.id] === 'loading' ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : testResult[hook.id] === 'success' ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Zap className="w-3 h-3" />
                    )}
                    {testResult[hook.id] === 'success' ? 'OK ✓' : testResult[hook.id]?.startsWith('error') ? `Erreur ${testResult[hook.id].split('_')[1]}` : testResult[hook.id] === 'network_error' ? 'Réseau ✗' : 'Tester'}
                  </button>
                  <button
                    onClick={() => toggleActive(hook.id)}
                    className="px-3 py-1.5 border border-white/20 text-white/50 hover:text-white hover:border-white transition-all font-mono text-xs"
                  >
                    {hook.active ? 'Désactiver' : 'Activer'}
                  </button>
                  <button
                    onClick={() => deleteWebhook(hook.id)}
                    className="p-1.5 border border-red-500/20 text-red-400/60 hover:text-red-400 hover:border-red-500/50 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <code className="block font-mono text-xs text-white/50 bg-black/30 px-3 py-2 truncate">
                POST {hook.url}
              </code>
              <div className="mt-2 flex gap-2 flex-wrap">
                {Object.entries(hook.fieldMapping).map(([k, v]) => (
                  <span key={k} className="font-mono text-[10px] px-2 py-1 border border-white/10 text-white/40">
                    {k} → {v}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── McpTab ───────────────────────────────────────────────────────────────────

const McpTab = () => {
  const apiKeys = loadApiKeys()
  const activeKey = apiKeys[0]?.key || 'VOTRE_CLÉ_API'
  const BASE = 'https://modernizehub.com'

  const curlPost = `curl -X POST ${BASE}/api/blog-post \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${activeKey.slice(0, 14)}..." \\
  -d '{
    "title": "L\\'IA autonome pour les avocats en 2025",
    "content": "Contenu complet de l\\'article...",
    "excerpt": "Résumé en 160 caractères",
    "category": "IA & Automatisation",
    "tags": ["IA", "Juridique"],
    "published": true
  }'`

  const curlGet = `curl -X GET ${BASE}/api/blog-post \\
  -H "Authorization: Bearer ${activeKey.slice(0, 14)}..."`

  const curlDelete = `curl -X DELETE ${BASE}/api/blog-post \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${activeKey.slice(0, 14)}..." \\
  -d '{"id": "uuid-de-larticle"}'`

  const n8nExample = `// Node "HTTP Request" dans n8n
Method: POST
URL: ${BASE}/api/blog-post
Headers:
  Authorization: Bearer {{ $env.MODERNIZEHUB_API_KEY }}
  Content-Type: application/json
Body (JSON):
  {
    "title": "{{ $node.AI.json.title }}",
    "content": "{{ $node.AI.json.content }}",
    "category": "IA & Automatisation",
    "published": true
  }`

  const fields = [
    { name: 'title', alias: 'heading', required: true, desc: 'Titre de l\'article' },
    { name: 'content', alias: 'body', required: true, desc: 'Contenu HTML ou Markdown' },
    { name: 'excerpt', alias: 'summary', required: false, desc: 'Résumé (auto si absent)' },
    { name: 'category', alias: '—', required: false, desc: 'Défaut : "IA & Automatisation"' },
    { name: 'tags', alias: '—', required: false, desc: 'Tableau de strings' },
    { name: 'author', alias: '—', required: false, desc: 'Défaut : "Agent IA Modernize Hub"' },
    { name: 'published', alias: '—', required: false, desc: 'true / false (défaut : true)' },
    { name: 'id', alias: '—', required: false, desc: 'Présent → mise à jour, absent → création' },
  ]

  return (
    <div className="space-y-6">

      {/* Setup requis */}
      <div className="border border-yellow-500/30 bg-yellow-500/5 p-5">
        <p className="font-mono text-xs text-yellow-400 uppercase tracking-wider mb-3">⚙ Configuration requise (une seule fois)</p>
        <p className="font-mono text-xs text-white/60 mb-2">
          Dans Netlify → Site settings → Environment variables, ajoutez :
        </p>
        <div className="space-y-2">
          {[
            { key: 'BLOG_API_KEY', val: 'Copiez n\'importe quelle clé générée dans l\'onglet "Clés API"' },
            { key: 'SUPABASE_URL', val: 'Votre URL Supabase (VITE_SUPABASE_URL)' },
            { key: 'SUPABASE_SERVICE_ROLE_KEY', val: 'Clé service_role Supabase (Settings → API)' },
          ].map(v => (
            <div key={v.key} className="flex items-start gap-3 bg-black/30 px-4 py-2 border border-white/10">
              <code className="font-mono text-xs text-[#88A9C3] whitespace-nowrap">{v.key}</code>
              <span className="font-mono text-xs text-white/40">{v.val}</span>
            </div>
          ))}
        </div>
        {!apiKeys.length && (
          <p className="font-mono text-xs text-yellow-400/80 mt-3">
            ⚠ Générez d'abord une clé dans l'onglet "Clés API".
          </p>
        )}
      </div>

      {/* Endpoint */}
      <div className="border border-[#88A9C3]/20 bg-[#88A9C3]/5 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Terminal className="w-5 h-5 text-[#88A9C3]" />
          <h3 className="font-mono text-sm text-white uppercase tracking-widest">Endpoint Blog</h3>
        </div>
        <div className="flex items-center gap-3 bg-black/40 border border-white/10 px-4 py-3 mt-3">
          <span className="font-mono text-xs font-bold px-2 py-1 bg-[#88A9C3]/20 text-[#88A9C3]">POST</span>
          <code className="font-mono text-sm text-white flex-1">{BASE}/api/blog-post</code>
          <CopyButton text={`${BASE}/api/blog-post`} />
        </div>
        <div className="flex items-center gap-3 bg-black/40 border border-white/10 border-t-0 px-4 py-3">
          <span className="font-mono text-xs font-bold px-2 py-1 bg-white/10 text-white/60">GET</span>
          <code className="font-mono text-sm text-white/70 flex-1">{BASE}/api/blog-post</code>
          <span className="font-mono text-xs text-white/30">lister les articles</span>
        </div>
        <div className="flex items-center gap-3 bg-black/40 border border-white/10 border-t-0 px-4 py-3">
          <span className="font-mono text-xs font-bold px-2 py-1 bg-red-500/20 text-red-400">DELETE</span>
          <code className="font-mono text-sm text-white/70 flex-1">{BASE}/api/blog-post</code>
          <span className="font-mono text-xs text-white/30">supprimer (body: &#123;id&#125;)</span>
        </div>
      </div>

      {/* Champs */}
      <div className="border border-white/10 bg-white/3 p-6">
        <h3 className="font-mono text-sm text-white uppercase tracking-widest mb-4">Champs acceptés</h3>
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/40 pb-2 pr-4">Champ</th>
                <th className="text-left text-white/40 pb-2 pr-4">Alias</th>
                <th className="text-left text-white/40 pb-2 pr-4">Requis</th>
                <th className="text-left text-white/40 pb-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {fields.map(f => (
                <tr key={f.name} className="border-b border-white/5">
                  <td className="py-2 pr-4 text-[#88A9C3]">{f.name}</td>
                  <td className="py-2 pr-4 text-white/40">{f.alias}</td>
                  <td className="py-2 pr-4">{f.required ? <span className="text-green-400">oui</span> : <span className="text-white/30">non</span>}</td>
                  <td className="py-2 text-white/60">{f.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* cURL exemples */}
      {[
        { label: 'Publier un article (POST)', code: curlPost },
        { label: 'Lister les articles (GET)', code: curlGet },
        { label: 'Supprimer un article (DELETE)', code: curlDelete },
      ].map(ex => (
        <div key={ex.label} className="border border-white/10 bg-white/3 p-6">
          <h3 className="font-mono text-sm text-white uppercase tracking-widest mb-4">{ex.label}</h3>
          <div className="relative">
            <pre className="bg-black/60 border border-white/10 p-5 font-mono text-xs text-white/70 overflow-x-auto whitespace-pre-wrap">
              {ex.code}
            </pre>
            <div className="absolute top-3 right-3">
              <CopyButton text={ex.code} />
            </div>
          </div>
        </div>
      ))}

      {/* n8n example */}
      <div className="border border-white/10 bg-white/3 p-6">
        <h3 className="font-mono text-sm text-white uppercase tracking-widest mb-2">Exemple n8n / Make</h3>
        <p className="font-mono text-xs text-white/40 mb-4">
          Connectez un nœud IA (OpenAI, Claude) → HTTP Request → votre site
        </p>
        <div className="relative">
          <pre className="bg-black/60 border border-white/10 p-5 font-mono text-xs text-white/70 overflow-x-auto whitespace-pre-wrap">
            {n8nExample}
          </pre>
          <div className="absolute top-3 right-3">
            <CopyButton text={n8nExample} />
          </div>
        </div>
      </div>

      {/* Outils compatibles */}
      <div className="border border-white/10 bg-white/3 p-6">
        <h3 className="font-mono text-sm text-white uppercase tracking-widest mb-4">Outils compatibles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['n8n', 'Make (Integromat)', 'Zapier', 'Pipedream', 'Claude (tool use)', 'GPT Actions', 'LangChain', 'AutoGen'].map(tool => (
            <div key={tool} className="border border-white/10 px-4 py-3 text-center">
              <span className="font-mono text-xs text-white/60">{tool}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main ApiManager ──────────────────────────────────────────────────────────

export const ApiManager = () => {
  const [tab, setTab] = useState('keys')

  const tabs = [
    { id: 'keys', label: 'Clés API', icon: Key },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'mcp', label: 'MCP / REST', icon: Terminal },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border border-white/10 bg-white/3 p-6">
        <h2 className="font-display text-2xl font-bold text-white mb-2">API & Intégrations</h2>
        <p className="font-mono text-sm text-white/50">
          Générez des clés API, configurez des webhooks sortants et connectez Modernize Hub à vos outils externes.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/10">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-3 font-mono text-sm transition-all border-b-2 -mb-px ${
              tab === t.id
                ? 'border-[#88A9C3] text-[#88A9C3]'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'keys' && <ApiKeysTab />}
      {tab === 'webhooks' && <WebhooksTab />}
      {tab === 'mcp' && <McpTab />}
    </div>
  )
}
