import { createServer, Model, Response } from 'miragejs'
import type { Profile } from '../types'

const seedData: Profile[] = [
  { id: '1', firstName: 'Ana', lastName: 'Lopez', email: 'ana.lopez@example.com', role: 'Frontend Engineer', phone: '+52 55 1111 2222', bio: 'Accesibilidad y componentes reusables.', avatarUrl: 'https://i.pravatar.cc/150?img=47', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', firstName: 'Bruno', lastName: 'Santos', email: 'bruno.santos@example.com', role: 'Backend Engineer', phone: '+52 55 3333 4444', bio: 'APIs robustas, testing y performance.', avatarUrl: 'https://i.pravatar.cc/150?img=13', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', firstName: 'Carla', lastName: 'Mendoza', email: 'carla.mendoza@example.com', role: 'Product Manager', phone: '+52 55 5555 6666', bio: 'KPIs y discovery continuo.', avatarUrl: 'https://i.pravatar.cc/150?img=31', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', firstName: 'Carlos', lastName: 'Guizar', email: 'carlos.guizarp@gmail.com', role: 'Fullstack Engineer', phone: '+52 56 3832 8383', bio: 'Stack usado: Vite + React + TypeScript: velocidad, DX limpia y build productivo. React Router: Users List / User Detail / Create-Edit Form (rutas claras). MirageJS: mock del backend (GET /profiles, GET /profile/:id, POST /profile, PATCH /profile/:id) sin levantar servicios extra. Tailwind: responsive veloz y consistente (paleta con urvinaGreen/urvinaBlue). react-hook-form + zod: formularios con validación declarativa. Vitest + Testing Library: pruebas de UI pragmáticas. ESLint + Prettier: higiene de código.', avatarUrl: 'https://media.licdn.com/dms/image/v2/D5603AQHtGpvgRgF6mA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1680285146679?e=1764201600&v=beta&t=rq6oJniHBRUL_sipA_wi67WBg_sUM5QY6o0lf1UIVnc', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
]

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,
    models: { profile: Model },
    seeds(server) { seedData.forEach((p) => server.create('profile', p)) },
    routes() {
      this.namespace = ''
      this.timing = 400

      this.get('/profiles', (schema) => {
        // @ts-ignore
        return schema.all('profile')
      })

      this.get('/profile/:id', (schema, request) => {
        const id = request.params.id
        // @ts-ignore
        const profile = schema.find('profile', id)
        if (!profile) return new Response(404, {}, { message: 'Profile not found' })
        return profile
      })

      this.post('/profile', (schema, request) => {
        try {
          const attrs = JSON.parse(request.requestBody)
          const now = new Date().toISOString()
          attrs.createdAt = now; attrs.updatedAt = now
          // @ts-ignore
          const created = schema.create('profile', attrs)
          return created
        } catch {
          return new Response(400, {}, { message: 'Invalid payload' })
        }
      })

      this.patch('/profile/:id', (schema, request) => {
        const id = request.params.id
        // @ts-ignore
        const profile = schema.find('profile', id)
        if (!profile) return new Response(404, {}, { message: 'Profile not found' })
        const attrs = JSON.parse(request.requestBody)
        attrs.updatedAt = new Date().toISOString()
        // @ts-ignore
        profile.update(attrs)
        return profile
      })
    }
  })
}
