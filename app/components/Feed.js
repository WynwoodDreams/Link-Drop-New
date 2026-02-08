'use client'

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
    id: 1,
    thumbnail: null,
    thumbnailBg: '#1a1a2e',
    thumbnailIcon: '⚛️',
    source: 'Reddit',
    sourceColor: '#e74c3c',
    tags: ['Tech'],
    title: 'r/reactjs - React Community',
    description: 'A community for learning and developing web applications using React.',
    author: 'Jordan',
    authorColor: '#3b82f6',
    time: '6h',
    hashtag: '#react',
    url: 'https://www.reddit.com/r/reactjs/',
  },
  {
    id: 2,
    thumbnail: null,
    thumbnailBg: '#2d1810',
    thumbnailIcon: '▶️',
    hasPlayBtn: true,
    source: 'Videos',
    sourceColor: '#ff6b35',
    tags: ['Tutorials'],
    title: 'React JS Full Course 2024',
    description: 'Learn React JS from scratch in this comprehensive tutorial for beginners.',
    author: 'Riley',
    authorColor: '#ef4444',
    time: '8h',
    hashtag: '#react',
    url: 'https://www.youtube.com/results?search_query=react+js+full+course+2024',
  },
  {
    id: 3,
    thumbnail: null,
    thumbnailBg: '#1a2e1a',
    thumbnailIcon: '▶️',
    hasPlayBtn: true,
    source: 'Videos',
    sourceColor: '#ff6b35',
    tags: ['Tutorials'],
    title: 'React Course - Full Tutorial for Beginners',
    description: 'Learn React JS in this full course for beginners. React is a JavaScript library for building user interfaces.',
    author: 'Sam',
    authorColor: '#8b5cf6',
    time: '12h',
    hashtag: '#react',
    url: 'https://www.youtube.com/results?search_query=react+course+full+tutorial+beginners',
  },
  {
    id: 4,
    thumbnail: null,
    thumbnailBg: '#2e1a1a',
    thumbnailIcon: '📄',
    source: 'Papers',
    sourceColor: '#a855f7',
    tags: ['Research'],
    title: 'Attention Is All You Need',
    description: 'We propose a new simple network architecture, the Transformer.',
    author: 'Jordan',
    authorColor: '#3b82f6',
    time: '1d',
    hashtag: '#transformers',
    url: 'https://arxiv.org/abs/1706.03762',
  },
  {
    id: 5,
    thumbnail: null,
    thumbnailBg: '#1a1a2e',
    thumbnailIcon: '💬',
    source: 'Reddit',
    sourceColor: '#e74c3c',
    tags: ['Research'],
    title: 'r/MachineLearning - Latest ML Research Discussion',
    description: 'Discussion forum for the latest machine learning research papers and breakthroughs.',
    author: 'Alex',
    authorColor: '#10b981',
    time: '2d',
    hashtag: '#ml',
    url: 'https://www.reddit.com/r/MachineLearning/',
  },
  {
    id: 6,
    thumbnail: null,
    thumbnailBg: '#2e2e1a',
    thumbnailIcon: '📄',
    source: 'Papers',
    sourceColor: '#a855f7',
    tags: ['Research'],
    title: 'BERT: Pre-training of Deep Bidirectional Transformers',
    description: 'A new language representation model designed to pre-train deep bidirectional representations.',
    author: 'Sam',
    authorColor: '#8b5cf6',
    time: '3d',
    hashtag: '#nlp',
    url: 'https://arxiv.org/abs/1810.04805',
  },
]

export default function Feed() {
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
        {categories.map((cat, i) => (
          <button key={cat} className={`cat-pill ${i === 0 ? 'active' : ''}`}>{cat}</button>
        ))}
      </div>

      <div className="type-filters">
        {contentTypes.map((t) => (
          <button key={t.label} className="type-pill">
            <span className="type-icon">{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <div className="link-cards">
        {links.map((link) => (
          <a key={link.id} className="link-card" href={link.url} target="_blank" rel="noopener noreferrer">
            <div className="link-thumb" style={{ background: link.thumbnailBg }}>
              <span className="thumb-icon">{link.thumbnailIcon}</span>
              {link.hasPlayBtn && <span className="play-btn">▶</span>}
            </div>
            <div className="link-content">
              <div className="link-tags">
                <span className="source-badge" style={{ background: link.sourceColor }}>{link.source}</span>
                {link.tags.map((t) => (
                  <span key={t} className="tag-badge">{t}</span>
                ))}
              </div>
              <h3 className="link-title">{link.title}</h3>
              <p className="link-desc">{link.description}</p>
              <div className="link-meta">
                <span className="meta-avatar" style={{ background: link.authorColor }}>{link.author[0]}</span>
                <span className="meta-author">{link.author}</span>
                <span className="meta-dot">·</span>
                <span className="meta-time">{link.time}</span>
                <span className="meta-dot">·</span>
                <span className="meta-hashtag">{link.hashtag}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}
