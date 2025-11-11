import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import { makeServer } from './api/server'
import App from './App'
import UsersList from './pages/UsersList'
import UserDetail from './pages/UserDetail'
import UserForm from './pages/UserForm'

makeServer({ environment: 'development' })

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <UsersList /> },
    { path: 'profile/:id', element: <UserDetail /> },
    { path: 'create', element: <UserForm /> },
    { path: 'edit/:id', element: <UserForm /> }
  ]}
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
