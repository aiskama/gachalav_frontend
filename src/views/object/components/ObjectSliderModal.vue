<template>
  <section v-if="items && items.length" class="slider">
    <div class="slider__container_object">
      <div class="slider__items">
        <div ref="modalSlider" class="swiper">
          <div class="swiper-wrapper">
            <div v-for="item in items" :key="item.id" class="swiper-slide">
              <ObjectSlideModal :data="item.img" />
            </div>
          </div>
        </div>
        <div class="slider-button">
          <button class="slider-button__prev" title="Влево" type="button" @click="swiper.slidePrev()">
            <IconComponent name="arrow_left" />
          </button>
          <button class="slider-button__next" title="Вправо" type="button" @click="swiper.slideNext()">
            <IconComponent name="arrow_right" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ObjectSlideModal from "./ObjectSlideModal.vue";
import IconComponent from "components/IconComponent.vue";

export default {
  name: "ObjectSliderModal",
  props: {
    index: {
      type: Number,
      default: 0,
    },
    title: String,
    buttonTitle: String,
    items: Array,
    hideArrows: Boolean,
    route: {
      type: Object,
      default() {
        return {
          name: "",
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
      this.swiper = new Swiper(this.$refs.modalSlider, {
        loop: true,
        autoHeight: true,
        slidesPerView: 1,
        pagination: false,
        clickable: true,
        preloadImages: true,
      });
      this.swiper.slideTo(this.index + 1, 0);
    });
  },
  components: { ObjectSlideModal, IconComponent },
};
</script>

<style lang="stylus">
@import '~swiper/swiper-bundle.min.css';
.slider-button {

  &__prev {
    position: fixed;
    top: 50vh;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 120px;

    +below(1200px) {
      left 30px
    }
    +below(600px) {
      display none
    }

    .icon {
      width 70px
      height 70px

      svg path {
        fill var(--dark_light)
      }
    }
  }

  &__next {
    position: fixed;
    top: 50vh;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 120px;

    +below(1200px) {
      right 30px
    }
    +below(600px) {
      display none
    }

    .icon {
      width 70px
      height 70px

      svg path {
        fill var(--dark_light)
      }
    }

  }
}

.slider {
  display: flex;
  justify-content: center;
  align-items: center;

  &__background {
    display: flex;
    flex-direction: column;
    background: var(--gray-1);

    // +below(1400px) {
    //   padding: 60px 80px;
    // }

    // +below(1100px) {
    //   padding: 60px 15px;
    // }
  }

  &__items {
    position: relative;
    width: 100%;

    &__footer {
      margin: -100px 0 0 189px;
      display: flex;
      align-items: center;
    }
  }

  &__title {
    font-weight: 500;
    font-size: 1.875em;
    line-height: 35px;
    padding-bottom: 60px;
    color: var(--blue-o5);

    +below(1100px) {
      font-size: 1.25em;
    }
  }

  &__container_object {
    width: 100%;
    padding: 60px 100px;

    +below(1400px) {
      padding: 60px 80px;
    }

    +below(1100px) {
      padding: 30px 15px;
    }
  }
}
</style>
