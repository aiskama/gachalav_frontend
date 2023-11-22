<template>
  <div class="main_slide">
    <ImageComponent :head_img="data.img" :title="data.title" />
    <div class="main_slide__text">
      <p class="main_slide__text-title">{{ data.title }}</p>
      <h2 class="main_slide__text-description">{{ data.subtitle }}</h2>
    </div>
  </div>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";

export default {
  components: {
    ImageComponent,
  },
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.main_slide {
  display: flex;
  flex-direction: column;
  height: 750px;
  +below(1024px) {
    height 450px
  }

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top 0
    z-index: -1;
    +below(1024px) {
      height 450px
    }
  }

  &__text {
    display flex
    flex-direction column
    gap 20px
    max-width: 680px;
    margin 360px 0 120px 160px
    +below(1600px) {
      margin: 360px 0 120px 80px;
    }

    +below(1024px) {
      margin 190px 20px 67px 20px
      gap 15px

    }

    &-title {
      font-weight: 700;
      font-size: 4.625em;
      line-height: 80px;
      color: var(--dark);
      +below(1024px) {
        font-size 2.375em
        line-height: 46px;

      }
    }

    &-description {
      font-weight: 400;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--dark);
      +below(1024px) {
        font-size: 0.875em;
        line-height: 22px;
      }
    }

    button {
      color var(--white)

      .icon svg {
        path {
          fill: var(--white);
        }
      }
    }
  }
}
</style>
