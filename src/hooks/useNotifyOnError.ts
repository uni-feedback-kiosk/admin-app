import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { useEffect } from 'react';
import { getErrorMessage } from '../store/apiSlice';

export default (
  callback: (message: string) => void,
  isError: boolean,
  error?: FetchBaseQueryError | SerializedError,
) => {
  useEffect(() => {
    if (!isError) {
      return;
    }

    callback(getErrorMessage(error!));
  }, [isError, error]);
};
