<template>
  <div class="objects_calculator">
    <h3>Калькулятор инвестиционно-привлекательных лотов</h3>
    <CalculatorComponent />
  </div>
</template>
<script>
import CalculatorComponent from "@/components/CalculatorComponent.vue";

export default {
  name: "ObjectsCalculatorComponent",
  components: { CalculatorComponent },
};
</script>
<style lang="stylus">
.objects_calculator {
  display flex
  flex-direction column
  gap 40px
  padding 60px 160px 0 160px
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
    gap 20px
  }

  h3 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    +below(1024px) {
      font-size: 1.5em;
      line-height: 32px;
    }
  }
}
</style>
