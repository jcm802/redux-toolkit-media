import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // <-- you need to add react here for custom hooks
import { faker } from "@faker-js/faker";
import { Photo } from "../../types/media";

const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
    }),
    tagTypes: ['Photo', 'AlbumPhoto'],
    endpoints(builder) {
        return {
            fetchPhotos: builder.query({
                providesTags: (result, error, album) => {
                    const tags = result.map((photo: Photo) => {
                        return { type: 'Photo', id: photo.id }
                    });
                    tags.push({ type: 'AlbumPhoto', id: album.id });
                    return tags;
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id,
                        },
                        method: 'GET',
                    };
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'AlbumPhoto', id: album.id }];
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: {
                            albumId: album.id,
                            url: faker.image.abstract(150, 150, true),
                        },
                    };
                }
            }),
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'Photo', id: photo.id }]
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE',
                    }
                }
            }),
        };
    }
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export { photosApi };