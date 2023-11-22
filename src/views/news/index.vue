<template>
  <main class="news_main">
    <h1>{{ news_item.title }}</h1>
    <div class="news">
      <NewsInfoBlockComponent :news_item="news_item" />
      <NewsContentComponent :news_item="news_item" />
      <NewsOtherBlocks :news="news" />
    </div>
  </main>
</template>

<script>
import NewsInfoBlockComponent from "./components/NewsInfoBlockComponent.vue";
import NewsContentComponent from "./components/NewsContentComponent.vue";
import NewsOtherBlocks from "./components/NewsOtherBlocks.vue";
import NEWS_ITEM from "@/graphql/queries/news_item.graphql";

export default {
  name: "NewsPage",
  async asyncData({ apollo, store, route }) {
    await apollo.defaultClient
      .query({
        query: NEWS_ITEM,
        variables: {
          id: parseInt(route.params.id),
          first: 3,
        },
      })
      .then(({ data }) => {
        store.state.portal_page.news_item = data.news_item;
        store.state.portal_page.news = data.news_paginate;
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
      });
  },
  computed: {
    news_item() {
      return this.$store.state.portal_page.news_item;
    },
    news() {
      return this.$store.state.portal_page.news.data;
    },
  },
  components: { NewsInfoBlockComponent, NewsContentComponent, NewsOtherBlocks },
  metaInfo() {
    return {
      title: this.news_item.title,
      titleTemplate: "%s | Gachalav Group",
      meta: [
        {
          vmid: "keywords",
          name: "keywords",
          content: "",
        },
        {
          vmid: "description",
          name: "description",
          content: "",
        },
        {
          vmid: "og:title",
          name: "og:title",
          content: "",
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: "",
        },
      ],
    };
  },
};
</script>

<style lang="stylus">
.news_main {
  h1 {
    font-weight: 700;
    font-size: 3em;
    line-height: 58px;
    color: var(--dark);
    padding 160px 400px 0 160px
    +below(1600px) {
      padding 160px 400px 0 80px
    }
    +below(1024px) {
      padding 170px 20px 30px 20px
      font-size: 1.5em;
      line-height: 29px;
    }

  }

  .news {
    padding: 40px 160px 0 160px;
    display: grid;
    grid-template-columns 23% 48% 24%
    grid-gap: 40px;
    +below(1600px) {
      padding var(--between_section--tab)
    }
    +below(1024px) {
      padding 0
      grid-template-columns 1fr
      gap 30px
    }
  }
}
</style>
