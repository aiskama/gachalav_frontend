<template>
  <div v-if="data && data.length !== 0" class="about_chart">
    <div class="about_chart__content">
      <h3 v-if="data && data.length !== 0">Туристическая привлекательность Дербента</h3>
      <ChartComponent
        v-if="data && data.length !== 0"
        :data="charts_item"
        class="about_chart__content-chart"
      />
    </div>
  </div>
</template>

<script>
import ChartComponent from "./ChartComponent.vue";

export default {
  name: "AboutChartComponent",
  components: { ChartComponent },
  computed: {
    charts_item() {
      return this.$store.state.about_page.charts_item.indicators;
    },
  },
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.about_chart {
  padding var(--between_section)
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding 29px 20px 20px 20px
  }

  &__content {
    display flex
    flex-direction column
    gap 40px

    &-chart {
      border-radius var(--main_radius)
      padding 50px
      background-color var(--white)
      height 550px
      transition var(--transition)
      +below(1024px) {
        padding 10px
        height 230px

      }
    }
  }

  h3 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    +below(1024px) {
      font-size: 1.375em;
      line-height: 34px;
    }
  }
}
</style>
