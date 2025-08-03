import { AUTH_TOKEN } from '@/constants/cookie';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export const AXIOS_INSTANCE = Axios.create({ baseURL: '' });

export const customInstance = <T>(
  config: AxiosRequestConfig & { signal?: AbortSignal }
): Promise<T> => {
  const token = Cookies.get('auth_token');

  return AXIOS_INSTANCE({
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
    signal: config.signal,
  }).then(({ data }) => data);
};

export default customInstance;
export type ErrorType<Error> = AxiosError<Error>;
