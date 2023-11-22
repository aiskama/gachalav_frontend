<template>
<a href="https://comrades.dev" target="_blank" class="comrades_logo">
  <IconComponent name="ComradesLogo"/>
  <div class="comrades_logo-text">
    <h4>Разработано</h4>
    <h3> Comrades Devs</h3>
  </div>
</a>
</template>

<script>
import IconComponent from "components/IconComponent.vue";
export default {
  name: "ComradesLogo",
  components: {IconComponent}
}
</script>

<style lang="stylus">
.comrades_logo{
  margin-top 10px
  display flex
  align-items: center;
  gap 8px
  transition var(--transition)
  &:hover {
      color var(--main) !important
      h3, h4{
        color var(--main) !important
      }
      svg path {
        fill none
        stroke var(--main)
        stroke-width .5px
      }
    }

  svg{
    width: 35px;
    height: 35px;
    transition var(--transition)
    path{
      transition var(--transition)
    }
  }

  &-text{
    display flex
    flex-direction column;
    gap 5px
  }
  h4 {
    font-weight: 400;
    font-size: 0.625em;
    line-height: 12px;
    color: var(--dark_light);
    transition var(--transition)
  }

  h3{
    font-weight: 700;
    font-size: 0.875em;
    line-height: 15px;
    text-transform: uppercase;
    color: var(--dark_light);
    transition var(--transition)

  }
}
</style>
