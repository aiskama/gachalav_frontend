<template>
  <ul class="pagination">
    <li v-if="page !== 1">
      <button class="pagination__link" type="button" @click="$emit('change', 1)">
        <IconComponent name="double-chevron-left" />
      </button>
    </li>
    <li v-if="page !== 1">
      <button class="pagination__link" type="button" @click="$emit('change', page - 1)">
        <IconComponent name="left-arrow-pagination" />
      </button>
    </li>
    <li v-for="p in currentPages" :key="p">
      <button
        :class="{ 'pagination__link--active': page === p }"
        class="pagination__link"
        type="button"
        @click="$emit('change', p)"
      >
        {{ p }}
      </button>
    </li>
    <li v-if="page !== total">
      <button class="pagination__link" type="button" @click="$emit('change', page + 1)">
        <IconComponent name="right-arrow-pagination" />
      </button>
    </li>
    <li v-if="page !== total">
      <button class="pagination__link" type="button" @click="$emit('change', total)">
        <IconComponent name="double-chevron-right" />
      </button>
    </li>
  </ul>
</template>

<script>
import IconComponent from "@/components/IconComponent.vue";

export default {
  name: "PaginationComponent",
  props: {
    page: Number,
    total: Number,
  },
  data() {
    return {
      isMobile: false,
    };
  },
  computed: {
    currentPages() {
      let startPage, endPage;
      const maxPages = 4;
      if (this.total <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = this.total;
      } else {
        // total pages more than max so calculate start and end pages
        const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (this.page <= maxPagesBeforeCurrentPage) {
          // current page near the start
          startPage = 1;
          endPage = maxPages;
        } else if (this.page + maxPagesAfterCurrentPage >= this.total) {
          // current page near the end
          startPage = this.total - maxPages + 1;
          endPage = this.total;
        } else {
          // current page somewhere in the middle
          startPage = this.page - maxPagesBeforeCurrentPage;
          endPage = this.page + maxPagesAfterCurrentPage;
        }
      }
      return Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);
    },
  },
  mounted() {
    this.isMobile = this.$store.getters.mobileCheck;
  },
  components: {
    IconComponent,
  },
};
</script>

<style lang="stylus">
.pagination {
  padding: var(--between_section);
  display: flex;
  //justify-content: center;
  align-items: center;
  list-style: none;
  overflow: hidden;
  gap: 5px;

  +below(1024px) {
    padding var(--between_section--mob)
  }

  li {
    width: 50px;
    height: 50px;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: var(--white);
    cursor: pointer;
    border-radius: 100px;
    border: 1px solid var(--gray_dark);
    transition: var(--transition);
    font-size: 1em;
    font-weight: 400;
    line-height: 26px;

    &--disabled {
      cursor: initial;
    }

    .icon {
      width: 8px;
      height: 8px;
      transition: var(--transition);
    }

    &:not(&--disabled):not(&--active):hover {
      border-color: var(--main);
      color: var(--main);

      & .icon svg path {
        fill: var(--dark);
      }
    }

    &--active {
      cursor: initial;
      background: var(--main);
      color: var(--white);
      border-color: var(--main);
      pointer-events: none;
    }
  }
}
</style>
