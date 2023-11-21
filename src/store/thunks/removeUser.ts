import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const removeUser = createAsyncThunk('users/remove', async (id: number): Promise<number> => {
    await axios.delete(`http://localhost:4000/users/${id}`);
    return id;
});

export { removeUser };