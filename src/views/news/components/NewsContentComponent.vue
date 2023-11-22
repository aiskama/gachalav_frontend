<template>
  <div class="news_content">
    <EditorJSArticleComponent :text="JSON.parse(news_item.description)" />
  </div>
</template>

<script>
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";

export default {
  name: "NewsContentComponent",
  components: { EditorJSArticleComponent },
  props: {
    news_item: {
      type: Object,
    },
  },
};
</script>

<style lang="stylus">
.news_content {
  padding 30px
  background-color: var(--white)
  border-radius: var(--main_radius)
  height fit-content
  font-weight: 400;
  font-size: 1.125em;
  line-height: 28px;
  color: var(--dark);
  +below(1024px) {
    order 1
  }
}
</style>
