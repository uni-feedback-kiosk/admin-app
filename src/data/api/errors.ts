import { AxiosError } from 'axios';

type ApiError = AxiosError<{ detail?: string }>;
type ErrorCallback = (message: string) => void;
type LogoutCallback = () => void;

const getErrorInfo = ({ response, message }: ApiError) => {
  // no response: network error, probably
  if (!response?.data?.detail) {
    return {
      message,
      logOut: false,
    };
  }

  // not 2xx response usually contains "detail" field
  // fallback to the whole response data if no detail
  return {
    message: response.data.detail || response.data as string,
    logOut: response.status === 401,
  };
};

export default function handleError(
  error: ApiError, onError: ErrorCallback, onLogout: LogoutCallback,
) {
  const { message, logOut } = getErrorInfo(error);
  onError(message);
  if (logOut) {
    onLogout();
  }
}
