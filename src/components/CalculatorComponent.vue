<template>
  <div class="calculator">
    <div class="calculator__form">
<!--      <span>На какой период планируете инвестировать?</span>-->
<!--      <div class="calculator__tabs">-->
<!--        <div-->
<!--          v-for="(tab, i) in tabs"-->
<!--          :key="i"-->
<!--          :class="{ 'calculator__tab&#45;&#45;active': tab === monthInput }"-->
<!--          class="calculator__tab"-->
<!--          @click="changeTab(tab)"-->
<!--        >-->
<!--          {{ tab }}-->
<!--        </div>-->
<!--        <input v-model="monthInput" class="calculator__tabs-input" placeholder="Месяцев" type="number" />-->
<!--      </div>-->
      <span>Выберите диапазон суммы инвестиций</span>
      <div class="calculator__range-block">
        <InputComponent
          v-model.trim="minInput"
          :max="parseInt(max)"
          :min="parseInt(min)"
          class="calculator__input"
          type="text"
          @blur="handleMinBlur"
          @enter="handleMinEnter"
          @focus="handleMinFocus"
        />
        <MultiRangeInput
          :max="maxValue"
          :maxValue="max"
          :min="minValue"
          :minValue="min"
          :step="10000"
          class="calculator__range-input"
          @input="handleRangeSliderUpdate"
        />
        <InputComponent
          v-model.trim="maxInput"
          class="calculator__input"
          type="text"
          @blur="handleMaxBlur"
          @enter="handleMaxEnter"
          @focus="handleMaxFocus"
        />
      </div>
      <router-link
        :to="{ name: 'slider', query: { month_count: monthInput, min_price: min, max_price: max } }"
        class="calculator__route-btn"
      >
          <span>Далее</span>
          <IconComponent name="arrow_right" />
      </router-link>
    </div>
    <div class="calculator__info">
      <span>Вы получите:</span>
      <ul>
        <li>
          <IconComponent name="point" />
          Персональная подборка вариантов
        </li>
        <li>
          <IconComponent name="point" />
          <div>Бонус</div>
        </li>
      </ul>
      <span>Есть вопросы?</span>
      <button class="calculator__btn" @click="openPhoneModal">Онлайн-консультант</button>
    </div>
  </div>
</template>

<script>
import IconComponent from "@/components/IconComponent.vue";
import MultiRangeInput from "@/components/inputs/MultiRangeInput.vue";
import InputComponent from "@/components/inputs/InputComponent.vue";
import PhoneModal from "components/modals/components/PhoneModal.vue";

export default {
  name: "CalculatorComponent",
  created() {
    this.min = this.minValue;
    this.max = this.maxValue;
    this.minInput = this.humanPrice(this.min);
    this.maxInput = this.humanPrice(this.max);
  },
  props: {
    minValue: {
      type: [Number, String],
      default: 0,
    },
    maxValue: {
      type: [Number, String],
      default: 20000000,
    },
  },
  data() {
    return {
      tabs: [6, 12, 18, 24, 36],
      monthInput: undefined,
      min: undefined,
      max: undefined,
      minInput: undefined,
      maxInput: undefined,
    };
  },
  methods: {
    openPhoneModal() {
      this.$store.state._modals.push({
        component: PhoneModal,
      });
    },
    changeTab(tab) {
      this.monthInput = tab;
    },
    humanPrice(price) {
      if (price >= 1000000) {
        let max = price / 1000000;
        return `${max.toFixed(1)} млн`;
      } else {
        let min = price / 1000;
        min = Math.round(min);
        return `${min} тыс`;
      }
    },
    handleMinBlur() {
      this.minInput = this.humanPrice(parseInt(this.min));
    },
    handleMinEnter() {
      if (this.minInput <= this.min) {
        alert(`Введите значение больше ${this.minValue}`);
        return;
      } else if (this.minInput >= this.max) {
        alert(`Введите значение меньше ${this.maxValue}`);
        return;
      }
      this.min = parseInt(this.minInput);
    },
    handleMinFocus() {
      this.minInput = "";
    },
    handleMaxBlur() {
      this.maxInput = this.humanPrice(parseInt(this.max));
    },
    handleMaxEnter() {
      if (this.maxInput <= this.min) {
        alert(`Введите значение больше ${this.min}`);
        return;
      } else if (this.maxInput >= this.max) {
        alert(`Введите значение меньше ${this.max}`);
        return;
      }
      this.max = parseInt(this.maxInput);
    },
    handleMaxFocus() {
      this.maxInput = "";
    },
    // handleRangeSliderUpdate(e) {
    //   if (e) {
    //     if (this.filterDebounceTimeout) {
    //       clearTimeout(this.filterDebounceTimeout);
    //     }
    //     this.filterDebounceTimeout = setTimeout(() => {
    //       this.min = e.minValue;
    //       this.max = e.maxValue;
    //     }, 500);
    //   }
    // },
    handleRangeSliderUpdate(e) {
      this.min = e.minValue;
      this.max = e.maxValue;
      if (e) {
        if (this.filterDebounceTimeout) {
          clearTimeout(this.filterDebounceTimeout);
        }
        this.filterDebounceTimeout = setTimeout(() => {
          this.btnFilter(e);
        }, 500);
      }
    },
  },
  watch: {
    min() {
      this.minInput = this.humanPrice(this.min);
    },
    max() {
      this.maxInput = this.humanPrice(this.max);
    },
  },
  components: {
    InputComponent,
    IconComponent,
    MultiRangeInput,
  },
};
</script>

