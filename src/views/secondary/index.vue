<template>
  <main class="secondary">
    <SliderComponent
      v-if="info.images"
      v-slot="{ item }"
      :items="info.images"
      :slider-options="mainSliderOptions"
      class="object-page__main-slider"
    >
      <ImgComponent :head_img="item.img" />
      <div class="block"></div>
    </SliderComponent>
    <SecondaryMainSlide v-if="info" :data="info"/>
    <SecondaryHeaderComponent v-if="info && info.length !== 0" :data="info" />
    <SecondaryDescriptionComponent :data="info" />
    <h3>Квартиры на карте</h3>
    <div class="secondary_map">
      <ArrayMapComponent v-if="flats" :addresse="flats" />
    </div>
    <GoCalcComponent />
    <SecondaryObjectComponent :data="chart" />
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
import SliderComponent from "components/slider/SliderComponent.vue";
import ImgComponent from "components/ImageComponent.vue";
import ObjectMainSlide from "../object/components/ObjectMainSlide.vue";
import SecondaryHeaderComponent from "./components/SecondaryHeaderComponent.vue";
import GoCalcComponent from "components/GoCalcComponent.vue";
import FlatFilterComponent from "../flat/list/components/FlatFilterComponent.vue";
import SECONDARY_PAGE from "@/graphql/queries/secondary_page.graphql";
import PaginationComponent from "components/PaginationComponent.vue";
import SecondaryDescriptionComponent from "./components/SecondaryDescriptionComponent.vue";
import SecondaryObjectComponent from "./components/SecondaryObjectComponent.vue";
import ArrayMapComponent from "components/ArrayMapComponent.vue";
import SecondaryMainSlide from "./components/SecondaryMainSlide.vue";

export default {
  name: "",
  metaInfo: {
    title: "Вторичные объекты",
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
  components: {
    SecondaryMainSlide,
    ArrayMapComponent,
    SecondaryObjectComponent,
    SecondaryDescriptionComponent,
    PaginationComponent,
    FlatFilterComponent,
    GoCalcComponent,
    SecondaryHeaderComponent,
    ObjectMainSlide,
    ImgComponent,
    SliderComponent,
    SECONDARY_PAGE,
  },
  async asyncData({ apollo, store, route }) {
    await apollo.defaultClient
      .query({
        query: SECONDARY_PAGE,
        variables: {
          first: 9,
          orderBy: "ASC",
          object_home_id: parseInt(route.params.id),
          min_price: parseInt(0),
          max_price: parseInt(20000000),
        },
      })
      .then(({ data }) => {
        store.state.secondary_page.secondaryobject = data.secondaryobject;
        store.state.secondary_page.charts_item = data.charts_item;
        store.state.secondary_page.apartments = data.apartments_paginate;
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
      });
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
          query: SECONDARY_PAGE,
          variables: {
            page: 1,
            first: this.first,
            min_price: parseInt(someData.min),
            max_price: parseInt(someData.max),
            orderBy: someData.value,
            number_rooms: someData.room,
            studio: someData.studio,
          },
        })
        .then(({ data }) => {
          this.$store.state.secondary_page.apartments = data.apartments_paginate;
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
          query: SECONDARY_PAGE,
          variables: {
            page: 1,
            first: this.first,
            min_price: parseInt(someData.min),
            max_price: parseInt(someData.max),
            orderBy: someData.value,
            number_rooms: someData.room,
            studio: someData.studio,
          },
        })
        .then(({ data }) => {
          this.$store.state.secondary_page.apartments = data.apartments_paginate;
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
          query: SECONDARY_PAGE,
          variables: {
            page: 1,
            first: this.first,
            min_price: parseInt(someData.min),
            max_price: parseInt(someData.max),
            orderBy: someData.value,
            number_rooms: someData.room,
            studio: someData.studio,
          },
        })
        .then(({ data }) => {
          this.$store.state.secondary_page.apartments = data.apartments_paginate;
        });
    },
    async reload(page = 1) {
      await this.$apolloProvider.defaultClient
        .query({
          query: SECONDARY_PAGE,
          variables: {
            page: page,
            first: this.first,
            min_price: this.min_price,
            max_price: this.max_price,
            orderBy: this.orderBy,
            number_rooms: this.number_rooms,
            studio: this.studio,
          },
        })
        .then(({ data }) => {
          this.$store.state.secondary_page.apartments = data.apartments_paginate;
          this.page = page;
        });
    },

  },

  computed: {
    info() {
      return this.$store.state.secondary_page.secondaryobject;
    },
    chart() {
      return this.$store.state.secondary_page.charts_item;
    },
    flats() {
      return this.$store.state.secondary_page.apartments.data;
    },
    total() {
      return this.$store.state.secondary_page.apartments.paginatorInfo.total;
    },
  },
  data() {
    return {
      mainSliderOptions: {
        slidesPerView: 1,
        initialSlide: 0,
        mousewheelControl: true,
        keyboardControl: true,
        autoplay: {
          delay: 3000,
          // disableOnInteraction: false,
        },
        speed: 3000,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        visible: true,
        effect: "fade",
        preloadImages: false,
        loop: true,
        lazy: {
          loadOnTransitionStart: true,
        },
      },

      first: 9,
      page: 1,
      min_price: parseInt(0),
      max_price: parseInt(20000000),
      number_rooms: null,
      studio: null,
      orderBy: "ASC",
    };
  },
};
</script>

<style lang="stylus">
.secondary {
  .swiper-pagination {
    display flex
    gap 10px
    justify-content space-between
    padding 0 160px
    position relative !important
    bottom: 50px !important
    +below(1600px) {
      padding 0 80px
    }
    +below(1024px) {
      padding 0 20px
      bottom: 30px !important
    }

    &-bullet {
      background: var(--white);
      opacity: 0.3;
      border-radius: 5px;
      width: 100%;
      height: 5px;

      &-active {
        opacity: 1
      }
    }

  }

  &_map {
    width: 100%;
    box-sizing: border-box;
    z-index 10

    .map-modal {
      width: 100%;
      box-sizing: border-box;

      +below(1400px) {
        height: 350px;
      }
      +below(1100px) {
        height: 200px;
      }

      .ymaps-2-1-79-map {
        z-index 10
      }

      .ymap-container {
        box-sizing: border-box;
        height: 490px;

        +below(1400px) {
          height: 350px;
        }

        +below(1100px) {
          height 200px
        }

      }
    }

    .ymaps-2-1-79-inner-panes {
      border-radius: 10px;
    }

    .ymaps-2-1-79-map-bg {
      border-radius: 10px;
    }
  }

  h3 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    padding var(--between_section)
    +below(1600px) {
      padding var(--between_section--tab)
    }
    +below(1024px) {
      font-size: 1.375em;
      line-height: 34px;
      padding var(--between_section--mob)
    }
  }

}

.block {
  width: 100%;
  height: 750px;
  position: absolute;
  background var(--dark)
  opacity: 0.5;
  top: 0;
  z-index: 1;
  +below(1024px) {
    height 485px
  }
}

</style>
