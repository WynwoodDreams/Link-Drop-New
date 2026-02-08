'use client'

import { useState } from 'react'
import Header from './components/Header'
import LeftSidebar from './components/LeftSidebar'
import Feed from './components/Feed'
import RightSidebar from './components/RightSidebar'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [toast, setToast] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <>
      <Header showToast={showToast} />
      <div className="app-layout">
        <LeftSidebar onAddLink={() => setShowAddModal(true)} onSearch={setSearchQuery} showToast={showToast} />
        <Feed searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <RightSidebar onSearch={setSearchQuery} showToast={showToast} />
      </div>

      {/* Global Toast */}
      {toast && <div className="toast">{toast}</div>}

      {/* Add Link Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="add-modal" onClick={e => e.stopPropagation()}>
            <div className="add-modal-header">
              <h2>Drop a Link</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form className="add-modal-form" onSubmit={e => { e.preventDefault(); showToast('Link added!'); setShowAddModal(false) }}>
              <div className="form-field">
                <label>URL</label>
                <input type="url" placeholder="Paste link here..." autoFocus required />
              </div>
              <div className="form-field">
                <label>Title (optional)</label>
                <input type="text" placeholder="Custom title" />
              </div>
              <div className="form-field">
                <label>Note</label>
                <textarea placeholder="Why you're sharing this..." rows={3} />
              </div>
              <div className="form-field">
                <label>Tags</label>
                <input type="text" placeholder="react, tutorial, ai" />
              </div>
              <div className="form-field">
                <label>Topic</label>
                <select defaultValue="Tech">
                  <option>Tech</option>
                  <option>Research</option>
                  <option>Tutorials</option>
                  <option>Documentation</option>
                  <option>Articles</option>
                  <option>Resources</option>
                </select>
              </div>
              <button type="submit" className="add-modal-submit">Add Link</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
