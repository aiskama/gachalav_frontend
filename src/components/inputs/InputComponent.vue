<template>
  <label
    :class="{
      'input--filled': !!value,
      'input--error': error.length,
      'input--icon-left': iconPosition === 'left',
      'input--icon-right': iconPosition === 'right',
      'input--disabled': disabled,
    }"
    class="input"
  >
    <span v-if="title" class="input__title">{{ title }}</span>
    <span class="input__container">
      <button v-if="iconPosition" class="input__action" type="button" @click="$emit('action')">
        <slot name="icon">
          <IconComponent name="search" />
        </slot>
      </button>
      <input
        ref="input"
        v-mask="mask"
        :disabled="disabled"
        :max="max"
        :min="min"
        :placeholder="placeholder"
        :type="type"
        :value="value"
        class="input__field"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @input="handleInput"
        :required="required"
        :autofocus="autofocus"
        @keyup.enter="$emit('enter', $event)"
      />
    </span>
<!--    <span v-if="subtitle" class="input__subtitle">{{ subtitle }}</span>-->
    <ul  class="input__error">
      <li v-for="(e, i) in error" :key="i">{{ e }}</li>
    </ul>
  </label>
</template>
<script>
import IconComponent from "@/components/IconComponent.vue";
import { VueMaskDirective } from "v-mask";

export default {
  name: "InputComponent",
  props: {
    title: {
      type: [String, Object],
    },
    subtitle: {
      type: String,
    },
    mask: {
      type: String,
    },
    type: {
      type: String,
      default() {
        return "text";
      },
    },
    placeholder: {
      type: [String, Number, Object],
    },
    min: Number,
    max: Number,
    value: {
      type: [String, Number],
    },
    error: {
      type: Array,
      default() {
        return [];
      },
    },
    iconPosition: {
      type: String,
      validator(value) {
        return value === "left" || value === "right";
      },
    },
    disabled: {
      type: Boolean,
    },
    autofocus: Boolean,
    required: Boolean,
  },
  methods: {
    handleInput(e) {
      let value = e.target.value;
      if (this.type === "number") {
        //   if (value < this.min) {
        //     this.$refs.input.value = this.min.toString();
        //     this.$emit("input", this.min);
        //   } else if (value > this.max) {
        //     this.$refs.input.value = this.max.toString();
        //     this.$emit("input", this.max);
        //   } else {
        //     this.$refs.input.value = value.toString();
        //     this.$emit("input", value);
        //   }
        this.$emit("input", value);
      } else {
        this.$refs.input.value = value.toString();
        this.$emit("input", value);
      }
    },
  },
  components: { IconComponent },
  directives: {
    mask: VueMaskDirective,
  },
};
</script>

<style lang="stylus">
.input {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;

  &__container {
    display: flex;
    position: relative;
    background: var(--gray);
    border: 2px solid var(--gray-dark);
    color: var(--dark);
    border-top: none;
    border-left: none;
    border-right: none;
    box-sizing: border-box;
    height: 60px;
    transition: var(--transition);
    border-radius: 100px;
  }

  &:focus-within {
    & ^[0]__container {
      border-color: var(--orange);
    }

    ::placeholder {
      color: var(--orange);
    }

    & .icon svg path {
      fill: var(--orange);
    }
  }

  &--filled:not(:focus-within) {
    & ^[0]__container {
      border-color: var(--blue-500);
    }

    & .icon svg path {
      fill: var(--body-color);
    }
  }

  &--error& {
    & ^[0]__container {
      border-color: var(--main);
    }

    & .icon svg path {
      fill: var(--main);
    }

    &__field {
      color: var(--main);

      &::placeholder {
        color: var(--main);
      }
    }
  }

  &--focused {
    & ^[0]__container {
      border-color: var(--blue-900);
    }
  }

  &--error {
    & ^[0]__container {
      border-color: var(--red-500);
    }
  }

  &--disabled {
    & ^[0]__container {
      background: var(--blue-400);
    }
  }

  &--icon-left &__action {
    absolute: left top;
  }

  &--icon-left &__field {
    padding: 12px 16px 12px 49px;
  }

  &--icon-right &__action {
    absolute: right top;
  }

  &--icon-right &__field {
    padding: 12px 44px 12px 16px;
  }

  &__title {
    font-weight: normal;
    font-size: 0.875em;
    line-height: 20px;
    color: var(--body-color-muted);
    white-space: pre-line;
  }

  &__subtitle {
    font-weight: normal;
    font-size: 0.75em;
    line-height: 20px;
    color: var(--gray-50);
  }

  &__error {
    font-weight: normal;
    font-size: 0.75em;
    line-height: 20px;
    color: var(--main);
    li {
      list-style-type: none; /* Убираем маркеры */
    }
  }

  &__action {
    background: none;
    border: none;
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: 13px 10px 13px 15px;
  }

  &__field {
    border: none;
    background: none;
    width: 100%;
    height: 100%;
    padding: 12px 15px;
    outline: none;
    font-weight: 400;
    font-size: 1em;
    line-height: 26px;
    color: var(--dark_light);

    &::placeholder {
      font-weight: normal;
      color: var(--dark_light);
    }
  }

  .icon {
    width: 24px;
    height: 25px;
    margin-right: 5px;

    svg {
      path{
        transition: var(--transition);
        fill: var(--dark);
        stroke: none;
      }
    }
  }
}
</style>
