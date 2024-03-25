<template>
  <NavBar />
  <RouterView />
  <TheFooter />
</template>

<script>
import NavBar from './components/NavBar.vue';
import TheFooter from './components/TheFooter.vue';

export default {
  setup() {
    return {};
  },
  components: { NavBar, TheFooter }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap');

html,
body {
  font-family: 'Mulish', sans-serif;
}
a {
  text-decoration: none;
}

.full-section-height {
  min-height: calc(100vh - 130px);
  display: flex;
  align-items: center;
}
</style>
