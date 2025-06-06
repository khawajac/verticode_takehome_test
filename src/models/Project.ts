export interface Project {
  id: string; 
  name: string; 
  descripton: string; 
  startDate: string; 
  status?: 'planning' | 'in progress' | 'completed'; 
  isCompleted: boolean; 
  createdAt: string; 
}

export type ProjectFormData = omit<PromiseRejectionEvent, 'id'>