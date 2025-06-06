import { useState } from 'react';
import { Project } from './models/Project';
import { ProjectForm } from './components/ProjectForm';
// import { ProjectDetails } from './components/ProjectDetails';

export default function App() {
  const [project, setProject] = useState<Project | null>(null); 

  return (
    <main className="flex flex-col">
      <header className="flex h-24 bg-light-green">
        <img src="/logo.png" height={64} className="h-16 m-auto" />
      </header>

      <section className="flex-1 container mx-auto p-4">
      {!project ? (
        <ProjectForm onSubmit={setProject} />
      ) : (
        <ProjectDetails project={project} />
      )}
    </section>

    </main>
  );
}
