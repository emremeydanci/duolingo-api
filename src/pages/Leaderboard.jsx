import React from 'react'

export default function Leaderboard() {
  return (
    <div className="page">
      <h1 className="page-title">Liderlik Tablosu</h1>
      <p className="page-subtitle">En başarılı öğrencileri görüntüleyin</p>
      
      <div style={{ marginTop: '24px' }}>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '12px', color: '#495057' }}>Haftalık Liderler</h3>
          <p style={{ color: '#6c757d', marginBottom: '16px' }}>
            Bu haftanın en aktif öğrencilerini görün ve sıralamada yükselin.
          </p>
          <div style={{ 
            background: 'white',
            padding: '16px',
            borderRadius: '6px',
            border: '1px solid #e9ecef'
          }}>
            <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
              Liderlik tablosu özelliği yakında eklenecek.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}