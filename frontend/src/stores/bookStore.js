import axios from 'axios';
import { defineStore } from 'pinia';

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [],
    isLoading: false,
    userUploadedBooks: []
  }),
  getters: {
    selectedBook: (state) => {
      // _id mongo db de o şekilde verdiği için.
      return (id) => state.books.find((book) => book._id === id);
    }
  },
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
    },

    //kullanıcın dashboard'u
    async fetchBooksByUploader() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/books/uploader');
        console.log('uploader', response);
        this.userUploadedBooks = response.data;
      } catch (error) {
        console.error('Error at user uploaded books', error);
      }
    },

    async addNewBook(newBook) {
      console.log('newBook', newBook);
      this.isLoading = true;
      try {
        const response = await axios.post('http://localhost:3000/api/v1/books', newBook);
        console.log('newBook', response);
        this.books.push(response.data.book);
      } catch (error) {
        console.error('Error at add new books', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
