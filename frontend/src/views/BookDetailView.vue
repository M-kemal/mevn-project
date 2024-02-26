<template>
  <div class="container">
    <SectionHeader v-if="book.name && book.author" :title="book.name" :text="book.author" />
    <button class="btn btn-primary">Back</button>
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
            <div class="col-lg-6">{{ book.page }}</div>
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
            <div class="col-lg-6">{{ book.rating }}</div>
          </div>
          <div class="row border-bottom pb-2">
            <div class="col-lg-6">
              <strong>Upload Date</strong>
            </div>
            <div class="col-lg-6">{{ book.uploadDate }}</div>
          </div>
        </div>

        <div class="comments-section">
          <h3 class="display-6 mb-6">Comments</h3>
          <div class="card mb-2">
            <div class="card-body">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, pariatur!</p>
              <div class="d-flex justify-content-between">
                <p class="fw-bold fst-italic">John Doe</p>
                <div class="d-flex aling-items-center">
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
                <div class="d-flex aling-items-center">
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
                <div class="d-flex aling-items-center">
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
                <div class="d-flex aling-items-center">
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
                <div class="d-flex aling-items-center">
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
                <div class="d-flex aling-items-center">
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
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue'
import { useRoute } from 'vue-router'
import db from '@/db.js'
import { onMounted, ref } from 'vue'
export default {
  name: 'BookDetailView',
  setup() {
    const book = ref({})

    const route = useRoute()

    const bookId = route.params.id

    onMounted(() => {
      book.value = db.find((b) => b.id === parseInt(bookId))
    })

    return { book }
  },
  components: { SectionHeader }
}
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
