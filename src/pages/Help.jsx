import React from 'react'

export default function Help() {
  return (
    <div className="page">
      <h1 className="page-title">Yardım</h1>
      <p className="page-subtitle">Sık sorulan sorular ve destek</p>
      
      <div style={{ marginTop: '24px' }}>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '16px', color: '#495057' }}>Sık Sorulan Sorular</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ marginBottom: '8px', color: '#495057', fontSize: '16px' }}>
              DanubeX nedir?
            </h4>
            <p style={{ color: '#6c757d', marginBottom: '16px', lineHeight: '1.5' }}>
              DanubeX, Duolingo ve diğer dil öğrenme platformlarından istatistiklerinizi takip edebileceğiniz bir uygulamadır.
            </p>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ marginBottom: '8px', color: '#495057', fontSize: '16px' }}>
              İstatistiklerim nasıl güncellenir?
            </h4>
            <p style={{ color: '#6c757d', marginBottom: '16px', lineHeight: '1.5' }}>
              İstatistikler sayfasından kullanıcı adınızı girerek güncel verilerinizi çekebilirsiniz.
            </p>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ marginBottom: '8px', color: '#495057', fontSize: '16px' }}>
              Hangi platformlar destekleniyor?
            </h4>
            <p style={{ color: '#6c757d', marginBottom: '16px', lineHeight: '1.5' }}>
              Şu anda Duolingo desteklenmektedir. Diğer platformlar için destek yakında eklenecek.
            </p>
          </div>
        </div>
        
        <div style={{ 
          background: '#e3f2fd', 
          padding: '16px', 
          borderRadius: '8px',
          border: '1px solid #bbdefb'
        }}>
          <h4 style={{ marginBottom: '8px', color: '#1565c0' }}>
            Destek Gerekiyor mu?
          </h4>
          <p style={{ color: '#1976d2', fontSize: '14px', margin: 0 }}>
            Herhangi bir sorunuz varsa GitHub üzerinden iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}