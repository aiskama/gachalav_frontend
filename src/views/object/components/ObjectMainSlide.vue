<template>
  <div class="object_slide__text">
    <h1 v-if="data.title" class="object_slide__text-title">{{ data.title }}</h1>
    <h2 v-if="data.subtitle" class="object_slide__text-description">{{ data.subtitle }}</h2>
    <div class="object_slide__text-tegs">
      <button v-if="data.camera" class="btn btn--blur" @click.prevent="openLiveModal(data)">
        <span class="live_icon"></span>
        Live
      </button>
<!--      <span v-if="data.payback" class="btn btn&#45;&#45;blur"><b> Окупаемость </b> {{ data.payback }}%</span>-->
<!--      <span v-if="data.left" class="btn btn&#45;&#45;blur"><b>Осталось </b> {{ data.left }}%</span>-->
<!--      <span v-if="data.price" class="btn btn&#45;&#45;blur"><b>От</b> {{ data.price }} ₽</span>-->
    </div>
  </div>
</template>

<script>
import LiveModal from "components/modals/components/LiveModal.vue";

export default {
  name: "ObjectMainSlide",
  props: {
    data: Object,
    image: Object,
  },
  methods: {
    openLiveModal(data) {
      this.$store.state._modals.push({
        component: LiveModal,
        options: {
          data,
        },
      });
    },
  },
};
</script>

<style lang="stylus">
.object-page__main-slider {
  .swiper-wrapper {
    padding: 0;
    height: 750px;
    +below(1024px) {
      height 460px
    }


  }

  img {
    width: 100%;
    height: 750px;
    position: absolute;
    top: 0;
    z-index: -1;
    +below(1024px) {
      height 485px
    }
  }
}

// padding 40px 160px
.object_slide__text {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 670px;
  z-index 1
  position absolute
  margin: -323px 0 120px 160px;
  +below(1600px) {
    margin -323px 0 120px 80px
  }
  +below(1024px) {
    margin: -277px 20px 67px 20px;
    gap 5px
  }
  +below(400px) {
    margin: -300px 20px 67px 20px;
  }

  &-title {
    font-weight: 700;
    font-size: 4.625em;
    line-height: 80px;
    color: var(--white);
    width: max-content;
    text-transform: uppercase;
    +below(1024px) {
      font-size: 1.375em;
      line-height: 46px;
      text-transform: none;
    }
  }

  &-description {
    font-weight: 400;
    font-size: 1.125em;
    line-height: 28px;

    color: var(--white);
    +below(1024px) {
      font-size: 0.875em;
      line-height: 22px;
    }
  }

  &-tegs {
    display: flex;
    gap: 10px;
    align-content: center;
    align-items: center;
    flex-wrap wrap
    padding-top 15px

    span {
      cursor: default;
    }

    .btn {
      gap 5px
      height: 32px;
    }
    +below(1024px) {
      padding 0
      row-gap: 4px;
      padding-top: 15px;
    }
  }
}
</style>
