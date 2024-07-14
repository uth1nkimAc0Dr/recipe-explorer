<template>
  <div>
    <div class="search-input">
      <!-- <input
        v-model="searchQuery"
        @input="onSearch"
        placeholder="Search for recipes..."
      /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { useRecipeStore } from "@/store/recipeStore";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const store = useRecipeStore();
    const searchQuery = ref("");
  },
});
</script>
