<template>
  <div>
    <PageDescriptionComponent :data="description" />
    <div class="pad">
      <CalculatorComponent />
    </div>
  </div>
</template>

<script>
import PageDescriptionComponent from "components/PageDescriptionComponent.vue";
import CalculatorComponent from "components/CalculatorComponent.vue";

export default {
  name: "index.vue",
  metaInfo: {
    title: "Расчёт инвестиций",
    titleTemplate: "%s | Gachalav Group",
    meta: [
      {
        vmid: "keywords",
        name: "keywords",
        content: "",
      },
      {
        vmid: "description",
        name: "description",
        content: "",
      },
      {
        vmid: "og:title",
        name: "og:title",
        content: "",
      },
      {
        vmid: "og:description",
        name: "og:description",
        content: "",
      },
    ],
  },
  components: { PageDescriptionComponent, CalculatorComponent },
  data() {
    return {
      description: { title: "Расчёт инвестиций" },
    };
  },
};
</script>

<style lang="stylus">
.pad {
  padding var(--between_section)
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
  }
}
</style>
