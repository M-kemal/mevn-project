<template>
  <div class="container">
    <SectionHeader :title="book.title" :text="book.author" />
    <div class="d-flex">
      <font-awesome-icon
        icon="arrow-left"
        size="xl"
        class="mb-2"
        style="cursor: pointer; color: var(--secondary-color)"
        @click="goToBackBooks"
      />
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="image-box">
          <img class="img-fluid" src="../../bostorek/images/b_detail.jpg" />
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex flex-column h-100 justify-content-between">
          <div class="mb-3">
            <p>
              {{ book.description }}
            </p>
          </div>
          <div class="d-flex flex-column">
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Page</strong></div>
              <div class="col-lg-6">{{ book.pageNumber }}</div>
            </div>
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Rating</strong></div>
              <div class="col-lg-6">8.2 - (23 rates)</div>
            </div>
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Upload Date</strong></div>
              <div class="col-lg-6">{{ book.updatedAt }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6">
        <div class="box">
          <h3 style="color: var(--primary-color)">Rate The Book</h3>
          <form>
            <!-- Rating Input -->
            <div class="mb-3">
              <input
                type="number"
                id="rating"
                class="form-control w-50"
                min="1"
                max="10"
                placeholder="Rate (1-10)"
                required
              />
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary">Rate</button>
          </form>
        </div>
      </div>
    </div>
    <hr v-if="userStore.isLoggedIn" />
    <div class="row mt-3">
      <div class="col-md-12">
        <div class="box">
          <div v-if="userStore.isLoggedIn">
            <h3 style="color: var(--primary-color)">Comment The Book</h3>
            <form @submit.prevent="addComment">
              <!-- Comment Text Area -->
              <div class="mb-3">
                <textarea
                  id="comment"
                  class="form-control"
                  rows="4"
                  placeholder="Enter your comment"
                  required
                  v-model="commentContent"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="btn btn-primary">Comment</button>
            </form>
          </div>
          <router-link v-else to="/login">
            <p style="color: var(--secondary-color)">Log in to leave a comment</p>
          </router-link>
        </div>
      </div>
    </div>
    <hr />
    <div class="row my-3">
      <div class="col-md-12">
        <div class="box">
          <h3 style="color: var(--primary-color)">Comments</h3>
          <div>
            <div v-for="comment in commentsForBook" :key="comment._id" class="card mb-4">
              <div class="card-body">
                <p>
                  {{ comment.content }}
                </p>

                <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center">
                    <p class="small mb-0 ms-2">{{ comment.postedBy.username }}</p>
                  </div>
                  <div class="d-flex flex-row align-items-center" style="gap: 10px">
                    <p class="small text-muted mb-0">Upvote?</p>
                    <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    <p class="small text-muted mb-0">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBookStore } from '@/stores/bookStore.js';
import { useAuthStore } from '@/stores/authStore.js';
import { useCommentStore } from '@/stores/commentStore.js';
import SectionHeader from '@/components/SectionHeader.vue';

// Access route and router instances
const route = useRoute();
const router = useRouter();

// Using ref for reactive references
const book = ref('');
const loading = ref(true);

// Access book store and state
const bookStore = useBookStore();
const selectedBook = bookStore.selectedBook;

// comment
const userStore = useAuthStore();
const commentContent = ref('');

const commentStore = useCommentStore();

const commentsForBook = computed(() => {
  return commentStore.commentsForBook;
});

const addComment = async () => {
  try {
    const bookId = route.params.id;
    const content = commentContent.value;

    const userId = userStore.user._id;

    await commentStore.addNewComment({
      bookId,
      content,
      userId
    });

    commentContent.value = '';

    await commentStore.fetchCommentsForBook(route.params.id);
  } catch (error) {
    console.log(error);
  }
};

// Define method to go back to books
const goToBackBooks = () => {
  router.push({ name: 'books' });
};

// Define method to select a book
const selectBook = () => {
  const bookId = route.params.id;
  book.value = selectedBook(bookId);
  loading.value = false;
};

// Use onMounted to replicate created lifecycle hook
onMounted(() => {
  selectBook();
  commentStore.fetchCommentsForBook(route.params.id);
});
</script>

<style scoped>
.image-box {
  height: 300px;
  overflow: hidden;
}
.image-box img {
  width: 100% !important;
}

.btn-primary {
  height: 36px;
  min-width: 120px;
  border-radius: 16px;
}
.box {
  border: 1px solid #e2e3e5;
  border-radius: 10px;
  padding: 20px;
}
</style>
