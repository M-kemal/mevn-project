<template>
  <div class="row">
    <div class="col-sm-6 col-md-4 col-xl-3 mb-5" v-for="book in books" :key="book.id">
      <RouterLink :to="`/books/${book._id}`">
        <BookItem :book="book" />
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import BookItem from './BookItem.vue';

export default {
  name: 'BookList',
  props: {
    books: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  setup() {
    return {};
  },
  components: { BookItem, RouterLink }
};
</script>

<style></style>
