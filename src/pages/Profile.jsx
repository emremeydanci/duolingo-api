import React from 'react'

export default function Profile() {
  return (
    <div className="page">
      <h1 className="page-title">Profil</h1>
      <p className="page-subtitle">Profil bilgilerinizi görüntüleyin ve düzenleyin</p>
      
      <div style={{ marginTop: '24px' }}>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #58cc02, #89e219)',
            borderRadius: '50%',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: 'white',
            fontWeight: 'bold'
          }}>
            U
          </div>
          <h3 style={{ marginBottom: '8px', color: '#495057' }}>Kullanıcı Profili</h3>
          <p style={{ color: '#6c757d', marginBottom: '16px' }}>
            Bu sayfada profil bilgilerinizi görüntüleyebilir ve düzenleyebilirsiniz.
          </p>
          <p style={{ color: '#6c757d', fontSize: '14px' }}>
            Profil özellikleri yakında eklenecek.
          </p>
        </div>
      </div>
    </div>
  )
}