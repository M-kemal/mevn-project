<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" @click="goToPage(currentPage - 1)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li> -->
      <li
        class="page-item"
        v-for="page in totalPages"
        :key="page.id"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" @click="goToPage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" @click="goToPage(currentPage + 1)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<!-- <script>
import { ref, watchEffect } from 'vue';

export default {
  name: 'PaginationApp',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['page-changed'],
  setup(props, { emit }) {
    const currentPage = ref(props.currentPage);
    const totalPages = ref(props.totalPages);

    watchEffect(() => {
      currentPage.value = props.currentPage;
      totalPages.value = props.totalPages;
    });

    const goToPage = (page) => {
      // currentPage.value = page
      // emit('page-changed', page)
      if (page >= 1 && page <= totalPages.value) {
        emit('page-changed', page);
      }
    };

    return { goToPage, currentPage, totalPages };
  }
};
</script> -->

<script>
export default {
  name: 'PaginationApp',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['page-changed'],
  setup(props, { emit }) {
    const goToPage = (page) => {
      if (page >= 1 && page <= props.totalPages) {
        emit('page-changed', page);
      }
    };

    return { goToPage };
  }
};
</script>

<style>
.page-link {
  cursor: pointer;
}
</style>
