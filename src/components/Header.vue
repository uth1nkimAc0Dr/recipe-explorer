<template>
  <header class="header">
    <nav class="header__nav">
      <div
        class="header__nav-item"
        :class="{ active: currentRoute === '/' }"
        @click="navigateTo('/')"
      >
        Home
      </div>
      <div
        class="header__nav-item"
        :class="{ active: currentRoute === '/search' }"
        @click="navigateTo('/search')"
      >
        Search
      </div>
      <div
        class="header__nav-item"
        :class="{ active: currentRoute === '/detail' }"
        @click="navigateTo('/detail')"
      >
        Detail
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "Header",

  setup() {
    const router = useRouter();
    const route = useRoute();
    const currentRoute = ref(route.path);

    const navigateTo = (path: string) => {
      router.push(path);
    };

    watch(route, (newRoute) => {
      currentRoute.value = newRoute.path;
    });

    return {
      navigateTo,
      currentRoute,
    };
  },
});
</script>

<style lang="scss">
.header__nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header__nav-item.active {
  color: blueviolet;
}

// .active {
//   color: blueviolet;
// }
</style>
