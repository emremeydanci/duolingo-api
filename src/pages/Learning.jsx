import React from 'react'

export default function Learning() {
  return (
    <div className="page">
      <h1 className="page-title">Dil Öğrenme</h1>
      <p className="page-subtitle">Dil öğrenme sürecinizi takip edin</p>
      
      <div style={{ marginTop: '24px' }}>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '12px', color: '#495057' }}>Öğrenme İlerlemesi</h3>
          <p style={{ color: '#6c757d', marginBottom: '16px' }}>
            Bu sayfada dil öğrenme sürecinizi detaylı olarak takip edebilirsiniz.
          </p>
          <div style={{ 
            background: 'white',
            padding: '16px',
            borderRadius: '6px',
            border: '1px solid #e9ecef'
          }}>
            <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
              Öğrenme modülleri ve ilerleme takibi yakında eklenecek.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}