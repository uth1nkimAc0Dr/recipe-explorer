<template>
  <div class="home-page">

    <div class="recipe-list">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
        <router-link :to="`detail/${recipe.id}`">{{
          recipe.title
        }}</router-link>
      </div>
    </div>
  </div>  
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, onMounted } from "vue";
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

    const recipes = computed(() => store.recipes);

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

    onMounted(() => {
      console.log("Компонент смонтирован");
      store.fetchRecipes("", "", 0, 20);
    });

    return {
      searchQuery,
      recipes,
      onSearch,
    };
  },
});
</script>

<style>
.home-page {
  padding: 20px;

  .search-input {
    margin-bottom: 20px;

    input {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
  }

  .recipe-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .recipe-item {
      /* background-color: orangered; */
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 2.5px;
      padding: 12px;
      width: calc(32%-20px);
      text-align: center;

      &:hover {
        box-shadow: 0 2px 8px rgb(4, 21, 45);
      }

      a {
        text-decoration: none;
      }
    }
  }
}
</style>
