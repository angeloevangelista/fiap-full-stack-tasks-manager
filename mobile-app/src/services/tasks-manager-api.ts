import axios, { AxiosError, AxiosInstance } from 'axios';
import Toast from 'react-native-toast-message';

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
      baseURL: process.env.EXPO_PUBLIC_TASKS_MANAGER_API_HOST,
    });

    this._httpClient.interceptors.response.use(
      (config) => config,
      this._handleError,
    );
  }

  private _handleError(error: unknown) {
    if (error instanceof AxiosError && error.response) {
      const responseData = error.response?.data as ApiResponse<never>;

      Toast.show({
        type: 'error',
        text1: `API Error | ${responseData.error.type}`,
        text2: responseData.error.messages.join('\n'),
      });
      return;
    }

    Toast.show({
      type: 'error',
      text1: 'API Error',
      text2: 'Oops! An unexpected error occurred 😵',
    });

    console.log(JSON.stringify(error, null, 2));
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
