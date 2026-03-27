import axios, { AxiosInstance } from 'axios';

// Use relative paths for API calls (proxied through Vite dev server)
const API_BASE = '';
const TOKEN_URL = '/api/token/';

class APIClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE,
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
  }

  private setAuthHeader(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async login(phone: string, password: string) {
    try {
      const response = await axios.post(TOKEN_URL, {
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
    } catch (error: any) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async registerSchool(schoolData: {
    name: string;
    admin_name: string;
    phone: string;
    admin_password: string;
  }) {
    try {
      const response = await this.client.post('/api/schools/', {
        name: schoolData.name,
        phone: schoolData.phone,
        admin_name: schoolData.admin_name,
        address: 'تم الإضافة من صفحة التسجيل',
        email: `admin-${schoolData.phone}@school.local`,
      });

      // Create user for the school admin
      const userResponse = await this.client.post('/api/users/', {
        username: schoolData.phone,
        password: schoolData.admin_password,
        email: `admin-${schoolData.phone}@school.local`,
        first_name: schoolData.admin_name,
        school: response.data.id,
        role: 'admin',
      });

      return { school: response.data, user: userResponse.data };
    } catch (error: any) {
      console.error('School registration failed:', error);
      throw error;
    }
  }

  async getStudents() {
    try {
      const response = await this.client.get('/api/students/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch students:', error);
      throw error;
    }
  }

  async getUsers() {
    try {
      const response = await this.client.get('/api/users/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }

  async getSchedules() {
    try {
      const response = await this.client.get('/api/schedules/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      throw error;
    }
  }

  async getAttendance() {
    try {
      const response = await this.client.get('/api/attendance/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
      throw error;
    }
  }

  async getReports() {
    try {
      const response = await this.client.get('/api/reports/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      throw error;
    }
  }

  async getClasses() {
    try {
      const response = await this.client.get('/api/classes/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch classes:', error);
      throw error;
    }
  }

  async getSubjects() {
    try {
      const response = await this.client.get('/api/subjects/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
      throw error;
    }
  }

  async getAttendanceStatistics() {
    try {
      const response = await this.client.get('/api/attendance-statistics/');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch attendance statistics:', error);
      throw error;
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete this.client.defaults.headers.common['Authorization'];
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }
}

export const apiClient = new APIClient();
