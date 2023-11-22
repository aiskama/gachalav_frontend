<template>
  <div class="phone-slide">
    <ImageComponent :head_img="data" />
  </div>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";

export default {
  name: "ObjectSlideModal",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ImageComponent,
  },
};
</script>

<style lang="stylus">
.phone-slide {
  width 100%
  height auto

  img {
    width 100%
    height 100%
    max-height 2000px
    object-fit contain
  }
}
</style>
