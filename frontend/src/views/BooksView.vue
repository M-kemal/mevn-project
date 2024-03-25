<template>
  <section>
    <div class="container">
      <SectionHeader title="Books" text="Books text" />
      <div v-if="isLoading" class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <BookList v-else :books="paginatedBook" />
      <Pagination :currentPage="currentPage" :totalPages="totalPages" @page-changed="updatePage" />
    </div>
  </section>
</template>

<script>
import BookList from '@/components/BookList.vue';
import Pagination from '@/components/Pagination.vue';
import SectionHeader from '@/components/SectionHeader.vue';
// import books from '@/db.js'
import { computed, ref } from 'vue';

import { useBookStore } from '@/stores/bookStore.js';
export default {
  name: 'BooksView',
  setup() {
    // const books = ref([]);

    // const fetchBooks = async () => {
    //   try {
    //     const response = await fetch('http://localhost:3000/api/v1/books');
    //     const data = await response.json();
    //     books.value = data;
    //     console.log(books.value);
    //   } catch (error) {}
    // };

    // fetchBooks();

    const bookPiniaStore = useBookStore();

    // onMounted(async () => {
    //   await bookPiniaStore.fetchBooks();
    // });

    const isLoading = computed(() => bookPiniaStore.isLoading);

    const currentPage = ref(1);
    const itemsPerPage = ref(8);

    const totalPages = computed(() => {
      return Math.ceil(bookPiniaStore.books.length / itemsPerPage.value);
    });

    const paginatedBook = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      const endIndex = startIndex + itemsPerPage.value;
      return bookPiniaStore.books.slice(startIndex, endIndex);
    });

    const updatePage = (page) => {
      currentPage.value = page;
    };

    return {
      books: bookPiniaStore.books,
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedBook,
      updatePage,
      isLoading
    };
  },
  components: { SectionHeader, BookList, Pagination }
};
</script>

<style>
.aut-box {
  margin-top: -30px;
}
</style>
