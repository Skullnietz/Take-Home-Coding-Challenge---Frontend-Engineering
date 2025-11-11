import { Link, NavLink } from 'react-router-dom'

const LOGO_URL = "https://faxstorage.net/storage/domains/10ac774b-2b84-494a-99c0-1f2a749dc3c0.png"

export default function NavBar() {
  return (
    <header className="text-white shadow"
      style={{ background: "linear-gradient(90deg, var(--brand-start), var(--brand-end))" }}>
      <nav className="container-max flex items-center justify-between p-3 sm:p-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Advantec" className="h-8 sm:h-9 w-auto" />
          <span className="hidden sm:block font-semibold tracking-wide">User Directory</span>
        </Link>
        <div className="flex gap-4 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? 'underline' : 'opacity-90 hover:opacity-100'}>Usuarios</NavLink>
          <NavLink to="/create" className={({isActive}) => isActive ? 'underline' : 'opacity-90 hover:opacity-100'}>Crear</NavLink>
        </div>
      </nav>
    </header>
  )
}
