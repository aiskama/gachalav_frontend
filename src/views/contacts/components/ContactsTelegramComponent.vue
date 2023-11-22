<template>
  <div class="mers_block">
    <div class="mers_block__title">Подпишись на Telegram канал про недвижимость</div>
    <a :href="data.link" target="_blank" class="btn btn--white">
      Подписаться</a>
  </div>
</template>

<script>
export default {
  name: "ContactsTelegramComponent",
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.mers_block {
  background-image url("/static/images/telega.png")
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
    height: 60px;
    padding: 16px 40px;
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
