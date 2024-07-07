import { defineStore } from "pinia";
import {
  getRecipeInformation,
  searchRecipes,
  searchRecipesByIngredients,
} from "@/services/api/recipeService";

// хранилище
export const useRecipeStore = defineStore("recipe", {
  // инициализация состояния
  state: () => ({
    recipes: [], // массив списка рецептов
    recipeDetail: null, //детали рецепта
    loading: false, //состояние загрузки
    error: null, //ошибки
  }),
  actions: {
    async fetchRecipes(
      query: string,
      cuisine: string,
      offset: number,
      number: number
    ) {
      this.loading = true;
      try {
        const response = await searchRecipes(query, cuisine, offset, number);
        this.recipes = response.data.results;
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async fetchRecipeDetail(id: number, includeNutrition: boolean) {
      this.loading = true;
      try {
        const response = await getRecipeInformation(id, includeNutrition);
        this.recipeDetail = response.data;
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
