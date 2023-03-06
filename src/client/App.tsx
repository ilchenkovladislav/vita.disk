import { useEffect } from 'react';

import { useStateSelector, useActionCreators } from './store/hooks';
import { projectAsyncActions } from './store/slices/projectSlice';
import { AdminPanel } from './pages/AdminPanel/AdminPanel';
import './App.css';

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
      <AdminPanel />
    </div>
  );
}
