import React from 'react'
import Home from './pages/Home'
import LivePreview from './pages/LivePreview'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      {/* Dark Horizon Glow */}
      <div
        className="absolute inset-0 -z-10 min-h-screen w-full"
        style={{
          background:
            'radial-gradient(at 100% 0%, #000000 0px, transparent 50%), radial-gradient(at 53.37643458925444% 86.1111068725586%, #245386 0px, transparent 50%), #000000',
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/livepreview" element={<LivePreview />} />
      </Routes>
    </>
  )
}

export default App
