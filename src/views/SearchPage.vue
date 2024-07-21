<template>
  <div class="search-page">
    <div class="search-page__input-container">
      <input
        type="text"
        v-model="localSearchQuery"
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
    const localSearchQuery = ref(store.searchQuery);
    const recipes = computed(() => store.recipes);

    onMounted(() => {
      store.clearRecipes();
      console.log("localSearchQuery is", localSearchQuery);
      onSearch();
    });

    const onSearch = useDebounceFn(() => {
      if (localSearchQuery.value.trim() === "") {
        store.recipes = [];
      } else {
        store.fetchRecipes(localSearchQuery.value, "", 0, 20);
        console.log("NewRecipes: ", recipes.value);
      }
    }, 1000);

    /**
     * при изменении вводимых данных вызывается onSearch()
     * вводимое сохраняется в хранилище на случай возвращения на страницу
     */
    watch(localSearchQuery, (newQuery) => {
      onSearch();
      store.setSearchQuery(newQuery);
    });

    return {
      localSearchQuery,
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
  border-radius: 0px 0px 8px 8px;
  padding: 10px;

  &__input-container {
    margin: 8px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    height: 56px;
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
    // background-color: aqua;
    font-size: 24px;
    color: #1426c7;
    transition: 1s ease;
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
    background-color: aqua;
    transition: 0.05s ease;
  }
}
</style>
