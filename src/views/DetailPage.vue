<template>
  <div v-if="recipeDetail">
    <h1>{{ recipeDetail.title }}</h1>
    <img :src="recipeDetail.image" alt="Recipe Image" />
    <!--  -->
    <!--  -->
    <div>DetailPage</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRecipeStore } from "@/store/recipeStore";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const store = useRecipeStore();
    const route = useRoute();

    onMounted(() => {
      store.fetchRecipeDetail(Number(route.params.id), true);
    });

    return {
      recipeDetail: store.recipeDetail,
    };
  },
});
</script>
