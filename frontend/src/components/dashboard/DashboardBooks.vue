<template>
  <!-- Button -->
  <div class="row mb-3">
    <div class="col text-end">
      <button type="button" class="btn btn-primary" @click="openAddModal">Add Book</button>
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

        <TransitionGroup name="list" tag="Tbody">
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
                @click="openEditModal(book)"
              />
            </td>
            <td class="text-center">
              <font-awesome-icon
                :icon="['fas', 'trash']"
                class="text-danger"
                style="cursor: pointer"
                @click="deleteBook(book._id, book.title)"
              />
            </td>
          </tr>
        </TransitionGroup>
      </table>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" ref="addEditModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addModalLabel">{{ modalTitle }}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="modal.hide()"></button>
        </div>
        <div class="modal-body mx-5">
          <div class="col mb-3">
            <label for="title" class="form-label"
              >Title
              <span class="text-danger">*</span>
            </label>
            <input
              v-model="bookData.title"
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
              v-model="bookData.author"
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
              v-model="bookData.description"
            ></textarea>
          </div>
          <div class="col mb-3">
            <label for="author" class="form-label"
              >Number of Pages
              <span class="text-danger">*</span>
            </label>
            <input
              v-model="bookData.pageNumber"
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
            <button @click="saveBook" type="button" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script setup>
import { useBookStore } from '@/stores/bookStore.js';
import { Modal } from 'bootstrap';
import { computed, onMounted, reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';

const modalTitle = ref('');

const modal = ref(null);

const addEditModal = ref(null);

const bookStore = useBookStore();

const bookData = reactive({
  title: '',
  author: '',
  description: '',
  pageNumber: null,
  editedBookId: null
});

const saveBook = () => {
  if (modalTitle.value === 'Add Book') {
    addBook();
  } else if (modalTitle.value === 'Edit Book') {
    editBook();
  }
};

const openAddModal = () => {
  modalTitle.value = 'Add Book';

  (bookData.title = ''),
    (bookData.author = ''),
    (bookData.description = ''),
    (bookData.pageNumber = null);
  modal.value.show();
};

const openEditModal = (existingBook) => {
  modalTitle.value = 'Edit Book';

  bookData.editedBookId = existingBook._id;
  bookData.title = existingBook.title;
  bookData.author = existingBook.author;
  bookData.description = existingBook.description;
  bookData.pageNumber = existingBook.pageNumber;

  modal.value.show();
};

const showToast = (message, options) => {
  const toast = useToast();

  toast(message, {
    position: 'top-right',
    closeButton: 'button',
    icon: true,
    ...options
  });
};

const addBook = async () => {
  try {
    await bookStore.addNewBook(bookData);

    modal.value.hide();
    bookData.value = {
      title: '',
      author: '',
      description: '',
      pageNumber: null
    };

    await bookStore.fetchBooksByUploader();

    showToast(`New book added successfully`, { type: 'success', timeout: 1000 });
  } catch (error) {
    console.error(error);
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

const editBook = async () => {
  try {
    await bookStore.editTheBook(bookData.editedBookId, bookData);

    await bookStore.fetchBooksByUploader();

    modal.value.hide();

    showToast(`The book edited successfully.`, { type: 'success', timeout: 3000 });
  } catch (error) {
    console.error(error);
  }
};

const deleteBook = async (bookId, bookTitle) => {
  try {
    await bookStore.deleteTheBook(bookId);

    await bookStore.fetchBooksByUploader();

    showToast(`${bookTitle} deleted successfully.`, { type: 'warning', timeout: 3000 });
  } catch (error) {
    console.error(error);
  }
};
</script> -->

<script setup>
import { useBookStore } from '@/stores/bookStore.js';
import { Modal } from 'bootstrap';
import { computed, onMounted, reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';

const modalTitle = ref('');
const modal = ref(null);
const addEditModal = ref(null);
const bookStore = useBookStore();
const bookData = reactive({
  title: '',
  author: '',
  description: '',
  pageNumber: null,
  editedBookId: null
});

// Hesaplanan özellik, kullanıcının yüklediği kitapları getiriyor
const userBooks = computed(() =>
  bookStore.userUploadedBooks.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
);

// Açıklamayı kısaltma fonksiyonu
const truncatedText = (description) =>
  description.length > 80 ? `${description.slice(0, 80)}...` : description;

// Bileşen yüklendiğinde modalı başlat ve kitapları yükle
onMounted(() => {
  modal.value = new Modal(addEditModal.value);
  bookStore.fetchBooksByUploader();
});

// Kitap ekleme modalını açar
const openAddModal = () => {
  modalTitle.value = 'Add Book';
  Object.assign(bookData, { title: '', author: '', description: '', pageNumber: null });
  modal.value.show();
};

// Kitap düzenleme modalını açar
const openEditModal = (existingBook) => {
  modalTitle.value = 'Edit Book';
  Object.assign(bookData, { ...existingBook, editedBookId: existingBook._id });
  modal.value.show();
};

// Kitabı kaydetme veya düzenleme işlemini yönetir
const saveBook = () => {
  modalTitle.value === 'Add Book' ? addBook() : editBook();
};

// Toast mesajlarını göstermek için kullanılır
const showToast = useToast();

// Yeni kitap ekler
const addBook = async () => {
  try {
    await bookStore.addNewBook(bookData);
    modal.value.hide();
    Object.assign(bookData, { title: '', author: '', description: '', pageNumber: null });
    await bookStore.fetchBooksByUploader();
    showToast('New book added successfully.', { type: 'success', timeout: 1000 });
  } catch (error) {
    console.error(error);
  }
};

// Kitabı düzenler
const editBook = async () => {
  try {
    await bookStore.editTheBook(bookData.editedBookId, bookData);
    await bookStore.fetchBooksByUploader();
    modal.value.hide();
    showToast('Book edited successfully.', { type: 'success', timeout: 3000 });
  } catch (error) {
    console.error(error);
  }
};

// Kitabı siler
const deleteBook = async (bookId, bookTitle) => {
  try {
    await bookStore.deleteTheBook(bookId);
    await bookStore.fetchBooksByUploader();
    showToast(`${bookTitle} deleted successfully.`, { type: 'warning', timeout: 3000 });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.btn-outline-secondary {
  border-radius: 25px;
  height: 48px;
  margin-right: 20px;
  min-width: 120px;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(300px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
