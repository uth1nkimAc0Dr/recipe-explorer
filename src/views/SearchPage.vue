<template>
  <div class="search-page">
    <div class="search-page__input-container">
      <input
        type="text"
        v-model="searchQuery"
        class="search-page__input"
        required
      />
      <div class="search-page__label">Enter your recipe</div>
    </div>

    <div class="recipe-list">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
        <router-link :to="`detail/${recipe.id}`">
          {{ recipe.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRecipeStore } from "@/store/recipeStore";
import { useDebounceFn } from "@vueuse/core";

export default defineComponent({
  setup() {
    const store = useRecipeStore();
    const searchQuery = ref("");

    const recipes = computed(() => store.recipes);

    const onSearch = useDebounceFn(() => {
      if (searchQuery.value.trim() === "") {
        store.recipes = [];
        console.log("очищено");
      } else {
        store.fetchRecipes(searchQuery.value, "", 0, 20);
        console.log("NewRecipes: ", recipes.value);
      }
    }, 1000);

    // при изменении вводимого вызывается onSearch()
    watch(searchQuery, () => {
      onSearch();
    });

    return {
      searchQuery,
      recipes,
    };
  },
});
</script>

<style lang="scss">
.search-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: aqua;
  padding: 10px;

  &__input-container {
    margin: 8px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    height: 56px;
    // line-height: 80px;
    z-index: 5;
  }

  &__input {
    position: absolute;
    top: 5%;
    left: 12%;
    z-index: 1111;

    width: calc(70%);
    padding: 5px 12px;
    border: 2px solid #23ed23;
    border-radius: 8px;
    font-size: 24px;
    outline: none;
    background: transparent;
    transition: 0.2s ease;
  }

  &__label {
    position: absolute;
    top: 20%;
    left: 14%;
    z-index: 10;

    font-size: 24px;
    color: #1426c7;
    transition: 0.2s ease;
  }

  input:hover {
    border: 3px solid #23d9ed;
  }

  input:focus,
  input:valid {
    color: rgb(112, 21, 139);
    border: 4px solid #236aed;
  }

  input:focus + .search-page__label,
  input:valid + .search-page__label {
    color: #4f4e1a;
    transform: translate(10px, -24px) scale(0.9);
    // сделать перекрытие бордера
    z-index: 1111;
  }
}
</style>
