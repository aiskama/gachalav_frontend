<template>
  <div class="about_smi" v-if="data && data.length">
    <h3>СМИ о нас</h3>
    <div class="about_smi__content" v-if="data && data.length">
      <SmiComponent v-for="(item, i) in data" :key="i" :data="item" />
    </div>
  </div>
</template>

<script>
import SmiComponent from "components/SmiComponent.vue";

export default {
  name: "AboutSmiComponent",
  components: { SmiComponent },
  props: {
    data: Array,
  },
};
</script>

<style lang="stylus">
.about_smi {
  display flex
  flex-direction column
  gap 40px
  padding var(--between_section)
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
    gap 15px
  }

  &__content {
    display grid
    grid-template-columns 1fr 1fr 1fr
    +below(1024px) {
      display flex
      gap 15px
      overflow-x: scroll;
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
