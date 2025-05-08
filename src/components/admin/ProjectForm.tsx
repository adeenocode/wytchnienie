import React from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { uploadProjectImage, deleteProjectImage } from '../../lib/supabase';
import { Project } from '../../types/project';
import { X, Upload } from 'lucide-react';

interface ProjectFormProps { 
  onSuccess: () => void;
}

export function ProjectForm({ onSuccess }: ProjectFormProps) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [status, setStatus] = React.useState<'current' | 'completed'>('current');
  const [endDate, setEndDate] = React.useState('');
  const [goals, setGoals] = React.useState('');
  const [methods, setMethods] = React.useState('');
  const [scope, setScope] = React.useState('');
  const [results, setResults] = React.useState('');
  const [mainImage, setMainImage] = React.useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = React.useState('');
  const [additionalImages, setAdditionalImages] = React.useState<File[]>([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const dropZoneRef = React.useRef<HTMLDivElement>(null);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data) {
          setTitle(data.title);
          setDescription(data.description);
          setStatus(data.status);
          setEndDate(data.end_date || '');
          setGoals(data.goals?.join('\n') || '');
          setMethods(data.methods?.join('\n') || '');
          setScope(data.scope || '');
          setResults(data.results?.join('\n') || '');
          setMainImagePreview(data.image || '');
          setAdditionalImagePreviews(data.images || []);
        }
      } catch (error) {
        setError('Nie udało się załadować danych projektu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAdditionalImages(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setAdditionalImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === dropZoneRef.current) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      setAdditionalImages(prev => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setAdditionalImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  React.useEffect(() => {
    // Cleanup URLs when component unmounts
    return () => {
      if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
      additionalImagePreviews.forEach(url => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let mainImageUrl = mainImagePreview;
      if (mainImage) {
        mainImageUrl = await uploadProjectImage(mainImage);
      }

      const additionalImageUrls = [...additionalImagePreviews];
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

      if (id) {
        await supabase
          .from('projects')
          .update(projectData)
          .eq('id', id);
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
    isLoading ? (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-beige-400"></div>
      </div>
    ) : (
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
          {mainImagePreview && (
            <div className="mt-2 relative w-48 h-32 rounded-lg overflow-hidden">
              <img
                src={mainImagePreview}
                alt="Podgląd"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setMainImage(null);
                  setMainImagePreview('');
                }}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </label>
        <input
          type="file"
          onChange={handleMainImageChange}
          accept="image/*"
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dodatkowe zdjęcia
          <span className="text-sm text-gray-500 ml-2">
            (możesz przeciągnąć i upuścić zdjęcia)
          </span>
        </label>
        <div
          ref={dropZoneRef}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-6 mb-4 transition-colors
            ${isDragging 
              ? 'border-beige-400 bg-beige-50' 
              : 'border-gray-300 hover:border-beige-400'
            }
          `}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {additionalImagePreviews.map((url, index) => (
              <div key={index} className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-50">
                <img
                  src={url}
                  alt={`Zdjęcie ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeAdditionalImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            {additionalImagePreviews.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-8">
                <Upload className="w-12 h-12 mb-4" />
                <p className="text-center">
                  Przeciągnij i upuść zdjęcia tutaj lub
                  <label className="text-beige-400 hover:text-beige-500 cursor-pointer ml-1">
                    wybierz z dysku
                    <input
                      type="file"
                      multiple
                      onChange={handleAdditionalImagesChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </p>
              </div>
            )}
          </div>
        </div>
        {additionalImagePreviews.length > 0 && (
          <div className="text-center">
            <label className="inline-block px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
              <span className="text-gray-700">Dodaj więcej zdjęć</span>
              <input
                type="file"
                multiple
                onChange={handleAdditionalImagesChange}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        )}
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
    )
  );
}