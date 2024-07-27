<template>
  <div class="home-page">
    <div class="recipe-list">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe-item">
        <router-link :to="`detail/${recipe.id}`">{{
          recipe.title
        }}</router-link>
      </div>
    </div>

    <PaginationControls
      :currentPage="currentPage"
      :totalPages="totalPages"
      @pageChange="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRecipeStore } from "@/store/recipeStore";
import PaginationControls from "@/components/PaginationControls.vue";

export default defineComponent({
  components: { PaginationControls },
  setup() {
    const store = useRecipeStore();
    const currentPage = ref(1);
    const itemsPerPage = 21;

    const recipes = computed(() => store.recipes);
    const totalPages = computed(() => store.totalPages);

    //
    const fetchCurrentPageRecipes = () => {
      const offset = (currentPage.value - 1) * itemsPerPage;
      store.fetchRecipes("", "", offset, itemsPerPage);
    };

    const handlePageChange = (page: number) => {
      currentPage.value = page;
      fetchCurrentPageRecipes();
    };

    onMounted(() => {
      console.log("Компонент смонтирован");
      fetchCurrentPageRecipes();
    });

    watch(currentPage, fetchCurrentPageRecipes);

    return {
      recipes,
      currentPage,
      totalPages,
      itemsPerPage,
      handlePageChange,
    };
  },
});
</script>

<style lang="scss">
.home-page {
  padding: 20px;
  background: aqua;
  border-radius: 0px 0px 8px 8px;

  .pagination-controls {
    margin: 20px auto 0px;
    background: rgb(57, 175, 184);
    width: 40%;
    display: flex;
    justify-content: space-around;
    padding: 10px;
    border-radius: 8px;
  }
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
