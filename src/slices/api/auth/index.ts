import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
  ISignInRes,
  ISignInReq,
  IMyInfo,
  IRefreshUser,
  ISignUpRes,
  ISignUpReq,
} from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: builder => ({
    getDummy: builder.query<any, void>({
      query: () => ({url: '/todos/1'}),
    }),
    getMyInfo: builder.query<IMyInfo, void>({
      query: () => ({url: '/my'}),
    }),
    refreshUser: builder.mutation<IRefreshUser, string>({
      query: refreshToken => ({
        url: '/auth/refresh-user',
        method: 'POST',
        data: {refreshToken},
      }),
    }),
    signIn: builder.mutation<ISignInRes, ISignInReq>({
      query: signInData => ({
        url: '/auth/signin',
        method: 'POST',
        data: signInData,
      }),
    }),
    signUp: builder.mutation<ISignUpRes, ISignUpReq>({
      query: signUpData => ({
        url: '/auth/signup',
        method: 'POST',
        data: signUpData,
      }),
    }),
  }),
});

export const {
  useGetDummyQuery,
  useGetMyInfoQuery,
  useRefreshUserMutation,
  useSignInMutation,
  useSignUpMutation,
} = authApi;
