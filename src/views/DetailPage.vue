<template>
  <div>
    <div v-if="loading">Loading</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else-if="recipeDetail">
      <h1>{{ recipeDetail.title }}</h1>
      <img :src="recipeDetail.image" alt="Recipe Image" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { useRecipeStore } from "@/store/recipeStore";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const store = useRecipeStore();
    const route = useRoute();
    const loading = computed(() => store.loading);
    const error = computed(() => store.error);
    const recipeDetail = computed(() => store.recipeDetail);

    onMounted(() => {
      store.fetchRecipeDetail(Number(route.params.id), false);
    });

    return {
      recipeDetail,
      loading,
      error,
    };
  },
});
</script>
