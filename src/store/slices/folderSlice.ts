import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ServerResponse, Id } from '../types';
import { baseServerUrl } from 'store/baseUrl';

const _urlbase = `${baseServerUrl}/folder`;

interface FolderItem {
  readonly id: number;
  title: string;
  link: string;
  description: string;
  sequence: number;
  projectId: number;
}

interface FolderState {
  items: FolderItem[];
  status: 'init' | 'loading' | 'error' | 'success';
}

const initialState: FolderState = {
  items: [],
  status: 'init'
};

export const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getFolders.fulfilled,
        (state, action: PayloadAction<FolderItem[]>) => {
          state.status = 'success';
          state.items = action.payload;
        }
      )
      .addCase(
        addFolder.fulfilled,
        (state, action: PayloadAction<FolderItem>) => {
          state.status = 'success';
          state.items.push(action.payload);
        }
      )
      .addCase(
        updateFolder.fulfilled,
        (state, action: PayloadAction<FolderItem>) => {
          state.status = 'success';
          const idx = state.items.findIndex(
            (el) => el.id === action.payload.id
          );

          if (idx === -1) return;

          state.items[idx] = action.payload;
        }
      )
      .addCase(deleteFolder.fulfilled, (state, action: PayloadAction<Id>) => {
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
        (state) => {
          state.status = 'error';
        }
      );
  }
});

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  rejectValue: string;
}>();

const getFolders = createAppAsyncThunk<FolderItem[]>(
  'folders/getFolders',
  async (_, { rejectWithValue }) => {
    return await axios
      .get<ServerResponse>(`${_urlbase}/read.php`)
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(
          `${err.message}. Не получается получить данные по папкам`
        )
      );
  }
);

const addFolder = createAppAsyncThunk<FolderItem, FolderItem>(
  'folders/addFolder',
  async (folder, { rejectWithValue }) =>
    await axios
      .post<ServerResponse>(`${_urlbase}/create.php`, JSON.stringify(folder))
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается добавить папку`)
      )
);

const updateFolder = createAppAsyncThunk<FolderItem, FolderItem>(
  'folders/updateFolder',
  async (folder, { rejectWithValue }) =>
    await axios
      .post<ServerResponse>(`${_urlbase}/update.php`, folder)
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается обновить папку`)
      )
);

const deleteFolder = createAppAsyncThunk<Id, Id>(
  'folders/deleteFolder',
  async (id, { rejectWithValue }) =>
    await axios
      .post<ServerResponse>(`${_urlbase}/delete.php`, { id })
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается удалить папку`)
      )
);

export const actionsThunk = {
  getFolders,
  addFolder,
  updateFolder,
  deleteFolder
};

export const { reducer: folderReducer, actions: folderActions } = folderSlice;
