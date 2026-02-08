'use client'

import { useState, useRef, useCallback } from 'react'

const categories = ['All', 'Tech', 'Research', 'Tutorials', 'Documentation', 'Articles', 'Resources']
const contentTypes = [
  { icon: '📄', label: 'Articles' },
  { icon: '🎬', label: 'Videos' },
  { icon: '📑', label: 'Papers' },
  { icon: '🐦', label: 'Tweets' },
  { icon: '📖', label: 'Docs' },
  { icon: '💻', label: 'GitHub' },
  { icon: '💬', label: 'Reddit' },
]

const links = [
  {
    id: 'p1', url: 'https://github.com/facebook/react',
    title: 'React - A JavaScript library for building user interfaces',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    note: 'The official React repository', topic: 'Tech', sharedBy: 'Alex', authorColor: '#10b981',
    time: '2h', tags: ['react', 'javascript'], contentType: 'GitHub',
    image: 'https://opengraph.githubassets.com/1/facebook/react', siteName: 'GitHub',
  },
  {
    id: 'p2', url: 'https://arxiv.org/abs/1706.03762',
    title: 'Attention Is All You Need',
    description: 'We propose a new simple network architecture, the Transformer.',
    note: 'The original transformer paper', topic: 'Research', sharedBy: 'Jordan', authorColor: '#3b82f6',
    time: '1d', tags: ['transformers', 'nlp'], contentType: 'Papers', image: null, siteName: 'arXiv',
  },
  {
    id: 'p3', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    title: 'React Course - Full Tutorial for Beginners',
    description: 'Learn React JS in this full course for beginners. React is a JavaScript library for building user interfaces.',
    note: 'Comprehensive React tutorial from freeCodeCamp', topic: 'Tutorials', sharedBy: 'Sam', authorColor: '#8b5cf6',
    time: '12h', tags: ['react', 'tutorial'], contentType: 'Videos', image: null, siteName: 'YouTube',
  },
  {
    id: 'p4', url: 'https://github.com/microsoft/typescript',
    title: 'TypeScript - JavaScript with syntax for types',
    description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.',
    note: 'TypeScript official repo', topic: 'Tech', sharedBy: 'Riley', authorColor: '#ef4444',
    time: '4h', tags: ['typescript', 'javascript'], contentType: 'GitHub',
    image: 'https://opengraph.githubassets.com/1/microsoft/TypeScript', siteName: 'GitHub',
  },
  {
    id: 'p5', url: 'https://www.reddit.com/r/MachineLearning/',
    title: 'r/MachineLearning - Latest ML Research Discussion',
    description: 'Community discussion on the latest machine learning research and developments.',
    note: 'Great discussions on recent papers', topic: 'Research', sharedBy: 'Casey', authorColor: '#f59e0b',
    time: '2d', tags: ['ml', 'llm', 'research'], contentType: 'Reddit', image: null, siteName: 'Reddit',
  },
  {
    id: 'p6', url: 'https://github.com/tailwindlabs/tailwindcss',
    title: 'Tailwind CSS - Utility-first CSS framework',
    description: 'A utility-first CSS framework for rapidly building custom designs.',
    note: 'Utility-first CSS framework', topic: 'Tech', sharedBy: 'Alex', authorColor: '#10b981',
    time: '30h', tags: ['tailwind', 'css'], contentType: 'GitHub',
    image: 'https://opengraph.githubassets.com/1/tailwindlabs/tailwindcss', siteName: 'GitHub',
  },
  {
    id: 'p7', url: 'https://www.reddit.com/r/reactjs/',
    title: 'r/reactjs - React Community',
    description: 'A community for learning and developing web applications using React.',
    note: 'Discussion on modern React development', topic: 'Tech', sharedBy: 'Jordan', authorColor: '#3b82f6',
    time: '6h', tags: ['react', 'state-management'], contentType: 'Reddit', image: null, siteName: 'Reddit',
  },
  {
    id: 'p8', url: 'https://github.com/vercel/next.js',
    title: 'Next.js - The React Framework for the Web',
    description: 'The React Framework for Production - used by some of the worlds largest companies.',
    note: 'Production React framework', topic: 'Tech', sharedBy: 'Sam', authorColor: '#8b5cf6',
    time: '20h', tags: ['nextjs', 'react', 'framework'], contentType: 'GitHub',
    image: 'https://opengraph.githubassets.com/1/vercel/next.js', siteName: 'GitHub',
  },
  {
    id: 'p9', url: 'https://arxiv.org/abs/2303.08774',
    title: 'GPT-4 Technical Report',
    description: 'We report the development of GPT-4, a large-scale, multimodal model.',
    note: 'OpenAI GPT-4 paper', topic: 'Research', sharedBy: 'Casey', authorColor: '#f59e0b',
    time: '3d', tags: ['gpt', 'llm', 'ai'], contentType: 'Papers', image: null, siteName: 'arXiv',
  },
  {
    id: 'p10', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    title: 'React JS Full Course 2024',
    description: 'Learn React JS from scratch in this comprehensive tutorial for beginners.',
    note: 'Complete React tutorial', topic: 'Tutorials', sharedBy: 'Riley', authorColor: '#ef4444',
    time: '8h', tags: ['react', 'tutorial', 'docs'], contentType: 'Videos', image: null, siteName: 'YouTube',
  },
]

