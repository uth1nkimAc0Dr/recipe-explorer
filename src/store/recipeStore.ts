import { defineStore } from "pinia";
import {
  getRecipeInformation,
  searchRecipes,
  // searchRecipesByIngredients,
} from "@/api/rest/recipeService";
import { ref } from "vue";
// import { fi } from "element-plus/es/locale";

export const useRecipeStore = defineStore("recipe-store", () => {
  const recipes = ref<any[]>([]); //массив списка рецептов
  const recipeDetail = ref<any | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<any>(null);

  // вообще у нас есть возможность напрямую менять состояние в компоненте, но это не
  // рекомендуется делатЬ, потому что будет сложно отследить зависимость и лучше писать
  // отдельные экшены, для этого "actions:"
  // actinos
  const fetchRecipes = async (
    query = "",
    cuisine = "",
    offset = 0,
    number = 10
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await searchRecipes(query, cuisine, offset, number);
      recipes.value = response.data.results;
    } catch (error: any) {
      error.value = error;
    } finally {
      loading.value = false;
    }
  };
  // includeNutrition: boolean
  const fetchRecipeDetail = async (id: number, includeNutrition: boolean) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await getRecipeInformation(id);
      recipeDetail.value = response.data;
    } catch (error: any) {
      error.value = error;
    } finally {
      loading.value = false;
    }
  };

  const clearRecipes = () => {
    recipes.value = [];
  };

  return {
    recipes,
    recipeDetail,
    loading,
    error,
    fetchRecipes,
    fetchRecipeDetail,
    clearRecipes,
  };
});
