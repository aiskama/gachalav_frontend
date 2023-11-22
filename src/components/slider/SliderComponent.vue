<template>
  <section>
    <div v-if="items && items.length" class="slider">
      <div class="slider__container">
        <div v-if="title" class="slider__header">
          <div class="slider__header--right">
            <h3 class="slider__title">{{ title }}</h3>
            <SliderArrowsComponent
              v-if="swiper && !hideArrows"
              @left="swiper.slidePrev()"
              @right="swiper.slideNext()"
            />
          </div>
          <button v-if="btn" class="btn btn--gray">Онлайн-консультант</button>
        </div>
        <div class="slider__items">
          <div class="swiper" ref="items">
            <div class="swiper-wrapper">
              <div v-for="(item, i) in items" :key="i" class="swiper-slide">
                <slot :i="i" :item="item"></slot>
              </div>
            </div>
            <div v-if="sliderOptions.pagination" class="swiper-pagination" ref="pagination"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SliderArrowsComponent from "@/components/slider/SliderArrowsComponent.vue";
// import { Pagination } from "swiper";
export default {
  name: "SliderComponent",
  props: {
    title: String,
    buttonTitle: String,
    items: Array,
    btn: String,
    hideArrows: Boolean,
    route: {
      type: Object,
      default() {
        return {
          name: "",
        };
      },
    },
    sliderOptions: {
      type: Object,
      default() {
        return {
          slidesPerView: "auto",
          spaceBetween: 24,
          pagination: false,
          clickable: false,
        };
      },
    },
  },
  data() {
    return {
      swiper: null,
    };
  },
  mounted() {

    require(["swiper/swiper-bundle.esm.browser.js"], ({ Swiper }) => {

      this.swiper = new Swiper(this.$refs.items, {...this.sliderOptions, pagination: {
          el: this.$refs.pagination,
          clickable: true,
        },
      });
    });
  },
  components: { SliderArrowsComponent },
};
</script>

<style lang="stylus">
@import '~swiper/swiper-bundle.min.css';

.swiper-wrapper {
  padding: 20px 0;
}

.slider {
  display: flex;
  justify-content: center;
  align-items: center;

  &__items {
    position: relative;
    width: 100%;
    background-color: var(--gray);

    &__footer {
      margin: -100px 0 0 189px;
      display: flex;
      align-items: center;

      +below(1800px) {
        margin -100px 50px 0 50px
      }
      +below(1024px) {
        margin: 0;
      }
    }
  }

  &__container {
    width: 100%;
    // background-color var(--gray)
  }

  &__header {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 24px;
    font-weight: 600;
    box-sizing border-box
    justify-content: space-between;

    +below(1024px) {
      display: flex
      justify-content: space-between
      margin-bottom: 0 !important

      .btn {
        width: 100%;
        justify-content: center;
      }

    }

    &--right {
      display flex
      width: 100%;
      justify-content space-between
    }
  }

  &__title {
    font-weight: 700;
    font-size: 1.625em;
    color: var(--dark);
    line-height: 32px;
    display: flex;
    align-items: center;
    margin: 0;
    -webkit-line-clamp: 2
    line-clamp: 2
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;

    +below(1024px) {
      font-size: 1.375em;
    }
  }
}
</style>
