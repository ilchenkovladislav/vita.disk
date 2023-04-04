import { useEffect } from 'react';

import { useStateSelector, useActionCreators } from 'store/hooks';
import { projectAsyncActions } from 'store/slices/projectSlice';
import { AdminPanel } from 'features/admin/panel/AdminPanel/AdminPanel';
import { ProjectPage } from 'features/admin/project/ProjectPage/ProjectPage';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import { ProjectTab } from 'features/admin/project/components/ProjectTab/ProjectTab';
import { ImageList } from 'features/admin/project/components/ImageList/ImageList';
import { FavouriteImageList } from 'features/admin/project/components/FavouriteImageList/FavouriteImageList';
import { Settings } from 'features/admin/project/components/Settings/Settings';
import { UserPage } from 'features/user/UserPage/UserPage';
import { Design } from 'features/admin/project/components/Design/Design';

import { ImageList as IL } from 'features/user/components/ImageList/ImageList';

export default function App() {
  const projectsStatus = useStateSelector((state) => state.project.status);
  const actions = useActionCreators(projectAsyncActions);
  // check rebase
  // check sqoosh

  useEffect(() => {
    if (projectsStatus === 'init') {
      actions.getProjects();
    }
  }, [projectsStatus]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="project/:projectId" element={<ProjectPage />}>
          <Route path="folder" element={<ProjectTab />}>
            <Route path=":folderId" element={<ImageList />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="favourites" element={<ProjectTab />}>
            <Route path=":folderId" element={<FavouriteImageList />} />
          </Route>
          <Route path="design" element={<Design />} />
        </Route>
        <Route path="/page/:userLink" element={<UserPage />}>
          <Route path=":folderLink" element={<IL />} />
        </Route>
      </Routes>
    </div>
  );
}
