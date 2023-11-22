<template>
  <div class="footer_form">
    <div class="footer_form__text">
      <span class="footer_form__text-title">Подпишитесь</span>
      <span class="footer_form__text-subtitle">на новости по объектам и советы для инвесторов</span>
    </div>
    <div class="footer_form__input">
      <InputComponent placeholder="Введите ваш Email" type="email" />
      <button class="btn btn--pink">Подписаться</button>
    </div>
  </div>
</template>

<script>
import InputComponent from "./inputs/InputComponent.vue";

export default {
  name: "FooterFormComponent",
  components: { InputComponent },
};
</script>

<style lang="stylus">
.footer_form {
  display: flex;
  padding: 40px 330px 40px 260px;
  background: var(--white);
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;
  margin-top 60px
  +below(1600px) {
    padding: 40px 180px 40px 130px;
  }

  +below(1024px) {
    padding 15px 20px
    margin-top 30px
    flex-direction column
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 5px;

    &-title {
      font-weight: 700;
      font-size: 2.125em;
      line-height: 46px;
      color: var(--dark);
      +below(1024px) {
        font-size: 1.375em;
        line-height: 34px;
      }
    }

    &-subtitle {
      font-weight: 700;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--dark);
      +below(1024px) {
        font-size: 0.875em;
        line-height: 22px;
      }
    }
  }

  &__input {
    background: var(--gray);
    border-radius: 100px;

    .btn{
      font-weight 400
    }
    +below(1024px) {
      background none
      border-radius 0
      margin-top 15px
      .input {
        width: 100%;
      }
      .btn {
        width: 100%;
        border-radius 0
      }
    }

    .input__field {
      padding 12px 40px
    }

    .input__container {
      width: 350px;
      +below(1400px) {
        width: auto;
      }

      svg {

        width: 16px;
        height: 16px;
        fill: var(--dark);
      }
      +below(1024px) {
        width 100%
        border-radius 0
      }
    }
  }
}
</style>
