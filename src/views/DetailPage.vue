<template>
  <div class="detail-page">
    <div v-if="loading" class="detail-page__loading">Loading</div>
    <div v-else-if="error" class="detail-page__error">{{ error.message }}</div>
    <div v-else-if="recipeDetail" class="detail-page__content">
      <h1 class="detail-page__title">{{ recipeDetail.title }}</h1>

      <div class="detail-page__info">
        <div class="detail-page__info-item">
          readyInMinutes:
          {{ recipeDetail.readyInMinutes }}
        </div>

        <div class="detail-page__info-item">
          servings:
          {{ recipeDetail.servings }}
        </div>

        <div class="detail-page__info-item">
          Source URL is <a :href="recipeDetail.sourceUrl">Here</a>
        </div>

        <!-- <div class="detail-page__info-item">{{}}</div>
        <div class="detail-page__info-item">{{}}</div> -->
      </div>

      <img
        :src="recipeDetail.image"
        alt="Recipe Image"
        class="detail-page__image"
      />
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
      store.fetchRecipeDetail(Number(route.params.id));
    });

    return {
      recipeDetail,
      loading,
      error,
    };
  },
});
</script>

<style lang="scss">
.detail-page {
  background: aqua;

  &__loading {
  }

  &__error {
  }

  &__content {
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    margin: 0;
    padding: 8px;
  }
  &__info {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    background: #809fd0;
    width: 68%;

    &-item {
      color: black;
    }
  }

  &__image {
    width: 68%;
  }
}
</style>
