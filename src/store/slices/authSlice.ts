
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const ADMIN_PASSWORD = "123$%&";

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  address?: string;
  phone?: string;
  isAdmin: boolean;
}

interface AuthState {
  currentUser: User | null;
  users: User[];
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  users: [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      fullName: 'מנהל המערכת',
      address: 'תל אביב',
      phone: '050-1234567',
      isAdmin: true,
    },
    {
      id: '2',
      username: 'user1',
      email: 'user@example.com',
      fullName: 'יוסי כהן',
      address: 'חיפה',
      phone: '052-7654321',
      isAdmin: false,
    }
  ],
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const { username, password } = action.payload;
      const user = state.users.find(u => u.username === username);
      
      if (user) {
        const isAdmin = password === ADMIN_PASSWORD;
        state.currentUser = { ...user, isAdmin };
        state.isLoggedIn = true;
      }
    },
    register: (state, action: PayloadAction<Omit<User, 'id' | 'isAdmin'>>) => {
      const newUser: User = {
        ...action.payload,
        id: Date.now().toString(),
        isAdmin: false,
      };
      state.users.push(newUser);
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      }
    },
  },
});

export const { login, register, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
