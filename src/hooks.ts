import { useEffect, useState } from 'react'
import type { Profile } from './types'
import { apiGet } from './api/client'

export function useProfiles() {
  const [data, setData] = useState<Profile[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    apiGet<{ profiles: Profile[] }>('/profiles')
      .then((res) => { if (mounted) setData(res.profiles) })
      .catch((e) => { if (mounted) setError(e) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  return { data, loading, error }
}
