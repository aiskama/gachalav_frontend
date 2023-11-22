<template>
  <figure v-if="!error" :class="`icon ${name}-icon`">
    <InlineSvg :src="`/static/svg/${name}.svg`" @error="error = true" />
  </figure>
</template>

<script>
import InlineSvg from "vue-inline-svg";

export default {
  name: "IconComponent",
  props: {
    name: String,
  },
  data() {
    return {
      error: false,
    };
  },
  components: {
    InlineSvg,
  },
};
</script>

<style lang="stylus">
.icon {
  display inline-flex
  align-items center
  justify-content center

  svg {
    width 100%
    height 100%
  }
}
</style>
