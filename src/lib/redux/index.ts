import type { RootState } from '@/store/reducer';
import { getRefreshToken, setRefreshToken } from '@/utils';
import { fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://your-base-url.com',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).user.user?.accessToken;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// 리프레시 토큰 갱신 함수
const handleTokenRefresh = async (api: any, extraOptions: any) => {
  const refreshToken = await getRefreshToken();

  if (refreshToken) {
    const refreshResult = await baseQuery({
      url: '/auth/refresh-token',
      method: 'POST',
      body: { refreshToken },
    }, api, extraOptions);

    if (refreshResult.data) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResult.data as {
        accessToken: string;
        refreshToken: string;
      };

      const currentUserData = (api.getState() as RootState).user.user;
      if (currentUserData) {
        // Redux에 새 액세스 토큰 저장
        api.dispatch({
          type: 'user/setUser',
          payload: { ...currentUserData, accessToken: newAccessToken },
        });

        // EncryptedStorage에 새 리프레시 토큰 저장
        await setRefreshToken(newRefreshToken);
      }

      return newAccessToken;
    } else {
      api.dispatch({ type: 'user/logout' });
    }
  } else {
    api.dispatch({ type: 'user/logout' });
  }
  return null;
};

// 커스텀 baseQuery 함수
const baseQueryWithToken: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  // 401 에러가 발생하면 리프레시 토큰을 이용하여 새 토큰 갱신
  if (result.error && result.error.status === 401) {
    const newAccessToken = await handleTokenRefresh(api, extraOptions);

    if (newAccessToken) {
      // 갱신된 토큰으로 다시 API 요청 재시도
      result = await baseQuery(args, api, extraOptions);
    } else {
      return { error: { status: 401, data: 'Unauthorized' } };
    }
  }

  return result;
};

export default baseQueryWithToken;
