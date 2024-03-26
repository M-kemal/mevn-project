<template>
  <section class="full-section-height">
    <div class="container">
      <form @submit.prevent="submitForm">
        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              required
              v-model.trim="formData.email"
            />
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              required
              v-model.trim="formData.password"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button type="submit" class="btn btn-primary w-100">Register</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/authStore';
export default {
  setup() {
    const formData = reactive({
      email: '',
      password: ''
    });

    const loginAuth = useAuthStore();

    const submitForm = async () => {
      try {
        await loginAuth.login(formData);
        console.log('Login successfull!');
      } catch (error) {
        console.log('Login failed.');
      }
      console.log('login formData', formData);
      formData.email = '';
      formData.password = '';
    };

    return { formData, submitForm };
  }
};
</script>

<style scoped></style>
