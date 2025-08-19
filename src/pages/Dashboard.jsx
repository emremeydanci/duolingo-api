import React from 'react'

export default function Dashboard() {
  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">DanubeX'e hoş geldiniz - Dil öğrenme istatistiklerinizi takip edin</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Günlük Seri</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Toplam XP</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">0</div>
          <div className="stat-label">Taçlar</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">-</div>
          <div className="stat-label">Mevcut Lig</div>
        </div>
      </div>
      
      <div style={{ marginTop: '24px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '12px', color: '#495057' }}>Hızlı Erişim</h3>
        <p style={{ color: '#6c757d' }}>
          Sol menüden istediğiniz sayfaya erişebilir, istatistiklerinizi görüntüleyebilir ve ayarlarınızı düzenleyebilirsiniz.
        </p>
      </div>
    </div>
  )
}