import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null
  }),

  getters: {
    isLoggedIn: (state) => {
      return !!state.user;
    }
  },

  actions: {
    async register(newUserData) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/auth/register',
          newUserData
        );
        return response.data;
      } catch (error) {
        console.log(error);
        throw error.response.data;
      }
    },

    async login(UserData) {
      console.log('UserData', UserData);
      try {
        const response = await axios.post('http://localhost:3000/api/v1/auth/login', UserData);

        const token = response.data.token;

        this.user = response.data.user;
        localStorage.setItem('user', JSON.stringify(response.data));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        // console.error('Error at getting login', error);
        throw error.response.data;
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
      location.reload();
    }
  }
});
