<template>
  <main class="home-page">
    <h1>СК Gachalav group | Инвестиционно привлекательная недвижимость</h1>
    <SliderComponent
      v-slot="{ item }"
      :items="galleryWorks"
      :slider-options="mainSliderOptions"
      class="home-page__main-slider"
    >
      <HomeMainSlideComponent :data="item" />
    </SliderComponent>
    <HomeBlocksComponent class="mobile" />
    <HomeBlocksMobileComponent class="desktop" />
    <HomeObjectsComponent :data="objectHomes" />
    <HomePresentationComponent />
    <HomeNewsBlockComponent :data="news" />
    <HomeAwardsComponent :data="info_files" />
  </main>
</template>

<script>
import HomeMainSlideComponent from "./components/HomeMainSlideComponent.vue";
import HomeBlocksComponent from "./components/HomeBlocksComponent.vue";
import HomeNewsBlockComponent from "./components/HomeNewsBlockComponent.vue";
import SliderComponent from "components/slider/SliderComponent.vue";
import HomePresentationComponent from "./components/HomePresentationComponent.vue";
import HomeObjectsComponent from "./components/HomeObjectsComponent.vue";
import HOME_PAGE from "@/graphql/queries/home_page.graphql";
import HomeAwardsComponent from "./components/HomeAwardsComponent.vue";
import HomeBlocksMobileComponent from "./components/HomeBlocksMobileComponent.vue";

export default {
  metaInfo: {
    title: "Главная",
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
        content: "Продажа недвижимости в новостройках " +
          "г. Дербент, республики Дагестан. " +
          "Цена на квартиры в наших " +
          "новостройках начинается от 934 тысяч рублей + мат. капитал.",
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
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: HOME_PAGE,
        variables: {
          first: 6,
          conclusion: true,
        },
      })
      .then(({ data }) => {
        store.state.home_page.gallery_works = data.gallery_works;
        store.state.home_page.object_homes = data.object_homes_paginate;
        store.state.home_page.news = data.news_paginate;
        store.state.home_page.info_files = data.info_files;
        store.state.home_page.info = data.info;
        store.state.home_page.secondaryobject = data.secondaryobject;
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
      });
  },
  computed: {
    galleryWorks() {
      return this.$store.state.home_page.gallery_works[0].images;
    },
    objectHomes() {
      return this.$store.state.home_page.object_homes.data;
    },
    news() {
      return this.$store.state.home_page.news.data;
    },
    info_files() {
      return this.$store.state.home_page.info_files;
    },
  },

  components: {
    HomeBlocksMobileComponent,
    HomeAwardsComponent,
    HomeMainSlideComponent,
    HomeBlocksComponent,
    HomeNewsBlockComponent,
    SliderComponent,
    HomePresentationComponent,
    HomeObjectsComponent,
  },
  data() {
    return {
      slideBlocks: [
        { icon: "star", title: "Лидер рейтинга Interdag.ru" },
        { icon: "star", title: "Сертификат качества Технониколь" },
        { icon: "star", title: "Сертификат качества Caparol" },
        { icon: "star", title: "Диплом 2gis. Отличное место" },
      ],
      mainSliderOptions: {
        slidesPerView: 1,
        initialSlide: 0,
        mousewheelControl: true,
        keyboardControl: true,
        autoplay: {
          delay: 4000,
          // disableOnInteraction: false,
        },
        speed: 1000,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        loop: true,
        lazy: {
          loadOnTransitionStart: true,
        },
      },
    };
  },
};
</script>

<style lang="stylus">
.home-page {
    h1{
      display none
    }
  .home-page__main-slider{
    .swiper-pagination {
      display flex
      gap 10px
      justify-content space-between
      padding 0 160px
      position relative !important
      bottom: 60px !important
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


  }

  &__main-slider .swiper-wrapper {
    padding: 0;
  }

  .btn {
    font-weight: 400;
  }

  .desktop {
    +above(1025px) {
      display: none;
    }
  }

  .mobile {
    +below(1024px) {
      display: none;
    }
  }
}
</style>
