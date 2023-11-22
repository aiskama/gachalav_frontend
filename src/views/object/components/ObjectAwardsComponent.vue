<template>
  <div class="slide_blocks">
    <AwardsComponent v-for="(item, i) in data" :key="i" :data="item" />
  </div>
</template>

<script>
import AwardsComponent from "components/AwardsComponent.vue";

export default {
  name: "ObjectAwardsComponent",
  components: { AwardsComponent },
  props: {
    data: Array,
  },
};
</script>

<style lang="stylus">
.slide_blocks {
  display: flex;
  padding: 40px 160px;
  gap 40px
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
    flex-direction column
    gap 15px
  }
}
</style>
