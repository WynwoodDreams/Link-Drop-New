'use client'

const connections = [
  { name: 'Alex Chen', initials: 'AC', color: '#10b981', status: 'Connected', statusColor: '#10b981', links: '42 links shared', online: true },
  { name: 'Jordan Kim', initials: 'JK', color: '#3b82f6', status: 'Connected', statusColor: '#10b981', links: '28 links shared', online: true },
  { name: 'Sam Rivera', initials: 'SR', color: '#8b5cf6', status: 'Connect', statusColor: '#666', links: '15 links shared', online: false },
  { name: 'Riley Morgan', initials: 'RM', color: '#f59e0b', status: null, links: '', online: false },
]

const groups = [
  {
    name: 'React Mastery',
    initials: 'RM',
    color: '#ff6b35',
    badge: 'TUTORIAL',
    badgeColor: '#ff6b35',
    desc: 'Advanced React patterns...',
    joined: true,
    members: '1,247',
    links: '892 links',
    match: '94% match',
    hasAnalytics: true,
  },
  {
    name: 'ML Research Hub',
    initials: 'ML',
    color: '#a855f7',
    badge: 'RESEARCH',
    badgeColor: '#a855f7',
    desc: 'Latest papers and researc...',
    joined: true,
    members: '856',
    links: '2,341 links',
    match: null,
    hasAnalytics: true,
  },
  {
    name: 'TypeScript Deep Dive',
    initials: 'TS',
    color: '#3b82f6',
    badge: 'SKILL',
    badgeColor: '#3b82f6',
    desc: null,
    joined: false,
    members: null,
    links: null,
    match: null,
    hasAnalytics: false,
  },
]

const trending = [
  'LLM Fine-tuning',
  'React Server Components',
  'Rust for Web Dev',
  'AI Agents',
  'Edge Computing',
]

export default function RightSidebar() {
  return (
    <aside className="right-sidebar">
      <div className="sidebar-card">
        <div className="card-header-row">
          <h3 className="sidebar-card-title"><span className="people-icon">👥</span> Your Connections</h3>
          <span className="header-count">2 active</span>
        </div>
        <ul className="connections-list">
          {connections.map((c, i) => (
            <li key={i} className="connection-item">
              <div className="conn-avatar" style={{ background: c.color }}>
                {c.initials}
                {c.online && <span className="online-dot" />}
              </div>
              <div className="conn-info">
                <span className="conn-name">{c.name}</span>
                <span className="conn-links">{c.links}</span>
              </div>
              {c.status && (
                <button className={`conn-btn ${c.status === 'Connected' ? 'connected' : 'connect'}`}>
                  {c.status === 'Connected' ? '✓ Connected' : '⊕ Connect'}
                </button>
              )}
            </li>
          ))}
        </ul>
        <button className="find-link orange-text">Find connections</button>
      </div>

      <div className="sidebar-card">
        <div className="card-header-row">
          <h3 className="sidebar-card-title"><span className="group-icon">👥</span> Groups</h3>
          <span className="header-count">3 joined</span>
        </div>
        <ul className="groups-list">
          {groups.map((g, i) => (
            <li key={i} className="group-item">
              <div className="group-avatar" style={{ background: g.color }}>{g.initials}</div>
              <div className="group-info">
                <div className="group-name-row">
                  <span className="group-name">{g.name}</span>
                  <span className="group-badge" style={{ background: `${g.badgeColor}22`, color: g.badgeColor }}>{g.badge}</span>
                </div>
                {g.desc && <span className="group-desc">{g.desc}</span>}
                {g.hasAnalytics && (
                  <div className="group-stats-row">
                    <span className="group-stat">👤 {g.members}</span>
                    <span className="group-stat">📄 {g.links}</span>
                  </div>
                )}
              </div>
              <div className="group-actions">
                <button className={`group-btn ${g.joined ? 'joined' : 'join'}`}>
                  {g.joined ? 'Joined' : 'Join'}
                </button>
                {g.hasAnalytics && <button className="analytics-btn">📊 Analytics</button>}
                {g.match && <span className="match-pct">{g.match}</span>}
              </div>
            </li>
          ))}
        </ul>
        <div className="group-footer">
          <button className="find-link orange-text">Browse all groups</button>
          <button className="create-btn">+ Create</button>
        </div>
      </div>

      <div className="sidebar-card">
        <h3 className="sidebar-card-title"><span className="trend-icon">📈</span> Trending Topics</h3>
        <ul className="trending-list">
          {trending.map((t, i) => (
            <li key={i} className="trending-item">
              <span className="trending-arrow">↗</span> {t}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
