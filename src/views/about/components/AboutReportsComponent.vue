<template>
  <div class="about_reports">
    <h3 v-if="data && data.length!==0">Отчеты</h3>
    <ReportComponent v-for="(item, i) in data" :key="i" :data="item" />
  </div>
</template>

<script>
import ReportComponent from "components/ReportComponent.vue";

export default {
  name: "AboutReportsComponent",
  components: { ReportComponent },
  props: {
    data: Array,
  },
};
</script>

<style lang="stylus">
.about_reports {
  display flex
  flex-direction column
  //gap 20px
  padding var(--between_section)
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
    gap 15px
  }

  h3 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    margin-bottom 40px
    +below(1024px) {
      font-size: 1.375em;
      line-height: 34px;
      gap 15px
    }

  }

}
</style>
