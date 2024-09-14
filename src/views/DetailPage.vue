<template>
  <div class="detail-page">
    <div v-if="loading" class="detail-page__loading">Loading</div>

    <div v-else-if="error" class="detail-page__error">{{ error.message }}</div>

    <div v-else-if="recipeDetail" class="detail-page__content">
      <h1 class="detail-page__title">{{ recipeDetail.title }}</h1>

      <div class="detail-page__info">
        <div class="detail-page__info-item">
          readyInMinutes: {{ recipeDetail.readyInMinutes }}
        </div>

        <div class="detail-page__info-item">
          servings: {{ recipeDetail.servings }}
        </div>

        <div class="detail-page__info-item">
          healthScore: {{ recipeDetail.healthScore }}
        </div>

        <div class="detail-page__info-item">
          Source URL is <a :href="recipeDetail.sourceUrl">Here</a>
        </div>

        <div class="detail-page__nutrition">
          <h3 class="detail-page__nutrition-title">
            Nutritional Information (Per Serving):
          </h3>
          <div class="detail-page__nutrition-item">
            carbs: {{ recipeDetail.nutrition.carbs }}g
          </div>

          <div class="detail-page__nutrition-item">
            fat: {{ recipeDetail.nutrition.fat }}g
          </div>

          <div class="detail-page__nutrition-item">
            protein: {{ recipeDetail.nutrition.protein }}g
          </div>

          <div ref="chartContainer" class="detail-page__chart"></div>
        </div>

        <img
          :src="recipeDetail.image"
          alt="Recipe Image"
          class="detail-page__image"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { useRecipeStore } from "@/store/recipeStore";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const store = useRecipeStore();
    const route = useRoute();
    const loading = computed(() => store.loading);
    const error = computed(() => store.error);
    const recipeDetail = computed(() => store.recipeDetail);

    onMounted(async () => {
      try {
        await store.fetchRecipeDetail(Number(route.params.id));
      } catch (error) {
        console.error("Failed to fetch recipe details");
      }
    });

    return {
      loading,
      error,
      recipeDetail,
    };
  },
});
</script>

<style lang="scss">
.detail-page {
  background: linear-gradient(
    3deg,
    #2bc188,
    #00957e,
    #006b69,
    #004249,
    #071d23
  );

  &__loading {
    text-align: center;
  }

  &__error {
    text-align: center;
    color: red;
  }

  &__content {
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-family: "Jura";
    margin: 0;
    padding: 8px;
  }

  &__info {
    border-radius: 6px;
    background: linear-gradient(
      188deg,
      #890262,
      #70256d,
      #573370,
      #413b6c,
      #333e61
    );
    width: 68%;
    padding: 10px;

    &-item {
      color: black;
      // margin-bottom: 10px;
    }
  }

  &__nutrition {
    margin: 10px;
    background: linear-gradient(
      236deg,
      #413dc4,
      rgba(43, 106, 165, 0.6196078431),
      #683d86,
      rgb(144 152 156 / 28%),
      #472455
    );
    padding: 10px;
    border-radius: 7px;
    // text-align: left;

    &-title {
      font-size: 20px;
      margin: 4px;
    }

    &-item {
      margin-bottom: 4px;
    }
  }

  &__chart {
    display: flex;
    justify-content: center;
    // border: 2px solid #000;
    // border-radius: 8px;
  }
  &__chart canvas {
    border-radius: 6px;
  }
  &__image {
    margin: 20px 0px;
    width: 68%;
  }
}
</style>
