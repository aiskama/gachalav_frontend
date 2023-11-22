<template>
  <div class="object_map-modal">
    <ArrayMapComponent :addresses="objectHomes" />
  </div>
</template>

<script>
import ArrayMapComponent from "components/ArrayMapComponent.vue";

export default {
  name: "ObjectsMapModal",
  components: { ArrayMapComponent },
  data() {
    return {};
  },
  props: {
    objectHomes: Array,
  },
};
</script>

<style lang="stylus">
.object_map-modal {
  background-color: var(--white);
  border-radius: 15px;
  filter: drop-shadow(0px 30px 60px rgba(0, 0, 0, 0.1));
  max-width: 1000px;
  width: 100%;
  z-index: 10;
  //padding 40px 50px 50px 50px

}
</style>
