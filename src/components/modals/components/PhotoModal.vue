<template>
  <div class="photo-modal modal-body">
    <ObjectSliderModal :index="index" :items="slider" />
  </div>
</template>

<script>
import ObjectSliderModal from "@/views/object/components/ObjectSliderModal.vue";

export default {
  name: "PhotoModal",
  components: { ObjectSliderModal },
  props: {
    options: Object,
    index: Number,
    slider: Array,
  },
  mounted() {},
  data() {
    return {};
  },
};
</script>

<style lang="stylus">
.modal__body {
  margin 80px 0
}

.photo-modal {
  max-width calc(100% - 400px)
  padding: 15px 15px;

  +below(1200px) {
    max-width calc(100% - 200px)
    padding: 15px 15px;
  }

  +below(600px) {
    max-width calc(100% - 30px)
    padding: 15px 15px;
    border-radius: 5px;
  }

  .slider__container {
    padding 0
  }
}
</style>
