export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'current' | 'completed';
  endDate?: string;
  goals?: string[];
  methods?: string[];
  scope?: string;
  results?: string[];
  images?: string[];
}