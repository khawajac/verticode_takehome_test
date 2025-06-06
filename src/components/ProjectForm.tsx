// src/components/ProjectForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../models/Project';

interface ProjectFormProps {
  onSubmit: (project: Project) => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [startDate, setStartDate] = useState(''); 
  const [status, setStatus] = useState<Project['status']>('planning');

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validate = () => {
    const newErrors: {[key: string]: string} = {}; 

    if (!name.trim()) {
      newErrors.name = 'Project name is required'; 
    }

    if (!description.trim()) {
      newErrors.description = 'Project description is required'; 
    }

    if (!startDate) {
      newErrors.startDate = 'Project start date is required'; 
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (validate()) {
      const newProject: Project = {
        id: Date.now().toString(36) + Math.random().toString(36),
        name, 
        description, 
        startDate, 
        status,
        createdAt: new Date().toISOString()
      }; 

      onSubmit(newProject); 
      
      navigate(`/projects/${newProject.id}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/projects')}
        className="mb-4 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        ← Back to Projects
      </button>

      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Project Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter project name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe your project"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium mb-2">
            Start Date *
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Project['status'])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="planning">Planning</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};