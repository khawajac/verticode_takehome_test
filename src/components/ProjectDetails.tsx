import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../models/Project';

interface ProjectDetailsProps {
  project: Project;
  onStatusUpdate: (project: Project) => void; 
  onDelete: (id: string) => void; 
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const navigate = useNavigate(); 
  const [status, setStatus] = useState(project.status);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleStatusChange = (newStatus: Project['status']) => {
    setStatus(newStatus);
  };

  const getStatusColor = (status?: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/projects')}
        className="mb-4 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        ← Back to Projects
      </button>
      <h1 className="text-3xl font-bold mb-6">Project Details</h1>
      
      {/* project card */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* project name */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Project Name</h2>
          <p className="text-lg mt-1">{project.name}</p>
        </div>

        {/* description */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Description</h2>
          <p className="mt-1 text-gray-600 whitespace-pre-wrap">{project.description}</p>
        </div>

        {/* start date */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Start Date</h2>
          <p className="mt-1">{formatDate(new Date(project.startDate))}</p>
          </div>

        {/* status with ability to change */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Status</h2>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
              {status?.replace('-', ' ').toUpperCase()}
            </span>
            
            {/* action to mark as complete */}
            {status !== 'completed' && (
              <button
                onClick={() => handleStatusChange('completed')}
                className="ml-4 text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Mark as Complete
              </button>
            )}
          </div>
        </div>

        {/* more status controls */}
        {status === 'completed' && (
          <div className="mt-6 p-4 bg-green-50 rounded-md">
            <p className="text-green-800 font-medium">✓ Project Completed!</p>
            <button
              onClick={() => handleStatusChange('in progress')}
              className="mt-2 text-sm text-green-600 hover:text-green-800 underline"
            >
              Reopen Project
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400">
        Project ID: {project.id}
      </div>
    </div>
  );
};