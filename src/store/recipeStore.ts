import { defineStore } from "pinia";
import { getRecipeInformation, searchRecipes } from "@/api/rest/recipeService";
import { ref } from "vue";
// import { fi } from "element-plus/es/locale";

export const useRecipeStore = defineStore("recipe-store", () => {
  const recipes = ref<any[]>([]); //массив списка рецептов
  const recipeDetail = ref<any | null>(null);
  const loading = ref<boolean>(false);
  const error = ref<any>(null);
  const searchQuery = ref<string>("");
  const totalPages = ref<number>(0);

  // желательно писать actions отдель
  // поиск рецептов по запросу и обновление списка рецептов
  const fetchRecipes = async (
    query = "", //содержание запроса
    cuisine = "", //вид кухни
    offset = 0, //кол-во заскипанных рецептов(для пагинации)
    number = 21 //кол-во получаемых рецептов
  ) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await searchRecipes(query, cuisine, offset, number);
      recipes.value = response.data.results;
      totalPages.value = Math.ceil(response.data.totalResults / number);
      console.log("totalPages.value", totalPages.value);
      // некорректные значения у totalPages.value
    } catch (error: any) {
      error.value = error;
    } finally {
      loading.value = false;
    }
  };

  const fetchRecipeDetail = async (id: number) => {
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

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  return {
    recipes,
    recipeDetail,
    loading,
    error,
    fetchRecipes,
    fetchRecipeDetail,
    clearRecipes,
    searchQuery,
    setSearchQuery,
    totalPages,
  };
});
