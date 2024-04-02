<template>
  <div class="row">
    <div class="col-lg-6">
      <h2 class="mb-4">User Information</h2>
      <form>
        <div class="mb-3">
          <label for="username">Username</label>
          <input
            v-model="userInfo.username"
            :disabled="!editMode"
            type="text"
            name="username"
            id="username"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="email">Email</label>
          <input
            v-model="userInfo.email"
            :disabled="!editMode"
            type="text"
            name="email"
            id="email"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="password">Password</label>
          <input
            v-model="userInfo.password"
            :disabled="!editMode"
            type="text"
            name="password"
            id="password"
            class="form-control"
          />
        </div>
        <div class="d-flex align-items-center">
          <button
            @click="!editMode ? toggleEditMode() : saveUserInfo()"
            class="btn btn-primary w-100"
            type="button"
          >
            {{ editMode ? 'Save' : 'Edit' }}
          </button>
          <button
            v-if="editMode"
            @click="cancelEditMode"
            style="background-color: #ecc73c !important; border-color: #ecc73c !important"
            class="btn btn-primary w-100 ms-3"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    <div class="col-lg-6"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import { useToast } from 'vue-toastification';
const toast = useToast();
const authStore = useAuthStore();
const { user, logout } = authStore;
const userStore = useUserStore();

const editMode = ref(false);

const userInfo = reactive({
  username: '',
  email: '',
  password: ''
});

onMounted(() => {
  userInfo.username = user.username;
  userInfo.email = user.email;
});

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};
const saveUserInfo = async () => {
  // console.log('Save user info feild.');
  try {
    await userStore.updateUserDetails(userInfo);

    toast.success('Please login with new details', {
      position: 'top-right',
      timeout: 3500,

      closeButton: 'button',
      icon: true
    });
    setTimeout(() => {
      logout();
    }, 4000);
  } catch (error) {
    console.log(error);
  }
};
const cancelEditMode = () => {
  editMode.value = false;
  userInfo.username = user.username;
  userInfo.email = user.email;
  userInfo.password = '';
};
</script>

<style scoped></style>
