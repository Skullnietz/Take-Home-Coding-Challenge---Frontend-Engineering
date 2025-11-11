import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { apiGet } from '../api/client'
import Spinner from '../components/Spinner'
import ErrorBanner from '../components/ErrorBanner'
import Avatar from '../components/Avatar'
import type { Profile } from '../types'

export default function UserDetail() {
  const { id } = useParams()
  const [data, setData] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await apiGet<{ profile: Profile }>(`/profile/${id}`)
        if (mounted) setData(res.profile)
      } catch (e:any) {
        if (mounted) setError(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [id])

  if (loading) return <Spinner />
  if (error) return <div className="container-max p-4"><ErrorBanner message={error.message} /></div>
  if (!data) return <div className="container-max p-4"><ErrorBanner message="No encontrado" /></div>

  return (
    <main className="container-max p-4">
      <div className="mb-3"><Link className="text-advantecBlue" to="/">← Volver</Link></div>
      <div className="rounded-xl border bg-white p-6 shadow">
        <div className="flex items-center gap-4">
          <Avatar src={data.avatarUrl} alt={`${data.firstName} ${data.lastName}`} />
          <div>
            <h1 className="text-xl font-semibold">{data.firstName} {data.lastName}</h1>
            <div className="text-sm text-gray-600">{data.role}</div>
            <div className="text-sm text-gray-600">{data.email}</div>
            {data.phone && <div className="text-sm text-gray-600">{data.phone}</div>}
          </div>
        </div>
        {data.bio && <p className="mt-4 text-gray-700">{data.bio}</p>}
        <div className="card p-6">
          <button onClick={() => navigate(`/edit/${data.id}`)} className="btn-primary">Editar</button>
        </div>
      </div>
    </main>
  )
}
