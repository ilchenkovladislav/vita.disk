import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ServerResponse, Id } from '../types';
import { baseServerUrl } from '../../config';

const _urlbase = `${baseServerUrl}/image`;

export interface ImageItem {
  readonly id: number;
  title: string;
  path: string;
  numberDownloads: number;
  isFavourites: boolean;
  sequence: number;
  folderId: number;
}

interface ImageState {
  items: ImageItem[];
  status: 'init' | 'loading' | 'error' | 'success';
}

const initialState: ImageState = {
  items: [],
  status: 'init'
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        getImages.fulfilled,
        (state, action: PayloadAction<ImageItem[]>) => {
          state.status = 'success';
          state.items = action.payload;
        }
      )
      .addCase(
        addImage.fulfilled,
        (state, action: PayloadAction<ImageItem[]>) => {
          state.status = 'success';
          for (const image of action.payload) {
            state.items.push(image);
          }
        }
      )
      .addCase(
        updateImage.fulfilled,
        (state, action: PayloadAction<ImageItem>) => {
          state.status = 'success';

          const idx = state.items.findIndex(
            (el) => el.id === action.payload.id
          );

          if (idx === -1) return;

          state.items[idx] = action.payload;
        }
      )
      .addCase(deleteImage.fulfilled, (state, action: PayloadAction<Id>) => {
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

const getImages = createAppAsyncThunk<ImageItem[]>(
  'images/getImages',
  async (_, { rejectWithValue }) =>
    await axios
      .get<ServerResponse>(`${_urlbase}/read.php`)
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(
          `${err.message}. Не получается получить данные по изображениям`
        )
      )
);

const addImage = createAppAsyncThunk<
  ImageItem[],
  { projectId: number; folderId: number; images: File[] }
>(
  'images/addImage',
  async ({ projectId, folderId, images }, { rejectWithValue }) => {
    const formData = new FormData();

    formData.append('projectId', projectId.toString());
    formData.append('folderId', folderId.toString());

    for (let i = 0; i < images.length; i++) {
      formData.append('images[]', images[i]);
    }

    return await axios
      .post<ServerResponse>(`${_urlbase}/create.php`, formData)
      .then((res) => res.data.records)
      // .then((res) => console.log(res.data))
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается добавить изображения`)
      );
  }
);

const updateImage = createAppAsyncThunk<ImageItem, ImageItem>(
  'images/updateImage',
  async (image, { rejectWithValue }) =>
    await axios
      .post<ServerResponse>(`${_urlbase}/update.php`, JSON.stringify(image))
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается обновить изображение`)
      )
);

const deleteImage = createAppAsyncThunk<Id, Id>(
  'images/deleteImage',
  async (id, { rejectWithValue }) =>
    await axios
      .post<ServerResponse>(`${_urlbase}/delete.php`, { id })
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) =>
        rejectWithValue(`${err.message}. Не получается удалить изображение`)
      )
);

export const imageAsyncActions = {
  getImages,
  addImage,
  updateImage,
  deleteImage
};

export const { reducer: imageReducer, actions: imageActions } = imageSlice;
