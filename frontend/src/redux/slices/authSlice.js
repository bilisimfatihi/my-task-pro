import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../../api/auth.api';

// Get user from localStorage
const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

const tokenFromStorage = localStorage.getItem('token');

const initialState = {
  user: userFromStorage,
  token: tokenFromStorage,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};


// Login user
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const data = await authAPI.login(userData);
    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.data.user));
      localStorage.setItem('token', data.data.token);
    }
    return data.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'Login failed';
    return thunkAPI.rejectWithValue(message);
  }
});

// Register user
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const data = await authAPI.register(userData);
    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.data.user));
      localStorage.setItem('token', data.data.token);
    }
    return data.data;
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || 'Register failed';
    return thunkAPI.rejectWithValue(message);
  }
});

// Get current user
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const data = await authAPI.getCurrentUser();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
      return data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to get user';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, thunkAPI) => {
    try {
      const data = await authAPI.updateProfile(profileData);
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
      return data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Update failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await authAPI.logout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return null;
  } catch (error) {
    // Even if API call fails, clear local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return null;
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = 'Registration successful';
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = 'Login successful';
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log('Redux: updateProfile.fulfilled called');
        console.log('Redux payload:', action.payload);
        console.log('Redux payload.user:', action.payload?.user);
        state.isLoading = false;
        state.isSuccess = true;
        // Create a new user object to trigger re-render
        state.user = { ...action.payload.user };
        state.message = 'Profile updated successfully';
        // Update localStorage
        if (action.payload.user) {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
          console.log('Redux: User saved to localStorage:', action.payload.user);
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
      });
  },
});

export const { reset, clearUser } = authSlice.actions;
export default authSlice.reducer;
