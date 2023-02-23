import { configureStore } from '@reduxjs/toolkit';
import { projectReducer } from './slices/projectSlice';
import { folderReducer } from './slices/folderSlice';
import { imageReducer } from './slices/imageSlice';

export const store = configureStore({
  reducer: {
    project: projectReducer,
    folder: folderReducer,
    image: imageReducer
  }
});
