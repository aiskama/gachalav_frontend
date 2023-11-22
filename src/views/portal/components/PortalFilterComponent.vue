<template>
  <div class="portal_filters">
    <SelectComponent
      v-model="category"
      :errors="[]"
      :options="select"
      :value="category"
      label-name="title"
      placeholder="Все"
      title="Категория:"
      @input="filter"
    />
    <InputComponent v-model="title" iconPosition="left" placeholder="Поиск по заголовку" @input="search" />
  </div>
</template>

<script>
import SelectComponent from "components/inputs/select/index.vue";
import InputComponent from "components/inputs/InputComponent.vue";

export default {
  components: {
    SelectComponent,
    InputComponent,
  },
  data() {
    return {
      category: null,
      title: null,
    };
  },
  methods: {
    filter() {
      this.$emit("filter", { id: this.category.id });
    },
    search() {
      this.$emit("search", { text: this.title });
    },
  },
  computed: {
    select() {
      return this.$store.state.portal_page.categories;
    },
  },
};
</script>
<style lang="stylus">
.portal_filters {
  display flex
  padding 60px 160px 0 160px
  align-items: center;
  justify-content: space-between;
  +below(1600px) {
    padding 60px 80px 0 80px
  }
  +below(1024px) {
    flex-direction column
    padding 38px 20px 20px 20px
    align-items: stretch;
    gap 20px
  }

  .input__field {
    font-weight: 400;
    font-size: 1em;
    line-height: 26px;
    color: var(--dark);
  }

  .select__field {
    font-weight: 400;
    font-size: 1em;
    line-height: 26px;
    color: var(--dark);

    :placeholder {
      color: var(--dark);
    }
  }

  .select__container {
    grid-gap 15px
    +below(1024px) {
      grid-gap 12px
    }
  }

  .select__field-container {
    background var(--white)
    height: 60px;
    max-width: 187px;

    svg {
      width: 9px;
      height 6px
    }
    +below(1024px) {
      max-width: 100%;
    }

  }

  .input__container {
    background var(--white)
    border: 1px solid #D5D8DF;
    height: 60px;
    width: 443px;
    +below(1024px) {
      width: 100%;
    }

    svg {
      width: 16px;
      height 16px
    }
  }
}
</style>
