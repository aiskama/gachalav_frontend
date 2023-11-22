<template>
  <div class="object_block">
    <span v-if="data.title" class="object_block__title">{{ data.title }}</span>
    <div class="object_block__subtitle"
    >
      <span
        v-if="data.left"
      >Осталось:
        <span
          v-if="data.left"
          :class="{
            'object_block__subtitle--red': data.left < 51,
            'object_block__subtitle--yellow': data.left > 50,
            'object_block__subtitle--green': data.left > 89,
          }"
          >{{ data.left }} кв.</span
        ></span
      >
    </div>
    <SliderComponent v-slot="{ item }" :items="data.images" :slider-options="objectSliderOptions">
      <router-link :to="{ name: 'secondary' }" class="object_block__img">
        <ImgComponent :head_img="item.img" :title="item.title" />
      </router-link>
    </SliderComponent>
    <div slot="pagination" class="object-pagination" ref="secondary"></div>
    <span v-if="data.price" class="object_block__price"> От {{ data.price }} ₽</span>
  </div>
</template>

<script>
import ImgComponent from "components/ImageComponent.vue";
import SliderComponent from "components/slider/SliderComponent.vue";

export default {
  name: "SecondaryObjectComponent",
  components: { SliderComponent, ImgComponent },
  data() {
    return {
      objectSliderOptions: {
        slidesPerView: 1,
        autoplay: {
          delay: 3000,
        },
        speed: 3000,
        pagination: {
          el: this.$refs.secondary,
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
  mounted() {},
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.object_block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color var(--dark)
  width: 100%;
  max-width: 443px;
  +below(1024px) {
    max-width: 374px;
  }

  .swiper-wrapper {
    padding 0
  }

  &__title {
    font-weight: 700;
    font-size: 1.375em;
    line-height: 34px;
    color: var(--dark);
    padding: 0 15px 0 15px;
    +below(1024px) {
      font-size: 1.125em;
      line-height: 28px;
    }
  }

  &__subtitle {
    display: flex;
    gap: 20px;
    width: max-content;
    padding: 0 15px 0 15px;
    font-weight: 700;
    font-size: 0.875em;
    line-height: 22px;
    height: 22px;
    color: var(--dark_light);

    &--red {
      color: var(--main);
      font-weight 400
    }

    &--yellow {
      color: var(--yellow);
      font-weight 400

    }

    &--green {
      color: var(--green);
      font-weight 400

    }
  }

  &__img {
    filter: drop-shadow(0px 10px 15px rgba(0, 0, 0, 0)) !important;

    img {
      border-radius: var(--main_radius);
      object-fit: cover;
      width: 100%;
      max-width: 443px;
      height: 260px;
      +below(1024px) {
        width: 310px;
        height: 220px;
      }
    }
  }

  &__price {
    font-weight: 700;
    font-size: 1.125em;
    line-height: 28px;
    color: var(--drak);
    padding: 0 15px;
  }
  .slider__container{
    +below(1024px){
      width: 310px;
      height: 220px;
    }
  }
  .swiper-pagination {
    display flex
    gap 10px
    justify-content space-between
    padding 0 35px
    position relative !important
    bottom: 35px
    z-index: 30;
    transition var(--transition)
    +below(1024px) {
      //padding 0 75px 0 3px
      bottom: 20px
    }

    .swiper-pagination-bullet {
      transition var(--transition)

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

</style>
