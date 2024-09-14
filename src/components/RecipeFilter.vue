<template>
  <div class="filter-controls">
    <div class="filter-group">
      <label> Diet Types:</label>
      <select multiple v-model="selectedDiets" @change="emitFilters">
        <option v-for="diet in diets" :key="diet" :value="diet">
          {{ diet }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label> Cuisine Types:</label>
      <select multiple v-model="selectedCuisine" @change="emitFilters">
        <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
          {{ cuisine }}
        </option>
      </select>
    </div>

    <div class="filter-group">
      <label> Meal Types:</label>
      <select multiple v-model="selectedType" @change="emitFilters">
        <option v-for="type in mealTypes" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "RecipeFilter",
  props: {
    diets: {
      type: Array,
      required: true,
    },

    cuisines: {
      type: Array,
      required: true,
    },

    mealTypes: {
      type: Array,
      required: true,
    },
  },

  setup(props, { emit }) {
    const selectedDiets = ref<string[]>([]);
    const selectedCuisine = ref<string[]>([]);
    const selectedType = ref<string[]>([]);

    const emitFilters = () => {
      emit("filterChange", {
        diets: selectedDiets.value,
        cuisines: selectedCuisine.value,
        mealTypes: selectedType.value,
      });
    };

    onMounted(() => {
      emitFilters();
    });

    return {
      selectedDiets,
      selectedCuisine,
      selectedType,
      emitFilters,
    };
  },
});
</script>

<style scoped>
.filter-controls {
  margin: 10px 20px 20px;
  display: flex;
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
