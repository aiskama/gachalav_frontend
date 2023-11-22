<template>
  <div class="other_news">
    <h3>Читайте также</h3>
    <NewsBlockComponent v-for="(item, i) in news" :key="i" :data="item" />
  </div>
</template>

<script>
import NewsBlockComponent from "components/NewsBlockComponent.vue";

export default {
  name: "NewsOtherBlocks",
  components: { NewsBlockComponent },
  props: {
    news: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="stylus">
.other_news {
  display: flex;
  flex-direction: column;
  gap: 20px;
  +below(1024px) {
    order 3
    padding: 0 15px 15px 15px;
  }

  h3 {
    padding-bottom: 10px;
    font-weight: 700;
    font-size: 1.375em;
    line-height: 34px;
    color: var(--dark);
  }
}
</style>
