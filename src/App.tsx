import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

  const findProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <Routes>
          {/* Projects List Page */}
          <Route 
            path="/projects" 
            element={<ProjectsList projects={projects} />} 
          />
          
          {/* Create New Project Page */}
          <Route 
            path="/projects/new" 
            element={<ProjectForm onSubmit={handleCreateProject} />} 
          />
          
          {/* Project Details Page */}
          <Route 
            path="/projects/:id" 
            element={<ProjectDetailsWrapper findProjectById={findProjectById} />} 
          />
          
          {/* Redirect root to projects list */}
          <Route 
            path="/" 
            element={<Navigate to="/projects" replace />} 
          />
          
          {/* 404 Page */}
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

import { useParams, Navigate } from 'react-router-dom';

interface ProjectDetailsWrapperProps {
  findProjectById: (id: string) => Project | undefined;
}

const ProjectDetailsWrapper: React.FC<ProjectDetailsWrapperProps> = ({ findProjectById }) => {
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
  
  return <ProjectDetails project={project} />;
};

export default App; 
