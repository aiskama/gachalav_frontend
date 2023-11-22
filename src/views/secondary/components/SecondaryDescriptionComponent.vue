<template>
  <div class="object_header">
    <h2>Описание квартир</h2>
    <div v-if="data.description" class="object_header__info">
      <EditorJSArticleComponent :text="JSON.parse(data.description)" />
    </div>
  </div>
</template>
<script>
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";

export default {
  name: "SecondaryDescriptionComponent",
  components: { EditorJSArticleComponent },
  props: {
    data: Object,
  },
};
</script>
<style lang="stylus">
.object_header {
  display flex
  flex-direction column
  gap 40px
  padding var(--between_section)
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
  }

  .btn {
    font-size 1.125em
    +below(1024px) {
      width: 100%;
    }
  }

  h2 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  &__info {
    display flex
    padding 50px
    gap 20px
    background var(--white)
    border-radius var(--main_radius)
    align-items: center;
    justify-content: space-between;
    +below(1024px) {
      flex-direction column
      padding 20px
      gap 15px
    }

    p {
      font-weight: 400;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--dark);
    }

  }


}
</style>
