import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imagePrev: null,
  docPrev: null,
  image: null,
  file: null,
  requestNumber: null,
};

export const previewImage = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setPreviewImage: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setPreviewDoc: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setRequestNumber: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// Metodo global para actualizar el state
export const { setPreviewImage, setPreviewDoc, setRequestNumber } = previewImage.actions;

export default previewImage.reducer;
