import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {Product} from './types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: builder => ({
    getAllProducts: builder.query<Array<Product>, void>({
      query: () => ({url: '/product'}),
    }),
    getProductById: builder.query<Product, number>({
      query: id => ({url: `/product/${id}`}),
    }),
  }),
});

export const {useGetAllProductsQuery, useGetProductByIdQuery} = productApi;
