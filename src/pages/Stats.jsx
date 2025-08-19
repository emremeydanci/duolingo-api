import React, { useState, useEffect } from 'react'

export default function Stats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('emremeydanci')

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/stats?username=${username}`)
      const data = await response.json()
      
      if (data.error) {
        setError(data.error)
      } else {
        setStats(data)
      }
    } catch (err) {
      setError('Bağlantı hatası oluştu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchStats()
  }

  return (
    <div className="page">
      <h1 className="page-title">İstatistikler</h1>
      <p className="page-subtitle">Duolingo hesap istatistiklerinizi görüntüleyin</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı adı"
            style={{
              padding: '8px 12px',
              border: '1px solid #e1e8ed',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '8px 16px',
              background: '#58cc02',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {loading ? 'Yükleniyor...' : 'İstatistikleri Getir'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">
          İstatistikler yükleniyor...
        </div>
      ) : stats ? (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.daily_streak}</div>
            <div className="stat-label">Günlük Seri</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.total_xp?.toLocaleString()}</div>
            <div className="stat-label">Toplam XP</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.crowns}</div>
            <div className="stat-label">Taçlar</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.has_plus ? 'Evet' : 'Hayır'}</div>
            <div className="stat-label">Duolingo Plus</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.learning_language_string || 'Bilinmiyor'}</div>
            <div className="stat-label">Öğrenilen Dil</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.current_league}</div>
            <div className="stat-label">Mevcut Lig</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}