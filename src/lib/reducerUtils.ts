// 로그관련인 처리용
export type AuthAsyncState = {
  status: string;
  error?: string;
  message: string;
};

export const authAsyncState = {
  initial: (): AuthAsyncState => ({
    status: 'INITIAL',
    error: '',
    message: '',
  }),
  request: (): AuthAsyncState => ({
    status: 'WAITING',
    error: '',
    message: '',
  }),
  success: (): AuthAsyncState => ({
    status: 'SUCCESS',
    error: '',
    message: '',
  }),
  failure: (message: string, error?: string): AuthAsyncState => ({
    status: 'FAILURE',
    error,
    message,
  }),
};

// 일반 async request 용 (추후 사용할 예정)
export type AsyncState<T, E = any> = {
  loading: boolean;
  data: T | null;
  error: E | null;
};

export const asyncState = {
  initial: <T, E = any>(initialData?: T): AsyncState<T, E> => ({
    loading: false,
    data: initialData || null,
    error: null,
  }),
  request: <T, E = any>(data?: T): AsyncState<T, E> => ({
    loading: true,
    data: data || null,
    error: null,
  }),
  success: <T, E = any>(data?: T): AsyncState<T, E> => ({
    loading: false,
    data: data || null,
    error: null,
  }),
  failure: <T, E>(error: E): AsyncState<T, E> => ({
    loading: true,
    data: null,
    error: error,
  }),
};
