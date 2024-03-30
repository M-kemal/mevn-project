import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/styles.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { useBookStore } from './stores/bookStore.js';
import { useAuthStore } from './stores/authStore';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faThumbsUp, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as farThumbsUp, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
/* add icons to the library */
library.add(faArrowLeft, faThumbsUp, faPenToSquare, faTrash, farThumbsUp);

const pinia = createPinia();

const storedUser = localStorage.getItem('user');

if (storedUser) {
  const userData = JSON.parse(storedUser);
  useAuthStore(pinia).user = userData;
}

const bookStore = useBookStore(pinia);

bookStore.fetchBooks().then(() => {
  const app = createApp(App);
  app.component('font-awesome-icon', FontAwesomeIcon);

  app.use(pinia);
  app.use(router);
  app.use(Toast);

  app.mount('#app');
});
