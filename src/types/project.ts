export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'current' | 'completed';
  end_date?: string;
  goals?: string[];
  methods?: string[];
  scope?: string;
  results?: string[];
  images?: string[];
}