<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li v-if="prev" class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click="paginationChanged(startPageIndex - 1)"
        >
          <span aria-hidden="true">«</span>
        </a>
      </li>
      <li
        v-for="index in endPageIndex - startPageIndex + 1"
        :key="index"
        v-bind:class="{ active: startPageIndex + index - 1 == $store.state.board.currentPageIndex }"
        class="page-item"
      >
        <a @click="paginationChanged(startPageIndex + index - 1)" class="page-link" href="#">{{
          startPageIndex + index - 1
        }}</a>
      </li>
      <li v-if="next" class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click="paginationChanged(endPageIndex + 1)"
        >
          <span aria-hidden="true">»</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {};
  },
  computed: {
    pageCount: function () {
      return this.$store.getters.getPageCount;
    },
    startPageIndex: function () {
      return this.$store.getters.getStartPageIndex;
    },
    endPageIndex: function () {
      return this.$store.getters.getEndPageIndex;
    },
    prev: function () {
      return this.$store.getters.getPrev;
    },
    next: function () {
      return this.$store.getters.getNext;
    },
  },
  methods: {
    paginationChanged(pageIndex) {
      console.log("paginationVue : paginationChanged : pageIndex : " + pageIndex);
      this.$emit("call-parent", pageIndex);
    },
  },
  created() {
    this.paginationChanged(1);
  },
};
</script>
