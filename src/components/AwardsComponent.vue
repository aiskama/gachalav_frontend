<template>
  <a
    v-if="data.file && data.type.code === 1"
    :href="data.file.path"
    class="slide_blocks__item"
    target="_blank"
  >
    <div class="slide_blocks__item-icon">
      <IconComponent v-if="data.icon" :name="data.icon" />
      <IconComponent v-else name="star" />
    </div>
    <span v-if="data.title" class="slide_blocks__item-title">{{ data.title }}</span>
  </a>
</template>

<script>
import IconComponent from "components/IconComponent.vue";

export default {
  name: "AwardsComponent",
  props: {
    data: Object,
  },
  components: { IconComponent },
};
</script>

<style lang="stylus">
.slide_blocks {

  &__item {
    display: flex;
    padding: 24px 20px;
    gap 20px
    width: 100%
    height 100px
    border-radius var(--main_radius)
    background: var(--white);
    backdrop-filter: blur(10px);
    align-items: center;

    &-icon {
      svg {
        width: 50px;
        height: 40px;
      }
      +below(1024px) {
        svg {
          width: 50px;
          height: 40px;
        }
      }
    }

    &-title {
      font-weight: 400;
      font-size: 1em;
      line-height: 18px;
      color: var(--dark);
    }

    .icon svg {
      path {
        fill: var(--dark_light);
      }
    }
  }
}
</style>
