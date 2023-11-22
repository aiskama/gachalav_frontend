<template>
  <div class="flat_advntg" v-if="data">
    <span class="flat_advntg__title">{{ data.title }}</span>
    <div class="flat_advntg__img">
      <ImageComponent :head_img="data.img" />
    </div>
  </div>
</template>
<script>
import ImageComponent from "components/ImageComponent.vue";

export default {
  name: "FlatAdvantagesComponent",
  components: { ImageComponent },
  props: {
    data: Object,
  },
};
</script>
<style lang="stylus">
.flat_advntg {
  display flex
  flex-direction column
  max-height 300px
  background var(--white)
  border-radius var(--main_radius);
  justify-content: space-between;

  &__title {
    font-weight: 700;
    font-size: 1.125em;
    padding 20px
    line-height: 28px;
    color: var(--dark);
  }

  &__img {
    height: 50%;

    img {
      height: 100%;
      width: 100%;
      object-fit cover
      border-radius 0 0 10px 10px
    }
  }
}
</style>
