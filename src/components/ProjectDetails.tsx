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
  const [editedDeadline, setEditedDeadline] = useState(project.deadline); 

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

  const getStatusConfig = (status?: Project['status']) => {
    switch (status) {
      case 'planning':
        return {
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: '📋',
          gradient: 'from-amber-50 to-orange-50',
          accent: 'border-l-amber-400',
          headerGradient: 'from-amber-600 to-orange-600',
          buttonPrimary: 'bg-amber-500 hover:bg-amber-600',
          buttonSecondary: 'bg-amber-100 hover:bg-amber-200 text-amber-800',
          completedBg: 'bg-amber-50',
          completedText: 'text-amber-800'
        };
      case 'in progress':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: '🚀',
          gradient: 'from-blue-50 to-indigo-50',
          accent: 'border-l-blue-400',
          headerGradient: 'from-blue-600 to-indigo-600',
          buttonPrimary: 'bg-blue-500 hover:bg-blue-600',
          buttonSecondary: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
          completedBg: 'bg-blue-50',
          completedText: 'text-blue-800'
        };
      case 'completed':
        return {
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: '✅',
          gradient: 'from-emerald-100/60 to-teal-100/60',
          accent: 'border-l-emerald-400',
          headerGradient: 'from-emerald-500 to-teal-500',
          buttonPrimary: 'bg-emerald-500 hover:bg-emerald-600',
          buttonSecondary: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800',
          completedBg: 'bg-emerald-100/60',
          completedText: 'text-emerald-800'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '📄',
          gradient: 'from-gray-50 to-slate-50',
          accent: 'border-l-gray-400',
          headerGradient: 'from-gray-600 to-slate-600',
          buttonPrimary: 'bg-gray-500 hover:bg-gray-600',
          buttonSecondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
          completedBg: 'bg-gray-50',
          completedText: 'text-gray-800'
        };
    }
  };

  const handleSave = () => {
    const updatedProject = {
      ...project,
      name: editedName,
      description: editedDescription,
      startDate: editedStartDate,
      deadline: editedDeadline,
      status: status
    };
    onUpdate(updatedProject);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedName(project.name);
    setEditedDescription(project.description);
    setEditedStartDate(project.startDate);
    setEditedDeadline(project.deadline); 
    setStatus(project.status);
    setIsEditing(false);
  };

  const config = getStatusConfig(status);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate('/projects')}
        className="mb-8 bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg font-medium px-6 py-3 rounded-2xl"
        >
        <span>←</span> Back to Projects
      </button>
      <div className={`bg-gradient-to-br ${config.gradient} border border-white/30 rounded-2xl p-8 mb-8 shadow-xl border-l-8 ${config.accent}`}>
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{config.icon}</span>
            <div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${config.headerGradient} bg-clip-text text-transparent`}>
                Project Details
              </h1>
              <p className="text-gray-600 mt-2">View and manage project information</p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className={`px-6 py-3 ${config.buttonPrimary} text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md flex items-center gap-2`}
            >
              <span>✏️</span>
              Edit Project
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${config.color} shadow-sm`}>
            {status?.replace('-', ' ').toUpperCase()}
          </span>
          <div className="text-xs text-gray-500">
            Project ID: {project.id}
          </div>
        </div>
      </div>
      
      <div className={`bg-gradient-to-br ${config.gradient} border border-white/30 rounded-2xl shadow-xl overflow-hidden`}>
        <div className="p-8 space-y-8">
          {/* Project Name */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>📝</span> Project Name
            </h2>
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200 text-lg font-medium"
              />
            ) : (
              <p className="text-2xl font-bold text-gray-800 bg-white/50 rounded-xl p-4 border border-white/30">
                {project.name}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>📄</span> Description
            </h2>
            {isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200 resize-none"
              />
            ) : (
              <div className="bg-white/50 rounded-xl p-4 border border-white/30">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{project.description}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>📅</span> Start Date
            </h2>
            {isEditing ? (
              <input
                type="date"
                value={editedStartDate}
                onChange={(e) => setEditedStartDate(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
              />
            ) : (
              <div className="bg-white/50 rounded-xl p-4 border border-white/30">
                <p className="text-lg font-medium text-gray-800">{formatDate(new Date(project.startDate))}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>🚨</span> Deadline
            </h2>
            {isEditing ? (
              <input
                type="date"
                value={editedDeadline}
                onChange={(e) => setEditedDeadline(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
              />
            ) : (
              <div className="bg-white/50 rounded-xl p-4 border border-white/30">
                <p className="text-lg font-medium text-gray-800">{formatDate(new Date(project.deadline))}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>🎯</span> Project Status
            </h2>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${config.color} shadow-sm`}>
                {status?.replace('-', ' ').toUpperCase()}
              </span>
              
              {status !== 'completed' && (
                <button
                  onClick={() => handleStatusChange('completed')}
                  className={`${config.buttonSecondary} px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-md text-sm font-medium`}
                >
                  ✓ Mark as Complete
                </button>
              )}
            </div>
          </div>

          {status === 'completed' && (
            <div className="bg-gradient-to-r from-emerald-100/80 to-teal-100/80 rounded-xl p-6 border border-emerald-300/60 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎉</span>
                <p className="text-emerald-800 font-bold text-lg">Project Completed!</p>
              </div>
              <button
                onClick={() => handleStatusChange('in progress')}
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-md text-sm font-medium"
              >
                🔄 Reopen Project
              </button>
            </div>
          )}

          {isEditing && (
            <div className="pt-6 border-t border-white/30 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md flex items-center justify-center gap-2 font-medium"
              >
                <span>💾</span>
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg shadow-md flex items-center justify-center gap-2 font-medium"
              >
                <span>❌</span>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};