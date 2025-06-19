
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

// Load initial state from localStorage
const loadFromLocalStorage = (): AuthState => {
  try {
    const saved = localStorage.getItem('authState');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        users: parsed.users || initialUsers
      };
    }
  } catch (error) {
    console.log('Failed to load auth state from localStorage');
  }
  
  return {
    currentUser: null,
    users: initialUsers,
    isLoggedIn: false,
  };
};

const initialUsers = [
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
];

const initialState: AuthState = loadFromLocalStorage();

// Save to localStorage
const saveToLocalStorage = (state: AuthState) => {
  try {
    localStorage.setItem('authState', JSON.stringify(state));
  } catch (error) {
    console.log('Failed to save auth state to localStorage');
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; password: string }>) => {
      const { username, password } = action.payload;
      
      // Check if user exists
      let user = state.users.find(u => u.username === username);
      
      if (user) {
        // Check for admin login
        if (password === ADMIN_PASSWORD) {
          // Make user admin if they use admin password
          const updatedUser = { ...user, isAdmin: true };
          const userIndex = state.users.findIndex(u => u.id === user!.id);
          state.users[userIndex] = updatedUser;
          state.currentUser = updatedUser;
          state.isLoggedIn = true;
        } else {
          // Regular user login (any password works for demo)
          state.currentUser = { ...user };
          state.isLoggedIn = true;
        }
      } else {
        // Create new user if doesn't exist
        const newUser: User = {
          id: Date.now().toString(),
          username,
          email: `${username}@example.com`,
          fullName: username,
          isAdmin: password === ADMIN_PASSWORD,
        };
        state.users.push(newUser);
        state.currentUser = newUser;
        state.isLoggedIn = true;
      }
      
      saveToLocalStorage(state);
    },
    register: (state, action: PayloadAction<Omit<User, 'id' | 'isAdmin'>>) => {
      const newUser: User = {
        ...action.payload,
        id: Date.now().toString(),
        isAdmin: false,
      };
      state.users.push(newUser);
      saveToLocalStorage(state);
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      saveToLocalStorage(state);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      }
      saveToLocalStorage(state);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
      saveToLocalStorage(state);
    },
  },
});

export const { login, register, logout, updateUser, deleteUser } = authSlice.actions;
export default authSlice.reducer;
