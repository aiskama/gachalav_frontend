<template>
  <div>
    <div class="flat_filter">
      <div class="flat_filter--right">
        <button
          v-for="item in roomFilter"
          :key="item.id"
          :class="{
            'btn--circle_white--active': item.active,
          }"
          class="btn btn--circle_white"
          @click="btnRoom(item)"
        >
          {{ item.id }}
        </button>
        <button
          :class="{
            'btn--circle_white--active': studioActive,
          }"
          class="btn btn--circle_white"
          @click="btnRoomStudio"
        >
          Студия
        </button>
        <div class="flat_filter__range_block">
          <InputComponent
            v-model.trim="minInput"
            :max="parseInt(max)"
            :min="parseInt(min)"
            class="flat_filter__input"
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
            class="flat_filter__range-input"
            @input="handleRangeSliderUpdate"
          />
          <InputComponent
            v-model.trim="maxInput"
            class="flat_filter__input"
            type="text"
            @blur="handleMaxBlur"
            @enter="handleMaxEnter"
            @focus="handleMaxFocus"
          />
        </div>
      </div>
      <div class="flat_filter--left">
        <SelectComponent
          v-model="sortOption"
          :close="false"
          :errors="[]"
          :options="select"
          label-name="title"
          placeholder="Сортировать"
          @input="filterByOrder"
        />
        <button :class="{ 'btn--circle_white--active': grid }" class="btn btn--circle_white" @click="btnGrid">
          <IconComponent name="grid" />
        </button>
        <button :class="{ 'btn--circle_white--active': list }" class="btn btn--circle_white" @click="btnList">
          <IconComponent name="list" />
        </button>
      </div>
    </div>
    <div v-if="grid" class="flat_grid">
      <FlatCardComponent v-for="(item, i) in data" :key="i" :data="item" />
    </div>
    <div v-if="list" class="flat_list">
      <FlatStrokeComponent v-for="(item, i) in data" :key="i" :data="item" />
    </div>
    <div class="flat_not">
      <h2 v-if="data.length === 0">В данный момент нет доступных квартир</h2>
    </div>
  </div>
</template>
<script>
import FlatStrokeComponent from "./FlatStrokeComponent.vue";
import FlatCardComponent from "./FlatCardComponent.vue";
import MultiRangeInput from "../../../../components/inputs/MultiRangeInput.vue";
import InputComponent from "@/components/inputs/InputComponent.vue";
import SelectComponent from "components/inputs/select/index.vue";
import IconComponent from "@/components/IconComponent.vue";

export default {
  name: "FlatFilterComponent",
  props: {
    data: Array,
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
      monthInput: 6,
      min: undefined,
      max: undefined,
      minInput: undefined,
      maxInput: undefined,
      grid: true,
      list: false,
      filterDebounceTimeout: undefined,
      studio: null,
      number_rooms: null,
      roomFilter: {
        1: { id: 1, active: false },
        2: { id: 2, active: false },
        3: { id: 3, active: false },
      },
      rooms: [],
      studioActive: false,
      sortOption: { id: 1, title: "Сначала дешевые", value: "ASC" },
      select: [
        { id: 1, title: "Сначала дешевые", value: "ASC" },
        { id: 2, title: "Сначала дорогие", value: "DESC" },
      ],
    };
  },
  created() {
    this.min = this.minValue;
    this.max = this.maxValue;
    this.minInput = this.humanPrice(this.min);
    this.maxInput = this.humanPrice(this.max);
  },
  watch: {
    min() {
      this.minInput = this.humanPrice(this.min);
    },
    max() {
      this.maxInput = this.humanPrice(this.max);
    },
  },
  methods: {
    changeTab(tab) {
      this.monthInput = tab;
    },
    btnRoomStudio() {
      this.studioActive = !this.studioActive;
      this.$emit("filterRoom", {
        min: this.min,
        max: this.max,
        value: this.sortOption.value,
        room: this.rooms,
        studio: this.studioActive,
      });
    },
    btnRoom(item) {
      item.active = !item.active;
      if (this.rooms.indexOf(item.id) !== -1) {
        this.rooms.splice(this.rooms.indexOf(item.id), 1);
      } else {
        this.rooms.push(item.id);
      }
      this.$emit("filterRoom", {
        min: this.min,
        max: this.max,
        value: this.sortOption.value,
        room: this.rooms,
        studio: this.studioActive,
      });
    },
    btnGrid() {
      this.grid = true;
      this.list = false;
    },
    btnList() {
      this.grid = false;
      this.list = true;
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
        alert(`Введите значение больше ${this.min}`);
        return;
      } else if (this.minInput >= this.max) {
        alert(`Введите значение меньше ${this.max}`);
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
    filterByOrder() {
      this.$emit("filterByOrder", {
        min: this.min,
        max: this.max,
        value: this.sortOption.value,
        room: this.rooms,
        studio: this.studioActive,
      });
    },
    btnFilter(e) {
      this.$emit("filter", {
        min: e.minValue,
        max: e.maxValue,
        value: this.sortOption.value,
        room: this.rooms,
        studio: this.studioActive,
      });
    },
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
  components: {
    IconComponent,
    SelectComponent,
    FlatStrokeComponent,
    FlatCardComponent,
    InputComponent,
    MultiRangeInput,
  },
};
</script>
<style lang="stylus">
.flat_filter {
  display flex
  //gap 200px
  justify-content space-between
  padding var(--between_section)
  align-items center
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding 30px 20px
    flex-direction column
    gap 20px
    align-items: stretch;
  }

  &--right {
    display flex
    gap 10px
    width 60%
    align-items center
    +below(1024px) {
      width 100%
      flex-wrap wrap
    }
  }

  &--left {
    display flex
    gap 10px

    .select__field-container {
      background var(--white)
      //color var(--dark)
    }

    .btn {
      width: 60px;
    }
  }

  .select__field-container {
    height: 60px;

    .select__field {
      font-size 1em
    }
  }

  &__range_block {
    display flex
    width 100%
    align-items center
  }

  .btn {
    height: 60px;
    padding: 16px 25px;
    font-weight 400

    svg {
      width: 20px;
      height: 20px;
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
    }

    .input__field {
      text-align center
    }
  }
}

.flat_grid {
  padding 38px 160px 0 160px
  display grid
  grid-template-columns 1fr 1fr 1fr
  grid-gap 40px

  +below(1600px) {
    padding var(--between_section--tab)
  }

  +below(1024px) {
    padding 0 20px
    grid-template-columns 1fr
    grid-gap 15px
  }
}

.flat_list {
  padding var(--between_section)
  display flex
  flex-direction column
  gap 2px
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding 0 20px
  }
}

.flat_not {
  display flex
  justify-content center
}
</style>
