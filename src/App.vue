<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";

export default defineComponent({
  name: "App",
  components: { Header },
});
// import useRoute from "vue-router";
</script>

<style lang="scss">
@import "./styles/main.scss";
</style>
