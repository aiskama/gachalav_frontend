<template>
  <div class="place_container">
    <div class="place_container__tabs">
      <div :class="{ place_container__tabs_active: plan }" @click="active">
        <span>Генплан</span>
      </div>
      <div :class="{ place_container__tabs_active: map }" @click="active">
        <span>Карта</span>
      </div>
    </div>
    <div v-if="plan" class="place_container__plan mobile">
      <ImageComponent :head_img="data.master_plan" />
    </div>
    <div v-if="plan" class="place_container__plan desktop">
      <ImageComponent :head_img="data.master_plan_mobile" />
    </div>
    <div v-if="map" class="place_container__map">
      <MapComponent :address="data.address" />
    </div>
  </div>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";
import MapComponent from "components/MapComponent.vue";

export default {
  name: "ObjectTabComponent",
  components: { ImageComponent, MapComponent },
  data() {
    return {
      plan: true,
      map: false,
    };
  },
  props: {
    data: Object,
  },
  methods: {
    active() {
      this.plan = !this.plan;
      this.map = !this.map;
    },
  },
};
</script>

<style lang="stylus">
.place_container {
  padding: 60px 160px 0 160px;
  border-radius: var(--main_radius);
  box-sizing: content-box;
  max-height: 700px;
  +below(1600px) {
    padding 60px 80px 0 80px
  }
  +below(1024px) {
    padding: 10px 20px 30px 20px;
    display: flex;
    flex-direction: column;
    gap 15px
  }

  &__tabs {
    display: flex;
    position absolute
    justify-content: space-between;
    align-items: center;
    margin: 55px 0 0 55px;
    padding: 5px;
    background: var(--white-o7);
    height: 60px;
    max-width: 220px;
    border: 1px solid var(--gray_dark);
    backdrop-filter: blur(5px);
    border-radius: 100px;
    font-weight: 400;
    font-size: 1.125em;
    line-height: 28px;
    color: var(--dark);
    transition: var(--transition)
    z-index 100
    +below(1024px) {
      margin: 0
      order 1
      position: static;
      align-self center
    }

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

  &__plan {
    position relative
    z-index -1
    height 700px
    +below(1024px) {
      max-height 301px
    }

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  &__map {
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    z-index 10

    .map-modal {
      width: 100%;
      box-sizing: border-box;
      height: 700px;

      +below(1100px) {
        height: 300px;
      }

      .ymaps-2-1-79-map {
        z-index 10
      }

      .ymap-container {
        box-sizing: border-box;
        height: 700px;


        +below(1100px) {
          height 300px
        }

      }
    }

    .ymaps-2-1-79-inner-panes {
      border-radius: 10px;
    }

    .ymaps-2-1-79-map-bg {
      border-radius: 10px;
    }
  }
  .desktop {
    +above(1025px) {
      display: none;
    }
  }

  .mobile {
    +below(1024px) {
      display: none;
    }
  }
}
</style>
