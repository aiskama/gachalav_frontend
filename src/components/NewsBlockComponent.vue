<template>
  <router-link :to="{ name: 'news_item', params: { id: data.id } }" class="news_block">
    <div class="news_block__header">
      <span v-if="data.category" class="news_block-tag">{{ data.category.title }}</span>
      <span v-if="data.date">{{ data.date | humanDate }}</span>
    </div>
    <span v-if="data.title" class="news_block-title">{{ data.title }}</span>
    <span v-if="data.subtitle" class="news_block-subtitle">
      {{ data.subtitle }}
    </span>
    <button class="news_block-btn">
     <span>Открыть полностью</span>
      <IconComponent name="arrow_right" />
    </button>
  </router-link>
</template>

<script>
import IconComponent from "./IconComponent.vue";

export default {
  name: "NewsBlockComponent",
  props: {
    data: Object,
  },
  components: { IconComponent },
};
</script>

<style lang="stylus">
.news_block {
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: var(--white);
  gap: 15px;
  min-height: 307px;
  border-radius: var(--main_radius);
  justify-content: space-between;
  +below(1024px) {
    padding 15px
    min-width: 300px;
    min-height: 263px;

  }

  &-tag {
    padding: 2px 10px;
    background: var(--gray);
    border-radius: 100px;
  }

  &__header {
    display: flex;
    justify-content: space-between;

    span {
      color: var(--dark_light);
      font-weight: 400;
      font-size: 0.875em;
      line-height: 22px;
      +below(1024px) {
        font-size: 0.75em;
        line-height: 18px;
      }
    }
  }

  &-title {
    font-weight: 700;
    font-size: 1.125em;
    line-height: 28px;
    color: var(--dark);
    +below(1024px) {
      font-size: 1em;
      line-height: 26px;
    }
  }

  &-subtitle {
    font-weight: 400;
    font-size: 0.875em;
    line-height: 22px;
    color: var(--dark_light);
    word-break break-word
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    +below(1024px) {
      font-size: 0.75em;
      line-height: 18px;
    }
  }

  &-btn {
    cursor pointer

    a {
      text-decoration none
    }
    display flex
    align-items center
    gap 15px
    font-weight: 400;
    font-size: 1em;
    line-height: 26px;
    color: var(--dark_light);
    background-color transparent
    border none
    +below(1024px) {
      font-size: 0.875em;
      line-height: 22px;
    }

    svg {
      width: 10px;
      height: 10px;

      path {
        fill var(--dark_light)
      }
    }
  }
}
</style>
