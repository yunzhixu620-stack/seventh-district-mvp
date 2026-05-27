import { Route, Routes } from 'react-router-dom'
import { Frame } from './components/Frame'
import { LandingPage } from './pages/LandingPage'
import { RoleSelectionPage } from './pages/RoleSelectionPage'
import { BriefingPage } from './pages/BriefingPage'
import { BoardPage } from './pages/BoardPage'
import { IdentityGuessPage } from './pages/IdentityGuessPage'
import { ReportPage } from './pages/ReportPage'
import './App.css'

export default function App() {
  return (
    <Frame>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/roles" element={<RoleSelectionPage />} />
        <Route path="/briefing" element={<BriefingPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/identity-guess" element={<IdentityGuessPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Frame>
  )
}
