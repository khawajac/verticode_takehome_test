import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Project } from './models/Project';
import { ProjectsList } from './components/ProjectsList';
import { ProjectForm } from './components/ProjectForm';
import { ProjectDetails } from './components/ProjectDetails';
import { dummyProjects } from './data/dummyProjects';

function App() {
  const [projects, setProjects] = useState<Project[]>(dummyProjects);

  const handleCreateProject = (newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      )
    ); 
  }; 

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const findProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  return (
    <Router>
      <header className="flex h-24 bg-light-green">
          <img src="/logo.png" height={64} className="h-16 m-auto" />
        </header>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <Routes>
          <Route 
            path="/projects" 
            element={<ProjectsList projects={projects} onDelete={handleDeleteProject} />} 
          />
          
          <Route 
            path="/projects/new" 
            element={<ProjectForm onSubmit={handleCreateProject} />} 
          />
          
          <Route 
            path="/projects/:id" 
            element={<ProjectDetailsWrapper 
              findProjectById={findProjectById} 
              onUpdate={handleUpdateProject}
              onDelete={handleDeleteProject}
              />} 
          />
          
          <Route 
            path="/" 
            element={<Navigate to="/projects" replace />} 
          />
          
          <Route 
            path="*" 
            element={
              <div className="max-w-md mx-auto text-center">
                <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
                <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
                <a href="/projects" className="text-blue-600 hover:text-blue-800">
                  Go back to Projects
                </a>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

interface ProjectDetailsWrapperProps {
  findProjectById: (id: string) => Project | undefined;
  onUpdate: (project: Project) => void; 
  onDelete: (id: string) => void; 
}

const ProjectDetailsWrapper: React.FC<ProjectDetailsWrapperProps> = ({ 
  findProjectById, 
  onUpdate, 
}) => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <Navigate to="/projects" replace />;
  }
  
  const project = findProjectById(id);
  
  if (!project) {
    return (
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
        <a href="/projects" className="text-blue-600 hover:text-blue-800">
          Go back to Projects
        </a>
      </div>
    );
  }

return (
  <ProjectDetails 
    project={project} 
    onUpdate={onUpdate}
  />
);
}

export default App; 
