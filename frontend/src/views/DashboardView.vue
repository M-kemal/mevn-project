<template>
  <h1>{{ user.username }}</h1>
  <h2>{{ user.email }}</h2>
</template>

<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/authStore';
export default defineComponent({
  name: 'DashboardView',
  setup() {
    const { user } = useAuthStore();

    return { user };
  }
});
</script>

<style lang="scss" scoped></style>
