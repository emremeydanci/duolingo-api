import React from 'react'

export default function Achievements() {
  return (
    <div className="page">
      <h1 className="page-title">Başarılar</h1>
      <p className="page-subtitle">Kazandığınız başarıları ve rozetleri görüntüleyin</p>
      
      <div style={{ marginTop: '24px' }}>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '12px', color: '#495057' }}>Başarı Rozetleri</h3>
          <p style={{ color: '#6c757d', marginBottom: '16px' }}>
            Öğrenme yolculuğunuzdaki kilometre taşlarını kutlayın.
          </p>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '16px',
            marginTop: '20px'
          }}>
            {[
              { name: 'İlk Adım', desc: 'İlk dersi tamamla', earned: true },
              { name: 'Seri Başlangıcı', desc: '7 günlük seri', earned: false },
              { name: 'XP Avcısı', desc: '1000 XP kazan', earned: false },
              { name: 'Taç Koleksiyoncusu', desc: '10 taç kazan', earned: false }
            ].map((achievement, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'center',
                border: '1px solid #e9ecef',
                opacity: achievement.earned ? 1 : 0.5
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: achievement.earned ? '#58cc02' : '#dee2e6',
                  borderRadius: '50%',
                  margin: '0 auto 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  🏆
                </div>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                  {achievement.name}
                </div>
                <div style={{ fontSize: '10px', color: '#6c757d' }}>
                  {achievement.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}