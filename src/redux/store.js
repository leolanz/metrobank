import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import camReducer from './features/cam';

const reducer = combineReducers({
  camera: camReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  /*  reducer: {
    camera: camReducer,
    session: sessionReducer,
    google: googleReducer,
  }, */
});

export const persistor = persistStore(store);

export default store;
