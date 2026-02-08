'use client'

import { useState } from 'react'

export default function Header({ showToast }) {
  const [showNotifs, setShowNotifs] = useState(false)

  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-btn" title="Notifications" onClick={() => setShowNotifs(!showNotifs)} style={{ position: 'relative' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span className="badge" style={{ position: 'absolute', top: 2, right: 2 }}>3</span>
        </button>

        {/* Notifications Dropdown */}
        {showNotifs && (
          <>
            <div className="dropdown-overlay" onClick={() => setShowNotifs(false)} />
            <div className="notif-dropdown">
              <div className="notif-header">
                <span>Notifications</span>
                <button className="orange-text" style={{ fontSize: '0.7rem' }} onClick={() => { setShowNotifs(false); showToast && showToast('Notifications cleared') }}>Clear all</button>
              </div>
              <div className="notif-item">
                <p><span className="orange">Alex</span> shared a new link</p>
                <p className="notif-sub">React - A JavaScript library...</p>
                <p className="notif-time">2h ago</p>
              </div>
              <div className="notif-item">
                <p><span className="orange">Jordan</span> joined React Mastery</p>
                <p className="notif-time">5h ago</p>
              </div>
              <div className="notif-item">
                <p><span className="orange">Sam</span> shared a new link</p>
                <p className="notif-sub">React Course - Full Tutorial...</p>
                <p className="notif-time">12h ago</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="header-center">
        <div className="logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </div>
          <div className="logo-text">
            <span className="logo-title">Link Drop</span>
            <span className="logo-subtitle">LEARNING HUB</span>
          </div>
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn" title="Share" onClick={() => showToast && showToast('Quick Share coming soon!')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
        <button className="icon-btn badge-btn" title="Messages" onClick={() => showToast && showToast('Messages coming soon!')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span className="badge">6</span>
        </button>
        <button className="icon-btn" title="Settings" onClick={() => showToast && showToast('Settings coming soon!')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
        <div className="user-avatar">U</div>
      </div>
    </header>
  )
}
