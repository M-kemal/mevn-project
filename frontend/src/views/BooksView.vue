<template>
  <section>
    <div class="container">
      <SectionHeader title="Books" text="Books text" />
      <BookList :books="paginatedBook" />
      <Pagination :currentPage="currentPage" :totalPages="totalPages" @page-changed="updatePage" />
    </div>
  </section>
</template>

<script>
import BookList from '@/components/BookList.vue'
import Pagination from '@/components/Pagination.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import books from '@/db.js'
import { computed, ref } from 'vue'
export default {
  name: 'BooksView',
  setup() {
    const currentPage = ref(1)
    const itemsPerPage = ref(8)

    const totalPages = computed(() => {
      return Math.ceil(books.length / itemsPerPage.value)
    })

    const paginatedBook = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value
      const endIndex = startIndex + itemsPerPage.value
      return books.slice(startIndex, endIndex)
    })

    const updatePage = (page) => {
      currentPage.value = page
    }

    return { books, currentPage, itemsPerPage, totalPages, paginatedBook, updatePage }
  },
  components: { SectionHeader, BookList, Pagination }
}
</script>

<style>
.aut-box {
  margin-top: -30px;
}
</style>
