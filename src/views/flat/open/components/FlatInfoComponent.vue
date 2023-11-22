<template>
  <main class="flat">
    <PageDescriptionComponent :data="data" />
    <div class="flat_info">
      <div class="flat_info__left">
        <div class="flat_info__left-block">
          <ImageComponent v-if="plan" :head_img="data.img" />
          <MapComponent v-if="map" :address="data.address" />
        </div>
        <div class="flat_info__left_tab">
          <div :class="{ flat_info__left_tab_active: plan }" @click="active">
            <span>Планировка</span>
          </div>
          <div :class="{ flat_info__left_tab_active: map }" @click="active">
            <span>Корпус на карте</span>
          </div>
        </div>
      </div>
      <div class="flat_info__right">
        <div class="flat_info__right-price">
          <div class="flat_info__right-price_text">
            <div class="flat_info__right-price_text__title">
              <h3 v-if="data.price">{{ data.price | formatNumber }} ₽</h3>
              <h4 v-if="data.old_price">от {{ data.old_price | formatNumber }} ₽</h4>
            </div>
            <h5 v-if="data.price_sq">{{ data.price_sq | formatNumber }} ₽ за м²</h5>
          </div>
            <button @click="openModal" class="btn btn--circle">
              <IconComponent name="share" />
            </button>
        </div>
        <div class="flat_info__right-buttons">
          <button class="btn btn--pink" @click="openCallBackModal">Купить квартиру</button>
        </div>
        <div class="flat_info__right-text">
          <div v-if="data.square" class="flat_info__right-text__item">
            <span class="flat_info__right-text__item-title">Площадь</span>
            <span class="flat_info__right-text__item-subtitle">{{ data.square }} кв.м</span>
          </div>
          <div v-if="data.floor" class="flat_info__right-text__item">
            <span class="flat_info__right-text__item-title">Этаж</span>
            <span class="flat_info__right-text__item-subtitle">{{ data.floor }} из {{ data.floor_max }}</span>
          </div>
          <div v-if="data.frame" class="flat_info__right-text__item">
            <span class="flat_info__right-text__item-title">Корпус</span>
            <span class="flat_info__right-text__item-subtitle">{{ data.frame }}</span>
          </div>
          <div v-if="data.settlement" class="flat_info__right-text__item">
            <span class="flat_info__right-text__item-title">Заселение</span>
            <span class="flat_info__right-text__item-subtitle">до {{ data.settlement | formatDate }}</span>
          </div>
          <div v-if="data.ceiling_height" class="flat_info__right-text__item">
            <span class="flat_info__right-text__item-title">Высота потолков</span>
            <span class="flat_info__right-text__item-subtitle">{{ data.ceiling_height }} м</span>
          </div>
          <div v-if="open" class="flat_info__right-text__open">
            <div v-if="data.code" class="flat_info__right-text__item">
              <span class="flat_info__right-text__item-title">Артикул</span>
              <span class="flat_info__right-text__item-subtitle">{{ data.code }}</span>
            </div>
            <div v-if="data.code" :class="{ open: still }" class="flat_info__right-text__item close">
              <span class="flat_info__right-text__item-title">Секция</span>
              <span class="flat_info__right-text__item-subtitle">{{ data.section }}</span>
            </div>
            <div v-if="data.room" :class="{ open: still }" class="flat_info__right-text__item close">
              <span class="flat_info__right-text__item-title">Номер на этаже</span>
              <span class="flat_info__right-text__item-subtitle">{{ data.room }}</span>
            </div>
          </div>
          <button class="btn btn--gray-border" @click="still">{{ text }}</button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import IconComponent from "components/IconComponent.vue";
import ImageComponent from "components/ImageComponent.vue";
import MapComponent from "components/MapComponent.vue";
import PageDescriptionComponent from "components/PageDescriptionComponent.vue";
import CallBackModal from "components/modals/components/CallBackModal.vue";
import ShareModal from "components/modals/components/ShareModal.vue";

