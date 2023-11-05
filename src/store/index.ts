import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
});

// Export everything from thunks fetch users, and export everything from there
// from this file
export * from './thunks/fetchUsers';
export * from './thunks/addUser';