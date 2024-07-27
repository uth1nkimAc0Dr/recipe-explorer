<template>
  <div class="pagination-controls">
    <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
    <span>Страница {{ currentPage }} из {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">
      Вперед
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  emits: ["pageChange"],
  methods: {
    prevPage() {
      console.log("назад");
      if (this.currentPage > 1) {
        this.$emit("pageChange", this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit("pageChange", this.currentPage + 1);
        console.log("totalPages is", this.totalPages);
      }
    },
  },
});
</script>
