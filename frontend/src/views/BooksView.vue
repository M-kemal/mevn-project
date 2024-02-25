<template>
  <section>
    <div class="container">
      <SectionHeader title="Books" text="Books text" />
      <BookList :books="paginatedBook" />
      <Pagination :currentPage="currentPage" :totalPages="totalPages" />
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
    const itemsPerPage = ref(4)

    const totalPages = computed(() => {
      return Math.ceil(books.length / itemsPerPage.value)
    })

    const paginatedBook = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value
      const endIndex = startIndex + itemsPerPage.value
      return books.slice(startIndex, endIndex)
    })

    return { books, currentPage, itemsPerPage, totalPages, paginatedBook }
  },
  components: { SectionHeader, BookList, Pagination }
}
</script>

<style>
.aut-box {
  margin-top: -30px;
}
</style>
