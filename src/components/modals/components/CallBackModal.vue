<template>
  <div class="call-back-modal">
    <div class="call-back-modal__body">
      <div class="call-back-modal__header">
        <span class="call-back-modal__header-title"> Обратный звонок </span>
        <span class="call-back-modal__header-subtitle">
          Оставьте заявку, и наш менеджер свяжется с вами
        </span>
      </div>
      <form class="call-back-modal__form" @submit.prevent="submit">
        <InputComponent
          v-model="form.name.value"
          :error="form.name.errors"
          autofocus
          placeholder="Имя*" />
        <InputComponent
          v-model="form.phone.value"
          v-mask="'+7 (###)-###-##-##'"
          :error="form.phone.errors"
          placeholder="Телефон*"
        />

        <div class="call-back-modal__footer">
          <button class="btn btn--pink">Отправить</button>
          <span
            >Нажимая на кнопку, вы даете согласие на обработку
            <router-link :to="{ name: 'privacy' }"> персональных данных. </router-link></span
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import InputComponent from "@/components/inputs/InputComponent.vue";
import ClaimCreate from "@/graphql/mutation/ClaimCreate.graphql";

export default {
  components: { InputComponent },
  data() {
    return {
      loading: false,
      form: {
        phone: { value: null, required: true, defaultValue: null, errors: [] },
        name: { value: null, required: true, defaultValue: null, errors: [] },
      },
    };
  },
  methods: {
    checkForm() {
      // Очистка
      Object.keys(this.form).forEach((key) => {
        this.form[key].errors = [];
      });
      // Проверка
      Object.keys(this.form).forEach((key) => {
        // Если поля НЕ bool и file
        if (!["file", "bool"].includes(this.form[key].type)) {
          if (this.form[key].required && (this.form[key].value === null || this.form[key].value === "")) {
            this.form[key].errors.push("Поле обязательно для заполнения");
          }
        }
        if (this.form[key].type === "bool") {
          if (this.form[key].value === null) {
            this.form[key].errors.push("Вы должны выбрать один из вариантов");
          }
        }
      });
      // Подсчет количества ошибок
      let errorsLength = 0;
      Object.keys(this.form).forEach((key) => {
        errorsLength += this.form[key].errors.length;
      });
      return errorsLength === 0;
    },
    parseGqlErrors(graphQLErrors) {
      graphQLErrors.forEach((err) => {
        if (err.extensions.category === "validation") {
          Object.keys(err.extensions.validation).forEach((key) => {
            if (this.form[key]) {
              this.form[key].errors.push(err.extensions.validation[key][0]);
            }
          });
        }
      });
    },

    submit() {
      if (this.checkForm()) {
        this.loading = true;
        this.$apollo
          .mutate({
            mutation: ClaimCreate,
            variables: {
              phone: this.form.phone.value,
              name: this.form.name.value,
              type: 4,
            },
          })
          .then(() => {
            this.form.phone.value = null;
            this.form.name.value = null;
            this.$notify({
              title: "Готово",
              text: "Заявка отправлена",
              duration: 5000,
              speed: 200,
              type: "success",
            });
            this.$store.state._modals = [];
            // this.loading = false;
          })
          .catch(({ graphQLErrors }) => {
            this.$notify({
              title: "Ошибка",
              duration: 5000,
              speed: 200,
              type: "error",
            });
            this.parseGqlErrors(graphQLErrors);
            this.loading = false;
          });

      }
    },
  },
};
</script>

<style lang="stylus">
.call-back-modal {
  background-color: var(--white);
  border-radius: 15px;
  filter: drop-shadow(0px 30px 60px rgba(0, 0, 0, 0.1));
  max-width: 550px;
  width: 100%;
  z-index: 10;
  padding 40px 50px 50px 50px

  &__form {
    display: flex;
    flex-direction: column;
    gap 20px
    padding-top 30px

    .input__container {
      background var(--white)
      border: 1px solid var(--gray_dark);
      color var(--gray_dark)
    }

  }

  &__header {
    display flex
    flex-direction column
    gap 10px

    &-title {
      font-weight: 700;
      font-size: 2.125em;
      line-height: 46px;
      color: var(--dark);
    }

    &-subtitle {
      font-weight: 400;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--dark);
    }
  }

  &__footer {
    display flex
    gap 20px
    align-items: center;

    span {
      font-size: 14px;
      color: var(--dark_light);

      a {
        color: var(--gray_light);
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
