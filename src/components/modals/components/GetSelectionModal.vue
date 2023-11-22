<template>
  <div class="call-back-modal">
    <div class="call-back-modal__body">
      <div class="call-back-modal__header">
        <span class="call-back-modal__header-title"> Получить подборку </span>
        <span class="call-back-modal__header-subtitle">
          Оставьте заявку, и наш менеджер свяжется с вами
        </span>
      </div>
      <form class="call-back-modal__form" @submit.prevent="submit">
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
import IconComponent from "@/components/IconComponent.vue";
import SelectComponent from "components/inputs/select/index.vue";
import ClaimCreate from "@/graphql/mutation/ClaimCreate.graphql";

export default {
  components: { InputComponent, IconComponent, SelectComponent },
  data() {
    return {
      loading: false,
      test: [{ id: 1, title: "sdfgh" }],
      form: {
        phone: { value: null, required: true, defaultValue: null, errors: [] },
        bonus: { value: null, required: true, defaultValue: null, errors: [] },
      },
    };
  },
  computed: {
    bonuses() {
      return this.$store.state.bonuses;
    },
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
    submit() {
      if (this.checkForm()) {
        this.loading = !this.loading;
        this.$apollo
          .mutate({
            mutation: ClaimCreate,
            variables: {
              phone: this.form.phone.value,
              bonus: this.form.bonus.value.id,
              type: 3,
            },
          })
          .then(() => {
            this.form.phone.value = null;
            this.form.bonus.value = null;
            this.loading = !this.loading;
            alert("Заявка отправлена");
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

  .select__field-container {
    width: 100%;
    height: 60px;
  }

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
