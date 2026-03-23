import axios, { AxiosInstance } from 'axios';

const API_URL = 'http://localhost:8000/api';
const TOKEN_URL = 'http://localhost:8000/api/token';

class APIClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load token from localStorage
    this.token = localStorage.getItem('access_token');
    if (this.token) {
      this.setAuthHeader(this.token);
    }

    // Add request interceptor
    this.client.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              const response = await axios.post(`${TOKEN_URL}/refresh/`, {
                refresh: refreshToken,
              });

              this.token = response.data.access;
              if (this.token) {
                localStorage.setItem('access_token', this.token);
                this.setAuthHeader(this.token);
              }

              return this.client(originalRequest);
            }
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private setAuthHeader(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async login(phone: string, password: string) {
    try {
      // For demo purposes, we'll create a mock login
      // In production, you would have a proper authentication endpoint
      const response = await axios.post(`${TOKEN_URL}/`, {
        username: phone,
        password: password,
      });

      this.token = response.data.access;
      if (this.token) {
        localStorage.setItem('access_token', this.token);
        localStorage.setItem('refresh_token', response.data.refresh);
        this.setAuthHeader(this.token);
      }

      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete this.client.defaults.headers.common['Authorization'];
  }

  isAuthenticated() {
    return !!this.token;
  }

  // School endpoints
  getSchools() {
    return this.client.get('/schools/');
  }

  // User endpoints
  getUsers() {
    return this.client.get('/users/');
  }

  getCurrentUser() {
    return this.client.get('/users/me/');
  }

  // Student endpoints
  getStudents() {
    return this.client.get('/students/');
  }

  getStudentStatistics() {
    return this.client.get('/students/statistics/');
  }

  createStudent(data: any) {
    return this.client.post('/students/', data);
  }

  updateStudent(id: number, data: any) {
    return this.client.patch(`/students/${id}/`, data);
  }

  deleteStudent(id: number) {
    return this.client.delete(`/students/${id}/`);
  }

  // Class endpoints
  getClasses() {
    return this.client.get('/classes/');
  }

  // Subject endpoints
  getSubjects() {
    return this.client.get('/subjects/');
  }

  // Schedule endpoints
  getSchedules() {
    return this.client.get('/schedules/');
  }

  // Attendance endpoints
  getAttendance() {
    return this.client.get('/attendance/');
  }

  getAttendanceStatistics() {
    return this.client.get('/attendance/statistics/');
  }

  createAttendance(data: any) {
    return this.client.post('/attendance/', data);
  }

  // Behavior endpoints
  getBehaviors() {
    return this.client.get('/behaviors/');
  }

  // Report endpoints
  getReports() {
    return this.client.get('/reports/');
  }

  createReport(data: any) {
    return this.client.post('/reports/', data);
  }

  // Holiday endpoints
  getHolidays() {
    return this.client.get('/holidays/');
  }
}

export const apiClient = new APIClient();
