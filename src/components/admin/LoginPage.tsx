import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setIsAuthenticated(true);
    } catch (error) {
      setError('Nieprawidłowy email lub hasło');
    }
  };

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-medium text-gray-800 mb-6">Logowanie do panelu</h1>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Hasło
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-beige-400 text-white py-2 rounded-md hover:bg-beige-500 transition-colors"
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
}