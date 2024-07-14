import axios from "axios";

const apiKey = "6c1c2951acc346b0bde85caabba68ff6";
const baseUrl = "https://api.spoonacular.com";

const apiClient = axios.create({
  baseURL: baseUrl,
  params: {
    apiKey: apiKey,
  },
});

export const searchRecipes = (
  query: string,
  cuisine: string,
  offset: number,
  number: number
) => {
  return apiClient.get("/recipes/complexSearch", {
    params: {
      query: query,
      cuisine: cuisine,
      offset: offset,
      number: number,
    },
  });
};

// export const searchRecipesByIngredients = (
//   ingredients: string,
//   number: number,
//   ranking: number
// ) => {
//   return apiClient.get("/recipes/findByIngredients", {
//     params: {
//       ingredients: ingredients,
//       number: number,
//       ranking: ranking,
//     },
//   });
// };

// includeNutrition: boolean
export const getRecipeInformation = (id: number) => {
  return apiClient.get("/recipes/${id}/information");
  // , {
  //   params: {
  //     includeNutrition: includeNutrition,
  //   },
  // });
};
