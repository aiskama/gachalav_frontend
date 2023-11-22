<template>
  <div v-if="data && data.length !== 0" class="object_chart">
    <div class="object_chart__content">
      <h2>График роста цен и спрос на объект</h2>
      <ChartComponent
        v-if="data && data.length !== 0"
        :data="charts_item"
        class="object_chart__content-item"
      />
    </div>
  </div>
</template>
<script>
import ChartComponent from "components/ChartComponent.vue";

export default {
  components: {
    ChartComponent,
  },
  props: {
    data: Object,
  },
  computed: {
    charts_item() {
      return this.$store.state.secondary_page.charts_item.indicators;
    },
  },
  data() {
    return {
      sliderOptions: {
        slidesPerView: 4,
        spaceBetween: 40,
        pagination: false,
        preloadImages: true,
        loop: true,
        centeredSlides: false,
        // autoHeight: true,
        initialSlide: 0,
        // freeModeFluid:true,
        effect: false,
        // coverflowEffect:{
        //   rotate: 0,
        //   stretch: 5,
        //   depth: 10,
        //   modifier: 1,
        //   slideShadows: false,
        // },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          1025: {
            slidesPerView: 4,
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
    padding var(--between_section--mob)
  }

  &__content {
    display flex
    flex-direction column
    gap 40px
    background var(--white)
    padding 50px
    border-radius var(--main_radius)
    +below(1024px) {
      padding 15px 20px
    }

    .img {
      height: 160px;
      width: 100%;
    }

    &-slider {
      .swiper-3d {
        height: 253px;
      }

      .slider__items {
        background-color var(--white)
      }

      .swiper-slide-active {
        margin-right 100px !important

        img {
          margin-right 40px
          transform scale(1.5) !important
          +below(1024px) {
            transform scale(1) !important
          }
        }
      }

      &_item {
        width: 300px;
        height: 300px;
        padding 40px
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
          width: 100%;
          height: 100%;
          object-fit cover
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
      +below(1024px) {
        height 157px
      }
    }

    h2 {
      font-weight: 700;
      font-size: 2.125em;
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
