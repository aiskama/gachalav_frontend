<template>
  <div v-if="consultation" class="about_event">
    <h3>Проводим образовательные мероприятия для будущих инвесторов</h3>
    <div class="about_event--block">
      <div class="about_event--block-left">
        <ImgComponent :head_img="consultation.img"/>
      </div>
      <div class="about_event--block-right">
        <div class="about_event--block-right_header">
          <span v-if="consultation.date" class="about_event--block-right_header-teg_gray">{{ consultation.date }} </span>
          <span v-if="consultation.time " class="about_event--block-right_header-teg_white">{{ consultation.time }} </span>
          <span v-if="consultation.name " class="about_event--block-right_header-teg_white">{{ consultation.name }} </span>
        </div>
        <div class="about_event--block-right_text">
          <span v-if="consultation.title" class="about_event--block-right_text__title">{{ consultation.title }}</span>
          <span v-if="consultation.description" class="about_event--block-right_text__subtitle">
            {{ consultation.description }}
          </span>
        </div>
        <button class="btn btn--pink" @click="openCallBackModal">Записаться</button>
      </div>
    </div>
  </div>
</template>

<script>
import CallBackModal from "components/modals/components/CallBackModal.vue";
import ImgComponent from "components/ImageComponent.vue";

export default {
  name: "AboutEventComponent",
  components: {ImgComponent},
  computed: {
    consultation() {
      if (this.$store.state.about_page.info && this.$store.state.about_page.info.consultation.length) {
        return this.$store.state.about_page.info.consultation[0];
      }
      return false;
    },
  },
  methods: {
    openCallBackModal() {
      this.$store.state._modals.push({
        component: CallBackModal,
      });
    },
  },
};
</script>

<style lang="stylus">
.about_event {
  padding var(--between_section)
  display flex
  flex-direction column
  gap 40px
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
  }

  &--block {
    border-radius: 10px;
    display flex
    +below(1024px) {
      height: 890px;
      flex-direction column
    }

    &-left {
      border-radius: 10px 0 0 10px;
      width: 50%;
      +below(1024px) {
        width: 100%;
        height: 50%;
        border-radius: 10px 10px 0 0;
      }
      img{
        object-fit fill
        border-radius: 10px 0 0 10px;
        height: 100%;
        width: 100%;
        +below(1024px) {
          border-radius: 10px 10px 0 0;
        }
      }
    }

    &-right {
      background: var(--white);
      padding 50px
      display flex
      flex-direction column
      gap 30px
      width: 50%;
      border-radius: 0 10px 10px 0;
      +below(1024px) {
        width: 100%;
        padding 20px
        border-radius: 0 0 10px 10px;
      }

      .btn {
        width: 182px;
        +below(1024px) {
          width: 100%;
        }
      }

      &_header {
        display flex
        flex-wrap wrap
        +below(1024px) {
          flex-direction column
        }

        &-teg_gray {
          font-weight: 700;
          font-size: 1.125em;
          line-height: 28px;
          color: var(--dark);
          background var(--gray)
          padding 10px 15px
          border-radius 100px
          flex-shrink 0
        }

        &-teg_white {
          font-weight: 400;
          font-size: 1.125em;
          line-height: 28px;
          color: var(--dark);
          padding 10px 15px
          flex-shrink 0

        }
      }

      &_text {
        display flex
        flex-direction column
        gap 15px

        &__title {
          font-weight: 700;
          font-size: 1.625em;
          line-height: 31px;
          color: var(--dark);
          +below(1024px) {
            font-size: 1.375em;
            line-height: 34px;
          }
        }

        &__subtitle {
          font-weight: 400;
          font-size: 1em;
          line-height: 26px;
          color: var(--dark);
          +below(1024px) {
            font-size: 0.875em;
            line-height: 22px;
          }
        }
      }
    }
  }

  h3 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    +below(1024px) {
      font-size: 1.375em;
      line-height: 34px;
    }
  }
}
</style>
