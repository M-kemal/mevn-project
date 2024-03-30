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
              autocomplete="off"
              :class="{
                'is-valid': isEmailValid,
                'is-invalid':
                  (!isEmailValid && showEmailNameWarningMessage) || notFoundEmail === formData.email
              }"
              @focus="showEmailNameWarningMessage = true"
              @blur="showEmailNameWarningMessage = false"
            />
            <span v-if="showEmailNameWarningMessage && !isEmailValid" class="text-danger small"
              >Please provide valid email!</span
            >
            <span v-if="notFoundEmail === formData.email" class="text-danger small"
              >{{ `${notFoundEmail} is not found!` }}!</span
            >
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
              autocomplete="off"
              v-model.trim="formData.password"
              :class="{
                'is-valid': isPasswordValid,
                'is-invalid': (!isPasswordValid && showPasswordWarningMessage) || !isPasswordMatch
              }"
              @focus="showPasswordWarningMessage = true"
              @blur="showPasswordWarningMessage = false"
              @input="isPasswordMatch = true"
            />
            <span v-if="showPasswordWarningMessage && !isPasswordValid" class="text-danger small"
              >Password must be between 4 and 10 characters!</span
            >
            <span v-if="!isPasswordMatch" class="text-danger small"
              >Your password is not true!</span
            >
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button type="submit" class="btn btn-primary w-100">Log in</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
export default {
  setup() {
    const formData = reactive({
      email: '',
      password: ''
    });

    const loginAuth = useAuthStore();
    const router = useRouter();

    const showEmailNameWarningMessage = ref(false);
    const showPasswordWarningMessage = ref(false);

    const notFoundEmail = ref(null);
    const isPasswordMatch = ref(true);

    const toast = useToast();

    const submitForm = async () => {
      try {
        await loginAuth.login(formData);
        // console.log('Login successfull!');
        toast.success('You will be redirected to the dashboard page.', {
          position: 'top-right',
          timeout: 3500,

          closeButton: 'button',
          icon: true
        });
        setTimeout(() => {
          router.push('/dashboard');
        }, 4000);
      } catch (data) {
        // console.log('Login failed.');
        const { error } = data;
        if (error === 'User not found!') {
          notFoundEmail.value = formData.email;
        } else if (error === 'Your password is not true!') {
          isPasswordMatch.value = false;
        }
      }
      console.log('login formData', formData);
    };

    const isEmailValid = computed(() => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    });
    const isPasswordValid = computed(() => {
      return formData.password.length >= 4 && formData.password.length <= 10;
    });

    const isFormValid = computed(() => {
      return isEmailValid.value && isPasswordValid.value;
    });

    return {
      formData,
      submitForm,
      isFormValid,
      showEmailNameWarningMessage,
      showPasswordWarningMessage,
      isPasswordValid,
      isEmailValid,
      notFoundEmail,
      isPasswordMatch
    };
  }
};
</script>

<style scoped></style>
