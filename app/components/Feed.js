'use client'

import { useState } from 'react'

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
    id: 'p1',
    url: 'https://github.com/facebook/react',
    title: 'React - A JavaScript library for building user interfaces',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    note: 'The official React repository',
    topic: 'Tech',
    sharedBy: 'Alex',
    authorColor: '#10b981',
    time: '2h',
    tags: ['react', 'javascript'],
    contentType: 'GitHub',
    image: 'https://opengraph.githubassets.com/1/facebook/react',
    siteName: 'GitHub',
  },
  {
    id: 'p2',
    url: 'https://arxiv.org/abs/1706.03762',
    title: 'Attention Is All You Need',
    description: 'We propose a new simple network architecture, the Transformer.',
    note: 'The original transformer paper',
    topic: 'Research',
    sharedBy: 'Jordan',
    authorColor: '#3b82f6',
    time: '1d',
    tags: ['transformers', 'nlp'],
    contentType: 'Papers',
    image: null,
    siteName: 'arXiv',
  },
  {
    id: 'p3',
    url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    title: 'React Course - Full Tutorial for Beginners',
    description: 'Learn React JS in this full course for beginners. React is a JavaScript library for building user interfaces.',
    note: 'Comprehensive React tutorial from freeCodeCamp',
    topic: 'Tutorials',
    sharedBy: 'Sam',
    authorColor: '#8b5cf6',
    time: '12h',
    tags: ['react', 'tutorial'],
    contentType: 'Videos',
    image: null,
    siteName: 'YouTube',
  },
  {
    id: 'p4',
    url: 'https://github.com/microsoft/typescript',
    title: 'TypeScript - JavaScript with syntax for types',
    description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.',
    note: 'TypeScript official repo',
    topic: 'Tech',
    sharedBy: 'Riley',
    authorColor: '#ef4444',
    time: '4h',
    tags: ['typescript', 'javascript'],
    contentType: 'GitHub',
    image: 'https://opengraph.githubassets.com/1/microsoft/TypeScript',
    siteName: 'GitHub',
  },
  {
    id: 'p5',
    url: 'https://www.reddit.com/r/MachineLearning/',
    title: 'r/MachineLearning - Latest ML Research Discussion',
    description: 'Community discussion on the latest machine learning research and developments.',
    note: 'Great discussions on recent papers',
    topic: 'Research',
    sharedBy: 'Casey',
    authorColor: '#f59e0b',
    time: '2d',
    tags: ['ml', 'llm', 'research'],
    contentType: 'Reddit',
    image: null,
    siteName: 'Reddit',
  },
  {
    id: 'p6',
    url: 'https://github.com/tailwindlabs/tailwindcss',
    title: 'Tailwind CSS - Utility-first CSS framework',
    description: 'A utility-first CSS framework for rapidly building custom designs.',
    note: 'Utility-first CSS framework',
    topic: 'Tech',
    sharedBy: 'Alex',
    authorColor: '#10b981',
    time: '30h',
    tags: ['tailwind', 'css'],
    contentType: 'GitHub',
    image: 'https://opengraph.githubassets.com/1/tailwindlabs/tailwindcss',
    siteName: 'GitHub',
  },
  {
    id: 'p7',
    url: 'https://www.reddit.com/r/reactjs/',
    title: 'r/reactjs - React Community',
    description: 'A community for learning and developing web applications using React.',
    note: 'Discussion on modern React development',
    topic: 'Tech',
    sharedBy: 'Jordan',
    authorColor: '#3b82f6',
    time: '6h',
    tags: ['react', 'state-management'],
    contentType: 'Reddit',
    image: null,
    siteName: 'Reddit',
  },
  {
    id: 'p8',
    url: 'https://github.com/vercel/next.js',
    title: 'Next.js - The React Framework for the Web',
    description: 'The React Framework for Production - used by some of the worlds largest companies.',
    note: 'Production React framework',
    topic: 'Tech',
    sharedBy: 'Sam',
    authorColor: '#8b5cf6',
    time: '20h',
    tags: ['nextjs', 'react', 'framework'],
    contentType: 'GitHub',
    image: 'https://opengraph.githubassets.com/1/vercel/next.js',
    siteName: 'GitHub',
  },
  {
    id: 'p9',
    url: 'https://arxiv.org/abs/2303.08774',
    title: 'GPT-4 Technical Report',
    description: 'We report the development of GPT-4, a large-scale, multimodal model.',
    note: 'OpenAI GPT-4 paper',
    topic: 'Research',
    sharedBy: 'Casey',
    authorColor: '#f59e0b',
    time: '3d',
    tags: ['gpt', 'llm', 'ai'],
    contentType: 'Papers',
    image: null,
    siteName: 'arXiv',
  },
  {
    id: 'p10',
    url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    title: 'React JS Full Course 2024',
    description: 'Learn React JS from scratch in this comprehensive tutorial for beginners.',
    note: 'Complete React tutorial',
    topic: 'Tutorials',
    sharedBy: 'Riley',
    authorColor: '#ef4444',
    time: '8h',
    tags: ['react', 'tutorial', 'docs'],
    contentType: 'Videos',
    image: null,
    siteName: 'YouTube',
  },
]

const SOURCE_COLORS = {
  GitHub: '#333',
  Reddit: '#e74c3c',
  Videos: '#ff6b35',
  Papers: '#a855f7',
  YouTube: '#e74c3c',
  arXiv: '#a855f7',
}

const THUMB_BG = {
  GitHub: '#0d1117',
  Reddit: '#1a1a2e',
  Videos: '#2d1810',
  Papers: '#2e1a2e',
}

const THUMB_ICON = {
  GitHub: '💻',
  Reddit: '💬',
  Videos: '▶️',
  Papers: '📄',
}

function getYouTubeThumb(url) {
  try {
    const u = new URL(url)
    const id = u.searchParams.get('v')
    if (id) return `https://img.youtube.com/vi/${id}/mqdefault.jpg`
  } catch { /* ignore */ }
  return null
}

export default function Feed() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeType, setActiveType] = useState(null)

  const filtered = links.filter((link) => {
    if (activeCategory !== 'All' && link.topic !== activeCategory) return false
    if (activeType && link.contentType !== activeType) return false
    return true
  })

  return (
    <main className="feed">
      <div className="search-bar">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="Search your knowledge base..." className="search-input" />
        <button className="filter-btn" title="Filter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        </button>
      </div>

      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="type-filters">
        {contentTypes.map((t) => (
          <button
            key={t.label}
            className={`type-pill ${activeType === t.label ? 'active' : ''}`}
            onClick={() => setActiveType(activeType === t.label ? null : t.label)}
          >
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
            <a key={link.id} className="link-card" href={link.url} target="_blank" rel="noopener noreferrer">
              <div
                className="link-thumb"
                style={{ background: thumbImage ? 'transparent' : (THUMB_BG[link.contentType] || '#1a1a2e') }}
              >
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
              </div>
            </a>
          )
        })}
        {filtered.length === 0 && (
          <div className="empty-state">No links match the current filters.</div>
        )}
      </div>
    </main>
  )
}
