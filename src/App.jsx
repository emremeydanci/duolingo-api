import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import { ProviderSwitcher } from './components/ProviderSwitcher.jsx'
import { routes } from './routes.jsx'
import sitemap from './assets/sitemap.json'

const NavItem = ({ to, children }) => (
  <NavLink to={to} className={({ isActive }) => 'navlink' + (isActive ? ' active' : '')}>
    {children}
  </NavLink>
)

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo" />
          <div>DanubeX</div>
        </div>
        <div className="search">
          <input placeholder="Ara..." />
        </div>

        <div className="navgroup">
          <h4>Genel</h4>
          <NavItem to="/">Dashboard</NavItem>
        </div>

        <div className="navgroup">
          <h4>Çekirdek</h4>
          {sitemap.Core?.map(([name, path]) => <NavItem key={path} to={path}>{name}</NavItem>)}
        </div>

        <div className="navgroup">
          <h4>Fırsatlar</h4>
          {sitemap.Opportunites?.map(([name, path]) => <NavItem key={path} to={path}>{name}</NavItem>)}
        </div>

        <div className="navgroup">
          <h4>Ekstralar</h4>
          {sitemap.Extras?.map(([name, path]) => <NavItem key={path} to={path}>{name}</NavItem>)}
        </div>
      </aside>

      <header className="header">
        <div>Site Haritası hazır • 8001</div>
        <ProviderSwitcher />
      </header>

      <main className="content">
        <Routes>
          {routes.map(r => <Route key={r.path} path={r.path} element={r.element} />)}
        </Routes>
      </main>
    </div>
  )
}