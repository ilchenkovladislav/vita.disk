import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  isRejectedWithValue
} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ProjectItem } from '../../components/ProjectItem/ProjectItem';
import { ServerResponse, Id } from '../types';

const _urlbase = 'http://vita.disk/src/server/project';

export interface ProjectItem {
  id?: number;
  title: string;
  link: string;
  dateCreating: string;
  dateShooting: string;
  cover: string;
  sequence: number;
}

interface ProjectState {
  items: ProjectItem[];
  status: 'init' | 'loading' | 'error' | 'success';
  error: string | unknown;
}

const initialState: ProjectState = {
  items: [],
  status: 'init',
  error: ''
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getProjects.fulfilled,
        (state, action: PayloadAction<ProjectItem[]>) => {
          state.status = 'success';
          state.items = action.payload;
        }
      )
      .addCase(
        addProject.fulfilled,
        (state, action: PayloadAction<ProjectItem>) => {
          state.status = 'success';
          state.items.push(action.payload);
        }
      )
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<ProjectItem>) => {
          state.status = 'success';

          const idx = state.items.findIndex(
            (el) => el.id === action.payload.id
          );

          if (idx === -1) return;

          state.items[idx] = action.payload;
        }
      )
      .addCase(deleteProject.fulfilled, (state, action: PayloadAction<Id>) => {
        state.status = 'success';

        const idx = state.items.findIndex((item) => item.id === action.payload);

        if (idx === -1) return;

        state.items.splice(idx, 1);
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'error';
          state.error = action.payload;
        }
      );
  }
});

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  rejectValue: string;
}>();

const getProjects = createAppAsyncThunk<ProjectItem[]>(
  'projects/getProjects',
  async (_, { rejectWithValue }) =>
    await axios
      .get<ServerResponse>(`${_urlbase}/read.php`)
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается добавить проект`)
      )
);

const addProject = createAppAsyncThunk<ProjectItem, ProjectItem>(
  'projects/addProject',
  async (project, { rejectWithValue }) =>
    await axios
      .post<ServerResponse>(`${_urlbase}/create.php`, JSON.stringify(project))
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается добавить проект`)
      )
);

const updateProject = createAppAsyncThunk<ProjectItem, ProjectItem>(
  'projects/updateProject',
  async (project: ProjectItem, { rejectWithValue }) =>
    await axios
      .post<ServerResponse>(`${_urlbase}/update.php`, JSON.stringify(project))
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается обновить проект`)
      )
);

const deleteProject = createAppAsyncThunk<Id, Id>(
  'projects/deleteProject',
  async (id, { rejectWithValue }) =>
    await axios
      .post<ServerResponse>(`${_urlbase}/delete.php`, { id })
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается удалить проект`)
      )
);

export const projectAsyncActions = {
  getProjects,
  addProject,
  updateProject,
  deleteProject
};

export const { reducer: projectReducer, actions: projectActions } =
  projectSlice;
