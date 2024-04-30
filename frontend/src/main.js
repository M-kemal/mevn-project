import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/styles.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { useBookStore } from './stores/bookStore.js';
import { useAuthStore } from './stores/authStore';
import { useCommentStore } from './stores/commentStore';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faThumbsUp, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as farThumbsUp, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
/* add icons to the library */
library.add(faArrowLeft, faThumbsUp, faPenToSquare, faTrash, farThumbsUp);
import { useToast } from 'vue-toastification';
const toast = useToast();

toast.success('New book added successfully ', {
  position: 'top-right',
  timeout: 1000,

  closeButton: 'button',
  icon: true
});

const pinia = createPinia();
const authStore = useAuthStore(pinia);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('error.response', error.response);
    if (error.response && error.response.status === 401) {
      // Display toast message
      toast.error('Your token is expired, forwarding login page.', {
        position: 'top-right',
        timeout: 3000,
        closeButton: 'button',
        icon: true
      });

      setTimeout(() => {
        authStore.logout();
        router.push('/login');
      }, 3000);
    }
  }
);

const storedUser = localStorage.getItem('user');

if (storedUser) {
  const userData = JSON.parse(storedUser);

  useAuthStore(pinia).user = userData.user;

  const token = userData.token;

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

const bookStore = useBookStore(pinia);
const commentStore = useCommentStore(pinia);

const init = async () => {
  try {
    await Promise.all([bookStore.fetchBooks(), commentStore.fetchComments()]);

    bookStore.fetchBooks().then(() => {
      const app = createApp(App);
      app.component('font-awesome-icon', FontAwesomeIcon);

      app.use(pinia);
      app.use(router);
      app.use(Toast);

      app.mount('#app');
    });
  } catch (error) {
    console.error(error);
  }
};

init();
