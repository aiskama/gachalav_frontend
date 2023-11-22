<template>
  <div class="slide_blocks">
    <a
      v-for="(item, i) in data"
      :key="i"
      :href="item.file ? item.file.path : null "
      target="_blank"
      class="slide_blocks__item">
      <div class="slide_blocks__item-icon">
        <IconComponent v-if="item.icon" :name="item.icon" />
        <IconComponent v-else name="star" />
      </div>
      <span v-if="item.title" class="slide_blocks__item-title">{{ item.title }}</span>
    </a>
  </div>
</template>

<script>
import IconComponent from "components/IconComponent.vue";

export default {
  name: "AboutAwardsComponent",
  components: {
    // AwardsComponent,
    IconComponent,
  },
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
