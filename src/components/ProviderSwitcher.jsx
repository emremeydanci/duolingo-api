import React, { useState } from 'react'

export function ProviderSwitcher() {
  const [provider, setProvider] = useState('duolingo')
  
  const providers = [
    { id: 'duolingo', name: 'Duolingo', color: '#58cc02' },
    { id: 'babbel', name: 'Babbel', color: '#f39c12' },
    { id: 'busuu', name: 'Busuu', color: '#1abc9c' }
  ]

  return (
    <div className="provider-switcher">
      <select 
        value={provider} 
        onChange={(e) => setProvider(e.target.value)}
        className="provider-select"
      >
        {providers.map(p => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <div 
        className="provider-indicator"
        style={{ backgroundColor: providers.find(p => p.id === provider)?.color }}
      />
    </div>
  )
}