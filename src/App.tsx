import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

export default function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-advantec-50 via-white to-white">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="text-center text-xs text-gray-500 py-6">
        Advantec • User Directory • {new Date().getFullYear()}
      </footer>
    </div>
  )
}
