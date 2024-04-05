<template>
  <!-- Button -->
  <div class="row mb-3">
    <div class="col text-end">
      <button type="button" class="btn btn-primary" @click="modal.show()">Add Book</button>
    </div>
  </div>

  <!-- Table -->
  <div class="row">
    <div class="col">
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Page</th>
            <th class="text-center">Edit</th>
            <th class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup name="list">
            <tr v-for="book in userBooks" :key="book._id">
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td style="max-width: 250px">
                {{ truncatedText(book.description) }}
              </td>
              <td>{{ book.pageNumber }}</td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['far', 'pen-to-square']"
                  class="text-warning"
                  style="cursor: pointer"
                />
              </td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  class="text-danger"
                  style="cursor: pointer"
                />
              </td>
            </tr>
          </TransitionGroup>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" ref="addEditModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addModalLabel">Add Book</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="modal.hide()"></button>
        </div>
        <div class="modal-body mx-5">
          <div class="col mb-3">
            <label for="title" class="form-label"
              >Title
              <span class="text-danger">*</span>
            </label>
            <input
              v-model="newBook.title"
              type="text"
              class="form-control"
              id="title"
              name="title"
              required
            />
          </div>
          <div class="col mb-3">
            <label for="author" class="form-label"
              >Author
              <span class="text-danger">*</span>
            </label>
            <input
              v-model="newBook.author"
              type="text"
              class="form-control"
              id="author"
              name="author"
              required
            />
          </div>
          <div class="col mb-3">
            <label for="description" class="form-label"
              >Description
              <span class="text-danger">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              class="form-control"
              cols="30"
              rows="10"
              v-model="newBook.description"
            ></textarea>
          </div>
          <div class="col mb-3">
            <label for="author" class="form-label"
              >Number of Pages
              <span class="text-danger">*</span>
            </label>
            <input
              v-model="newBook.pageNumber"
              type="number"
              class="form-control"
              id="numOfPages"
              name="numOfPages"
              required
            />
          </div>
          <div class="text-end mb-4">
            <button type="button" class="btn btn-outline-secondary" @click="modal.hide()">
              Close
            </button>
            <button @click="addBook" type="button" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookStore } from '@/stores/bookStore.js';
import { Modal } from 'bootstrap';
import { computed, onMounted, reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';

const modal = ref(null);

const addEditModal = ref(null);

const bookStore = useBookStore();
const toast = useToast();

const newBook = reactive({
  title: '',
  author: '',
  description: '',
  pageNumber: null
});

const addBook = async () => {
  try {
    await bookStore.addNewBook(newBook);

    modal.value.hide();
    newBook.value = {
      title: '',
      author: '',
      description: '',
      pageNumber: null
    };

    await bookStore.fetchBooksByUploader();

    toast.success('New book added successfully ', {
      position: 'top-right',
      timeout: 1000,

      closeButton: 'button',
      icon: true
    });
  } catch (error) {
    console.log(error);
  }
};

const userBooks = computed(() => {
  return bookStore.userUploadedBooks
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

const truncatedText = (description) => {
  if (description.length > 80) {
    return description.slice(0, 80) + '...';
  }
  return description;
};

onMounted(() => {
  modal.value = new Modal(addEditModal.value);
  bookStore.fetchBooksByUploader();
});
</script>

<style scoped>
.btn-outline-secondary {
  border-radius: 25px;
  height: 48px;
  margin-right: 20px;
  min-width: 120px;
}

.list-enter-active,
.list-leave-active {
  transition: all 2s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}
</style>