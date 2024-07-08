import { defineStore } from "pinia";
import {
  getRecipeInformation,
  searchRecipes,
  // searchRecipesByIngredients,
} from "@/services/api/rest/recipeService";
import { ref } from "vue";
// import { fi } from "element-plus/es/locale";

export const useRecipeStore = defineStore("recipe", () => {
  const recipes = ref<any[]>([]); //массив списка рецептов
  const recipeDetail = ref<any | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<any>(null);

  // actinos
  const fetchRecipes = async (
    query: string,
    cuisine: string,
    offset: number,
    number: number
  ) => {
    loading.value = true;
    try {
      const response = await searchRecipes(query, cuisine, offset, number);
      recipes.value = response.data.results;
    } catch (error: any) {
      error.value = error;
    } finally {
      loading.value = false;
    }
  };

  const fetchRecipeDetail = async (id: number, includeNutrition: boolean) => {
    loading.value = true;
    try {
      const response = await getRecipeInformation(id, includeNutrition);
      recipeDetail.value = response.data;
    } catch (error: any) {
      error.value = error;
    } finally {
      loading.value = false;
    }
  };

  return {
    recipes,
    recipeDetail,
    loading,
    error,
    fetchRecipes,
    fetchRecipeDetail,
  };
});
