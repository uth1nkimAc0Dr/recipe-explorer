<template>
  <div class="home-page">
    <RecipeFilter
      :diets="dietTypes"
      :cuisines="cuisineTypes"
      :mealTypes="mealTypes"
      @filterChange="handleFilterChange"
    />

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
import RecipeFilter from "@/components/RecipeFilter.vue";

export default defineComponent({
  components: { PaginationControls, RecipeFilter },
  setup() {
    const store = useRecipeStore();
    const currentPage = ref(1);
    const itemsPerPage = 21;

    const recipes = computed(() => store.recipes);
    const totalPages = computed(() => store.totalPages);

    const dietTypes = [
      "Gluten Free",
      "Ketogenic",
      "Vegetarian",
      "Lacto-Vegetarian",
      "Ovo-Vegetarion",
      "Vegan",
      "Pescetarian",
      "Paleo",
      "Primal",
      "Low FODMAP",
      "Whole30",
    ];
    const cuisineTypes = [
      "African",
      "Asian",
      "American",
      "British",
      "Cajun",
      "Caribbean",
      "Chinese",
      "Eastern European",
      "European",
      "French",
      "German",
      "Greek",
      "Indian",
      "Irish",
      "Italian",
      "Japanese",
      "Jewish",
      "Korean",
      "Latin American",
      "Mediterranean",
      "Mexican",
      "Middle Eastern",
      "Nordic",
      "Southern",
      "Spanish",
      "Thai",
      "Vietnamese",
    ];
    const mealTypes = [
      "main course",
      "side dish",
      "dessert",
      "appetizer",
      "salad",
      "bread",
      "breakfast",
      "soup",
      "beverage",
      "sauce",
      "marinade",
      "fingerfood",
      "snack",
      "drink",
    ];

    const filters = ref({
      diets: [] as string[],
      cuisines: [] as string[],
      mealTypes: [] as string[],
    });

    const fetchCurrentPageRecipes = () => {
      const offset = (currentPage.value - 1) * itemsPerPage;
      const { diets, cuisines, mealTypes } = filters.value;
      store.fetchRecipes(
        "",
        cuisines.join(","),
        offset,
        itemsPerPage,
        diets.join(","),
        mealTypes.join(",")
      );
    };

    const handlePageChange = (page: number) => {
      currentPage.value = page;
      fetchCurrentPageRecipes();
    };

    const handleFilterChange = (newFilters: {
      diets: string[];
      cuisines: string[];
      mealTypes: string[];
    }) => {
      filters.value = newFilters;
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
      handleFilterChange,
      dietTypes,
      cuisineTypes,
      mealTypes,
    };
  },
});
</script>

<style lang="scss">
.home-page {
  padding: 20px;
  background: linear-gradient(
    247deg,
    #332efe,
    #ff2768,
    #985ce1,
    #abb19b,
    #f40068
  );
  border-radius: 0px 0px 8px 8px;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex-direction: row;
  // align-items: center;
  justify-content: center;
}

.recipe-item {
  border: 2px solid #110b0b;
  background: white;
  border-radius: 6px;
  padding: 8px;
  width: calc(32% - 30px);
  text-align: center;
  min-width: 90px;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    box-shadow: 0 2px 8px rgb(4, 21, 45);
  }

  a {
    text-decoration: none;
  }
}
</style>
