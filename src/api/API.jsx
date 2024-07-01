import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const newsSlice = createApi({
  reducerPath: 'newsSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://eventregistry.org/api/v1/',
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (params) => {
        const urlParams = new URLSearchParams(params);
        urlParams.set("apiKey", 'b99abfb5-7c01-4ab9-bfd6-f1b326d1fff4');

        return {
          url: "article/getArticles",
          method: 'GET',
          params: urlParams,
          transformResponse: (response) => {
            return response.articles || [];
          },
        };
      },
    }),

    getArticleById: builder.query({
      query: (id) => {
        const urlParams = new URLSearchParams();
        urlParams.set("articleUri", id); // Aquí se establece articleUri con el valor de id
        urlParams.set("apiKey", 'b99abfb5-7c01-4ab9-bfd6-f1b326d1fff4');

        return {
          url: "article/getArticle",
          method: 'GET',
          params: urlParams,
          transformResponse: (response) => {
            return response.article || null;
          },
        };
      },
    }),

    getBreakingEvents: builder.query({
      query: (params) => {
        const urlParams = new URLSearchParams(params);
        urlParams.set("apiKey", 'b99abfb5-7c01-4ab9-bfd6-f1b326d1fff4');

        return {
          url: "event/getBreakingEvents",
          method: 'GET',
          params: urlParams,
        };
      },
    }),

    // Agrega más endpoints según sea necesario para otras consultas

  }),
});

export const { useGetArticlesQuery, useGetArticleByIdQuery, useGetBreakingEventsQuery } = newsSlice;

export const { reducer: newsReducer } = newsSlice;

export const { middleware: newsMiddleware } = newsSlice;
