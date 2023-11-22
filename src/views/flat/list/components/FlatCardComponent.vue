<template>
  <router-link :to="{ name: 'flat', params: { id: data.id } }" class="flat_card" v-if="data">
    <div class="flat_card__header">
      <span v-if="data.title" class="flat_card__header-title">{{ data.title }}</span>
      <div class="flat_card__header-subtitle">
        <span v-if="data.frame && data.floor" class="flat_card__header-subtitle__floor"
          >Корпус {{ data.frame }}, Этаж {{ data.floor }}</span
        >
        <span v-if="data.settlement" class="flat_card__header-subtitle__check"
          >Заселение до {{ data.settlement | formatDate }}</span
        >
      </div>
    </div>
    <div v-if="data.img" class="flat_card__img">
      <ImageComponent :head_img="data.img" />
    </div>
    <div class="flat_card__footer">
      <div class="flat_card__footer-text">
        <span v-if="data.price" class="flat_card__footer-text__title">
          От {{ data.price | formatNumber }} ₽
        </span>
        <span v-if="data.price_sq" class="flat_card__footer-text__subtitle">
          или от {{ data.price_sq | formatNumber }} ₽ за м²
        </span>
      </div>
      <button class="btn btn--circle">
        <IconComponent name="arrow_check_right" />
      </button>
    </div>
  </router-link>
</template>
<script>
import IconComponent from "components/IconComponent.vue";
import ImageComponent from "components/ImageComponent.vue";

export default {
  name: "FlatCardComponent",
  components: { IconComponent, ImageComponent },
  props: {
    data: Object,
  },
};
</script>
<style lang="stylus">
.flat_card {
  display flex
  flex-direction column
  padding 20px
  gap 20px
  background var(--white)
  border-radius var(--main_radius)

  &__header {
    display flex
    flex-direction column
    gap 10px

    &-title {
      font-weight: 700;
      font-size: 1.625em;
      line-height: 31px;
      color: var(--dark);
      +below(1024px) {
        font-size 1.375em
        line-height: 27px;
      }
    }

    &-subtitle {
      display flex
      justify-content: space-between;
      align-items: center;
      //gap 100px
      +below(1024px) {
        gap 0
      }

      &__floor {
        font-weight: 400;
        font-size: 1em;
        line-height: 26px;
        color: var(--dark_light);
        +below(1024px) {
          font-size: 0.875em;
          line-height: 22px;
        }
      }

      &__check {
        font-weight: 400;
        font-size: 0.875em;
        line-height: 22px;
        color: var(--dark_light);
        +below(1024px) {
          font-size: 0.875em;
          line-height: 22px;
        }
      }
    }
  }

  &__img {
    max-height: 260px;

    .img {
      width 100%
      height 100%
      object-fit: contain;
    }
  }

  &__footer {
    display flex
    justify-content: space-between;
    align-items: center;

    &-text {
      display flex
      flex-direction column
      gap 10px
      +below(1024px) {
        gap 5px
      }

      &__title {
        font-weight: 700;
        font-size: 1.375em;
        line-height: 34px;
        color: var(--dark);
        +below(1024px) {
          font-size: 1.875em;
          line-height: 28px;
        }
      }

      &__subtitle {
        font-weight: 300;
        font-size: 1em;
        line-height: 26px;
        color: var(--dark_light);
        +below(1024px) {
          font-size: 0.875em;
          line-height: 26px;
        }
      }
    }
  }
}
</style>
