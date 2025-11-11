import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { apiGet, apiPatch, apiPost } from '../api/client'
import Spinner from '../components/Spinner'
import ErrorBanner from '../components/ErrorBanner'
import type { Profile } from '../types'

const schema = z.object({
  firstName: z.string().min(1, 'Requerido'),
  lastName: z.string().min(1, 'Requerido'),
  email: z.string().email('Email inválido'),
  role: z.string().min(1, 'Requerido'),
  phone: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url('URL inválida').optional().or(z.literal(''))
})

type FormData = z.infer<typeof schema>

export default function UserForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: '', lastName: '', email: '', role: '', phone: '', bio: '', avatarUrl: '' }
  })

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!isEdit) return
      setLoading(true)
      try {
        const res = await apiGet<{ profile: Profile }>(`/profile/${id}`)
        if (!mounted) return
        const p = res.profile
        setValue('firstName', p.firstName)
        setValue('lastName', p.lastName)
        setValue('email', p.email)
        setValue('role', p.role)
        setValue('phone', p.phone || '')
        setValue('bio', p.bio || '')
        setValue('avatarUrl', p.avatarUrl || '')
      } catch (e:any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [id, isEdit, setValue])

  const onSubmit = async (data: FormData) => {
    setError(null)
    try {
      if (isEdit) {
        await apiPatch(`/profile/${id}`, data)
        navigate(`/profile/${id}`)
      } else {
        const created = await apiPost<{ profile: Profile }>('/profile', data)
        const newId = (created as any).profile?.id ?? (created as any).id ?? ''
        navigate(`/profile/${newId || ''}` || '/')
      }
    } catch (e:any) {
      setError(e.message)
    }
  }

  if (loading) return <Spinner />

  return (
    <main className="container-max p-4">
      <h1 className="text-xl font-semibold mb-4">{isEdit ? 'Editar usuario' : 'Crear usuario'}</h1>
      {error && <div className="mb-3"><ErrorBanner message={error} /></div>}
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 max-w-xl">
        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input className="input" {...register('firstName')} />
          {errors.firstName && <p className="text-xs text-red-600">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Apellidos</label>
          <input className="w-full rounded border p-2" {...register('lastName')} />
          {errors.lastName && <p className="text-xs text-red-600">{errors.lastName.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full rounded border p-2" {...register('email')} />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Rol</label>
          <input className="w-full rounded border p-2" {...register('role')} />
          {errors.role && <p className="text-xs text-red-600">{errors.role.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Teléfono</label>
          <input className="w-full rounded border p-2" {...register('phone')} />
        </div>
        <div>
          <label className="block text-sm mb-1">Avatar URL</label>
          <input className="w-full rounded border p-2" placeholder="https://..." {...register('avatarUrl')} />
          {errors.avatarUrl && <p className="text-xs text-red-600">{errors.avatarUrl.message}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Bio</label>
          <textarea className="input" rows={4} {...register('bio')} />
        </div>

        <div className="mt-2 flex gap-2">
          <button disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
          <button type="button" onClick={() => history.back()} className="btn-secondary">Cancelar</button>
        </div>
      </form>
    </main>
  )
}
