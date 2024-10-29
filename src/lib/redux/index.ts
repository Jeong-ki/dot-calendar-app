import type { RootState } from '@/store/reducer';
import { getRefreshToken, logError, setRefreshToken } from '@/utils';
import { SerializedError } from '@reduxjs/toolkit';
import { fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query';

type CustomBaseQueryArgs = { baseUrl: string };

type CustomBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | SerializedError
>;

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

enum UserActionTypes {
  SetUser = 'user/setUser',
  Logout = 'user/logout'
}


const tokenBaseQuery = ({ baseUrl }: CustomBaseQueryArgs): CustomBaseQuery => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).user.user?.accessToken;
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      // 액세스 토큰이 만료된 경우
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        // 기존 baseUrl로 리프레시 토큰을 사용하여 새 토큰 요청
        const refreshResult = await baseQuery(
          {
            url: '/auth/refresh-token',
            method: 'POST',
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResult.data as RefreshResponse;
          const currentUserData = (api.getState() as RootState).user.user;
          if (currentUserData) {
            // 새 액세스 토큰과 리프레시 토큰을 상태에 저장
            api.dispatch({
              type: UserActionTypes.SetUser,
              payload: { ...currentUserData, accessToken: newAccessToken },
            });

            // 리프레시 토큰도 저장하는 로직 추가
            await setRefreshToken(newRefreshToken);
          }

          // 헤더에 새로운 토큰을 넣고 다시 요청
          if (typeof args === 'object') {
            result = await baseQuery({
              ...args,
              headers: {
                ...(args.headers ?? {}),
                authorization: `Bearer ${newAccessToken}`,
              },
            }, api, extraOptions);
          }
        } else {
          // 리프레시 토큰 요청이 실패한 경우 에러 반환
          api.dispatch({ type: UserActionTypes.Logout });
          logError('Refresh token request failed', refreshResult.error);
          return refreshResult;
        }
      } else {
        // 리프레시 토큰이 없는 경우 에러 로그 추가
        logError('No refresh token available', result.error);
      }
    }

    return result;
  };
};

export default tokenBaseQuery;
