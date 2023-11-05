import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:4000/users');

    // DEV ONLY
    await pause(1000);
    
    return response.data;
});

// DEV ONLY
const pause = (duration: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}

export { fetchUsers };