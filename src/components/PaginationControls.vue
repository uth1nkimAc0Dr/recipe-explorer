<template>
  <div class="pagination-controls">
    <button
      class="pagination-controls__button"
      @click="prevPage"
      :disabled="currentPage === 1"
    >
      Назад
    </button>
    <span class="pagination-controls__info"
      >Страница {{ currentPage }} из {{ totalPages }}</span
    >
    <button
      class="pagination-controls__button"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
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

<style lang="scss">
.pagination-controls {
  margin: 20px auto;
  background: linear-gradient(45deg, #56ccf2, #2f80ed);
  width: 50%;
  min-width: 250px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
  color: #fff;

  &__button {
    background: #fff;
    color: #2f80ed;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;

    &:hover:not(:disabled) {
      background: #2f80ed;
      color: #fff;
    }

    &:disabled {
      background: #e0e0e0;
      color: #9e9e9e;
      cursor: not-allowed;
    }
  }

  &__info {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
