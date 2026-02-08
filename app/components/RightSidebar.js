'use client'

import { useState } from 'react'

const initialConnections = [
  { id: '1', name: 'Alex Chen', initials: 'AC', color: '#10b981', links: '42 links shared', online: true, connected: true },
  { id: '2', name: 'Jordan Kim', initials: 'JK', color: '#3b82f6', links: '28 links shared', online: true, connected: true },
  { id: '3', name: 'Sam Rivera', initials: 'SR', color: '#8b5cf6', links: '15 links shared', online: false, connected: false },
  { id: '4', name: 'Riley Morgan', initials: 'RM', color: '#f59e0b', links: '67 links shared', online: true, connected: false },
]

const initialGroups = [
  {
    id: '1', name: 'React Mastery', icon: '⚛️', type: 'tutorial', badge: 'TUTORIAL', badgeColor: '#3b82f6',
    desc: 'Advanced React patterns and tutorials', joined: true, members: 1247, links: 892,
    relevanceScore: 94, postsThisWeek: 47, avgPostsPerDay: 6.7, lastActive: '2h ago',
    topTopics: ['React', 'Hooks', 'Performance', 'TypeScript', 'Testing'],
  },
  {
    id: '2', name: 'ML Research Hub', icon: '🧠', type: 'research', badge: 'RESEARCH', badgeColor: '#a855f7',
    desc: 'Latest papers and research discussions', joined: true, members: 856, links: 2341,
    relevanceScore: 78, postsThisWeek: 89, avgPostsPerDay: 12.7, lastActive: '30m ago',
    topTopics: ['LLMs', 'Papers', 'PyTorch', 'Transformers', 'Fine-tuning'],
  },
  {
    id: '3', name: 'TypeScript Deep Dive', icon: '📘', type: 'skill', badge: 'SKILL', badgeColor: '#10b981',
    desc: 'TypeScript tips, tricks and patterns', joined: false, members: 634, links: 445,
    relevanceScore: 86, postsThisWeek: 23, avgPostsPerDay: 3.3, lastActive: '4h ago',
    topTopics: ['TypeScript', 'Types', 'Generics', 'Patterns', 'Config'],
  },
  {
    id: '4', name: 'Open Source Projects', icon: '🚀', type: 'project', badge: 'PROJECT', badgeColor: '#f59e0b',
    desc: 'Collaborate on open source work', joined: false, members: 423, links: 678,
    relevanceScore: 62, postsThisWeek: 34, avgPostsPerDay: 4.9, lastActive: '1d ago',
    topTopics: ['GitHub', 'Projects', 'Contributing', 'Issues', 'PRs'],
  },
  {
    id: '5', name: 'System Design', icon: '🏗️', type: 'skill', badge: 'SKILL', badgeColor: '#10b981',
    desc: 'Architecture and design patterns', joined: true, members: 1892, links: 1234,
    relevanceScore: 71, postsThisWeek: 56, avgPostsPerDay: 8.0, lastActive: '1h ago',
    topTopics: ['Architecture', 'Scalability', 'Databases', 'APIs', 'Caching'],
  },
]

const trending = [
  { id: '1', name: 'LLM Fine-tuning', count: 2847, trend: 'up' },
  { id: '2', name: 'React Server Components', count: 1923, trend: 'up' },
  { id: '3', name: 'System Design', count: 1654, trend: 'stable' },
  { id: '4', name: 'TypeScript 5.0', count: 1432, trend: 'up' },
  { id: '5', name: 'Edge Computing', count: 987, trend: 'stable' },
]

