<template>
  <div>
    <input type="text" />
    <div>SearchPage</div>
  </div>
</template>

<script lang="ts">
import { useRecipeStore } from "@/store/recipeStore";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const store = useRecipeStore();
  },
});
</script>
