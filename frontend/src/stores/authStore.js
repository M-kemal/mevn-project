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
      console.log('newUserData', newUserData);
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/auth/register',
          newUserData
        );
        // console.log('response', response);
        return response.data;
      } catch (error) {
        // console.error('Error at getting user', error);
        throw Error;
      }
    },

    async login(UserData) {
      console.log('UserData', UserData);
      try {
        const response = await axios.post('http://localhost:3000/api/v1/auth/login', UserData);

        this.user = response.data.user;
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } catch (error) {
        console.error('Error at getting login', error);
      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
      location.reload();
    }
  }
});
