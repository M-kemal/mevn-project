<template>
  <section class="full-section-height">
    <div class="container">
      <form @submit.prevent="submitForm">
        <div class="row justify-content-center">
          <!-- Username Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="username" class="form-label">Username</label>
            <!--* Strandart two way data binding -->
            <!-- <input
              type="text"
              class="form-control"
              id="username"
              name="username"
              required
              :value="formData.userName"
              @input="updateUserName"
            /> -->
            <input
              type="text"
              class="form-control"
              id="username"
              name="username"
              required
              v-model.trim="formData.userName"
            />
          </div>
        </div>

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

export default {
  setup() {
    const formData = reactive({
      userName: '',
      email: '',
      password: ''
    });

    const submitForm = () => {
      console.log('formData', formData);
    };

    return { formData, submitForm };
  }
};
</script>

<style scoped></style>
