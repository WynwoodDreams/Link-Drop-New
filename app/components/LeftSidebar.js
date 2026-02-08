'use client'

const suggestedSteps = [
  { icon: '🔄', label: 'Continue learning React', sub: '3 React items saved', color: '#ff6b35' },
  { icon: '⚡', label: 'Explore AI/ML content', sub: 'Trending in your network', color: '#ff6b35' },
  { icon: '🕐', label: 'Review saved items', sub: '6 total items', color: '#ff6b35' },
  { icon: '🔖', label: 'Add new content', sub: 'Drop a new link', color: '#ff6b35' },
]

const sources = [
  { name: 'Arxiv', count: 2, pct: 33, color: '#e74c3c' },
  { name: 'Youtube', count: 2, pct: 33, color: '#9b59b6' },
  { name: 'Reddit', count: 2, pct: 33, color: '#3498db' },
]

const streakDays = [0, 0, 0, 0, 0, 0, 0]

export default function LeftSidebar() {
  return (
    <aside className="left-sidebar">
      <button className="drop-link-btn">+ Drop a Link</button>

      <div className="sidebar-card">
        <h3 className="sidebar-card-title">
          <span className="sparkle">✨</span> Suggested Next Steps
        </h3>
        <ul className="steps-list">
          {suggestedSteps.map((step, i) => (
            <li key={i} className="step-item">
              <span className="step-icon">{step.icon}</span>
              <div className="step-text">
                <span className="step-label">{step.label}</span>
                <span className="step-sub">{step.sub}</span>
              </div>
              <span className="step-arrow">›</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-card">
        <div className="streak-header">
          <span>Learning Streak</span>
          <span className="streak-count orange">0 days</span>
        </div>
        <div className="streak-dots">
          {streakDays.map((d, i) => (
            <div key={i} className={`streak-dot ${d ? 'active' : ''}`} />
          ))}
        </div>
        <p className="streak-hint">Start adding links to build your streak!</p>
      </div>

      <div className="sidebar-card">
        <h3 className="sidebar-card-title">
          <span className="chart-icon">📊</span> Platform Overview
        </h3>
        <p className="overview-sub">What&apos;s being shared</p>

        <div className="overview-tabs">
          <button className="overview-tab active"><span className="tab-dot red" /> Sources</button>
          <button className="overview-tab"><span className="tab-hash">#</span> Topics</button>
          <button className="overview-tab"><span className="tab-info">ⓘ</span> Skills</button>
          <button className="overview-tab"><span className="tab-tool">🔧</span> Tools</button>
        </div>

        <ul className="source-list">
          {sources.map((s, i) => (
            <li key={i} className="source-item">
              <div className="source-info">
                <span className="source-dot" style={{ background: s.color }} />
                <span className="source-name">{s.name}</span>
              </div>
              <span className="source-count">{s.count} ({s.pct}%)</span>
              <div className="source-bar">
                <div className="source-bar-fill" style={{ width: `${s.pct}%`, background: s.color }} />
              </div>
            </li>
          ))}
        </ul>

        <div className="overview-stats">
          <div className="stat-box">
            <span className="stat-num orange">6</span>
            <span className="stat-label">Total Links</span>
          </div>
          <div className="stat-box">
            <span className="stat-num orange">3</span>
            <span className="stat-label">Sources</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
