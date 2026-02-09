import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/super-admin/Dashboard';
import Stores from './pages/super-admin/Stores';
import Storefront from './pages/store/Storefront';
import Login from './pages/admin/Login';
import BusinessDashboard from './pages/admin/BusinessDashboard';
import SetupLogin from './pages/super-admin/SetupLogin';

const ProtectedRoute: React.FC<{ children: React.ReactNode; roles?: string[] }> = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-[#0A5C44] rounded-full animate-spin" />
      <p className="text-slate-400 font-bold animate-pulse uppercase text-[10px] tracking-widest">Authenticating</p>
    </div>
  );
  if (!user) return <Navigate to="/admin/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/admin/login" />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/store/:businessId" element={<Storefront />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/nexus" element={<SetupLogin />} />

          <Route path="/admin" element={
            <ProtectedRoute roles={['business_admin', 'super_admin']}>
              <AdminLayout><BusinessDashboard /></AdminLayout>
            </ProtectedRoute>
          } />

          {/* Super Admin Routes */}
          <Route path="/super-admin" element={
            <ProtectedRoute roles={['super_admin']}>
              <AdminLayout><Dashboard /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/super-admin/stores" element={
            <ProtectedRoute roles={['super_admin']}>
              <AdminLayout><Stores /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/super-admin/businesses" element={
            <ProtectedRoute roles={['super_admin']}>
              <AdminLayout><Stores /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/super-admin/users" element={
            <ProtectedRoute roles={['super_admin']}>
              <AdminLayout><Dashboard /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/super-admin/settings" element={
            <ProtectedRoute roles={['super_admin']}>
              <AdminLayout><Dashboard /></AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/admin/login" />} />
          <Route path="*" element={<Navigate to="/admin/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
