import React from 'react'

export default function Friends() {
  return (
    <div className="page">
      <h1 className="page-title">Arkadaşlar</h1>
      <p className="page-subtitle">Arkadaşlarınızla bağlantı kurun ve birlikte öğrenin</p>
      
      <div style={{ marginTop: '24px' }}>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '12px', color: '#495057' }}>Arkadaş Listesi</h3>
          <p style={{ color: '#6c757d', marginBottom: '16px' }}>
            Arkadaşlarınızın ilerlemesini takip edin ve motivasyon sağlayın.
          </p>
          
          <div style={{ 
            background: 'white',
            padding: '16px',
            borderRadius: '6px',
            border: '1px solid #e9ecef',
            marginBottom: '16px'
          }}>
            <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
              Arkadaş sistemi yakında aktif hale gelecek.
            </p>
          </div>
          
          <button style={{
            background: '#58cc02',
            color: 'white',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            Arkadaş Ekle
          </button>
        </div>
      </div>
    </div>
  )
}