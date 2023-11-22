<template>
  <label
    :class="{
      'check--disabled': disabled,
      'check--error': error,
      'check--checked': checked,
      'check--indeterminate': indeterminate,
    }"
    class="check"
  >
    <span class="check__state">
      <template>
        <IconComponent v-if="!checked" name="subtract-line" />
        <IconComponent v-else name="check-line" />
      </template>
    </span>
    <input
      :checked="checked"
      :disabled="disabled"
      :indeterminate="indeterminate"
      type="checkbox"
      @change="$emit('change', $event.target.checked)"
    />
    <slot />
  </label>
</template>

<script>
import IconComponent from "@/components/IconComponent.vue";

export default {
  name: "CheckboxComponent",
  components: { IconComponent },
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    error: Boolean,
    checked: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
  },
};
</script>

<style lang="stylus">
.check {
  display flex
  gap 8px
  position relative
  cursor pointer
  align-items: flex-start;
  text-align: left;
  user-select none
  font-size: 0.875em;
  line-height: 20px;

  input {
    absolute left top
    visibility hidden
  }

  &--error {
    color var(--red-500) !important

    & .check__state {
      border-color var(--red-500) !important
    }
  }

  &--disabled {
    color var(--blue-500)

    & .check__state {
      background: var(--blue-500);
      border: 1px solid var(--blue-500);
    }

    &.check--indeterminate
    &.check--checked {
      & .check__state {
        background: var(--blue-500);
        border: 1px solid var(--blue-500);
      }

      svg path {
        fill var(--white)
      }
    }
  }

  &--indeterminate:not(&.check--disabled)
  &--checked:not(&.check--disabled) {
    color var(--black)

    & .check__state {
      background var(--orange)
      border-color var(--orange)

      svg path {
        fill var(--white)
        stroke none
      }
    }
  }

  &__state {
    width 20px
    height 20px
    background: var(--white);
    border: 1px solid var(--orange);
    box-sizing: border-box;
    border-radius: 4px;
    display flex
    align-items center
    justify-content center
    flex-shrink 0
    transition var(--transition)

    .icon {
      width 16px
      height 16px
      display flex
      align-items center
      justify-content center

      svg path {
        transition var(--transition)
        fill var(--orange)
        stroke none
      }
    }
  }
}
</style>
