import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEV ONLY
const pause = (duration: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
        // DEV ONLY - This is a function override
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        },
    }),
    tagTypes: ['Album'],
    endpoints(builder) {
        return {
            addAlbum: builder.mutation({
                                                // vv this is what you pass when you call the function from the hook
                // bear in mind it wont look like this, normally you have to figure out what you want to use to invalidate
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'Album', id: user.id}]
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
            // vv determines the name of the hook
            fetchAlbums: builder.query({ 
                                            // vv this is the argument you passed in the hook (it will appear as 'arg' in the docs)
                providesTags: (result, error, user) => {
                    return [{ type: 'Album', id: user.id}]
                },
                //       vv You will pass this into the hook
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id,
                        },
                        method: 'GET',
                    };
                }
            })
        };
    }
});
                // vv exporting the hook here
export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };