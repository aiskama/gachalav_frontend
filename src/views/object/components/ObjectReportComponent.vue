<template>
  <div class="object_report" v-if="data">
    <h3>Разрешительная документация</h3>
    <ReportComponent v-for="(item, i) in data" :key="i" :data="item" />
  </div>
</template>
<script>
import ReportComponent from "components/ReportComponent.vue";

export default {
  name: "ObjectReportComponent",
  components: { ReportComponent },
  props: {
    data: Array,
  },
};
</script>
<style lang="stylus">

.object_report {
  display flex
  flex-direction column
  gap 40px
  padding var(--between_section)
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
  }

  h3 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    +below(1024px) {
      font-size: 1.500em
      line-height: 34px;
    }
  }
}
</style>
