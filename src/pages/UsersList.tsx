import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'
import Spinner from '../components/Spinner'
import ErrorBanner from '../components/ErrorBanner'
import { useProfiles } from '../hooks'
import type { Profile } from '../types'

export default function UsersList() {
  const { data, loading, error } = useProfiles()

  if (loading) return <Spinner />
  if (error) return <div className="container-max p-4"><ErrorBanner message={error.message} /></div>

  return (
    <main className="container-max p-4">
      <h1 className="text-xl font-semibold mb-4">Usuarios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((u: Profile) => (
          <Link key={u.id} to={`/profile/${u.id}`} className="card p-4">
            <div className="flex items-center gap-3">
              <Avatar src={u.avatarUrl} alt={`${u.firstName} ${u.lastName}`} />
              <div>
                <div className="font-medium">{u.firstName} {u.lastName}</div>
                <div className="text-sm text-gray-500">{u.role}</div>
                <div className="text-xs text-gray-500">{u.email}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
