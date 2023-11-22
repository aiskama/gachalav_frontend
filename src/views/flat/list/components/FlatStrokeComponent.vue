<template>
  <router-link :to="{ name: 'flat', params: { id: data.id } }" class="flat_stroke" v-if="data">
    <div class="flat_stroke--left">
      <div class="flat_stroke__img">
        <ImageComponent :head_img="data.img" />
      </div>
      <div class="flat_stroke__header">
        <span class="flat_stroke__header-title">{{ data.title }}</span>
        <div class="flat_stroke__header-subtitle">
          <span v-if="data.frame && data.floor" class="flat_stroke__header-subtitle__floor">
            Корпус {{ data.frame }}, Этаж {{ data.floor }}
          </span>
          <span v-if="data.settlement" class="flat_stroke__header-subtitle__check">
            Заселение до {{ data.settlement | formatDate }}
          </span>
        </div>
      </div>
    </div>
    <div class="flat_stroke--left">
      <div class="flat_stroke__footer">
        <div v-if="data.price" class="flat_stroke__footer-text">
          <span class="flat_stroke__footer-text__price"> Стоимость </span>
          <span class="flat_stroke__footer-text__number">от {{ data.price | formatNumber }} ₽</span>
        </div>
        <div v-if="data.price_sq" class="flat_stroke__footer-text">
          <span class="flat_stroke__footer-text__part_price"> Цена за м² </span>
          <span class="flat_stroke__footer-text__number">от {{ data.price_sq | formatNumber }} ₽</span>
        </div>
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
  name: "FlatStrokeComponent",
  components: { IconComponent, ImageComponent },
  props: {
    data: Object,
  },
};
</script>
<style lang="stylus">
.flat_stroke {
  display flex
  align-items: center;
  padding 25px 50px
  width 100%
  gap 100px
  justify-content: space-between;
  background var(--white)
  border-radius var(--main_radius)
  transition var(--transition)
  cursor pointer
  +below(1024px) {
    padding 15px 11px
    gap 15px
    flex-direction column
    align-items start
  }

  &:hover {
    transform scale(1.08)

    .btn {
      background var(--main)
    }

    .flat_stroke__header-title {
      color var(--main)
    }
  }

  &--left {
    display flex
    align-items: center;
    width: 50%;
    justify-content space-between
    +below(1024px) {
      width: 100%;
    }
  }


  &__header {
    display flex
    flex-direction column
    gap 10px

    &-title {
      font-weight: 700;
      font-size: 1.625em;
      line-height: 31px;
      color: var(--dark);
      transition var(--transition)
      +below(1024px) {
        font-size 1.375em
        line-height: 27px;
      }
    }

    &-subtitle {
      display flex
      justify-content: space-between;
      align-items: center;
      gap 30px
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
    max-height: 90px;
    object-fit: contain;

    .img {
      max-height: 90px;
      width 90px
      height 100%
    }
  }

  &__footer {
    display flex
    justify-content: space-between;
    flex-direction column
    gap 10px

    &-text {
      display flex
      gap 10px

      &__price {
        font-weight: 400;
        font-size: 1.125em;
        line-height: 28px;
        color: var(--dark);
      }

      &__part_price {
        ont-weight: 400;
        font-size: 1em;
        line-height: 26px;
        color: var(--dark_light);
      }

      &__number {
        font-weight: 700;
        font-size: 1.125em;
        line-height: 28px;
        color: var(--dark);
      }

    }
  }
}
</style>
