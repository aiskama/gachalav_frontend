<template>
  <main class="live_main">
    <PageDescriptionComponent :data="description" />
    <div class="live_blocks">
      <LiveBlockComponent v-for="(item, i) in live" :key="i" :data="item" />
    </div>
  </main>
</template>

<script>
import PageDescriptionComponent from "components/PageDescriptionComponent.vue";
import LiveBlockComponent from "components/LiveBlockComponent.vue";
import LIVE_PAGE from "@/graphql/queries/live_page.graphql";

export default {
  name: "LivePage",
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: LIVE_PAGE,
      })
      .then(({ data }) => {
        store.state.live_page.object_homes = data.object_homes;
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
      });
  },
  computed: {
    live() {
      return this.$store.state.live_page.object_homes;
    },
  },
  data() {
    return {
      description: {
        title: "Live трансляции",
        img: "/static/images/live_bckg.png",
      },
    };
  },
  components: { PageDescriptionComponent, LiveBlockComponent },
  metaInfo: {
    title: "Live транляции",
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
.live_main {
  .page_description__text {
    max-width 100%
  }
}

.live_blocks {
  display: grid;
  padding 84px 160px 0 160px
  grid-gap 40px
  grid-template-columns 1fr 1fr 1fr
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
    grid-gap 20px
    grid-template-columns 1fr
  }
}
</style>
