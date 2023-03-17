import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ServerResponse, Id, RootStore } from '../types';
import { baseServerUrl } from '../../config';

const _urlbase = `${baseServerUrl}/folder`;

export interface FolderItem {
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
      .addCase(
        updateFolderSequence.fulfilled,
        (state, action: PayloadAction<FolderItem[]>) => {
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
  async (id, { rejectWithValue, dispatch, getState }) =>
    await axios
      .post<ServerResponse>(`${_urlbase}/delete.php`, { id })
      .then((res) => {
        const projectId = getState().folder.items.find(
          (folder) => Number(folder.id) === Number(res.data.records)
        )?.projectId;

        const idx = getState()
          .folder.items.filter(
            (folder) => Number(folder.projectId) === Number(projectId)
          )
          .findIndex((folder) => folder.id === res.data.records);

        const folders = getState()
          .folder.items.filter(
            (folder) => Number(folder.projectId) === Number(projectId)
          )
          .slice(idx + 1)
          .map((el) => ({ ...el, sequence: el.sequence - 1 }));

        dispatch(updateFolderSequence(folders));

        return res.data.records;
      })
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается удалить папку`)
      )
);

const updateFolderSequence = createAppAsyncThunk<FolderItem[], FolderItem[]>(
  'folders/updateSequence',
  async (folders, { rejectWithValue }) => {
    return await axios
      .post<ServerResponse>(`${_urlbase}/updateSequence.php`, folders)
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) => {
        rejectWithValue(
          `${err.message}. Не получается изменить очередность папок`
        );
      });
  }
);

const downloadFolderZip = createAppAsyncThunk<
  void,
  { projectId: string; folderId: string }
>(
  'folders/downloadFolderZip',
  async ({ projectId, folderId }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('folderId', folderId);

    return await axios
      .post<Blob>(`${_urlbase}/downloadFolderZip.php`, formData, {
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

export const actionsThunk = {
  getFolders,
  addFolder,
  updateFolder,
  deleteFolder,
  downloadFolderZip
};

export const { reducer: folderReducer, actions: folderActions } = folderSlice;
