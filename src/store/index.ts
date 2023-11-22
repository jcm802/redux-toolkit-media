import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { albumsApi } from './apis/albumsApi';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        // vv Look up the reducer patch name, and make a new key for this object of whatever that string is
        [albumsApi.reducerPath]: albumsApi.reducer
    },
    // Boilerplate setup to connect apis to store
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware);
    }
});

// Boilerplate setup to connect apis to store
setupListeners(store.dispatch);

// Export everything from thunks fetch users, and export everything from there
// from this file
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export { useFetchAlbumsQuery, useAddAlbumMutation } from './apis/albumsApi';