import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function deleteProjectImage(url: string) {
  const path = url.split('/').pop();
  if (!path) return;

  const { error } = await supabase.storage
    .from('project-images')
    .remove([path]);

  if (error) throw error;
}

export async function uploadProjectImage(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('project-images')
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('project-images')
    .getPublicUrl(filePath);

  return publicUrl;
}