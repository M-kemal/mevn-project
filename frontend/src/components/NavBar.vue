<template>
  <div class="navbar navbar-expand-md costum-nav">
    <div class="container">
      <RouterLink class="navbar-brand" :to="{ name: 'home' }">Bostorek</RouterLink>
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'home' }">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'books' }">Books</RouterLink>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <RouterLink class="nav-link" :to="{ name: 'dashboard' }">Dashboard</RouterLink>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <RouterLink class="nav-link" :to="{ name: 'login' }">Login</RouterLink>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <RouterLink class="nav-link" :to="{ name: 'register' }">Register</RouterLink>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button class="nav-link" @click="logoutUser">Log out</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import { computed } from 'vue';
export default {
  setup() {
    const authStore = useAuthStore();

    const isLoggedIn = computed(() => authStore.isLoggedIn);

    const logoutUser = () => {
      authStore.logout();
    };

    return { isLoggedIn, logoutUser };
  }
};
</script>

<style scoped>
.costum-nav {
  background: var(--primary-color);
  padding: 15px 0px;
}
.navbar-brand {
  padding: 0;
  margin: 0;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}
.nav-link {
  padding: 10px 15px !important;
  color: #fff;
  text-align: center;
}

.nav-link:hover {
  color: var(--secondary-color);
}

.active-link {
  color: var(--secondary-color);
}
</style>
