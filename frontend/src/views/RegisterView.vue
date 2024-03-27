<template>
  <section class="full-section-height">
    <div class="container">
      <div class="d-flex justify-content-center">
        <h1 class="display-3">Register</h1>
      </div>
      <form @submit.prevent="submitForm">
        <div class="text-center">
          <span v-if="showGenericWarningMessage" class="text-danger small"
            >Shometing happened, please try again later!</span
          >
        </div>
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="username" class="form-label"
              >Username
              <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="username"
              name="username"
              required
              v-model.trim="formData.username"
              autocomplete="off"
              :class="{
                'is-valid': isUserNameValid,
                'is-invalid': !isUserNameValid && showUserNameWarningMessage
              }"
              @focus="showUserNameWarningMessage = true"
              @blur="showUserNameWarningMessage = false"
            />
            <span v-if="showUserNameWarningMessage && !isUserNameValid" class="text-danger small"
              >Username must be 5 and 20 characters!</span
            >
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label"
              >Email
              <span class="text-danger">*</span>
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              required
              autocomplete="off"
              v-model.trim="formData.email"
              :class="{
                'is-valid': isEmailValid,
                'is-invalid':
                  (!isEmailValid && showEmailNameWarningMessage) || existingEmail === formData.email
              }"
              @focus="showEmailNameWarningMessage = true"
              @blur="showEmailNameWarningMessage = false"
            />
            <span v-if="showEmailNameWarningMessage && !isEmailValid" class="text-danger small"
              >Please provide valid email!</span
            >
            <span v-if="existingEmail === formData.email" class="text-danger small"
              >{{ `${existingEmail} The email is already exist !` }}
            </span>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label"
              >Password
              <span class="text-danger">*</span>
            </label>
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
                'is-invalid': !isPasswordValid && showPasswordWarningMessage
              }"
              @focus="showPasswordWarningMessage = true"
              @blur="showPasswordWarningMessage = false"
            />
            <span v-if="showPasswordWarningMessage && !isPasswordValid" class="text-danger small"
              >Password must be between 4 and 10 characters!</span
            >
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button :disabled="!isFormValid" type="submit" class="btn btn-primary w-100">
              Register
            </button>
            <span class="text-danger small">* please complate all of the required fields!</span>
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

export default {
  setup() {
    const formData = reactive({
      username: '',
      email: '',
      password: ''
    });

    const showUserNameWarningMessage = ref(false);
    const showEmailNameWarningMessage = ref(false);
    const showPasswordWarningMessage = ref(false);
    const existingEmail = ref(null);
    const showGenericWarningMessage = ref(false);

    const registerAuth = useAuthStore();

    const router = useRouter();

    const submitForm = async () => {
      try {
        await registerAuth.register(formData);
        router.push('/login');
        // console.log('Registiration successfull!');
      } catch (data) {
        const { error } = data;

        if (error === 'The Email is already exist!') {
          existingEmail.value = formData.email;
        } else {
          showGenericWarningMessage.value = true;
          formData.username = '';
          formData.email = '';
          formData.password = '';
        }
      }
    };

    const isUserNameValid = computed(() => {
      return formData.username.length >= 5 && formData.username.length <= 20;
    });
    const isEmailValid = computed(() => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    });
    const isPasswordValid = computed(() => {
      return formData.password.length >= 4 && formData.password.length <= 10;
    });

    const isFormValid = computed(() => {
      return isUserNameValid.value && isEmailValid.value && isPasswordValid.value;
    });

    return {
      formData,
      submitForm,
      isUserNameValid,
      showUserNameWarningMessage,
      isEmailValid,
      showEmailNameWarningMessage,
      showPasswordWarningMessage,
      isPasswordValid,
      isFormValid,
      existingEmail,
      showGenericWarningMessage
    };
  }
};
</script>

<style scoped>
.form-control {
  border-radius: 25px;
  height: 48px;
}

.form-control:focus {
  box-shadow: none;
}

.btn-primary {
  border-radius: 25px;
  height: 48px;
  background-color: #44b89d;
  border: 1px solid #44b89d;
}

.btn-primary:hover {
  background-color: #fff;
  color: #44b89d;
  transition: all 0.3s ease;
}
</style>
