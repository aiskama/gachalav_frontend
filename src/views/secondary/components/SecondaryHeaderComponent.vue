<template>
  <div class="secondary_header">
    <h2>О проекте</h2>
    <div class="secondary_header__info">
      <div v-if="data.left" class="secondary_header__info-left">
        <span v-html="data.about_project"></span>
      </div>
      <div class="secondary_header__info-right">
        <button class="btn btn--pink" @click.prevent="openPhoneModal">Записаться на экскурсию</button>
      </div>
    </div>
  </div>
</template>

<script>
import PhoneModal from "components/modals/components/PhoneModal.vue";

export default {
  name: "SecondaryHeaderComponent",
  props: {
    data: Object,
  },
  methods: {
    openPhoneModal() {
      this.$store.state._modals.push({
        component: PhoneModal,
      });
    },
  },
};
</script>

<style lang="stylus">
.secondary_header {
  display flex
  flex-direction column
  gap 40px
  padding var(--between_section)
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
  }

  .btn {
    font-size 1.125em
    +below(1024px) {
      width: 100%;
    }
  }

  h2 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    padding 0
    +below(1024px) {
      font-size: 1.375em;
      line-height: 34px;
    }
  }

  svg {
    width: 20px;
    height: 20px;
  }

  &__info {
    display flex
    padding 50px
    gap 20px
    background var(--white)
    border-radius var(--main_radius)
    align-items: center;
    justify-content: space-between;
    +below(1024px) {
      flex-direction column
      padding 20px
      gap 15px
    }

    &-left {
      display flex
      gap 30px
      align-items center
      +below(1024px) {
        flex-direction column
        width 100%
        gap 15px
      }

      span {
        font-weight: 400;
        font-size: 3em;
        line-height: 58px;
        color: var(--dark);
        +below(1400px) {
          font-size 2.5em
        }
        +below(1024px) {
          font-size: 1.625em
          line-height: 31px;
        }
      }
    }

    &-right {
      display flex
      gap 20px
      +below(1024px) {
        flex-direction column
        width 100%
        gap 15px
        .btn {
          width: 100%;
        }
      }
    }
  }
}
</style>
