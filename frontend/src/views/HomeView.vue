<template>
  <section>
    <CarouselApp :items="carouselItems" height="400px" :autoPlayInterval="5000" />
  </section>
  <section class="my-5">
    <div class="container">
      <SectionHeader
        title="Featured Books"
        text="Books lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />

      <div class="row">
        <div class="col-md-4">
          <div class="list-group">
            <button
              type="button"
              class="list-group-item list-group-item-action"
              :class="{ active: selectedFilter === 'latest' }"
              @click="selectFilter('latest')"
            >
              Latest Books
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action"
              :class="{ active: selectedFilter === 'best' }"
              @click="selectFilter('best')"
            >
              Best Ratings
            </button>
          </div>
        </div>
        <div class="col-md-8">
          <div v-if="isLoading" class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-else class="accordion">
            <div class="accordion-item" v-for="(book, index) in filteredBook" :key="index">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  :class="{ collapsed: openAccordionIndex !== index }"
                  @click="toggleAccordion(index)"
                >
                  <strong> {{ book.title }} - {{ book.author }} </strong>
                </button>
              </h2>
              <div
                class="accordion-collapse collapse"
                :class="{ show: openAccordionIndex === index }"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-md-4">
                      <img src="../assets/images/b1.jpg" alt="" class="img-fluid" />
                    </div>
                    <div class="col-md-8 d-flex flex-column justify-content-center">
                      <p>{{ book.description }}</p>
                      <div
                        class="badge align-self-start"
                        style="background-color: var(--secondary-color)"
                      >
                        {{ book.raiting }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5" style="background-color: #f5f6f9">
    <div class="container">
      <SectionHeader
        title="Latest Comments"
        text="We declare long prop names using camelCase because this avoids"
      />
      <div class="row d-flex justify-content-center">
        <div class="col-md-6" v-for="comment in prepare4Comments" :key="comment._id">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex flex-start align-items-center">
                <img
                  class="rounded-circle shadow-1-strong me-3"
                  src="../assets/images/c1.jpg"
                  alt="avatar"
                  width="60"
                  height="60"
                />
                <div>
                  <h6 class="fw-bold text-primary mb-1">{{ comment.title }}</h6>
                  <p class="text-muted small mb-0">
                    {{ comment.postedBy.username }} - {{ comment.createdAt }}
                  </p>
                </div>
              </div>

              <p class="mt-3 mb-4 pb-2">
                {{ comment.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CarouselApp from '@/components/widgets/CarouselApp.vue';
import hero_1 from '@/assets/images/hero_1.jpg';
import hero_2 from '@/assets/images/hero_2.jpg';
import hero_3 from '@/assets/images/hero_3.jpg';
import { computed, ref } from 'vue';
import SectionHeader from '@/components/SectionHeader.vue';
import { useBookStore } from '@/stores/bookStore.js';
import { useCommentStore } from '@/stores/commentStore.js';

const carouselItems = ref([
  {
    imageUrl: hero_1,
    subtitle: 'Liberte',
    title: 'Lorem Ipsum Dolor Sit Amet',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    imageUrl: hero_2,
    subtitle: 'Egalite',
    title: 'Excepteur Sint Occaecat Cupidatat',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    imageUrl: hero_3,
    subtitle: 'Fraternite',
    title: 'Neque Porro Quisquam Est',
    description:
      'Neque orro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.'
  }
]);

// const books = ref([]);

// const fetchBooks = async () => {
//   try {
//     const response = await fetch('http://localhost:3000/api/v1/books');
//     const data = await response.json();
//     books.value = data;
//     console.log(books.value);
//   } catch (error) {
//     console.log(error);
//   }
// };

// fetchBooks();

const bookPiniaStore = useBookStore();
const commentStore = useCommentStore();

const isLoading = computed(() => bookPiniaStore.isLoading);

const comments = computed(() => commentStore.comments);

// onMounted(async () => {
//   await bookPiniaStore.fetchBooks(); // fetchBooks metodunu çağır
// });

const selectedFilter = ref('latest');

const selectFilter = (filter) => {
  selectedFilter.value = filter;
};

const filteredBook = computed(() => {
  const copiedBooks = [...bookPiniaStore.books];

  if (selectedFilter.value === 'latest') {
    return copiedBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  } else if (selectedFilter.value === 'best') {
    console.log(copiedBooks);
    return copiedBooks.sort((a, b) => b.rate - a.rate).slice(0, 4);
  }
  return [];
});

const openAccordionIndex = ref(0);

const toggleAccordion = (index) => {
  if (openAccordionIndex.value === index) {
    openAccordionIndex.value = -1;
  } else {
    openAccordionIndex.value = index;
  }
};

// Son gönderilen 4 yorum için computed
const prepare4Comments = computed(() => {
  // comments.value dizisini klonlayarak orijinalini koruyun
  const clonedComments = [...comments.value];
  const latest4Comments = clonedComments
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
  return latest4Comments.map((comment) => {
    const correspondingBook = bookPiniaStore.books.find((book) => book._id === comment.book);
    if (correspondingBook) {
      return {
        ...comment,
        title: correspondingBook.title
      };
    }
    return comment;
  });

  // return latest4Comments;
});
</script>

<style scoped>
.list-group-item.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.accordion-button {
  color: var(--primary-color);
}

.accordion-button:not(.collapsed) {
  background-color: var(--secondary-color);
  color: #fff;
}

.accordion-button:focus {
  outline: none;
  box-shadow: none;
}
</style>
