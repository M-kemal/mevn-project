import axios from 'axios';
import { defineStore } from 'pinia';

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [],
    isLoading: false
  }),
  actions: {
    async fetchBooks() {
      this.isLoading = true;
      try {
        // isLoading görmek için yaptık
        // await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await axios.get('http://localhost:3000/api/v1/books');
        console.log('RES::', response);
        this.books = response.data;
      } catch (error) {
        console.error('Error at fetching books', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
