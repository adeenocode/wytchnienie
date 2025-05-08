import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
  const location = useLocation();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-gray-800">Panel Administracyjny</h1>
            <button
              onClick={() => supabase.auth.signOut()}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              Wyloguj się
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}