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

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
          <h1 className="text-5xl font-extralight text-gray-900 tracking-tight leading-tight">
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

      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-8 shadow-lg border border-white/20">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex items-center gap-3">
              <label htmlFor="status-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Filter:
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
              >
                <option value="">All</option>
                <option value="planning">Planning</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search projects..."
                className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
            />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 transition-colors text-sm"
                >
                  ✕
                </button>
              )}
            </div>
            {(statusFilter || searchTerm) && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear all filters
              </button>
            )}
          </div>

      </div>
      
      {(searchTerm && searchTerm.length >= 3) || statusFilter ? (
        <div className="mt-3 text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-lg">
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
        <div className="space-y-6">
            {groupedProjects.map(({ status, projects: statusProjects }) => {
              const config = getStatusConfig(status as Project['status']);
              return (
                <div key={status} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{config.icon}</span>
                    <h2 className="text-xl font-bold text-gray-800">
                      {getStatusTitle(status)}
                    </h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                      {statusProjects.length}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {statusProjects.map((project) => {
                      const projectConfig = getStatusConfig(project.status);
                      return (
                        <div
                          key={project.id}
                          className={`group relative bg-gradient-to-br ${projectConfig.gradient} border border-white/30 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 border-l-4 ${projectConfig.accent}`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          <div className="relative">
                            <div className="flex justify-between items-start mb-2">
                              <Link
                                to={`/projects/${project.id}`}
                                className="text-base font-bold text-gray-800 hover:text-blue-600 transition-colors group-hover:text-blue-600 line-clamp-1 flex-1 mr-2"
                              >
                                {project.name}
                              </Link>
                              <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${projectConfig.color} flex-shrink-0`}>
                                {project.status?.toUpperCase()}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {project.description}
                            </p>
                            
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <span>📅</span>
                                {formatDate(project.startDate)}
                              </div>
                              
                              <button
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this project?')) {
                                    onDelete(project.id);
                                  }
                                }}
                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 rounded transition-all duration-200 text-xs"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                    );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div> 
  );
};
