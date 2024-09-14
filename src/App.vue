<template>
  <div class="app">
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
</script>

<style lang="scss">
@import "./styles/main.scss";

.app {
  margin: 0 auto;
  min-width: 300px;
  max-width: 96%;
}
</style>