export default {
  name: "FlatInfoComponent",
  components: { IconComponent, ImageComponent, MapComponent, PageDescriptionComponent },
  data() {
    return {
      plan: true,
      map: false,
      open: false,
      text: "Открыть полностью",
      currentUrl: this.$store.state._env.MEDIA_ENDPOINT + this.$route.fullPath,
      network: "vk",
    };
  },
  props: {
    data: Object,
  },
  methods: {
      openModal() {
        this.$store.state._modals.push({
          component: ShareModal,
        });
      },
    active() {
      this.plan = !this.plan;
      this.map = !this.map;
    },
    still() {
      this.open = !this.open;
      if (this.open !== true) {
        this.text = "Открыть полностью";
      } else if (this.open) {
        this.text = "Скрыть";
      }
    },
    openCallBackModal() {
      this.$store.state._modals.push({
        component: CallBackModal,
      });
    },
  },
};
</script>
<style lang="stylus">
.flat {

  .page_description {
    background var(--white)
  }

  .flat_info {
    display grid
    grid-template-columns 1fr 1fr
    grid-gap 40px
    padding var(--between_section)
    transition var(--transition)
    +below(1600px) {
      padding var(--between_section--tab)
    }

    +below(1024x) {
      padding var(--between_section)
      display flex
    }

    +below(1024px) {
      padding var(--between_section--mob)
      display flex
      flex-direction column
    }


    &__left {
      display flex
      align-items: center;
      flex-direction column
      gap 20px
      transition var(--transition)

      &-block {
        padding 50px
        min-width 100%
        border-radius var(--main_radius)
        background var(--white)
        transition var(--transition)
        box-sizing: border-box;

        img {
          height 100%
          width 100%
        }

        .map-modal {
          width: 100%;
          box-sizing: border-box;

          .ymap-container {
            box-sizing: border-box;
            height: 500px;
          }
        }
      }

      &_tab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        background: var(--white-o5);
        height: 60px;
        border: 1px solid var(--gray_dark);
        backdrop-filter: blur(5px);
        border-radius: 100px;
        font-weight: 400;
        font-size: 1.125em;
        line-height: 28px;
        color: var(--dark);
        transition: var(--transition)

        div {
          cursor: pointer
          padding: 11px 20px;
          transition: var(--transition)
        }

        &_active {
          color: var(--main);
          padding: 11px 20px;
          background-color: var(--white);
          border-radius: 100px;
        }
      }
    }

    &__right {
      display flex
      flex-direction column
      gap 1px

      &-price {
        display flex
        justify-content space-between
        background var(--white)
        padding 20px
        border-radius 10px 10px 0 0

        &_text {
          display flex
          flex-direction column
          gap 10px

          &__title {
            display flex
            gap 20px
            align-items: center;

            +below(1024px) {
              align-items flex-start
              flex-direction column
              gap 5px
            }

            h3 {
              font-weight: 700;
              font-size: 2.125em;
              line-height: 46px;
              color: var(--main);
            }

            h4 {
              font-weight: 700;
              font-size: 1.375em;
              line-height: 34px;
              text-decoration-line: line-through;
              color: var(--dark_light);
            }

          }

          h5 {
            font-weight: 400;
            font-size: 1em;
            line-height: 26px;
            color: var(--dark_light);
          }
        }
      }

      &-buttons {
        display flex
        justify-content: space-between;
        align-items: center;
        gap 10px
        padding 20px
        background var(--white)

        .btn--pink {
          width 100%
        }
      }

      &-text {
        display flex
        flex-direction column
        gap 15px
        padding 20px
        align-items: center;
        background var(--white)
        border-radius 0 0 10px 10px

        &__open {
          display flex
          flex-direction column
          width 100%
          gap 10px
        }

        &__item {
          display flex
          align-items: center;
          width 100%
          justify-content space-between
          transition var(--transition)

          &-title {
            ont-weight: 400;
            font-size: 1em;
            line-height: 26px;
            color: var(--dark);
          }

          &-subtitle {
            font-weight: 700;
            font-size: 1em;
            line-height: 26px;
            color: var(--dark);

          }
        }

        .btn--gray-border {
          color var(--dark_light)
          //+below(700px) {
          // width 100%
          //}
        }
      }
    }

    .btn--circle {
      background var(--gray)
    }

    .close {
      visibility: hidden;
      opacity 0
    }

    .open {
      visibility: visible;
      opacity 100
    }
  }

  .btn {
    font-weight 400;

    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
