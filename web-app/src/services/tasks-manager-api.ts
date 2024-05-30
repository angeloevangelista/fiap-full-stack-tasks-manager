import toast from 'react-hot-toast';
import axios, { AxiosError, AxiosInstance } from 'axios';

type ApiResponse<T> = {
  success: boolean;
  data: T;
  error: ApiError;
};

type ApiError = {
  type: string;
  messages: string[];
};

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
}

class TasksManagerApi {
  private readonly _httpClient: AxiosInstance;

  constructor() {
    this._httpClient = axios.create({
      baseURL: import.meta.env.VITE_TASKS_MANAGER_API_HOST,
    });

    this._httpClient.interceptors.response.use(
      (config) => config,
      this._handleError,
    );
  }

  private _handleError(error: unknown) {
    if (error instanceof AxiosError) {
      const responseData = error.response?.data as ApiResponse<never>;

      toast.error(
        `API Error | ${
          responseData.error.type
        }\n ${responseData.error.messages.join('\n')}`,
      );
      return;
    }

    toast.error('Oops! An unexpected error occurred on server 😵');
  }

  public async createTask(task: Omit<Task, 'id' | 'completed'>) {
    const { data } = await this._httpClient.post<ApiResponse<Task>>(
      `/api/tasks`,
      task,
    );

    return data.data;
  }

  public async completeTask(taskId: string) {
    const { data } = await this._httpClient.patch<ApiResponse<Task>>(
      `/api/tasks/${taskId}`,
    );

    return data.data;
  }

  public async updateTask(
    taskId: string,
    task: Omit<Task, 'id' | 'completed'>,
  ) {
    const { data } = await this._httpClient.put<ApiResponse<Task>>(
      `/api/tasks/${taskId}`,
      task,
    );

    return data.data;
  }

  public async getTask(taskId: string) {
    const { data } = await this._httpClient.get<ApiResponse<Task>>(
      `/api/tasks/${taskId}`,
    );

    return data.data;
  }

  public async listTasks(excludeCompleted?: boolean) {
    const { data } = await this._httpClient.get<ApiResponse<Task[]>>(
      '/api/tasks',
      {
        params: {
          ...(excludeCompleted ? { exclude_completed: true } : {}),
        },
      },
    );

    return data.data;
  }
}

export { TasksManagerApi };
