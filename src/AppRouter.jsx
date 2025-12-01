import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Public pages
import App from './App'
import { Admin } from './pages/Admin'
import { Blog } from './pages/Blog'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Blog />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        
        {/* 404 - Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

