type NebuiaApiErrorResult = {
  status: false;
  payload: string;
};

type NebuiaApiSuccessResult<T> = {
  status: true;
  payload: T;
};

export type NebuiaApiResult<T> =
  | NebuiaApiErrorResult
  | NebuiaApiSuccessResult<T>;
