import { useEffect } from 'react';

import { useStateSelector, useActionCreators } from './store/hooks';
import { projectAsyncActions } from './store/slices/projectSlice';
import { AdminPanel } from './pages/AdminPanel/AdminPanel';
import { ProjectPage } from './pages/ProjectPage/ProjectPage';
import './App.css';

import { Routes, Route } from 'react-router-dom';

export default function App() {
  const projectsStatus = useStateSelector((state) => state.project.status);
  const actions = useActionCreators(projectAsyncActions);

  useEffect(() => {
    if (projectsStatus === 'init') {
      actions.getProjects();
    }
  }, [projectsStatus]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />
      </Routes>
    </div>
  );
}
