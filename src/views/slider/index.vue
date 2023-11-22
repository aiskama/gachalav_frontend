<template>
  <div>
    <PageDescriptionComponent :data="description" />
    <div class="calc">
      <div class="calc__content">
        <SliderComponent
          v-slot="{ item }"
          :items="slider"
          :slider-options="sliderOptions"
          btn="true"
          class="calc__content-slider"
          title="Лоты"
        >
          <div class="calc__content-slider_item">
            <ImgComponent :head_img="item.img" />
            <div class="calc__content-slider_item-tags">
              <span v-if="item.square" class="btn btn__mini"><b> Площадь </b> {{ item.square }} м2</span>
              <span v-if="item.price" class="btn btn__mini"><b> Стоимость </b> {{ item.price | formatNumber }} ₽</span>
              <span v-if="item.payback" class="btn btn__mini"><b>Окупаемость</b> {{ item.payback }} %</span>
              <span v-if="item.month_count" class="btn btn__mini"><b>Срок</b> {{ item.month_count }}</span>
            </div>
          </div>
        </SliderComponent>
        <div v-if="slider.length === 0" class="slider-not">
          <h3 v-if="slider.length === 0">В данный момент нет доступных лотов</h3>
        </div>
        <div class="calc__content-footer">
          <h2>Заберите свою подборку</h2>
          <button class="btn btn--pink" @click="openPhoneModal">Получить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageDescriptionComponent from "components/PageDescriptionComponent.vue";
import SliderComponent from "components/slider/SliderComponent.vue";
import ImgComponent from "components/ImageComponent.vue";
import SLIDER_PAGE from "@/graphql/queries/slider_page.graphql";
import PhoneModal from "components/modals/components/PhoneModal.vue";

export default {
  metaInfo: {
    title: "Расчёт инвестиций ",
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
  },
  name: "index.vue",
  async asyncData({ apollo, store, route }) {
    await apollo.defaultClient
      .query({
        query: SLIDER_PAGE,
        variables: {
          month_count: parseInt(route.query.month_count),
          min_price: parseInt(route.query.min_price),
          max_price: parseInt(route.query.max_price),
        },
      })
      .catch(({ data }) => {
        console.log(data);
      })
      .then(({ data }) => {
        store.state.slider_page = data.apartments;
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
        store.state.bonuses = data.bonuses;
      });
  },
  computed: {
    slider() {
      return this.$store.state.slider_page;
    },
  },
  methods: {
    openPhoneModal() {
      this.$store.state._modals.push({
        component: PhoneModal,
      });
    },
  },
  components: { ImgComponent, SliderComponent, PageDescriptionComponent },
  data() {
    return {
      description: { title: "Расчёт инвестиций" },

      sliderOptions: {
        slidesPerView: 4.5,
        spaceBetween: 40,
        clickable: true,
        preloadImages: true,
        loop: true,
        centeredSlides: true,
        autoHeight: true,
        initialSlide: 2,
        freeModeFluid: true,
        effect: "coverflow",
        coverflowEffect: {
          rotate: 0,
          stretch: 5,
          depth: 10,
          modifier: 1,
          slideShadows: false,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          1025: {
            slidesPerView: 3.7,
          },
        },
      },
    };
  },
};
</script>

<style lang="stylus">

.calc {
  padding var(--between_section)

  +below(1600px) {
    padding var(--between_section--tab)
  }

  +below(1024px) {
    padding var(--between_section--mob)
    padding-top: 30px;
    padding-bottom: 0;
  }

  &__content {
    border-radius var(--main_radius)
    background: var(--white);
    display: flex;
    flex-direction column;

    &-header {
      display flex
      padding: 50px;
      align-items: center;
      justify-content: space-between;
      +below(1024px) {
        flex-direction column
        padding 15px
        gap 17px
        align-items: stretch;
      }
    }

    .slider__header {
      padding: 50px;
      +below(1024px) {
        flex-direction column
        padding 15px
      }
    }

    &-slider {
      .swiper-3d {
        height: 460px;
        +below(1024px){
          height 530px
        }
      }

      .slider__header {
        gap 30px
        +below(1024px) {
          justify-content space-between
          gap 17px
        }

        &--right {
          width: auto;
          gap 30px
          +below(1024px) {
            width: 100%;
          }
        }
      }

      .slider-arrows__item {
        border-radius 100px
        background var(--white)
        height: 50px;
        width: 50px;
        border: 1px solid var(--gray_dark);
      }

      .swiper-slide-active {
        .calc__content-slider_item{
          padding 20px
        }
        img {
          transform scale(1.3) !important
          +below(1024px) {
            transform scale(1) !important
            max-height: 338px;
            object-fit: contain;
          }

        }

        .calc__content-slider_item-tags {
          display flex !important
          position: absolute;
          margin-top: 470px;
          +below(1024px) {}
        }

      }

      .slider__items {
        background var(--white)
      }

      .swiper {
        //height 1000px
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
          object-fit contain
        }

        &-tags {
          display none
          gap 20px

          .btn {
            background var(--gray)
            padding 5px 10px
            font-size 1.375em
            height: 48px !important;
            font-weight: 300;
            flex-shrink 0
          }
          +below(1024px) {
            padding 15px
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      }
    }

    &-footer {
      padding: 0 50px 50px 50px;
      display flex
      gap 20px
      flex-direction column
      align-items: center;
      +below(1024px) {
        padding 15px
        align-items: stretch;
      }
    }

    h2 {
      font-weight: 700;
      font-size: 2.125em;
      line-height: 46px;
      color: var(--dark);
      +below(1024px) {
        font-size: 1.625em;
        line-height: 31px;
        text-align: center;
      }
    }

    h3 {
      font-weight: 700;
      font-size: 2.125em;
      line-height: 46px;
      color: var(--dark);
      //+below(1024px){
      //  font-size: 2.125em;
      //  line-height: 46px;
      //}
    }
  }

  .slider-not {
    display flex
    justify-content center
    padding-bottom 50px
  }
}
</style>
