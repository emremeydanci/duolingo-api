import React, { useState } from 'react'

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'tr',
    autoRefresh: true
  })

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="page">
      <h1 className="page-title">Ayarlar</h1>
      <p className="page-subtitle">Uygulama ayarlarınızı düzenleyin</p>
      
      <div style={{ marginTop: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px', color: '#495057' }}>Genel Ayarlar</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
              />
              <span>Bildirimler</span>
            </label>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(e) => handleChange('darkMode', e.target.checked)}
              />
              <span>Karanlık Mod</span>
            </label>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.autoRefresh}
                onChange={(e) => handleChange('autoRefresh', e.target.checked)}
              />
              <span>Otomatik Yenileme</span>
            </label>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>
              Dil
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e1e8ed',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
        
        <div style={{
          background: '#f8f9fa',
          padding: '16px',
          borderRadius: '8px',
          marginTop: '24px'
        }}>
          <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
            Ayarlarınız otomatik olarak kaydedilir.
          </p>
        </div>
      </div>
    </div>
  )
}