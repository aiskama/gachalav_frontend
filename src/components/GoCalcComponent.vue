<template>
  <div class="mers_block">
    <div class="mers_block__title">Экскурсия с инвестиционным консультантом по объектам</div>
    <button class="btn btn--white" @click.prevent="openPhoneModal">Пройти экскурсию</button>
  </div>
</template>

<script>
import PhoneModal from "components/modals/components/PhoneModal.vue";

export default {
  name: "GoCalcComponent",
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
.mers_block {
  background-image url("/static/images/mers.png")
  margin var(--between_section)
  height: 492px;
  border-radius var(--main_radius)
  display: flex
  padding 50px
  justify-content: space-between;
  background-repeat: no-repeat
  background-size: cover;
  background-position: center;
  +below(1600px) {
    margin var(--between_section--tab)
  }
  +below(1024px) {
    margin var(--between_section--mob)
    padding 30px 20px
    flex-direction column
    height: fit-content;
    gap 30px
  }

  .btn {
    width: 273px;
    height: 60px;
    margin-top: 16px;
    +below(1024px) {
      width: 100%;
      margin-top: 0
    }
  }

  &__title {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--white);
    max-width: 540px
    +below(1024px) {
      font-size: 1.375em;
      line-height: 32px;
    }

  }
}
</style>
