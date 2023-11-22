<template>
  <div class="range-slider" @mousewheel="onMouseWheel">
    <div class="range-slider__bar">
      <div :style="{ width: barMin + '%' }" class="range-slider__bar--left" @click="onBarLeftClick"></div>
      <input
        :max="max"
        :min="min"
        :step="step"
        :value="valueMin"
        class="range-slider__input range-slider__input--min"
        type="range"
        @input="onInputMinChange"
      />
      <div
        class="range-slider__thumb range-slider__thumb--left"
        @mousedown="onLeftThumbMousedown"
        @touchstart="onLeftThumbMousedown"
      ></div>
      <div class="range-slider__bar-inner">
        <div class="range-slider__bar-inner--left" @click="onInnerBarLeftClick"></div>
        <div class="range-slider__bar-inner--right" @click="onInnerBarRightClick"></div>
      </div>
      <input
        :max="max"
        :min="min"
        :step="step"
        :value="valueMax"
        class="range-slider__input range-slider__input--max"
        type="range"
        @input="onInputMaxChange"
      />
      <div
        class="range-slider__thumb range-slider__thumb--right"
        @mousedown="onRightThumbMousedown"
        @touchstart="onRightThumbMousedown"
      ></div>
      <div :style="{ width: barMax + '%' }" class="range-slider__bar--right" @click="onBarRightClick"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiRangeSlider",
  props: {
    baseClassName: {
      type: String,
      default: "multi-range-slider",
    },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    minValue: { type: Number, default: 25 },
    maxValue: { type: Number, default: 75 },
    step: { type: Number, default: 5 },
    preventWheel: { type: Boolean, default: false },
  },
  data() {
    return {
      valueMin: this.minValue < this.min ? this.min : this.minValue,
      valueMax: this.maxValue > this.max ? this.max : this.maxValue,
      interVal: null,
      startX: null,
      mouseMoveCounter: null,
      barBox: null,
      barValue: 0,
    };
  },
  methods: {
    onBarLeftClick() {
      if (this.valueMin - this.step >= this.min) {
        this.valueMin -= this.step;
      } else {
        this.valueMin = this.min;
      }
    },
    onInnerBarLeftClick() {
      if (this.valueMin + this.step < this.valueMax) {
        this.valueMin += this.step;
      }
    },
    onBarRightClick() {
      if (this.valueMax + this.step <= this.max) {
        this.valueMax += this.step;
      } else {
        this.valueMax = this.max;
      }
    },
    onInnerBarRightClick() {
      if (this.valueMax - this.step > this.valueMin) {
        this.valueMax -= this.step;
      }
    },
    onInputMinChange(e) {
      let val = parseFloat(e.target.value);
      if (val < this.valueMax && val >= this.min) {
        this.valueMin = val;
      } else {
        e.target.value = this.valueMin;
      }
    },
    onInputMaxChange(e) {
      let val = parseFloat(e.target.value);
      if (val > this.valueMin && val <= this.max) {
        this.valueMax = val;
      } else {
        e.target.value = this.valueMax;
      }
    },
    onLeftThumbMousedown(e) {
      e.preventDefault();
      this.startX = e.clientX;
      if (e.type === "touchstart") {
        if (e.touches.length === 1) {
          this.startX = e.touches[0].clientX;
        } else {
          return;
        }
      }
      this.mouseMoveCounter = 0;
      this.barValue = this.valueMin;
      this.barBox = e.target.parentNode.getBoundingClientRect();
      document.addEventListener("mousemove", this.onLeftThumbMousemove);
      document.addEventListener("mouseup", this.onLeftThumbMouseup);
      document.addEventListener("touchmove", this.onLeftThumbMousemove);
      document.addEventListener("touchend", this.onLeftThumbMouseup);
    },
    onLeftThumbMousemove(e) {
      this.mouseMoveCounter++;

      let clientX = e.clientX;
      if (e.type === "touchmove") {
        clientX = e.touches[0].clientX;
      }
      let dx = clientX - this.startX;
      let per = dx / this.barBox.width;
      let val = this.barValue + (this.max - this.min) * per;
      let strSetp = "" + this.step;
      let fixed = 0;
      strSetp.indexOf(".") >= 0 && (fixed = 2);
      val = parseFloat(val.toFixed(fixed));
      if (val < this.min) {
        val = this.min;
      } else if (val > this.valueMax - this.step) {
        val = this.valueMax - this.step;
      }
      this.valueMin = val;
    },
    onLeftThumbMouseup() {
      document.removeEventListener("mousemove", this.onLeftThumbMousemove);
      document.removeEventListener("mouseup", this.onLeftThumbMouseup);
      document.removeEventListener("touchmove", this.onLeftThumbMousemove);
      document.removeEventListener("touchend", this.onLeftThumbMouseup);
    },
    onRightThumbMousedown(e) {
      e.preventDefault();
      this.startX = e.clientX;
      if (e.type === "touchstart") {
        if (e.touches.length === 1) {
          this.startX = e.touches[0].clientX;
        } else {
          return;
        }
      }
      this.mouseMoveCounter = 0;
      this.barValue = this.valueMax;
      this.barBox = e.target.parentNode.getBoundingClientRect();
      document.addEventListener("mousemove", this.onRightThumbMousemove);
      document.addEventListener("mouseup", this.onRightThumbMouseup);
      document.addEventListener("touchmove", this.onRightThumbMousemove);
      document.addEventListener("touchend", this.onRightThumbMouseup);
    },
    onRightThumbMousemove(e) {
      this.mouseMoveCounter++;

      let clientX = e.clientX;
      if (e.type === "touchmove") {
        clientX = e.touches[0].clientX;
      }
      let dx = clientX - this.startX;
      let per = dx / this.barBox.width;
      let val = this.barValue + (this.max - this.min) * per;
      let strSetp = "" + this.step;
      let fixed = 0;
      strSetp.indexOf(".") >= 0 && (fixed = 2);
      val = parseFloat(val.toFixed(fixed));
      if (val < this.valueMin + this.step) {
        val = this.valueMin + this.step;
      } else if (val > this.max) {
        val = this.max;
      }
      this.valueMax = val;
    },
    onRightThumbMouseup() {
      document.removeEventListener("mousemove", this.onRightThumbMousemove);
      document.removeEventListener("mouseup", this.onRightThumbMouseup);
      document.removeEventListener("touchmove", this.onRightThumbMousemove);
      document.removeEventListener("touchend", this.onRightThumbMouseup);
    },
    onMouseWheel(e) {
      if (this.preventWheel === true) {
        return;
      }

      if (!e.shiftKey && !e.ctrlKey) {
        return;
      }

      let val = (this.max - this.min) / 100;
      if (val > 1) {
        val = 1;
      }

      if (e.deltaY < 0) {
        val = -val;
      }
      if (e.shiftKey && e.ctrlKey) {
        if (this.valueMin + val >= this.min && this.valueMax + val <= this.max) {
          this.valueMin = this.valueMin + val;
          this.valueMax = this.valueMax + val;
        }
      } else if (e.ctrlKey) {
        val = this.valueMax + val;

        if (val < this.valueMin + this.step) {
          val = this.valueMin + this.step;
        } else if (val > this.max) {
          val = this.max;
        }
        this.valueMax = val;
      } else if (e.shiftKey) {
        val = this.valueMin + val;
        if (val < this.min) {
          val = this.min;
        } else if (val > this.valueMax - this.step) {
          val = this.valueMax - this.step;
        }
        this.valueMin = val;
      }
    },
    triggerInput() {
      let retObj = {
        min: this.min,
        max: this.max,
        minValue: this.valueMin,
        maxValue: this.valueMax,
      };
      this.$emit("input", retObj);
    },
  },
  computed: {
    barMin() {
      return ((this.valueMin - this.min) / (this.max - this.min)) * 100;
    },
    barMax() {
      return 100 - ((this.valueMax - this.min) / (this.max - this.min)) * 100;
    },
  },
  watch: {
    valueMin() {
      this.triggerInput();
    },
    valueMax() {
      this.triggerInput();
    },
    minValue(newValue) {
      this.valueMin = newValue < this.min ? this.min : newValue;
    },
    maxValue(newValue) {
      this.valueMax = newValue > this.max ? this.max : newValue;
    },
  },
  mounted() {},
};
</script>
<style lang="stylus">
.range-slider {
  display: flex;
  position: relative;
  flex-direction: column;
  user-select: none;

  &__bar {
    display: flex;
    height 1px

    &--left {
      width: 25%;
      background-color: var(--gray_dark);
      padding: 0.5px 0;
    }


    &--right {
      width: 25%;
      background-color: var(--gray_dark);
      padding: 0.5px 0;
    }
  }

  &__bar-inner {
    background-color: var(--main);
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: space-between;
    position: relative;

    &--left {
      width: 50%;
    }

    &--right {
      width: 50%;
    }
  }

  &__thumb {
    background-color: var(--white);
    border-radius 100%
    border 2px solid var(--white)
    position: relative;
    z-index: 1;
    cursor: pointer;

    &::before {
      content: "";
      background-color: var(--white);
      position: absolute;
      width: 10px;
      height: 10px;
      border: 7px solid var(--main);
      box-shadow: 0px 0px 0px 3px rgba(247, 1, 87, 0.15);
      border-radius: 100%;
      z-index: 1;
      margin: -12px;
      cursor: pointer;
    }

    & * {
      position: absolute;
      bottom: 25px;
      width: 30px;
      height: 30px;
      left: -15px;
      font-size: 75%;
      text-align: center;
      line-height: 30px;
      background-color: var(--main);
      border-radius: 50%;
      color: white;
      display: none;
    }

    &:active * {
      display: block;
    }
  }

  &__input:focus + &__thumb::after {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    width: 11px;
    height: 11px;
    z-index: 2;
    border-radius: 50%;
    border: dotted 1px black;
    box-shadow: 0 0 5px white, inset 0 0 10px black;
  }

  &__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    pointer-events: none;
  }
}
</style>
