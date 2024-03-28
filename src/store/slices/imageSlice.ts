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

          state.items.sort((a, b) => a.sequence - b.sequence);
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
      .addCase(
        updateImageSequence.fulfilled,
        (state, action: PayloadAction<ImageItem[]>) => {
          state.status = 'success';

          for (const payload of action.payload) {
            const item = state.items.find((el) => el.id === payload.id);

            if (item) {
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

const updateImageSequence = createAppAsyncThunk<ImageItem[], ImageItem[]>(
  'image/updateSequence',
  async (images, { rejectWithValue }) => {
    return await axios
      .post<ServerResponse>(`${_urlbase}/updateSequence.php`, images)
      .then((res) => res.data.records)
      .catch((err: AxiosError<ServerResponse>) => {
        console.log(err.message);
        rejectWithValue(
          `${err.message}. Не получается изменить очередность проектов`
        );
      });
  }
);

const downloadFavouritesZip = createAppAsyncThunk<
  void,
  { favouritesImageTitles: string[]; projectId: string; folderId: string }
>(
  'images/downloadFavoutiresZip',
  async (
    { favouritesImageTitles, projectId, folderId },
    { rejectWithValue }
  ) => {
    return await axios
      .post<Blob>(
        `${_urlbase}/downloadFavouritesZip.php`,
        JSON.stringify({ favouritesImageTitles, projectId, folderId }),
        {
          responseType: 'blob'
        }
      )
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

export const imageAsyncActions = {
  getImages,
  addImage,
  updateImage,
  deleteImage,
  updateImageSequence,
  downloadFavouritesZip
};

export const { reducer: imageReducer, actions: imageActions } = imageSlice;
