import React from 'react'
import Dashboard from './pages/Dashboard.jsx'
import Stats from './pages/Stats.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import Learning from './pages/Learning.jsx'
import Competitions from './pages/Competitions.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Plus from './pages/Plus.jsx'
import Achievements from './pages/Achievements.jsx'
import Friends from './pages/Friends.jsx'
import Help from './pages/Help.jsx'

export const routes = [
  { path: '/', element: <Dashboard /> },
  { path: '/stats', element: <Stats /> },
  { path: '/profile', element: <Profile /> },
  { path: '/settings', element: <Settings /> },
  { path: '/learning', element: <Learning /> },
  { path: '/competitions', element: <Competitions /> },
  { path: '/leaderboard', element: <Leaderboard /> },
  { path: '/plus', element: <Plus /> },
  { path: '/achievements', element: <Achievements /> },
  { path: '/friends', element: <Friends /> },
  { path: '/help', element: <Help /> }
]