const SOURCE_COLORS = { GitHub: '#333', Reddit: '#e74c3c', Videos: '#ff6b35', Papers: '#a855f7' }
const THUMB_BG = { GitHub: '#0d1117', Reddit: '#1a1a2e', Videos: '#2d1810', Papers: '#2e1a2e' }
const THUMB_ICON = { GitHub: '💻', Reddit: '💬', Videos: '▶️', Papers: '📄' }

function getYouTubeThumb(url) {
  try {
    const u = new URL(url)
    let id = u.searchParams.get('v')
    if (!id && u.hostname.includes('youtu.be')) id = u.pathname.slice(1)
    if (id) return `https://img.youtube.com/vi/${id}/mqdefault.jpg`
  } catch { /* ignore */ }
  return null
}

function Toast({ message, onClose }) {
  return (
    <div className="toast" onAnimationEnd={onClose}>
      {message}
    </div>
  )
}

export default function Feed({ searchQuery, onSearchChange, onTopicFilter, onTypeFilter }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeType, setActiveType] = useState(null)
  const [toast, setToast] = useState(null)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })
  const hoverTimeout = useRef(null)

  const internalSearch = searchQuery !== undefined ? searchQuery : ''

  const filtered = links.filter((link) => {
    if (activeCategory !== 'All' && link.topic !== activeCategory) return false
    if (activeType && link.contentType !== activeType) return false
    if (internalSearch) {
      const q = internalSearch.toLowerCase()
      const matches = link.title?.toLowerCase().includes(q) ||
        link.url.toLowerCase().includes(q) ||
        link.tags?.some(t => t.toLowerCase().includes(q))
      if (!matches) return false
    }
    return true
  })

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  function handleCopy(e, url) {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(url)
    showToast('Link copied!')
  }

  function handleOpen(e, url) {
    e.preventDefault()
    e.stopPropagation()
    window.open(url, '_blank')
  }

  function handleCategoryClick(cat) {
    setActiveCategory(cat)
    setActiveType(null)
    if (onTopicFilter) onTopicFilter(cat === 'All' ? null : cat)
  }

  function handleTypeClick(type) {
    const newType = activeType === type ? null : type
    setActiveType(newType)
    setActiveCategory('All')
    if (onTypeFilter) onTypeFilter(newType)
  }

  function handleHover(link, e) {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    hoverTimeout.current = setTimeout(() => {
      const rect = e.currentTarget.getBoundingClientRect()
      setHoverPos({ x: Math.min(rect.left, window.innerWidth - 320), y: rect.bottom + 8 })
      setHoveredLink(link)
    }, 400)
  }

  function handleHoverEnd() {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setHoveredLink(null)
  }

  return (
    <main className="feed">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="search-bar">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="text"
          placeholder="Search your knowledge base..."
          className="search-input"
          value={internalSearch}
          onChange={e => onSearchChange ? onSearchChange(e.target.value) : null}
        />
        {internalSearch && (
          <button className="clear-search" onClick={() => onSearchChange && onSearchChange('')}>✕</button>
        )}
        <button className="filter-btn" title="Filter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        </button>
      </div>

      <div className="category-filters">
        {categories.map((cat) => (
          <button key={cat} className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat)}>{cat}</button>
        ))}
      </div>

      <div className="type-filters">
        {contentTypes.map((t) => (
          <button key={t.label} className={`type-pill ${activeType === t.label ? 'active' : ''}`}
            onClick={() => handleTypeClick(t.label)}>
            <span className="type-icon">{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <div className="link-cards">
        {filtered.map((link) => {
          const ytThumb = link.contentType === 'Videos' ? getYouTubeThumb(link.url) : null
          const thumbImage = link.image || ytThumb
          const sourceColor = SOURCE_COLORS[link.contentType] || '#666'

          return (
            <a key={link.id} className="link-card" href={link.url} target="_blank" rel="noopener noreferrer"
              onMouseEnter={(e) => handleHover(link, e)} onMouseLeave={handleHoverEnd}>
              <div className="link-thumb" style={{ background: thumbImage ? 'transparent' : (THUMB_BG[link.contentType] || '#1a1a2e') }}>
                {thumbImage ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={thumbImage} alt="" className="thumb-img" />
                ) : (
                  <span className="thumb-icon">{THUMB_ICON[link.contentType] || '🔗'}</span>
                )}
                {link.contentType === 'Videos' && <span className="play-btn">▶</span>}
              </div>
              <div className="link-content">
                <div className="link-tags">
                  <span className="source-badge" style={{ background: sourceColor }}>{link.contentType}</span>
                  <span className="tag-badge">{link.topic}</span>
                </div>
                <h3 className="link-title">{link.title}</h3>
                <p className="link-desc">{link.description}</p>
                <div className="link-meta">
                  <span className="meta-avatar" style={{ background: link.authorColor }}>{link.sharedBy[0]}</span>
                  <span className="meta-author">{link.sharedBy}</span>
                  <span className="meta-dot">·</span>
                  <span className="meta-time">{link.time}</span>
                  <span className="meta-dot">·</span>
                  <span className="meta-hashtag">#{link.tags[0]}</span>
                </div>
                {/* Hover action buttons */}
                <div className="card-actions">
                  <button className="card-action-btn" title="Copy link" onClick={(e) => handleCopy(e, link.url)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                  <button className="card-action-btn" title="Highlight" onClick={(e) => { e.preventDefault(); e.stopPropagation(); showToast('Highlights coming soon!') }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </button>
                  <button className="card-action-btn" title="Related" onClick={(e) => { e.preventDefault(); e.stopPropagation(); showToast('Related links coming soon!') }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                  </button>
                  <button className="card-action-btn" title="Open" onClick={(e) => handleOpen(e, link.url)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </button>
                </div>
              </div>
            </a>
          )
        })}
        {filtered.length === 0 && (
          <div className="empty-state">
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📚</div>
            <p>No links found</p>
            <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '0.25rem' }}>Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Hover Preview */}
      {hoveredLink && (
        <div className="hover-preview" style={{ left: hoverPos.x, top: hoverPos.y }}
          onMouseEnter={() => {}} onMouseLeave={() => setHoveredLink(null)}>
          <div className="hover-preview-header" style={{ background: THUMB_BG[hoveredLink.contentType] || '#1a1a2e' }}>
            {(hoveredLink.image || (hoveredLink.contentType === 'Videos' && getYouTubeThumb(hoveredLink.url)))
              ? <img src={hoveredLink.image || getYouTubeThumb(hoveredLink.url)} alt="" className="hover-preview-img" />
              : <span style={{ fontSize: '2rem' }}>{THUMB_ICON[hoveredLink.contentType] || '🔗'}</span>
            }
          </div>
          <div className="hover-preview-body">
            <div className="link-tags" style={{ marginBottom: '0.4rem' }}>
              <span className="source-badge" style={{ background: SOURCE_COLORS[hoveredLink.contentType] || '#666' }}>{hoveredLink.contentType}</span>
              <span style={{ fontSize: '0.65rem', color: '#888' }}>{hoveredLink.siteName}</span>
            </div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#eee', marginBottom: '0.25rem', lineHeight: 1.3 }}>{hoveredLink.title}</h4>
            <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.4 }}>{hoveredLink.description || hoveredLink.note}</p>
            <div style={{ marginTop: '0.5rem', paddingTop: '0.4rem', borderTop: '1px solid #222', fontSize: '0.65rem', color: '#555', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              👁 Hover to preview · Click to open
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
