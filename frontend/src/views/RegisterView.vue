<template>
  <div class="container">
    <form class="mt-5" @submit.prevent="submitForm">
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

      <!-- Gender Field -->
      <div class="row justify-content-center">
        <div class="col-md-6 col-8 mb-3">
          <h5>Gender</h5>
          <div class="form-check">
            <!-- <input
              class="form-check-input"
              type="radio"
              name="gender"
              value="male"
              id="male"
              @change="updateGender('male')"
            /> -->
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              value="male"
              id="male"
              v-model="formData.gender"
            />
            <label class="form-check-label" for="male"> Male </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              value="female"
              id="female"
              v-model="formData.gender"
            />
            <label class="form-check-label" for="female"> Female </label>
          </div>
        </div>
      </div>

      <!-- Age Field -->
      <div class="row justify-content-center">
        <div class="col-md-6 col-8 mb-3">
          <label for="age" class="form-label">Age:</label>
          <input class="form-control" id="age" required v-model.number="formData.age" />
        </div>
      </div>

      <!-- Programming Field -->
      <div class="row justify-content-center">
        <div class="col-md-6 col-8 mb-3">
          <h5>Which Programming Language(s) you know?</h5>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value="java"
              id="java"
              v-model="formData.languages"
            />
            <label class="form-check-label" for="java"> Java </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value="c++"
              id="c++"
              v-model="formData.languages"
            />
            <label class="form-check-label" for="c++"> C++ </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value="python"
              id="python"
              v-model="formData.languages"
            />
            <label class="form-check-label" for="python"> Python </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value="rust"
              id="rust"
              v-model="formData.languages"
            />
            <label class="form-check-label" for="rust"> Rust </label>
          </div>
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
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const formData = reactive({
      userName: '',
      email: '',
      password: '',
      gender: '',
      age: null,
      languages: []
    })

    const submitForm = () => {
      console.log('formData', formData)
    }

    return { formData, submitForm }
  }
}
</script>

<style scoped></style>
