import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { getErrorMessage } from '../store/apiSlice';

const FormError = ({
  error,
  isError,
}: {
  error?: FetchBaseQueryError | SerializedError;
  isError: boolean;
}) => (
  <FormControl isInvalid={isError}>
    {error && <FormErrorMessage justifyContent="center">{getErrorMessage(error)}</FormErrorMessage>}
  </FormControl>
);

export default FormError;
