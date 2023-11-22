<template>
  <main class="flats_main">
    <PageDescriptionComponent :data="description" />
    <FlatFilterComponent
      :data="flats"
      @filter="filter"
      @filterByOrder="filterByOrder"
      @filterRoom="filterRoom"
    />
    <PaginationComponent
      v-if="Math.ceil(total / first) > 1"
      :page="page"
      :total="Math.ceil(total / first)"
      @change="reload"
    />
  </main>
</template>

<script>
import FLATS_PAGE from "@/graphql/queries/flats_page.graphql";
import PageDescriptionComponent from "components/PageDescriptionComponent.vue";
import FlatFilterComponent from "./components/FlatFilterComponent.vue";
import PaginationComponent from "components/PaginationComponent.vue";

export default {
  name: "FlatListPage",
  metaInfo: {
    title: "Квартиры",
    titleTemplate: "%s | Gachalav Group",
    test: [],
    meta: [
      {
        vmid: "keywords",
        name: "keywords",
        content: "",
      },
      {
        vmid: "description",
        name: "description",
        content: "Продажа недвижимости в новостройках г. Дербент, республики Дагестан. Цена на квартиры в наших новостройках начинается от 934 тысяч рублей + мат. капитал.",
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
  components: { FlatFilterComponent, PageDescriptionComponent, PaginationComponent },
  data() {
    return {
      description: {
        title: 'Квартиры в "' + this.$store.state.flats_page.object_homes_item.title + '"',
      },
      first: 9,
      page: 1,
      min_price: 0,
      max_price: 20000000,
      number_rooms: null,
      studio: null,
      orderBy: "ASC",
    };
  },
  async asyncData({ apollo, store, route }) {
    await apollo.defaultClient
      .query({
        query: FLATS_PAGE,
        variables: {
          first: 9,
          orderBy: "ASC",
          object_home_id: parseInt(route.params.id),
          min_price: 0,
          max_price: 20000000,
        },
      })
      .then(({ data }) => {
        store.state.flats_page.apartments = data.apartments_paginate;
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.flats_page.object_homes_item = data.object_homes_item;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
      });
  },
  computed: {
    flats() {
      return this.$store.state.flats_page.apartments.data;
    },
    object_homes() {
      return this.$store.state.flats_page.object_homes_item.title;
    },
    total() {
      return this.$store.state.flats_page.apartments.paginatorInfo.total;
    },
  },
  methods: {
    async filterByOrder(someData) {
      this.number_rooms = someData.room;
      this.studio = someData.studio;
      this.orderBy = someData.value;
      this.min_price = parseInt(someData.min);
      this.max_price = parseInt(someData.max);
      this.page = 1;
      await this.$apolloProvider.defaultClient
        .query({
          query: FLATS_PAGE,
          variables: {
            page: 1,
            first: this.first,
            object_home_id: parseInt(this.$route.params.id),
            min_price: parseInt(someData.min),
            max_price: parseInt(someData.max),
            orderBy: someData.value,
            number_rooms: someData.room,
            studio: someData.studio,
          },
        })
        .then(({ data }) => {
          this.$store.state.flats_page.apartments = data.apartments_paginate;
        });
    },
    async filterRoom(someData) {
      this.number_rooms = someData.room;
      this.studio = someData.studio;
      this.orderBy = someData.value;
      this.min_price = parseInt(someData.min);
      this.max_price = parseInt(someData.max);
      this.page = 1;
      await this.$apolloProvider.defaultClient
        .query({
          query: FLATS_PAGE,
          variables: {
            page: 1,
            first: this.first,
            object_home_id: parseInt(this.$route.params.id),
            min_price: parseInt(someData.min),
            max_price: parseInt(someData.max),
            orderBy: someData.value,
            number_rooms: someData.room,
            studio: someData.studio,
          },
        })
        .then(({ data }) => {
          this.$store.state.flats_page.apartments = data.apartments_paginate;
        });
    },
    async filter(someData) {
      this.number_rooms = someData.room;
      this.studio = someData.studio;
      this.orderBy = someData.value;
      this.min_price = parseInt(someData.min);
      this.max_price = parseInt(someData.max);
      this.page = 1;
      await this.$apolloProvider.defaultClient
        .query({
          query: FLATS_PAGE,
          variables: {
            page: 1,
            first: this.first,
            object_home_id: parseInt(this.$route.params.id),
            min_price: parseInt(someData.min),
            max_price: parseInt(someData.max),
            orderBy: someData.value,
            number_rooms: someData.room,
            studio: someData.studio,
          },
        })
        .then(({ data }) => {
          this.$store.state.flats_page.apartments = data.apartments_paginate;
        });
    },
    async reload(page = 1) {
      await this.$apolloProvider.defaultClient
        .query({
          query: FLATS_PAGE,
          variables: {
            page: page,
            first: this.first,
            object_home_id: parseInt(this.$route.params.id),
            min_price: this.min_price,
            max_price: this.max_price,
            orderBy: this.orderBy,
            number_rooms: this.number_rooms,
            studio: this.studio,
          },
        })
        .then(({ data }) => {
          this.$store.state.flats_page.apartments = data.apartments_paginate;
          this.page = page;
        });
    },
  },
};
</script>
<style lang="stylus">
.page_description__text {
  max-width 100%
  padding: 185px 0 115px 160px;
  +below(1600px) {
    padding: 185px 0 90px 80px;
  }
  +below(1024px) {
    padding 190px 20px 67px 20px
  }
}
</style>
