<template>
  <div
    :class="{
      'select--focus': focusInput,
      'select--list': dropdownState === dropdownStates.BOTTOM,
      'select--list-top': dropdownState === dropdownStates.TOP,
    }"
    class="select"
  >
    <div v-click-outside="blurInput" class="select__container">
      <label v-if="title" :for="title + dropdownState" class="select__title">
        {{ title }}
        <span>{{ required ? "*" : "" }}</span>
      </label>
      <span class="select__field-container">
        <span v-if="multiple && selectedOptions && selectedOptions.length" class="select__selected">
          <a class="select__selected-item" @click.prevent="select(selectedOptions[0])">
            <span>{{ cutString(getName(selectedOptions[0]), 12) }}</span>
            <IconComponent name="close" />
          </a>
          <a
            v-if="selectedOptions.length > 1"
            class="select__selected-item"
            @click.prevent="$refs.input.focus()"
          >
            <span>...</span>
          </a>
        </span>
        <input
          :id="title + dropdownState"
          ref="input"
          v-model="search"
          :disabled="disabled"
          :placeholder="placeholder"
          class="select__field"
          @focus="handleInputFocus"
        />
        <button
          v-if="!multiple && search.length && clearable"
          class="select__clear"
          type="button"
          @click="clean"
        >
          <IconComponent name="close" />
        </button>
        <button v-if="!disabled" class="select__action" tabindex="-1" type="button" @click="toggle">
          <IconComponent category="vuesax-bold" name="arrow_down" />
        </button>
        <SelectListComponent
          v-if="dropdownState !== dropdownStates.CLOSED && !disabled"
          ref="list"
          :clearable="clearable"
          :labelName="labelName"
          :multiple="multiple"
          :options="filteredOptions"
          :search="search"
          :selected="selectedOptions ? selectedOptions : value"
          @clean="clean"
          @select="select"
        />
      </span>
    </div>
    <ul v-if="errors && errors.length" class="select__errors">
      <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
    </ul>
    <ul v-if="messages && messages.length" class="select__errors select__errors--messages">
      <li v-for="(m, i) in messages" :key="i">{{ m }}</li>
    </ul>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import SelectListComponent from "./components/SelectListComponent.vue";
import IconComponent from "components/IconComponent.vue";

