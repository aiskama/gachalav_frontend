<template>
  <div class="slider-arrows">
    <button class="slider-arrows__item" title="Влево" type="button" @click="$emit('left')">
      <Icon name="arrow_left" />
    </button>
    <button class="slider-arrows__item" title="Вправо" type="button" @click="$emit('right')">
      <Icon name="arrow_right" />
    </button>
  </div>
</template>

<script>
import Icon from "@/components/IconComponent.vue";

export default {
  name: "SliderArrowsComponent",
  components: { Icon },
};
</script>

<style lang="stylus">

.slider-arrows {
  display: flex;
  z-index: 1;
  gap 10px


  &__item {
    z-index: 1;
    transition var(--transition)
    display flex
    justify-content center
    align-items center
    border-radius: 10px;
    border none
    width: 40px;
    height: 40px;
    background: var(--gray);

    .icon {
      display flex
      width 10px
      height: 10px;
    }

    &:active {
      transform scale(0.98)
    }

    //&:hover {
    //  border-color white
    //  .icon svg path {
    //    fill var(--orange)
    //  }
  }


  .icon {
    svg path {
      fill var(--dark_light)
    }
  }

  &:first-child {
    margin-right 5px
    +below(1360px) {
    }
  }

  &:last-child {

    +below(1360px) {
    }
  }

  button {
    cursor pointer
  }
}
</style>
