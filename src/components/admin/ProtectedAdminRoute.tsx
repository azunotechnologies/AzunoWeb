import { Navigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { AdminDashboard } from './AdminDashboard';

export function ProtectedAdminRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminDashboard />;
}
