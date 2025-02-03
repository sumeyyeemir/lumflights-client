import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  auth: {
    login: (credentials: { email: string; password: string }) =>
      api.post<{ token: string; role: 'admin' | 'staff' }>('/auth/login', credentials),
  },
  reservations: {
    getAll: (params: {
      page: number;
      limit: number;
      startDate?: string;
      endDate?: string;
    },
  ) => api.get<Reservation[]>('/reservations', { params }),
  },
};

export interface Reservation {
  id: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  date: string;
  passengers: Passenger[];
  comments: string[];
}

interface Passenger {
  name: string;
  age: number;
  seatNumber: string;
}