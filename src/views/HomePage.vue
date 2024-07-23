<template>
  <div class="home-page">
    <div class="recipe-list">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
        <router-link :to="`detail/${recipe.id}`">{{
          recipe.title
        }}</router-link>
      </div>
    </div>
    <div>
      <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
      <span> Страница {{ currentPage }} из {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Вперед
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRecipeStore } from "@/store/recipeStore";

export default defineComponent({
  setup() {
    const store = useRecipeStore();
    const currentPage = ref(1);
    // const itemsPerPage = 10;
    // const totalPages = ref(100);
    const itemsPerPage = 21;

    const recipes = computed(() => store.recipes);
    const totalPages = computed(() => store.totalPages);
    // const totalPages = computed(() => {
    //   store.totalPages;
    // });

    const fetchCurrentPageRecipes = () => {
      const offset = (currentPage.value - 1) * itemsPerPage;
      store.fetchRecipes("", "", offset, itemsPerPage);
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        // Здесь нужно добавить логику для загрузки предыдущей страницы рецептов
        fetchCurrentPageRecipes();
      }
    };

    const nextPage = () => {
      if (totalPages.value != null && currentPage.value < totalPages.value) {
        currentPage.value++;
        fetchCurrentPageRecipes();
        // Здесь нужно добавить логику для загрузки следующей страницы рецептов
      }
    };

    onMounted(() => {
      console.log("Компонент смонтирован");
      // store.fetchRecipes("", "", 0, itemsPerPage);
      fetchCurrentPageRecipes();

      watch(currentPage, fetchCurrentPageRecipes);
    });

    return {
      recipes,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
      itemsPerPage,
    };
  },
});
</script>

<style lang="scss">
.home-page {
  padding: 20px;
  background: aqua;
  border-radius: 0px 0px 8px 8px;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.recipe-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
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
