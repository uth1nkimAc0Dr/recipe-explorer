import axios from "axios";
// trueApiKeys:
const apiKeys = [
  "6c1c2951acc346b0bde85caabba68ff6",
  "c24d5c8c05e241d2bb113a244a42aa32",
  "417ffdef37b64c7e81b1ae08765d15c6",
  "0a055335a8604276a5f83f5f6b05f4f4",
  "22b16a9933784133999d97f2b494b5a3",
  "3d062bb9e25a4420b7382d2eab4a5c02",
  "8642a81523a640639700147fb2e0634f",
  "ebe4afd2d1dc43cc91c2e84d15652904",
  "5047a386b5634900b657535957917378",
  "92530522991d4720929a300065398575",
  "bdf01068e1144876b4481e5ee8d8c1f0",
  "6f016adab41f4a2cba20f08eb4c3e002",
  "5f12412606474fdb971e2cca93706082",
];

let currentApiKeyIndex = 0;
// fakeApiKey:
// const apiKey = "c24d5c8c05e241d2bb113a244a42aa33";f

const baseUrl = "https://api.spoonacular.com";

const apiClient = axios.create({
  baseURL: baseUrl,
  params: {
    apiKey: apiKeys[currentApiKeyIndex],
  },
});

// обработка ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 402) {
      currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
      console.log("переключили apiKey");
      error.config.params.apiKey = apiKeys[currentApiKeyIndex];

      return axios.request(error.config);
    }

    return Promise.reject(error);
  }
);

// Search Recipes
export const searchRecipes = (
  query: string,
  cuisine: string,
  offset: number,
  number: number,
  diet: string = "",
  type: string = ""
) => {
  const params: any = {
    query,
    cuisine,
    offset,
    number,
  };
  if (diet) {
    params.diet = diet;
  }

  if (type) {
    params.type = type;
  }
  return apiClient.get("/recipes/complexSearch", { params });
};

// Get recipe information
export const getRecipeInformation = (id: number) => {
  return apiClient.get(`/recipes/${id}/information`, {
    params: {
      includeNutrition: true,
    },
  });
};
