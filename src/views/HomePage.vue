<template>
  <div>
    <input
      v-model="searchQuery"
      @input="onSearch"
      placeholder="Search for recipes..."
    />
    <div v-for="recipe in recipes" :key="recipe.id">
      <router-link :to="`detail/${recipe.id}`">{{ recipe.title }}</router-link>
    </div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRecipeStore } from "@/store/recipeStore";
import { debounce } from "lodash";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const store = useRecipeStore();
    const searchQuery = ref("");
    const router = useRouter();
    const route = useRoute();

    const onSearch = debounce(() => {
      store.fetchRecipes(searchQuery.value, "", 0, 10);
    }, 300);

    watch(
      () => store.recipes,
      (newRecipes) => {
        console.log("HomePage Recipes:", newRecipes);
      }
    );

    return {
      searchQuery,
      recipes: store.recipes,
      onSearch,
    };
  },
});
</script>
