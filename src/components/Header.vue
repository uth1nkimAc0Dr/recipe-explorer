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
        v-if="
          typeof currentRoute === 'string' && currentRoute.startsWith('/detail')
        "
        :class="{
          active:
            typeof currentRoute === 'string' &&
            currentRoute.startsWith('/detail'),
        }"
      >
        Detail
      </div>

      <div
        class="header__nav-item"
        v-if="
          typeof currentRoute === 'string' && currentRoute.startsWith('/detail')
        "
        @click="goBack()"
      >
        Back
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
    const currentRoute = ref<string>(route.path);

    const navigateTo = (path: string) => {
      router.push(path);
    };

    const goBack = () => {
      window.history.back();
    };

    watch(route, (newRoute) => {
      currentRoute.value = newRoute.path;
    });

    return {
      navigateTo,
      currentRoute,
      goBack,
    };
  },
});
</script>

<style lang="scss">
.header {
  background: linear-gradient(
    351deg,
    #5364a0,
    #57487b,
    #4f2e56,
    #401734,
    #a8024f
  );
  // padding: 20px;
  border-radius: 8px 8px 0px 0px;
  padding: 10px 20px;

  &__nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &-item {
      cursor: pointer;
      font-size: 26px;

      &.active {
        color: rgb(222 186 255);
      }
    }
  }
}
</style>
