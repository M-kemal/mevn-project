import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null
  }),

  getters: {},

  actions: {
    async register(newUserData) {
      console.log('newUserData', newUserData);
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/auth/register',
          newUserData
        );
        console.log('response', response);
      } catch (error) {
        console.error('Error at getting user', error);
      }
    },

    async login(UserData) {
      console.log('UserData', UserData);
      try {
        const response = await axios.post('http://localhost:3000/api/v1/auth/login', UserData);
        console.log('response', response);
        this.user = response.data.user;
      } catch (error) {
        console.error('Error at getting login', error);
      }
    }
  }
});
