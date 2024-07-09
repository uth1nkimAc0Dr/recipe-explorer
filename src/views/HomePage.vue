<template>
  <div>
    <input
      v-model="searchQuery"
      @input="onSearch"
      placeholder="Search for recipes..."
    ></input>
    <div v-for="recipe in recipes" :key="recipe.id">
      <router-link :to="`detail/${recipe.id}`">{{ recipe.title }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useRecipeStore } from "@/store/recipeStore";
import { useDebounceFn } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useRecipeStore();
    const searchQuery = ref("");
    const router = useRouter();
    const route = useRoute();

    const onSearch = useDebounceFn(() => {
      store.fetchRecipes(searchQuery.value, "", 0, 20);
    }, 1000);

    const recipes = computed(()=>store.recipes);

    watch(
      () => searchQuery.value,
      () => {
        onSearch();
      }
    );

    watch(
      () => store.recipes,
      (newRecipes) => {
        console.log("HomePage Recipes:", newRecipes);
      }
    );

    return {
      searchQuery,
      recipes,
      onSearch,
  };
  },
});
</script>
