<template>
  <div :class="{ 'page_description--bkg': !data.img }" class="page_description">
    <img v-if="data.img" :alt="data.title" :src="data.img" class="page_description__image" />
    <div class="page_description__text">
      <h1 class="page_description__title">{{ data.title }}</h1>
      <h2 v-if="data.subtitle" class="page_description__subtitle">{{ data.subtitle }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageDescriptionComponent",
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.page_description {
  position relative

  &--bkg {
    background var(--white)
  }

  &__text {
    display: flex;
    flex-direction: column;
    padding: 185px 0 90px 160px;
    max-width: 690px
    gap: 20px;
    +below(1600px) {
      padding: 185px 0 90px 80px;
    }
    +below(1024px) {
      padding 190px 20px 67px 20px
    }
  }

  &__image {
    position: absolute;
    width: 100%;
    z-index -1
    height: 100%
  }

  &__title {
    font-weight: 700;
    font-size: 4.625em;
    line-height: 80px;
    color: var(--dark);
    +below(1024px) {
      font-size: 2.375em;
      line-height: 46px;
    }
  }

  &__subtitle {
    font-weight: 400;
    font-size: 1.125em;
    line-height: 28px;
    color: var(--dark);
    +below(1024px) {
      font-size: 0.875em;
      line-height: 22px;
    }
  }
}
</style>
