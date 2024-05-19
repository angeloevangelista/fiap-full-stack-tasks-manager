export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: ApiError;
};

export type ApiError = {
  type: string;
  messages: string[];
};
