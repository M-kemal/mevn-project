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
      return (id) => state.books.find((book) => book._id === id);
    }
  },
  actions: {
    async fetchBooks() {
      this.isLoading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/v1/books');

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
        throw error.response.data;
      } finally {
        this.isLoading = false;
      }
    },

    async editTheBook(bookId, bookData) {
      try {
        const response = await axios.put(`http://localhost:3000/api/v1/books/${bookId}`, bookData);
        const updatedBookData = response.data.book;
        const bookIndex = this.books.findIndex((book) => book._id === bookId);
        if (bookIndex !== -1) {
          this.books.splice(bookIndex, 1, updatedBookData);
        }
      } catch (error) {
        console.error('Error occurred:', error);
        if (error.response) {
          // error.response var olduğunda yapılacak işlemler
          if (error.response.data) {
            console.error('Error details:', error.response.data);
            throw new Error(error.response.data.message || 'An unexpected server error occurred');
          } else {
            throw new Error('Server responded with an error but no data');
          }
        } else {
          // error.response yoksa
          console.error('Unexpected error format:', error);
          throw new Error('An unexpected error occurred');
        }
      }
    },

    async deleteTheBook(bookId) {
      console.log('bookId', bookId);
      try {
        await axios.delete(`http://localhost:3000/api/v1/books/${bookId}`);
        this.books = this.books.filter((book) => book._id !== bookId);
      } catch (error) {
        throw error.response.data;
      }
    }
  }
});
