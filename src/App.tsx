import { useEffect } from 'react';

import { useStateSelector, useActionCreators } from './store/hooks';
import { projectAsyncActions } from './store/slices/projectSlice';
import { AdminPanel } from './features/admin/panel/AdminPanel/AdminPanel';
import { ProjectPage } from './features/admin/project/ProjectPage/ProjectPage';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import { ProjectTab } from './features/admin/project/components/ProjectTab/ProjectTab';
import { ImageList } from './features/admin/project/components/ImageList/ImageList';
import { Settings } from 'features/admin/project/components/Settings/Settings';

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
        <Route path="/project/:projectId" element={<ProjectPage />}>
          <Route path="" element={<ProjectTab />}>
            <Route path="folder/:folderId" element={<ImageList />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="favourites" element={<h1>Избранное</h1>} />
          <Route path="design" element={<h1>Дезигн</h1>} />
        </Route>
      </Routes>
    </div>
  );
}
