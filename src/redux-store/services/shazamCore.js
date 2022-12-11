// redux-toolkit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// RapidAPi = Shazam Core
// https://rapidapi.com/tipsters/api/shazam-core?utm_source=youtube.com%2FJavaScriptMastery&utm_medium=referral&utm_campaign=DevRel

// redux
export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '519ec9c0cbmshd0398e2f9b9e7e0p1a4fc8jsn5a082caa2c6b')
            
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world' }),
        getSongDetails: builder.query({ query: ({ songId }) => `/tracks/details?track_id=${songId}`}),
        getSongRelated: builder.query({ query: ({ songId }) =>  `/tracks/related?track_id=${songId}`}),
        getSongByCountry: builder.query({ query: () => '/charts/country?country_code=GB' }),
        getTopArtists: builder.query({ query: () => '/charts/country?country_code=US' }),
        getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}`})
    })
});

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetSongByCountryQuery,
    useGetTopArtistsQuery,
    useGetSongsByGenreQuery
} = shazamCoreApi;