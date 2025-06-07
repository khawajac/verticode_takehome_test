import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../models/Project';

interface ProjectDetailsProps {
  project: Project;
  onUpdate: (project: Project) => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onUpdate }) => {
  const navigate = useNavigate(); 
  const [status, setStatus] = useState(project.status);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(project.name);
  const [editedDescription, setEditedDescription] = useState(project.description);
  const [editedStartDate, setEditedStartDate] = useState(project.startDate);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleStatusChange = (newStatus: Project['status']) => {
    setStatus(newStatus);
    const updatedProject = {
      ...project,
      status: newStatus
    }; 
    onUpdate(updatedProject); 
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

  const handleSave = () => {
    const updatedProject = {
      ...project,
      name: editedName,
      description: editedDescription,
      startDate: editedStartDate,
      status: status
    };
    onUpdate(updatedProject);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedName(project.name);
    setEditedDescription(project.description);
    setEditedStartDate(project.startDate);
    setStatus(project.status);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/projects')}
        className="mb-4 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        ← Back to Projects
      </button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Project Details</h1>
        {!isEditing && (
        <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
          Edit Project
        </button>
        )}
      </div>
      
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Project Name</h2>
          {isEditing ? (
            <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            ) : (
            <p className="text-lg mt-1">{project.name}</p>
            )}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Description</h2>
          {isEditing ? (
            <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            rows={4}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
      <p className="mt-1 text-gray-600 whitespace-pre-wrap">{project.description}</p>
      )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Start Date</h2>
        {isEditing ? (
          <input
          type="date"
          value={editedStartDate}
          onChange={(e) => setEditedStartDate(e.target.value)}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    ) : (
    <p className="mt-1">{formatDate(new Date(project.startDate))}</p>
    )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Status</h2>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
            {status?.replace('-', ' ').toUpperCase()}
          </span>
          
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
        {isEditing && (
          <div className="mt-6 pt-4 border-t border-gray-200 flex gap-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
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