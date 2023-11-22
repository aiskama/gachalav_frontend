<template>
  <div class="live">
    <div class="live__header">
      <div v-if="data.title" class="live__header-title">{{ data.title }}</div>
      <button class="btn btn--white" @click.prevent="openLiveModal(data)">
        <div class="live_icon"></div>
       <span>Смотреть</span>
      </button>
    </div>
    <div class="live__img">
      <ImageComponent v-if="data.img" :head_img="data.img" :alt="data.title" />
    </div>
  </div>
</template>

<script>
import ImageComponent from "./ImageComponent.vue";
import LiveModal from "components/modals/components/LiveModal.vue";

export default {
  name: "LiveBlockComponent",
  components: { ImageComponent },
  props: {
    data: Object,
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
.live {
  display: flex;
  flex-direction: column;
  max-width 443px
  gap 10px

  svg {
    width: 16px;
    height: 16px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .btn {
      font-size 0.875em
      color var(--dark)
      height: 32px;
      padding 5px 10px

      &:hover {
        background var(--white)
        color var(--main)
      }

    }

    &-title {
      font-weight: 700;
      font-size: 1.375em;
      line-height: 34px;
      color: var(--dark);
      padding: 10px 15px 0 15px;
    }
  }

  &__img {
    filter: drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.15));

    img {
      border-radius: var(--main_radius);
      object-fit: cover;
      width: 100%;
      max-width: 443px;
      height: 260px;
    }
  }
}
</style>