<style lang="stylus">
.calculator {
  display flex
  background-color var(--white)
  width 100%
  border-radius 10px
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  +below(1024px) {
    flex-direction column
  }

  &__form {
    max-width 674px
    width 48%
    display flex
    flex-direction column
    padding 50px
    justify-content: center;
    +below(1024px) {
      padding 20px
      width: 100%;
    }

    > span {
      font-weight: 400;
      font-size: 1.375em;
      line-height: 38px;
      color var(--dark)
      +below(1024px) {
        font-size: 1.125em;
        line-height: 26px;
      }
    }
  }

  &__tabs {
    display flex
    gap 10px
    margin 20px 0 40px 0
    +below(1024px) {
      flex-wrap: wrap;
      margin: 20px 0 21px 0;
    }
  }

  &__tab {
    display flex
    width 60px
    height 60px
    border-radius 100px
    border 1px solid var(--gray_dark)
    justify-content center
    align-items center
    cursor pointer
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    transition: .3s
    +below(1024px) {
      width: 50px;
      height: 50px;
    }
  }

  &__tab--active {
    border 2px solid var(--main)
    color var(--main)
    box-shadow: 0 0 0 3px rgba(247, 1, 87, 0.15);
  }

  &__tabs-input {
    width 100%
    max-width 187px
    padding 10px 20px
    border 1px solid var(--gray_dark)
    outline none
    border-radius 100px
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    +below(1600px) {
      max-width 140px
    }
    +below(1024px) {
      max-width 100%
      margin-top: 8px;
    }

    :placeholder {
      color var(--dark_light)
    }
  }

  &__range-block {
    display flex
    margin 20px 0 60px 0
    width 100%
    align-items center
    +below(1024px) {
      margin 18px 0 19px 0
    }
  }

  &__range-input {
    width 100%
  }

  &__input {
    max-width 112px
    font-size 1.125em
    border 1px solid var(--gray_dark)
    background-color var(--white)
    border-radius 100px

    .input__container {
      background-color var(--white)
      +below(1024px) {
        height: 50px;
      }
    }

    .input__field {
      text-align center
      width: 107px;
      +below(1024px) {
        width: 84px;
      }
    }
  }


  &__info {
    display flex
    flex-direction column
    width 52%
    background-image url("/static/images/calculator.png")
    padding 92px 0px 90px 100px
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    +below(1600px) {
      padding 90px 100px
    }
    +below(1024px) {
      padding 20px
      width: 100%;
    }

    svg {
      width: 40px;
      height: 40px;
    }

    span {
      font-weight: 700;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--dark);

    }

    ul {
      display flex
      flex-direction column
      gap 15px
      padding 36px 0 40px 0
      font-weight: 400;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--dark);

      +below(1024px) {
        padding 15px 0 20px 0
      }

      li {
        list-style none
        display flex
        gap 10px
        align-items center
      }
    }
  }

  &__route-btn {
    display flex
    align-items center
    width fit-content
    border-radius 100px
    border none
    background-color var(--main)
    color var(--white)
    gap 10px
    font-size 1.125em
    padding 16px 40px
    line-height 28px
    cursor pointer
    transition .3s

    +below(1024px) {
      justify-content: center;
      width: 100%;
    }

    svg {
      width: 10px;
      height: 10px;

      path {
        fill var(--white)
      }
    }

    &:hover {
      background-color var(--main_hover)
    }

    &:active {
      transform scale(0.95)
    }
  }

  &__btn {
    width fit-content
    border-radius 100px
    border none
    background-color var(--white)
    color var(--dark)
    font-size 1.125em
    padding 16px 40px
    line-height 28px
    margin-top 30px
    transition .3s
    +below(1024px) {
      width: 100%;
      margin-top 15px
    }

    &:active {
      transform scale(0.95)
    }
  }
}
</style>
