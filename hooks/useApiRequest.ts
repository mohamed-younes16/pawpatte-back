import axios, { AxiosResponse } from 'axios';
import { toast } from 'sonner';

interface ApiRequestConfig<T> {
  onSuccess?: (response: AxiosResponse<T>) => void;
  onError?: (error: any) => void;
  successMessage?: string;
  loadingMessage?: string;
}

export function useApiRequest() {
  const request = async <T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: any,
    config: ApiRequestConfig<T> = {}
  ) => {
    const {
      onSuccess,
      onError,
      successMessage = 'Operation successful',
      loadingMessage = 'Processing...'
    } = config;

    try {
      const toastId = toast.loading(loadingMessage, { invert: true, duration: 10000 });

      const response = await axios({
        method,
        url,
        data,
      });

      toast.dismiss(toastId);
      toast.success(successMessage, { invert: true });

      onSuccess?.(response);
      return response;
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || 'An error occurred', {
        invert: true,
      });

      onError?.(error);
      throw error;
    }
  };

  return {
    get: <T>(url: string, config?: ApiRequestConfig<T>) => 
      request<T>('get', url, undefined, config),
    post: <T>(url: string, data: any, config?: ApiRequestConfig<T>) => 
      request<T>('post', url, data, config),
    put: <T>(url: string, data: any, config?: ApiRequestConfig<T>) => 
      request<T>('put', url, data, config),
    patch: <T>(url: string, data: any, config?: ApiRequestConfig<T>) => 
      request<T>('patch', url, data, config),
    delete: <T>(url: string, config?: ApiRequestConfig<T>) => 
      request<T>('delete', url, undefined, config),
  };
}
