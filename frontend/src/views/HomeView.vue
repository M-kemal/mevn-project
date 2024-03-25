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
</template>

<script>
import CarouselApp from '@/components/widgets/CarouselApp.vue';
import hero_1 from '@/assets/images/hero_1.jpg';
import hero_2 from '@/assets/images/hero_2.jpg';
import hero_3 from '@/assets/images/hero_3.jpg';
import { computed, onMounted, ref } from 'vue';
import SectionHeader from '@/components/SectionHeader.vue';
import { useBookStore } from '@/stores/bookStore.js';

export default {
  name: 'HomeView',
  setup() {
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

    const isLoading = computed(() => bookPiniaStore.isLoading);

    onMounted(async () => {
      await bookPiniaStore.fetchBooks(); // fetchBooks metodunu çağır
    });

    console.log(bookPiniaStore);

    const selectedFilter = ref('latest');

    const selectFilter = (filter) => {
      selectedFilter.value = filter;
    };

    const filteredBook = computed(() => {
      const copiedBooks = [...bookPiniaStore.books];

      if (selectedFilter.value === 'latest') {
        return copiedBooks
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
      } else if (selectedFilter.value === 'best') {
        return copiedBooks.sort((a, b) => b.raiting - a.raiting).slice(0, 4);
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

    return {
      carouselItems,
      selectedFilter,
      selectFilter,
      filteredBook,
      openAccordionIndex,
      toggleAccordion,
      isLoading
    };
  },
  components: { CarouselApp, SectionHeader }
};
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
