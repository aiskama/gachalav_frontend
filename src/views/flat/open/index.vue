<template>
  <main class="flat">
    <FlatInfoComponent :data="info" v-if="info" />
    <h2 v-if="advantage && advantage.length !== 0">Преимущества</h2>
    <div v-if="advantage && advantage.length !== 0" class="flat_grid">
      <FlatAdvantagesComponent v-for="(item, i) in advantage.advantage" :key="i" :data="item" />
    </div>
    <h2 v-if="flats.length !== 0">Похожие квартиры</h2>
    <div v-if="flats.length !== 0" class="flat_grid">
      <FlatCardComponent v-for="(item, i) in flats" :key="i" :data="item" />
    </div>
  </main>
</template>
<script>
import FLATS_ITEM from "@/graphql/queries/flats_item.graphql";
import FlatInfoComponent from "./components/FlatInfoComponent.vue";
import FlatAdvantagesComponent from "./components/FlatAdvantagesComponent.vue";
import FlatCardComponent from "../list/components/FlatCardComponent.vue";

export default {
  name: "FlatPage",
  components: { FlatCardComponent, FlatAdvantagesComponent, FlatInfoComponent },
  async asyncData({ apollo, store, route }) {
    await apollo.defaultClient
      .query({
        query: FLATS_ITEM,
        variables: {
          id: parseInt(route.params.id),
        },
      })
      .then(({ data }) => {
        store.state.flats_page.apartments_item = data.apartments_item;
        store.state.flats_page.apartments = data.apartments_paginate;
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
      });
  },
  computed: {
    info() {
      return this.$store.state.flats_page.apartments_item;
    },
    advantage() {
      return this.$store.state.flats_page.apartments_item;
    },
    flats() {
      return this.$store.state.flats_page.apartments.data;
    },
  },

  metaInfo() {
    return {
      title: this.info ? this.info.title : "Квартира",
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
.flat {
  .page_description__text {
    max-width 100%
  }

  &_grid {
    padding 40px 160px 0 160px
    display grid
    grid-template-columns 1fr 1fr 1fr
    grid-gap 40px
    +below(1600px) {
      padding var(--between_section--tab)
    }

    +below(1024px) {
      padding var(--between_section--mob)
      display flex
      flex-direction column
    }
  }

  h2 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    padding var(--between_section)
    +below(1600px) {
      padding var(--between_section--tab)
    }

    +below(1024px) {
      padding var(--between_section--mob)
    }
  }
}
</style>
