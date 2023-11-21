import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUser';
import { User } from '../../types/media';
import { removeUser } from '../thunks/removeUser';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [] as Array<User>,
        isLoading: false,
        error: {},
    },
    reducers: {},
    extraReducers(builder) {
        // ***** FETCH ***** //
        /**
         * Confusingly this is how you get the thunk types,
         * not with action type strings, this is redux toolkit not allowing manual action
         * type strings, and these are automatically available from the thunk
         * fetchUsers.pending === 'users/fetch/pending'
         **/
        builder.addCase(fetchUsers.pending, (state) => {
            // show loading
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            // finish loading, fill data
            state.isLoading = false;
            // the data will be in the payload of the fulfilled action type from thunk
            state.list = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            // finish loading, fill error object
            state.isLoading = false;
            // error in the error property from thunk
            state.error = action.error;
        });
        // ***** POST ***** //
        builder.addCase(addUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.list.push(action.payload);
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        // ****** DELETE ***** //
        builder.addCase(removeUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removeUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.list = state.list.filter((user) => {
                // action.payload is the id returned from the thunk
                return user.id !== action.payload;
            })
        });
        builder.addCase(removeUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    },
});

export const usersReducer = usersSlice.reducer;