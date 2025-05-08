import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Project } from '../../types/project';
import { Clock, CheckCircle2, Pencil, Trash2, Filter } from 'lucide-react';

export function ProjectList() {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'current' | 'completed'>('all');

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

  const filteredProjects = projects.filter(project => 
    statusFilter === 'all' ? true : project.status === statusFilter
  );

  return (
    <div>
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-medium text-gray-800">Lista projektów</h2>
          <Link
            to="/admin/projects/new"
            className="px-4 py-2 bg-beige-400 text-white rounded-md hover:bg-beige-500 transition-colors"
          >
            Dodaj nowy projekt
          </Link>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="border-none bg-transparent focus:ring-0 text-gray-600"
          >
            <option value="all">Wszystkie projekty</option>
            <option value="current">W trakcie</option>
            <option value="completed">Zakończone</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredProjects.map((project) => (
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