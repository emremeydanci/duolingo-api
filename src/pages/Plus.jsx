import React from 'react'

export default function Plus() {
  return (
    <div className="page">
      <h1 className="page-title">Duolingo Plus</h1>
      <p className="page-subtitle">Premium özellikler ve avantajlar</p>
      
      <div style={{ marginTop: '24px' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #58cc02, #89e219)', 
          padding: '24px', 
          borderRadius: '12px',
          color: 'white',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '12px', color: 'white' }}>Duolingo Plus Avantajları</h3>
          <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
            <li>Reklamsız öğrenme deneyimi</li>
            <li>Sınırsız kalp sistemi</li>
            <li>Aylık ilerleme testi</li>
            <li>Çevrimdışı dersler</li>
          </ul>
        </div>
        
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px'
        }}>
          <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
            Plus aboneliği durumunuz istatistikler sayfasından görüntülenebilir.
          </p>
        </div>
      </div>
    </div>
  )
}