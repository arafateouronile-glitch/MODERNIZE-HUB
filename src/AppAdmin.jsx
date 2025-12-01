import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/admin/Login'
import { Dashboard } from './pages/admin/Dashboard'
import { QuotesManagement } from './pages/admin/QuotesManagement'
import { AppointmentsManagement } from './pages/admin/AppointmentsManagement'
import { BlogManagement } from './pages/admin/BlogManagement'
import { TestimonialsManagement } from './pages/admin/TestimonialsManagement'
import { ProtectedRoute } from './components/admin/ProtectedRoute'

function AppAdmin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/quotes"
          element={
            <ProtectedRoute>
              <QuotesManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute>
              <AppointmentsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <ProtectedRoute>
              <BlogManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/testimonials"
          element={
            <ProtectedRoute>
              <TestimonialsManagement />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppAdmin

