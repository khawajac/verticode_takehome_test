export interface Project {
  id: string; 
  name: string; 
  description: string; 
  startDate: string; 
  deadline: string; 
  status?: 'planning' | 'in progress' | 'completed'; 
  createdAt: string; 
}

export type ProjectFormData = Omit<Project, 'id'>