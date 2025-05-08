import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Project } from '../../types/project';
import { Clock, CheckCircle2, Pencil, Trash2 } from 'lucide-react';

export function ProjectList() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      setError('Nie udało się pobrać listy projektów');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten projekt?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProjects();
    } catch (error) {
      alert('Nie udało się usunąć projektu');
    }
  };

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-800">Lista projektów</h2>
        <Link
          to="/admin/projects/new"
          className="px-4 py-2 bg-beige-400 text-white rounded-md hover:bg-beige-500 transition-colors"
        >
          Dodaj nowy projekt
        </Link>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">{project.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {project.status === 'current' ? (
                    <Clock className="w-4 h-4 text-green-500" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="text-sm text-gray-600">
                    {project.status === 'current' ? 'W trakcie' : 'Zakończony'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={`/admin/projects/${project.id}/edit`}
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Pencil className="w-5 h-5" />
              </Link>
              <button
                onClick={() => handleDelete(project.id)}
                className="p-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}