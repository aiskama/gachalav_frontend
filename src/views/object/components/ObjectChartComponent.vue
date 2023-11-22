<template>
  <div v-if="data && data.length !== 0" class="object_chart">
    <div class="object_chart__content">
      <h3 v-if="data && data.length !== 0">График роста цен и спрос на объект</h3>
      <ChartComponent
        v-if="data && data.length !== 0"
        :data="charts_item"
        class="object_chart__content-item"
      />
      <SliderComponent
        v-if="slider && slider.length"
        v-slot="{ item, i }"
        :items="slider"
        :slider-options="chartSliderOptions"
        class="object_chart__content-slider"
        title="Ход строительства"
      >
        <div class="object_chart__content-slider_item" @click="openPhotoModal(i)">
          <span v-if="item.start_date !== null">{{ item.start_date | humanDate }} </span>
          <ImgComponent :head_img="item.img" />
        </div>
      </SliderComponent>
    </div>
  </div>
</template>
<script>
import ChartComponent from "components/ChartComponent.vue";
import SliderComponent from "components/slider/SliderComponent.vue";
import ImgComponent from "components/ImageComponent.vue";
import PhotoModal from "components/modals/components/PhotoModal.vue";

export default {
  name: "ObjectChartComponent",
  components: {
    ImgComponent,
    SliderComponent,
    ChartComponent,
  },
  props: {
    data: Object,
  },
  computed: {
    slider() {
      return this.$store.state.object_item.object_homes_item.construction_slider;
    },
    charts_item() {
      return this.$store.state.object_item.charts_item.indicators;
    },
  },
  methods: {
    openPhotoModal(index) {
      this.$store.state._modals.push({
        component: PhotoModal,
        options: {
          index,
          slider: this.slider,
        },
      });
    },
  },
  data() {
    return {
      chartSliderOptions: {
        pagination: false,
        spaceBetween: 40,
        preloadImages: true,
        loop: true,
        initialSlide: 0,
        // lazy: {
        //   loadOnTransitionStart: true,
        // },
        breakpoints: {
          0: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          1025: {
            slidesPerView: 3.1,
          },
          1300: {
            slidesPerView: 4,
          },
          1500: {
            slidesPerView: 4.5,
          },
        },
      },
    };
  },
};
</script>
<style lang="stylus">
.object_chart {
  padding var(--between_section)
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding 20px 0
  }

  h3 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    +below(1024px) {
      font-size: 1.375em;
      line-height: 34px;
    }
  }

  &__content {
    display flex
    flex-direction column
    transition var(--transition)
    gap 42px
    background var(--white)
    padding 50px
    border-radius var(--main_radius)
    +below(1024px) {
      padding 15px 20px
      gap 20px
    }


    span {
      padding 5px 10px
      background var(--main)
      color var(--white)
      font-size 0.725em
      z-index 22
      top: 110px;
      left: 0;
      position absolute
      +below(1024px) {
        top 10px

      }
    }


    &-slider {
      &_item {
        cursor pointer
      }

      .slider__title {
        font-weight 600
      }

      .swiper-3d {
        height: 253px;
      }

      .slider__items {
        background-color var(--white)
      }

      .slider__title {
        padding 0
      }

      .swiper-slide {
        display: flex;
        align-items: flex-end;
      }

      .swiper-wrapper {
        height: 250px;
        padding 0
        +below(1024px) {
          height: 100%;
        }
      }

      .slider__header {
        +below(1024px) {
          padding-bottom 13px
        }
      }

      .swiper-slide-active {
        //margin-right 100px !important
        //transform scale(1.3) !important

        .object_chart__content-slider_item {
          height: 250px;
          width: 400px;

          span {
            top 10px
          }
          +below(1024px) {
            height: 100%;
            width: 100%;
          }
        }
        margin-right 190px !important
        margin-left: 5px;
        +below(1024px) {
          height: 100%;
          margin 0
          margin-right 15px !important
        }
      }

      &_item {
        width: 261px;
        height: 160px;
        //padding 40px
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        +below(1024px) {
          width: auto;
          height auto
          padding 0
        }

        .img {
          //width 100%
          height 100%
          object-fit cover
          //height: 160px;
          border-radius 10px
          position relative
          z-index -1
          +below(1024px) {
            width 100%
            height 100%
          }
        }

        &-tags {
          display none
          gap 20px

          .btn {
            background var(--gray)
          }
          +below(1024px) {
            padding 15px
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      }
    }

    &-item {
      height 550px
      transition var(--transition)
      +below(1024px) {
        height 157px
      }
    }

    .slider__title {
      font-weight: 700;
      font-size: 1.625em;
      line-height: 46px;
      color: var(--dark);
      padding 0
      +below(1024px) {
        font-size: 1.375em;
        line-height: 34px;
      }
    }
  }
}
</style>
