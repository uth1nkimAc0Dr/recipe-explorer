<template>
  <div>
    <input type="text" />
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRecipeStore } from "@/store/recipeStore";

export default defineComponent({
  setup() {
    const store = useRecipeStore;
  },
});
</script>
