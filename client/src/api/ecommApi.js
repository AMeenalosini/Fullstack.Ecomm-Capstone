import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ecommApi = createApi({
    reducerPath: "ecommApi",
    baseQuery: fetchBaseQuery({baseUrl: "/api"}),
    tagTypes: ["products"],
    endpoints: (builder) => ({
      products: builder.query({
        query: () => "/products",
        providesTags: ["products"],
      }),
    }),
  });
  
  export const {
    useProductsQuery,
  } = ecommApi;