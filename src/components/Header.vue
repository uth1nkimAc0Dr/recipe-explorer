<template>
  <header>
    <nav>
      <!-- <router-link>Home</router-link>
      <router-link>Search</router-link>
      <router-link>Details</router-link> -->
      <div @click="navigateTo('/')">Home</div>
      <div @click="navigateTo('/search')">Search</div>
      <div @click="navigateTo('/detail')">Detail</div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Header",
  setup() {
    const router = useRouter();

    const navigateTo = (path: string) => {
      router.push(path);
    };

    return {
      navigateTo,
    };
  },
});
</script>

<style lang="scss"></style>
