import { createApi } from '@reduxjs/toolkit/query/react';
import tokenBaseQuery from '@/lib/redux';
import { BASE_URL } from '@/utils';
import type { Product } from './types';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: tokenBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<Array<Product>, void>({
      query: () => ({ url: '/product' }),
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => ({ url: `/product/${id}` }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi;
