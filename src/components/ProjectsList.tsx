import { Link } from 'react-router-dom';
import { Project } from '../models/Project';

interface ProjectsListProps {
  projects: Project[];
  onDelete: (projectId: string) => void; 
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects, onDelete }) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <Link
          to="/projects/new"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          + New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No projects yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {project.name}
                  </Link>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                  {project.status?.toUpperCase()}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Start Date: {formatDate(project.startDate)}</span>
                <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this project?')) {
                        onDelete(project.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};