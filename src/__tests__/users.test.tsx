import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { makeServer } from '../../src/api/server'
import App from '../../src/App'
import UsersList from '../../src/pages/UsersList'

describe('UsersList', () => {
  it('renders seeded users', async () => {
    makeServer({ environment: 'test' })
    const router = createBrowserRouter([{ path: '/', element: <App />, children: [{ index: true, element: <UsersList /> }]}])
    render(<RouterProvider router={router} />)
    expect(await screen.findByText(/Ana Lopez/)).toBeInTheDocument()
  })
})
