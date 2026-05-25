import { Navigate, useNavigate } from 'react-router-dom'
import { ActionDesk } from '../components/ActionDesk'
import { IntelBoard } from '../components/IntelBoard'
import { StatusCard } from '../components/StatusCard'
import { ScenePanel } from '../components/ScenePanel'
import { useGameStore } from '../store/gameStore'

export function BoardPage() {
  const navigate = useNavigate()
  const session = useGameStore((state) => state.session)
  if (!session) return <Navigate to="/roles" replace />
  if (session.status === 'finished') return <Navigate to="/report" replace />

  return (
    <main className="situation-board v2-board">
      <StatusCard />
      <div className="board-center">
        <ScenePanel />
        <ActionDesk onFinished={() => navigate('/report')} />
      </div>
      <IntelBoard />
    </main>
  )
}
