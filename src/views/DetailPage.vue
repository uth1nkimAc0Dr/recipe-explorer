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
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";

export default defineComponent({
  setup() {
    const store = useRecipeStore();
    const route = useRoute();
    const loading = computed(() => store.loading);
    const error = computed(() => store.error);
    const recipeDetail = computed(() => store.recipeDetail);
    const chartContainer = ref<HTMLDivElement | null>(null);

    const createChart = (carbs: number, protein: number, fat: number) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(300, 300);
      chartContainer.value?.appendChild(renderer.domElement);

      const data = [
        { value: carbs, color: 0xffcc00, label: "Carbohy" },
        { value: protein, color: 0x33cc33, label: "P" },
        { value: fat, color: 0xff3333, label: "F" },
      ];

      const total = carbs + protein + fat;
      let startAngle = 0;

      data.forEach((item) => {
        const geometry = new THREE.CylinderGeometry(
          5,
          5,
          1,
          32,
          1,
          false,
          startAngle,
          (item.value / total) * 2 * Math.PI
        );
        const material = new THREE.MeshBasicMaterial({ color: item.color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;

        scene.background = new THREE.Color(0x4e4f8e);
        scene.add(mesh);

        // Добавляем текст для отображения значений
        const textGeometry = new TextGeometry(item.label, {
          font: new FontLoader().parse(helvetiker),
          size: 0.5,
          depth: 0.1,
        });

        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        const midAngle = startAngle + (item.value / total) * Math.PI;
        const radius = 3;
        textMesh.position.set(
          radius * Math.cos(midAngle),
          radius * Math.sin(midAngle),
          0.6
        );
        textMesh.rotation.x = -Math.PI / 2;
        scene.add(textMesh);

        startAngle += (item.value / total) * 2 * Math.PI;
      });

      camera.position.z = 10;

      const animate = function () {
        requestAnimationFrame(animate);
        scene.rotation.z += 0.01;
        // textMesh.lookAt(camera.position);
        renderer.render(scene, camera);
      };

      animate();
    };

    onMounted(() => {
      store.fetchRecipeDetail(Number(route.params.id)).then(() => {
        if (recipeDetail.value) {
          createChart(
            recipeDetail.value.nutrition.carbs,
            recipeDetail.value.nutrition.protein,
            recipeDetail.value.nutrition.fat
          );
        }
      });
    });

    return {
      loading,
      error,
      recipeDetail,
      chartContainer,
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
    margin-top: 10px;
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
