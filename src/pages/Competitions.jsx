import React from 'react'

export default function Competitions() {
  return (
    <div className="page">
      <h1 className="page-title">Yarışmalar</h1>
      <p className="page-subtitle">Aktif yarışmaları görüntüleyin ve katılın</p>
      
      <div style={{ marginTop: '24px' }}>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '12px', color: '#495057' }}>Aktif Yarışmalar</h3>
          <p style={{ color: '#6c757d', marginBottom: '16px' }}>
            Diğer öğrencilerle yarışın ve motivasyonunuzu artırın.
          </p>
          <div style={{ 
            background: 'white',
            padding: '16px',
            borderRadius: '6px',
            border: '1px solid #e9ecef'
          }}>
            <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
              Yarışma sistemi yakında aktif hale gelecek.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}