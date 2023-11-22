<template>
  <div class="home_news">
    <div class="home_news__header">
      <h3>Новостной портал</h3>
      <router-link :to="{ name: 'portal' }" class="btn btn--white btn__mini">
        <span>Читать все</span>
          <IconComponent name="arrow_right" />
      </router-link>
    </div>
    <div class="home_news__content">
      <NewsBlockComponent v-for="(item, i) in data" :key="i" :data="item" />
    </div>
  </div>
</template>

<script>
import NewsBlockComponent from "../../../components/NewsBlockComponent.vue";
import IconComponent from "components/IconComponent.vue";

export default {
  components: { NewsBlockComponent, IconComponent },
  data() {
    return {
      news: [
        { date: "qqqqq", title: "qqqqqqqqqqqq", subtitle: "aaaaaaaaaaa" },
        { date: "1111", title: "qqq", subtitle: "qqqqqq" },
        { date: "ccccc", title: "ddddddd", subtitle: "xxxx" },
        { date: "eeee", title: "bbbbb", subtitle: "bbbb" },
      ],
    };
  },
  props: {
    data: Array,
  },
};
</script>

<style lang="stylus">
.home_news {
  display: flex;
  flex-direction: column;
  padding: 60px 160px;
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding 30px 25px

  }

  &__header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 40px;
    align-items flex-end
    +below(1024px) {
      align-items: flex-start;
      flex-direction: column;
      gap 15px
      padding-bottom: 15px;
    }

    h3 {
      font-weight: 700;
      font-size: 2.125em;
      line-height: 41px;
      color: var(--dark);
      +below(1024px) {
        font-size: 1.375em;
        line-height: 34px;
      }
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
    +below(1024px) {
      overflow-x: scroll;
      display flex
      gap 15px
    }
  }
}
</style>
