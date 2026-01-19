export interface ApiResponse<T> {
  data: T;
  message?: string;
  succeeded?: boolean;
  errors?: string[];
}