export default function RightSidebar({ onSearch, showToast }) {
  const [connections, setConnections] = useState(initialConnections)
  const [groups, setGroups] = useState(initialGroups)
  const [selectedGroup, setSelectedGroup] = useState(null)

  function toggleConnection(id) {
    setConnections(prev => prev.map(c => {
      if (c.id === id) {
        const updated = { ...c, connected: !c.connected }
        if (showToast) showToast(updated.connected ? `Connected with ${c.name}` : `Disconnected from ${c.name}`)
        return updated
      }
      return c
    }))
  }

  function toggleGroup(id, e) {
    if (e) { e.stopPropagation() }
    setGroups(prev => prev.map(g => {
      if (g.id === id) {
        const updated = { ...g, joined: !g.joined }
        if (showToast) showToast(updated.joined ? `Joined ${g.name}` : `Left ${g.name}`)
        return updated
      }
      return g
    }))
  }

  function handleTrendingClick(name) {
    if (onSearch) onSearch(name)
    if (showToast) showToast(`Searching for "${name}"`)
  }

  return (
    <aside className="right-sidebar">
      {/* Connections */}
      <div className="sidebar-card">
        <div className="card-header-row">
          <h3 className="sidebar-card-title"><span className="people-icon">👥</span> Your Connections</h3>
          <span className="header-count">{connections.filter(c => c.connected).length} active</span>
        </div>
        <ul className="connections-list">
          {connections.map((c) => (
            <li key={c.id} className="connection-item">
              <div className="conn-avatar" style={{ background: c.color }}>
                {c.initials}
                {c.online && <span className="online-dot" />}
              </div>
              <div className="conn-info">
                <span className="conn-name">{c.name}</span>
                <span className="conn-links">{c.links}</span>
              </div>
              <button
                className={`conn-btn ${c.connected ? 'connected' : 'connect'}`}
                onClick={() => toggleConnection(c.id)}
              >
                {c.connected ? '✓ Connected' : '⊕ Connect'}
              </button>
            </li>
          ))}
        </ul>
        <button className="find-link orange-text" onClick={() => showToast && showToast('Find connections coming soon!')}>Find connections</button>
      </div>

      {/* Groups */}
      <div className="sidebar-card">
        <div className="card-header-row">
          <h3 className="sidebar-card-title"><span className="group-icon">👥</span> Groups</h3>
          <span className="header-count">{groups.filter(g => g.joined).length} joined</span>
        </div>
        <ul className="groups-list">
          {groups.map((g) => (
            <li key={g.id} className="group-item" onClick={() => setSelectedGroup(g)} style={{ cursor: 'pointer' }}>
              <div className="group-avatar" style={{ background: g.badgeColor + '33' }}>
                <span>{g.icon}</span>
              </div>
              <div className="group-info">
                <div className="group-name-row">
                  <span className="group-name">{g.name}</span>
                  <span className="group-badge" style={{ background: `${g.badgeColor}22`, color: g.badgeColor }}>{g.badge}</span>
                </div>
                <span className="group-desc">{g.desc}</span>
                <div className="group-stats-row">
                  <span className="group-stat">👤 {g.members.toLocaleString()}</span>
                  <span className="group-stat">📄 {g.links.toLocaleString()} links</span>
                </div>
              </div>
              <div className="group-actions">
                <button className={`group-btn ${g.joined ? 'joined' : 'join'}`} onClick={(e) => toggleGroup(g.id, e)}>
                  {g.joined ? 'Joined' : 'Join'}
                </button>
                {g.relevanceScore >= 80 && <span className="match-pct">{g.relevanceScore}% match</span>}
              </div>
            </li>
          ))}
        </ul>
        <div className="group-footer">
          <button className="find-link orange-text" onClick={() => showToast && showToast('Browse all groups coming soon!')}>Browse all groups</button>
          <button className="create-btn" onClick={() => showToast && showToast('Create group coming soon!')}>+ Create</button>
        </div>
      </div>

      {/* Group Analytics Modal */}
      {selectedGroup && (
        <div className="modal-overlay" onClick={() => setSelectedGroup(null)}>
          <div className="group-modal" onClick={e => e.stopPropagation()}>
            <div className="group-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '2rem' }}>{selectedGroup.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{selectedGroup.name}</h2>
                    <span className="group-badge" style={{ background: `${selectedGroup.badgeColor}22`, color: selectedGroup.badgeColor }}>{selectedGroup.badge}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>{selectedGroup.desc}</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setSelectedGroup(null)}>✕</button>
            </div>

            <div className="group-modal-stats">
              <div className="gm-stat"><span className="gm-stat-num">{selectedGroup.members.toLocaleString()}</span><span className="gm-stat-label">Members</span></div>
              <div className="gm-stat"><span className="gm-stat-num">{selectedGroup.links.toLocaleString()}</span><span className="gm-stat-label">Links</span></div>
              <div className="gm-stat"><span className="gm-stat-num">{selectedGroup.postsThisWeek}</span><span className="gm-stat-label">Posts/week</span></div>
              <div className="gm-stat"><span className="gm-stat-num">{selectedGroup.avgPostsPerDay}</span><span className="gm-stat-label">Posts/day</span></div>
            </div>

            <div className="group-modal-body">
              <div className="gm-section">
                <h4>Relevance Score</h4>
                <div className="relevance-bar">
                  <div className="relevance-fill" style={{ width: `${selectedGroup.relevanceScore}%` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#666', marginTop: '0.25rem' }}>
                  <span>Low</span>
                  <span className="orange" style={{ fontWeight: 700 }}>{selectedGroup.relevanceScore}% match</span>
                  <span>Perfect</span>
                </div>
              </div>

              <div className="gm-section">
                <h4>Top Topics</h4>
                <div className="gm-topics">
                  {selectedGroup.topTopics.map((t, i) => (
                    <div key={t} className="gm-topic-row">
                      <span style={{ fontSize: '0.8rem', color: '#ccc' }}>{t}</span>
                      <div className="gm-topic-bar">
                        <div className="gm-topic-fill" style={{ width: `${100 - i * 18}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="gm-section">
                <h4>Activity</h4>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>Last active: {selectedGroup.lastActive}</p>
                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.25rem' }}>
                  Trend: {selectedGroup.avgPostsPerDay > 7 ? '📈 Rising' : selectedGroup.avgPostsPerDay > 3 ? '➡️ Stable' : '📉 Declining'}
                </p>
              </div>
            </div>

            <div style={{ padding: '1rem', borderTop: '1px solid #222' }}>
              <button
                className={`group-modal-join ${selectedGroup.joined ? 'joined' : ''}`}
                onClick={() => { toggleGroup(selectedGroup.id); setSelectedGroup(prev => prev ? { ...prev, joined: !prev.joined } : null) }}
              >
                {selectedGroup.joined ? '✓ Joined' : 'Join Group'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trending Topics */}
      <div className="sidebar-card">
        <h3 className="sidebar-card-title"><span className="trend-icon">📈</span> Trending Topics</h3>
        <ul className="trending-list">
          {trending.map((t, i) => (
            <li key={t.id} className="trending-item" onClick={() => handleTrendingClick(t.name)} style={{ cursor: 'pointer' }}>
              <span style={{ color: '#555', fontSize: '0.7rem', width: '1rem' }}>{i + 1}</span>
              <span className="trending-arrow">↗</span>
              <div style={{ flex: 1 }}>
                <span>{t.name}</span>
                <span style={{ fontSize: '0.65rem', color: '#555', marginLeft: '0.5rem' }}>
                  {t.count.toLocaleString()} shares
                  {t.trend === 'up' && <span style={{ color: '#22c55e', marginLeft: '0.25rem' }}>↑</span>}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
