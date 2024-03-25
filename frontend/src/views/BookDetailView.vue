<template>
  <div class="container" v-if="!loading">
    <SectionHeader v-if="book.title && book.author" :title="book.title" :text="book.author" />
    <!-- <button class="btn btn-primary">Back</button> -->
    <font-awesome-icon
      :icon="['fas', 'arrow-left']"
      size="2xl"
      class="mb-2"
      style="cursor: pointer"
      @click="goToBackBooks"
    />
    <div class="row mb-4">
      <div class="col-lg-6">
        <img class="card-img-top" src="../../bostorek/images/b_detail.jpg" alt="" />
      </div>
      <div class="col-lg-6 details-wrapper">
        <p class="lead description">
          {{ book.description }}
        </p>
        <div class="mb-4">
          <div class="row border-bottom pb-2">
            <div class="col-lg-6">
              <strong>Page</strong>
            </div>
            <div class="col-lg-6">{{ book.pageNumber }}</div>
          </div>
          <div class="row border-bottom pb-2">
            <div class="col-lg-6">
              <strong>Category</strong>
            </div>
            <div class="col-lg-6">Fiction</div>
          </div>
          <div class="row border-bottom pb-2">
            <div class="col-lg-6">
              <strong>Raiting</strong>
            </div>
            <div class="col-lg-6">{{ book.raiting }}</div>
          </div>
          <div class="row border-bottom pb-2">
            <div class="col-lg-6">
              <strong>Upload Date</strong>
            </div>
            <!-- <div class="col-lg-6">{{ book.updatedAt }}</div> -->
            <div class="col-lg-6">{{ formattedUpdateDate }}</div>
          </div>
        </div>

        <div class="comments-section">
          <h3 class="display-6 mb-6">Comments</h3>
          <div class="card mb-2">
            <div class="card-body">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, pariatur!</p>
              <div class="d-flex justify-content-between">
                <p class="fw-bold fst-italic">John Doe</p>
                <div class="d-flex align-items-center">
                  <font-awesome-icon :icon="['far', 'thumbs-up']" />
                  <!-- <p>Upvote</p> -->
                  <p class="ps-2 mb-0"><strong>9</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-2">
            <div class="card-body">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, pariatur!</p>
              <div class="d-flex justify-content-between">
                <p class="fw-bold fst-italic">John Doe</p>
                <div class="d-flex align-items-center">
                  <!-- <p>Upvote</p> -->
                  <font-awesome-icon :icon="['far', 'thumbs-up']" />
                  <p class="ps-2 mb-0"><strong>9</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-2">
            <div class="card-body">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, pariatur!</p>
              <div class="d-flex justify-content-between">
                <p class="fw-bold fst-italic">John Doe</p>
                <div class="d-flex align-items-center">
                  <p>Upvote</p>
                  <p class="ps-2 mb-0"><strong>9</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-2">
            <div class="card-body">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, pariatur!</p>
              <div class="d-flex justify-content-between">
                <p class="fw-bold fst-italic">John Doe</p>
                <div class="d-flex align-items-center">
                  <p>Upvote</p>
                  <p class="ps-2"><strong>9</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-2">
            <div class="card-body">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, pariatur!</p>
              <div class="d-flex justify-content-between">
                <p class="fw-bold fst-italic">John Doe</p>
                <div class="d-flex align-items-center">
                  <p>Upvote</p>
                  <p class="ps-2"><strong>9</strong></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-2">
            <div class="card-body">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, pariatur!</p>
              <div class="d-flex justify-content-between">
                <p class="fw-bold fst-italic">John Doe</p>
                <div class="d-flex align-items-center">
                  <p>Upvote</p>
                  <p class="ps-2"><strong>9</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <p>Book Detail is Loading....</p>
  </div>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';
import { useRoute, useRouter } from 'vue-router';
import { useFormattedDate } from '@/composable/useFormattedDate';
// import db from '@/db.js'
import { onMounted, ref, watch } from 'vue';
export default {
  name: 'BookDetailView',
  setup() {
    const book = ref(null);

    const route = useRoute();

    // const bookId = route.params.id

    // onMounted(() => {
    //   book.value = db.find((b) => b.id === parseInt(bookId))
    // })

    const router = useRouter();

    const loading = ref(true);

    const fetchABook = async () => {
      const bookId = route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/api/v1/books/${bookId}`);
        const data = await response.json();
        console.log('DATA', data);
        book.value = data;
        loading.value = false;
      } catch (error) {}
    };

    onMounted(() => {
      fetchABook();
    });

    const formattedUpdateDate = ref('');
    // book.value değiştiğinde çalışacak
    watch(
      () => book.value,
      (newValue) => {
        if (newValue && newValue.updatedAt) {
          const { formattedDate } = useFormattedDate(newValue.updatedAt);
          formattedUpdateDate.value = formattedDate.value;
        }
      },
      { immediate: true }
    );

    const goToBackBooks = () => {
      //   router.back() bu şekilde de olabilir.
      //   router.push({ name: 'books' })
      router.go(-1);
    };

    return { book, goToBackBooks, loading, formattedUpdateDate };
  },
  components: { SectionHeader }
};
</script>

<style scoped>
.details-wrapper {
  max-height: 740px;
  display: flex;
  flex-direction: column;
}

.comments-section {
  flex-grow: 1;
  overflow-y: auto;
}

.description {
  min-height: 150px;
  max-height: 250px;
  overflow-y: auto;
}
</style>
