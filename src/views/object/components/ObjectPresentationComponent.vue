<template>
  <div class="presentation_block">
    <div class="presentation_block-text">
      <span class="presentation_block-text__title">Скачать презентацию объекта</span>
      <span class="presentation_block-text__subtitle">Мы отправим ссылку на презентацию</span>
    </div>
    <div class="presentation_block__input">
      <InputComponent
        v-model="form.phone.value"
        v-mask="'+7 (###)-###-##-##'"
        :error="form.phone.errors"
        placeholder="Телефон"
        :required="true"
      />
      <button class="btn btn--pink">Получить</button>
    </div>
  </div>
</template>

<script>
import InputComponent from "components/inputs/InputComponent.vue";

export default {
  name: "ObjectPresentationComponent",
  components: { InputComponent },
  data() {
    return {
      loading: false,
      form: {
        phone: { value: null, required: true, defaultValue: null, errors: [] },
      },
    };
  },
};
</script>

<style lang="stylus">
.presentation_block {
  background-image: url('/static/images/object_presentation.png');
  margin: var(--between_section);
  height: 429px;
  border-radius: var(--main_radius);
  display: flex;
  padding: 50px;
  justify-content: space-between;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  +below(1600px) {
    margin var(--between_section--tab)
  }
  +below(1024px) {
    height: 334px;
    margin: var(--between_section--mob);
    padding 30px 20px
    flex-direction column
    gap 40px
  }

  &-text {
    max-width: 540px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    &__title {
      font-weight: 700;
      font-size: 2.125em;
      line-height: 46px;
      color: var(--white);
      +below(1024px) {
        font-size: 1.375em;
        line-height: 34px;
      }
    }

    &__subtitle {
      font-weight: 700;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--white);
      +below(1024px) {
        font-size: 1em;
        line-height: 26px;
      }
    }
  }

  &__input {
    background: var(--gray);
    border-radius: 100px;
    height 60px
    width: 37%;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;

    .input__container {
      width: 100%;
    }
    +below(1024px) {
      display flex
      background none
      flex-direction column
      gap 15px
      height: auto;
      width: 100%;

      .input__container {
        width: 100%;
      }
    }
  }

  .btn {
    font-weight 400
  }
}
</style>
