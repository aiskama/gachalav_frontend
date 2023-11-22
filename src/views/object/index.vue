<template>
  <main class="object_main">
    <SliderComponent
      v-if="mainSlider && mainSlider"
      v-slot="{ item }"
      :items="mainSlider"
      :slider-options="mainSliderOptions"
      class="object-page__main-slider"
    >
      <ImgComponent :head_img="item.img"/>
      <div class="block"></div>
    </SliderComponent>
    <ObjectMainSlide :data="info"/>
    <ObjectHeaderComponent :data="info"/>
    <ObjectTabComponent :data="info"/>
    <GoCalcComponent/>
    <ObjectImagesComponent
      v-if="lifeObject && lifeObject.length !== 0"
      :data="lifeObject"
      :description="info"
    />
    <ObjectChartComponent :data="charts_item"/>
    <ObjectsCalculatorComponent/>
    <ObjectAwardsComponent v-if="awards && awards.length" :data="awards"/>
    <ObjectAboutComponent/>
    <ObjectNumbersComponent :data="blocks"/>
    <ObjectReportComponent v-if="file && file.length" :data="file"/>
    <ObjectPresentationComponent/>
  </main>
</template>

<script>
import ObjectsCalculatorComponent from "@/views/objects/components/ObjectsCalculatorComponent.vue";
import OBJECT_ITEM from "@/graphql/queries/object_item.graphql";
import SliderComponent from "components/slider/SliderComponent.vue";
import ObjectMainSlide from "./components/ObjectMainSlide.vue";
import ObjectImagesComponent from "./components/ObjectImagesComponent.vue";
import GoCalcComponent from "components/GoCalcComponent.vue";
import ObjectPresentationComponent from "./components/ObjectPresentationComponent.vue";
import ObjectTabComponent from "./components/ObjectTabComponent.vue";
import ObjectAboutComponent from "./components/ObjectAboutComponent.vue";
import ObjectHeaderComponent from "./components/ObjectHeaderComponent.vue";
import ObjectChartComponent from "./components/ObjectChartComponent.vue";
import ObjectNumbersComponent from "./components/ObjectNumbersComponent.vue";
import ObjectReportComponent from "./components/ObjectReportComponent.vue";
import ImgComponent from "components/ImageComponent.vue";
import ObjectAwardsComponent from "./components/ObjectAwardsComponent.vue";

export default {
  name: "ObjectPage",
  async asyncData({apollo, store, route}) {
    await apollo.defaultClient
      .query({
        query: OBJECT_ITEM,
        variables: {
          id: parseInt(route.params.id),
        },
      })
      .then(({data}) => {
        store.state.object_item.object_homes_item = data.object_homes_item;
        store.state.object_item.info = data.info;
        store.state.object_item.charts_item = data.charts_item;
        store.state.object_item.info_files = data.info_files;
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
      });
  },
  computed: {
    mainSlider() {
      return this.$store.state.object_item.object_homes_item.images;
    },
    info() {
      return this.$store.state.object_item.object_homes_item;
    },
    lifeObject() {
      return this.$store.state.object_item.object_homes_item.object_life;
    },
    blocks() {
      return this.$store.state.object_item.info.indicator.slice(0, 4);
    },
    file() {
      return this.$store.state.object_item.object_homes_item.operating_permit;
    },
    charts_item() {
      return this.$store.state.object_item.charts_item;
    },
    awards() {
      return this.$store.state.object_item.info_files.slice(0, 5);
    },
  },
  components: {
    ObjectAwardsComponent,
    ImgComponent,
    ObjectReportComponent,
    ObjectNumbersComponent,
    ObjectChartComponent,
    ObjectHeaderComponent,
    SliderComponent,
    ObjectMainSlide,
    ObjectImagesComponent,
    GoCalcComponent,
    ObjectPresentationComponent,
    ObjectTabComponent,
    ObjectAboutComponent,
    ObjectsCalculatorComponent,
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
    };
  },
  metaInfo() {
    return {
      title: this.info ? this.info.title.title : "Инвистиционный объект",
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

.object_main {
  .swiper-pagination {
    display flex
    gap 10px
    justify-content space-between
    padding 0 160px
    position relative !important
    bottom: 65px !important
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


  .mers_block {
    +below(1024px) {
      margin 0 20px
    }
  }

  .objects_calculator {
    padding 70px 160px 0px 160px
    +below(1600px) {
      padding var(--between_section--tab)
    }
    +below(1024px) {
      padding 11px 20px 20px 20px
    }
  }
}

.html5-video-player {
  display: none !important
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
