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
import { computed, defineComponent, onMounted } from "vue";
import { useRecipeStore } from "@/store/recipeStore";

export default defineComponent({
  setup() {
    const store = useRecipeStore();
    
    const recipes = computed(() => store.recipes);

    onMounted(() => {
      console.log("Компонент смонтирован");
      store.fetchRecipes("", "", 0, 30);
    });
    return {
      recipes,
    };
  },
});
</script>

<style lang="scss">
.home-page {
  padding: 20px;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.recipe-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 0.5px;
  padding: 12px;
  width: calc(32% - 30px);
  text-align: center;

  &:hover {
    box-shadow: 0 2px 8px rgb(4, 21, 45);
  }

  a {
    text-decoration: none;
  }
}
</style>
