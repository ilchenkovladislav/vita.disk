import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ServerResponse, Id } from '../types';
import { RootStore } from '../types';
import { FormProjectItem } from 'components/ui/ModalAddProject/ModalAddProject';
import { baseServerUrl } from '../../config';

const _urlbase = `${baseServerUrl}/project`;

export interface IProjectItem {
  readonly id: number;
  title: string;
  link: string;
  readonly dateCreation: string;
  dateShooting: string;
  cover: string;
  sequence: number;
  readonly numberImages: number;
}

interface ProjectState {
  items: IProjectItem[];
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
        (state, action: PayloadAction<IProjectItem[]>) => {
          state.status = 'success';
          state.items = [...action.payload].sort(
            (a, b) => a.sequence - b.sequence
          );
        }
      )
      .addCase(
        addProject.fulfilled,
        (state, action: PayloadAction<IProjectItem>) => {
          state.status = 'success';
          state.items.push(action.payload);
        }
      )
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<IProjectItem>) => {
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
      .addCase(
        updateProjectSequence.fulfilled,
        (state, action: PayloadAction<IProjectItem[]>) => {
          state.status = 'success';

          for (const payload of action.payload) {
            const item = state.items.find((el) => el.id === payload.id);

            if (item?.sequence) {
              item.sequence = payload.sequence;
            }
          }

          state.items.sort((a, b) => a.sequence - b.sequence);
        }
      );
  }
});

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  rejectValue: string;
  state: RootStore;
}>();

const getProjects = createAppAsyncThunk<IProjectItem[]>(
  'projects/getProjects',
  async (_, { rejectWithValue }) =>
    await axios
      .get<ServerResponse>(`${_urlbase}/read.php`)
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(
          `${err.message}. Не получается получить данные по проектам`
        )
      )
);

const addProject = createAppAsyncThunk<IProjectItem, FormProjectItem>(
  'projects/addProject',
  async (project, { rejectWithValue }) =>
    await axios
      .post<ServerResponse>(`${_urlbase}/create.php`, JSON.stringify(project))
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается добавить проект`)
      )
);

const updateProject = createAppAsyncThunk<IProjectItem, IProjectItem>(
  'projects/updateProject',
  async (project: IProjectItem, { rejectWithValue }) =>
    await axios
      .post<ServerResponse>(`${_urlbase}/update.php`, JSON.stringify(project))
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается обновить проект`)
      )
);

const deleteProject = createAppAsyncThunk<Id, Id>(
  'projects/deleteProject',
  async (id, { rejectWithValue, dispatch, getState }) =>
    await axios
      .post<ServerResponse>(`${_urlbase}/delete.php`, { id })
      .then((res) => {
        const idx = getState().project.items.findIndex(
          (project) => project.id === res.data.records
        );

        const projects = getState()
          .project.items.slice(idx + 1)
          .map((el) => ({ ...el, sequence: el.sequence - 1 }));

        dispatch(updateProjectSequence(projects));

        return res.data.records;
      })
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается удалить проект`)
      )
);

const updateProjectSequence = createAppAsyncThunk<
  IProjectItem[],
  IProjectItem[]
>('projects/updateSequence', async (projects, { rejectWithValue }) => {
  return await axios
    .post<ServerResponse>(`${_urlbase}/updateSequence.php`, projects)
    .then((res) => res.data.records)
    .catch((err: AxiosError<ServerResponse>) => {
      console.log(err.message);
      rejectWithValue(
        `${err.message}. Не получается изменить очередность проектов`
      );
    });
});

const downloadProjectZip = createAppAsyncThunk<void, { projectId: string }>(
  'project/downloadProjectZip',
  async ({ projectId }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('projectId', projectId);

    return await axios
      .post<Blob>(`${_urlbase}/downloadProjectZip.php`, formData, {
        responseType: 'blob'
      })
      .then((res) => {
        const link = document.createElement('a');
        link.download = '';
        link.href = URL.createObjectURL(res.data);
        link.click();
      })
      .catch((err: AxiosError<ServerResponse>) => {
        rejectWithValue(`${err.message}. Не получается скачать архив с фото`);
      });
  }
);

export const projectAsyncActions = {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  updateProjectSequence,
  downloadProjectZip
};

export const { reducer: projectReducer, actions: projectActions } =
  projectSlice;