export default {
  name: "SelectComponent",
  props: {
    title: {
      type: String,
      default() {
        return null;
      },
    },
    placeholder: {
      type: String,
      default() {
        return null;
      },
    },
    idName: {
      type: String,
      default() {
        return "id";
      },
    },
    labelName: {
      type: String,
      default() {
        return "name";
      },
    },
    clearable: {
      type: Boolean,
      default() {
        return true;
      },
    },
    options: Array,
    multiple: Boolean,
    close: Boolean,
    required: Boolean,
    disabled: Boolean,
    dark: Boolean,
    errors: {
      type: Array,
      default() {
        return [];
      },
    },
    messages: {
      type: Array,
      default() {
        return [];
      },
    },
    value: [Number, String, Array, Object],
  },
  data() {
    return {
      localOptions: [],
      selected: [],
      search: "",
      listTop: false,
      scrollTimeout: undefined,
      sbOptions: {
        minScrollbarLength: 20,
      },
      dropdownStates: {
        CLOSED: 0,
        TOP: 1,
        BOTTOM: 2,
      },
      dropdownState: null,
      focusInput: null,
    };
  },
  computed: {
    selectedOptions() {
      if (this.value && this.value instanceof Array) {
        // Сделано так чтобы сохранять последовательность выбора
        return this.value
          .map((v) => {
            const option = this.localOptions.find((o) => JSON.stringify(o) === JSON.stringify(v));
            if (option) {
              return option;
            }
            return false;
          })
          .filter((v) => v)
          .reverse();
        // return this.options.filter((o) => this.value.includes(o.id));
      }
      return false;
    },
    filteredOptions() {
      return this.localOptions.filter((o) =>
        this.getName(o)?.toLowerCase()?.includes(this.search?.toLowerCase())
      );
    },
  },
  watch: {
    value(v) {
      if (!this.multiple) {
        this.select(v);
      }
    },
  },
  created() {
    // Изначальное значение выпадаюшего списка
    this.dropdownState = this.dropdownStates.CLOSED;
    this.localOptions = this.options;
  },
  mounted() {
    this.showInSearch();
    // Положение выпадающего списка реагирует на скролл страницы
    window.addEventListener("scroll", () => {
      if (this.dropdownState !== this.dropdownStates.CLOSED) {
        this.openDrop();
      }
    });
  },
  methods: {
    showInSearch() {
      if (this.value !== null && !this.multiple) {
        const option = this.localOptions.find((o) => JSON.stringify(o) === JSON.stringify(this.value));
        if (option) {
          this.search = this.getName(option) || "";
        }
      }
    },
    handleInputFocus() {
      this.focusInput = true;
      this.search = "";
      this.openDrop();
    },
    blurInput() {
      this.showInSearch();
      if (this.multiple) {
        this.search = "";
        this.$refs.input.blur();
        this.focusInput = false;
        this.closeDrop();
      } else {
        this.$refs.input.blur();
        if (!this.value) {
          this.search = "";
        }
        this.focusInput = false;
        this.closeDrop();
      }
    },
    toggle() {
      // Переключение состояния Input
      if (this.focusInput !== false) {
        this.blurInput();
      } else {
        this.$refs.input.focus();
      }
    },
    openDrop() {
      if (this.$refs.input) {
        const height = 200; // Минимум пространства
        const bottom = this.$refs.input.getBoundingClientRect().bottom;
        if (bottom + height > window.innerHeight) {
          this.dropdownState = this.dropdownStates.TOP;
          return;
        }
        this.dropdownState = this.dropdownStates.BOTTOM;
      }
    },
    closeDrop() {
      this.dropdownState = this.dropdownStates.CLOSED;
    },
    /**
     * Обработка события выбора в списке
     */
    select(e) {
      // Если несколько элементов
      if (this.multiple) {
        // Фокусируюсь обратно на поле поиска
        this.$refs.input.focus();
        // Открепляю от реактивного массива уже выбранных value
        let value = JSON.parse(JSON.stringify(this.value || [])).map((v) => JSON.stringify(v));
        // Если уже выбран - удаляю
        // иначе заношу в конец массива выбранных
        if (value.includes(JSON.stringify(e))) {
          value.splice(value.indexOf(JSON.stringify(e)), 1);
        } else {
          value.push(JSON.stringify(e));
        }
        this.$emit(
          "input",
          // Не превращенные в string JSON объекты превращаю обратно
          // и делаю массив полностью из json
          value.map((v) => {
            if (typeof v === "string") {
              return JSON.parse(v);
            }
            return v;
          })
        );
        return;
      }
      // Если один элемент
      // Вставляю в Input label выбранного объекта
      // this.search = e ? this.getName(e) : "";
      // Сравниваю 2 stringify JSON строки
      // если не равна уже выбранной
      // если выбрано "развибирать нельзя"
      // повторяю поведение обычного select
      if (JSON.stringify(this.value) !== JSON.stringify(e)) {
        this.$emit("input", e);
      }
      // Закрываю выпадающий список
      this.blurInput();
    },
    /**
     * Получение label объекта
     * @param option
     * @returns {*}
     */
    getName(option) {
      if (this.labelName) {
        return option[this.labelName];
      }
      return option;
    },
    cutString(string, size) {
      return string.substring(0, size).trim() + (string.length > size ? ".." : "");
    },
    clean() {
      if (close) {
        if (this.multiple) {
          this.$emit("input", []);
          return;
        }
        this.$emit("input", []);
        this.search = "";
      }
    },
  },
  components: {
    IconComponent,
    SelectListComponent,
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="stylus">
.select {
  display grid
  grid-gap 5px
  transition var(--transition)

  &__container {
    display flex
    align-items center
    grid-gap 10px
    position relative
    +below(1024px) {
      flex-direction column
      align-items: stretch;
    }
  }

  &__title {
    font-weight: 400;
    font-size: 1.125em;
    line-height: 14px;
    color: var(--dark);

    span {
      color: var(--red);
    }
  }

  &__action,
  &__clear {
    padding 15px
    background none
    border-radius 5px
    absolute right top bottom
    display inline-flex
    align-items center
    justify-content center
    border 1px solid transparent

    &:focus {
      border none
      box-shadow: 0 0 0 3px var(--main-o15);
    }

    ^[0]--list &,
    ^[0]--list-top & {
      z-index 2

      .icon {
        transform rotate(180deg)
      }
    }

    .icon {
      width 14px
      height: 14px;

      svg path {
        fill var(--dark)
      }
    }
  }


  &__clear {
    padding 15px 10px
    transform translateX(-100%)

    ^[0]--list &,
    ^[0]--list-top & {
      z-index 3
    }

    .icon svg path {
      stroke var(--dark)
    }
  }

  &__action {
    padding-left 5px
  }

  &__field {
    border-radius: 5px;
    padding 12px 15px
    width 100%
    outline none
    border none
    background none

    &::placeholder {
      font-weight: 400;
      font-size: 1em;
      line-height: 26px;
      color: var(--dark);
      opacity: 0.3;

    }

    &::-ms-input-placeholder {
      font-weight: 500;
      font-size: 1em;
      line-height: 26px;
      color: var(--dark);
      opacity: 0.3;
    }
  }

  &__field-container {
    position relative
    display flex
    background: transparent;
    border: 1px solid var(--gray_dark);
    border-radius 100px
    height 50px

    ^[0]--list-top & {
      border-radius 0 0 5px 5px
    }

    ^[0]--list & {
      border-radius 5px 5px 0 0
    }

    ^[0]--focus & {
      border: none;
      box-shadow: 0 0 0 3px var(--main-o15);
    }

    ^[0]--error & {
      border: 1px solid var(--red);
      box-shadow: 0 0 0 3px var(--red-o15);
    }
  }

  &__selected {
    display flex
    gap 10px
    align-items center
    margin-left 15px
    flex-shrink: 0;
    +below(480px) {
      display none
    }
  }


  &__selected-item {
    cursor pointer
    background var(--main)
    border-radius 5px
    padding 5px 10px
    font-weight: 500;
    font-size: 0.75em;
    line-height: 14px;
    color: var(--white);
    text-align: center;
    text-decoration none
    flex-shrink: 0;
    display flex
    gap 4px
    align-items center

    .icon {
      width 14px
      height 14px

      svg path {
        fill var(--white)
      }
    }

    &:hover {
      color var(--white)
    }

    &:active
    &:focus {
      box-shadow: 0 0 0 3px var(--main-o15);
    }
  }
}
</style>
