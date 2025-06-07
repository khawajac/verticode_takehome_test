import { Link } from 'react-router-dom';
import { Project } from '../models/Project';
import { useState, useMemo } from 'react'; 

interface ProjectsListProps {
  projects: Project[];
  onDelete: (projectId: string) => void; 
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ projects, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [statusFilter, setStatusFilter] = useState<string>('');

  const filteredProjects = useMemo(() => {
    let filtered = projects; 

    if (statusFilter) {
      filtered = filtered.filter(project => project.status === statusFilter);
    }

    if (searchTerm.trim() && searchTerm.trim().length >= 3) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(lowerCaseSearch)
      );
    }
    return filtered; 
  }, [projects, searchTerm, statusFilter]); 

  const groupedProjects = useMemo(() => {
    const statusOrder = ['planning', 'in progress', 'completed'];
    const grouped = filteredProjects.reduce((acc, project) => {
      const status = project.status || 'planning';
      if (!acc[status]) acc[status] = [];
      acc[status].push(project);
      return acc;
    }, {} as Record<string, Project[]>);

    return statusOrder.map(status => ({
      status,
      projects: grouped[status] || [],
      count: grouped[status]?.length || 0
    })).filter(group => group.count > 0);
  }, [filteredProjects]);

  
  const getStatusConfig = (status?: Project['status']) => {
    switch (status) {
      case 'planning':
        return {
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: '📋',
          gradient: 'from-amber-50 to-orange-50',
          accent: 'border-l-amber-400'
        };
      case 'in progress':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: '🚀',
          gradient: 'from-blue-50 to-indigo-50',
          accent: 'border-l-blue-400'
        };
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: '✅',
          gradient: 'from-green-50 to-emerald-50',
          accent: 'border-l-green-400'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '📄',
          gradient: 'from-gray-50 to-slate-50',
          accent: 'border-l-gray-400'
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); 
  }

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  }

  const clearSearch = () => {
    setSearchTerm(''); 
  }

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
  }

  const getStatusTitle = (status: string) => {
    return status === 'in progress' ? 'In Progress' : 
           status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-gray-600 mt-2">Manage and track your project progress</p>
          </div>
          <Link
            to="/projects/new"
            className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">+</span>
              New Project
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
          </Link>
        </div>

      {/* filter and search section */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-4">
          <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
            Filter by status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="planning">Planning</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {(statusFilter || searchTerm) && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search projects by name (min 3 characters)..."
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        )}
      </div>
      {(searchTerm && searchTerm.length >= 3) || statusFilter ? (
        <div className="mb-4 text-sm text-gray-600">
          Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          {statusFilter && ` with status "${statusFilter}"`}
          {searchTerm && searchTerm.length >= 3 && ` matching "${searchTerm}"`}
        </div>
      ) : null}
      {searchTerm && searchTerm.length < 3 && (
        <div className="mb-4 text-sm text-gray-500">
          Type at least 3 characters to search...
        </div>
      )}

      {filteredProjects.length === 0 && searchTerm.length >= 3 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">No projects found</p>
          <p className="text-gray-400">Try adjusting your search terms</p>
          <button
            onClick={clearSearch}
            className="mt-4 text-blue-500 hover:text-blue-700 underline"
            >
              Clear search
            </button>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No projects yet</p>
        </div>
      ):(
        <div className="grid gap-4">
          {filteredProjects.map((project) => (
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
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusConfig(project.status)}`}>
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
    </div>
    </div>
  );
};