// import React from 'react'
// import { useAuthStore } from '../../store/useAuthStore'
// import { Navigate, useLocation } from 'react-router-dom'

// export default function ProtectedRoute({ children }) {
//   const { token } = useAuthStore()
//   const location = useLocation()
//   if (!token) {
//     return <Navigate to="/login" state={{ from: location }} replace />
//   }
//   return children
// }
