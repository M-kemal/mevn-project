import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/styles.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faThumbsUp, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as farThumbsUp, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
/* add icons to the library */
library.add(faArrowLeft, faThumbsUp, faPenToSquare, faTrash, farThumbsUp);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');
