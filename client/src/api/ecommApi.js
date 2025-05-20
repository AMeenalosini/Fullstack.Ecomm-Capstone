import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ecommApi = createApi({
    reducerPath: "ecommApi",
    baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token && token !== "") {
        headers.set("authorization", `${token}`);
      }
        return headers;
      },
    }),
    tagTypes: ["Product", "User", "Cart", "Order"],
    endpoints: (builder) => ({
      products: builder.query({
        query: () => "/products",
        providesTags: ["Product"],
      }),
      register: builder.mutation({
        query: (body) => ({
          url: "/user/register",
          method: "POST",
          body,
        }),
        invalidatesTags: ["User"],
      }),
      login: builder.mutation({
        query: (body) => ({
          url: "/user/login",
          method: "POST",
          body,
        }),
        invalidatesTags: ["User"],
      }),
      user: builder.query({
        query: () => "/user/me",
        providesTags: ["User"],
      }),
      productbyid: builder.query({
        query: (id) => `/products/${id}`,
        providesTags: ["Product"],
      }),
      productbycat: builder.query({
        query: (category) => `/category/${category}`,
        providesTags: ["Product"],
      }),
      usercart: builder.query({
        query: () => "/users/cart",
        providesTags: ["Cart"],
      }),
      addtocart: builder.mutation({
        query: (body) => ({
          url: "/users/cart",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Cart"],
      }),
      deletefromcart: builder.mutation({
        query: (body) => ({
          url: `users/cart`,
          method: "DELETE",
          body,
        }),
        invalidatesTags: ["Cart"], 
      }),
      updatecart: builder.mutation({
        query: (body) => ({
          url: "users/cart",
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Cart"], 
      }),
      destroycart: builder.mutation({
        query: (body) => ({
          url: `users/dcart`,
          method: "DELETE",
          body,
        }),
        invalidatesTags: ["Cart"], 
      }),
      addtoorder: builder.mutation({
        query: (body) => ({
          url: "/users/checkout",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Order"],
      }),
      fetchorder: builder.query({
        query: (id) => `/users/order/${id}`,
        providesTags: ["Order"],
      }),
      updateorder: builder.mutation({
        query: (body) => ({
          url: "users/order",
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Order"], 
      }),
      deleteproduct: builder.mutation({
        query: (id) => ({
          url: `/admin/products/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Product"], 
      }),
      updateproduct: builder.mutation({
        query: ({ id, ...body }) => ({
          url: `/admin/products/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Product"], 
      }),
      addproduct: builder.mutation({
        query: (body) => ({
          url: "/admin/products",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Product"],
      }),
      adminusers: builder.query({
        query: () => "/admin/users",
        providesTags: ["User"],
      }),
    }),
  });
  
  export const {
    useProductsQuery,
    useRegisterMutation,
    useLoginMutation,
    useUserQuery,
    useProductbyidQuery,
    useProductbycatQuery,
    useUsercartQuery,
    useAddtocartMutation,
    useDeletefromcartMutation,
    useUpdatecartMutation,
    useDestroycartMutation,
    useAddtoorderMutation,
    useFetchorderQuery,
    useUpdateorderMutation,
    useDeleteproductMutation,
    useUpdateproductMutation,
    useAddproductMutation,
    useAdminusersQuery,
  } = ecommApi;