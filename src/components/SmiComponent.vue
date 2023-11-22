<template>
  <div class="smi_block">
    <div class="smi_block__logo">
      <figure v-if="data.logo" class="smi_block__svg" v-html="data.logo" />
    </div>
    <span v-if="data.title" class="smi_block__title">{{ data.title }}</span>
    <span v-if="data.subtitle" class="smi_block__subtitle">{{ data.subtitle }}</span>
      <a :href="data.link" target="_blank" class="smi_block__button">
        <span>
          Читать полностью
          <IconComponent name="arrow_right" />
        </span>
      </a>
  </div>
</template>

<script>
import IconComponent from "./IconComponent.vue";

export default {
  name: "SmiComponent",
  components: { IconComponent },
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.smi_block {
  display: flex;
  flex-direction: column;
  padding: 30px;
  background: var(--white);
  gap: 15px;
  border-radius: var(--main_radius)
  +below(1024px) {
    min-width: 309px;
}

&__svg {
  display flex
  gap 10px
  align-items center
}

&__title {
  font-weight: 700;
  font-size: 1.125em;
  line-height: 28px;
  color: var(--dark);
  +below(1024px) {
    font-size: 1em;
    line-height: 26px;
  }
}
  a{
    color: var(--dark_light);
  }

&__subtitle {
  font-weight: 400;
  font-size: 0.875em;
  line-height: 22px;
  color: var(--dark_light);
  +below(1024px) {
    font-size: 0.875em;
    line-height: 22px;
  }
}

&__button {
  svg {
    width: 10px;
    height: 10px;
  }

  a {
    font-weight: 400;
    font-size: 0.875em;
    line-height: 26px;
    color: var(--dark_light);
  }
}
}
</style>
