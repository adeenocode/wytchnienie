import React from 'react';
import { supabase } from '../../lib/supabase';
import { uploadProjectImage } from '../../lib/supabase';
import { Project } from '../../types/project';

interface ProjectFormProps {
  project?: Project;
  onSuccess: () => void;
}

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const [title, setTitle] = React.useState(project?.title || '');
  const [description, setDescription] = React.useState(project?.description || '');
  const [status, setStatus] = React.useState<'current' | 'completed'>(project?.status || 'current');
  const [endDate, setEndDate] = React.useState(project?.endDate || '');
  const [goals, setGoals] = React.useState(project?.goals?.join('\n') || '');
  const [methods, setMethods] = React.useState(project?.methods?.join('\n') || '');
  const [scope, setScope] = React.useState(project?.scope || '');
  const [results, setResults] = React.useState(project?.results?.join('\n') || '');
  const [mainImage, setMainImage] = React.useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = React.useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let mainImageUrl = project?.image;
      if (mainImage) {
        mainImageUrl = await uploadProjectImage(mainImage);
      }

      const additionalImageUrls = [...(project?.images || [])];
      for (const image of additionalImages) {
        const url = await uploadProjectImage(image);
        additionalImageUrls.push(url);
      }

      const projectData = {
        title,
        description,
        status,
        end_date: status === 'completed' ? endDate : null,
        goals: goals.split('\n').filter(Boolean),
        methods: methods.split('\n').filter(Boolean),
        scope,
        results: status === 'completed' ? results.split('\n').filter(Boolean) : null,
        image: mainImageUrl,
        images: additionalImageUrls,
      };

      if (project?.id) {
        await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id);
      } else {
        await supabase
          .from('projects')
          .insert([projectData]);
      }

      onSuccess();
    } catch (error) {
      setError('Wystąpił błąd podczas zapisywania projektu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tytuł
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'current' | 'completed')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="current">W trakcie</option>
            <option value="completed">Zakończony</option>
          </select>
        </div>

        {status === 'completed' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data zakończenia
            </label>
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="np. Grudzień 2023"
              required
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Opis
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cele (każdy cel w nowej linii)
        </label>
        <textarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Metody (każda metoda w nowej linii)
        </label>
        <textarea
          value={methods}
          onChange={(e) => setMethods(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Zakres działania
        </label>
        <textarea
          value={scope}
          onChange={(e) => setScope(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>

      {status === 'completed' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rezultaty (każdy rezultat w nowej linii)
          </label>
          <textarea
            value={results}
            onChange={(e) => setResults(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Główne zdjęcie
        </label>
        <input
          type="file"
          onChange={(e) => setMainImage(e.target.files?.[0] || null)}
          accept="image/*"
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dodatkowe zdjęcia
        </label>
        <input
          type="file"
          multiple
          onChange={(e) => setAdditionalImages(Array.from(e.target.files || []))}
          accept="image/*"
          className="w-full"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Anuluj
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-beige-400 text-white rounded-md hover:bg-beige-500 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Zapisywanie...' : 'Zapisz projekt'}
        </button>
      </div>
    </form>
  );
}