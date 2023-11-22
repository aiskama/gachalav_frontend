<template>
  <main class="portal_main">
    <PageDescriptionComponent :data="description" />
    <PortalFilterComponent @filter="filter" @search="search" />
    <div class="blocks" v-if="portal_news">
      <NewsBlockComponent v-for="(news, i) in portal_news" :key="i" :data="news" />
    </div>
    <PaginationComponent
      v-if="Math.ceil(total / first) > 1"
      :page="page"
      :total="Math.ceil(total / first)"
      @change="reload"
    />
  </main>
</template>

<script>
import PageDescriptionComponent from "components/PageDescriptionComponent.vue";
import NewsBlockComponent from "components/NewsBlockComponent.vue";
import PaginationComponent from "components/PaginationComponent.vue";
import PortalFilterComponent from "./components/PortalFilterComponent.vue";
import PORTAL_PAGE from "@/graphql/queries/portal_page.graphql";

export default {
  name: "PortalPage",
  data() {
    return {
      page: 1,
      first: 9,
      category_id: null,
      search_text: "",
      description: {
        title: "Информационный портал",
        subtitle: "",
        img: "/static/images/objects_bckg.png",
      },
    };
  },
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: PORTAL_PAGE,
        variables: {
          first: 12,
        },
      })
      .then(({ data }) => {
        store.state.portal_page.news = data.news_paginate;
        store.state.portal_page.categories = data.categories;
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
      });
  },
  computed: {
    portal_news() {
      return this.$store.state.portal_page.news.data;
    },
    total() {
      return this.$store.state.portal_page.news.paginatorInfo.total;
    },
  },
  methods: {
    async Filter() {
      await this.$apolloProvider.defaultClient
        .query({
          query: PORTAL_PAGE,
          variables: {
            first: 12,
            category_id: this.category_id,
            title: this.search_text,
          },
        })
        .then(({ data }) => {
          this.$store.state.portal_page.news = data.news_paginate;
          this.$store.state.portal_page.categories = data.categories;
        });
    },
    async reload(page = 1) {
      await this.$apolloProvider.defaultClient
        .query({
          query: PORTAL_PAGE,
          variables: {
            page: page,
            first: this.first,
          },
        })
        .then(({ data }) => {
          this.$store.state.portal_page.news = data.news_paginate;
          this.page = page;
        });
    },
    filter(data) {
      this.category_id = data.id;
      this.Filter();
    },
    search(data) {
      this.search_text = data.text;
      this.Filter();
    },
  },
  components: { PortalFilterComponent, PageDescriptionComponent, NewsBlockComponent, PaginationComponent },
  metaInfo: {
    title: "Информационный портал ",
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
  },
};
</script>

<style lang="stylus">
.portal_main {
  .blocks {
    padding-top 40px
    +below(1024px) {
      padding-top 9px
    }
  }
}
</style>
