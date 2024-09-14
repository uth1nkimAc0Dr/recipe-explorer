<template>
  <div class="pagination-controls nabla-uni">
    <button
      class="pagination-controls__button nabla-uni"
      @click="prevPage"
      :disabled="currentPage === 1"
    >
      Back
    </button>

    <span class="pagination-controls__info">
      Page
      <span class="nabla-uni"> {{ currentPage }} </span>
      of
      <span class="nabla-uni"> {{ totalPages }} </span>
    </span>

    <button
      class="pagination-controls__button nabla-uni"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";

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

  setup(props, { emit }) {
    const { currentPage, totalPages } = toRefs(props);

    const prevPage = () => {
      console.log("Back!");
      if (currentPage.value > 1) {
        emit("pageChange", currentPage.value - 1);
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        emit("pageChange", currentPage.value + 1);
      }
    };

    return {
      prevPage,
      nextPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.pagination-controls {
  margin: 20px auto 5px;
  background: linear-gradient(45deg, #56ccf2, #2f80ed);
  width: 50%;
  min-width: 220px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
  color: #fff;
  font-family: "Nabla", system-ui;

  &__button {
    background: linear-gradient(
      11deg,
      #67254c,
      #82487f,
      #926eb7,
      #9499f0,
      #d08272
    );
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
      opacity: 0.5;
      background: linear-gradient(
        -180deg,
        #5364a0,
        #57487b,
        #4f2e56,
        #401734,
        #a8024f
      );
      color: #9e9e9e;
      cursor: not-allowed;
    }
  }

  &__info {
    font-size: 18px;
    font-weight: bold;
  }
}

@media screen and (max-width: 768px) {
  .detail-page__chart {
    width: 90%;
  }

  .detail-page__chart canvas {
    max-width: 90%;
    // не помогает
    height: auto;
  }
}
</style>
