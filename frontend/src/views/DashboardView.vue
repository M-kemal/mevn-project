<template>
  <section style="min-height: calc(100vh - 130px)">
    <div class="container py-5">
      <ul class="nav nav-tabs" id="dashboardTab" role="tablist">
        <li class="nav-item" role="presentation" @click="activeTab = 'general'">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'general' }"
            id="general-tab"
            data-bs-toggle="tab"
            data-bs-target="#general-tab-pane"
            type="button"
            role="tab"
            aria-controls="general-tab-pane"
            aria-selected="true"
          >
            General
          </button>
        </li>
        <li class="nav-item" role="presentation" @click="activeTab = 'books'">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'books' }"
            id="books-tab"
            data-bs-toggle="tab"
            data-bs-target="#books-tab-pane"
            type="button"
            role="tab"
            aria-controls="books-tab-pane"
            aria-selected="false"
          >
            Books
          </button>
        </li>
      </ul>
      <div class="tab-content py-4" id="DashboardTabContent">
        <div
          class="tab-pane fade"
          :class="{ 'active show': activeTab === 'general' }"
          id="general-tab-pane"
          role="tabpanel"
          aria-labelledby="general-tab"
          tabindex="0"
        >
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
        </div>
        <div
          class="tab-pane fade"
          :class="{ 'active show': activeTab === 'books' }"
          id="books-tab-pane"
          role="tabpanel"
          aria-labelledby="books-tab"
          tabindex="0"
        >
          {{ user }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import { useToast } from 'vue-toastification';
export default defineComponent({
  name: 'DashboardView',
  setup() {
    const toast = useToast();
    const authStore = useAuthStore();
    const { user, logout } = authStore;
    const userStore = useUserStore();
    const activeTab = ref('general');

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

    return { user, activeTab, userInfo, editMode, toggleEditMode, saveUserInfo, cancelEditMode };
  }
});
</script>

<style scoped>
.nav-link {
  color: var(--secondary-color);
  font-weight: bold;
}

.nav-tabs {
  border-color: var(--secondary-color);
}

.nav-link.active {
  color: var(--primary-color);
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}
</style>
