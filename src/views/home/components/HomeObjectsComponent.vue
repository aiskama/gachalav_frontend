<template>
  <div class="home_objects">
    <div class="home_objects__header">
      <h3>Инвестиционно-привлекательные объекты</h3>
      <router-link :to="{ name: 'objects' }" class="btn btn--white btn__mini">
        <span>
          Все
          <IconComponent name="arrow_right" />
        </span>
      </router-link>
    </div>
    <div class="home_objects__content">
      <ObjectBlockComponent v-for="(item, i) in data" :key="i" :data="item" />
      <SecondaryObject :data="secondaryobject" />
    </div>
  </div>
</template>

<script>
import ObjectBlockComponent from "components/ObjectBlockComponent.vue";
import IconComponent from "components/IconComponent.vue";
import SecondaryObject from "./SecondaryObject.vue";

export default {
  components: { SecondaryObject, ObjectBlockComponent, IconComponent },
  data() {
    return {};
  },
  props: {
    data: Array,
  },
  computed: {
    secondaryobject() {
      return this.$store.state.home_page.secondaryobject;
    },
  },
};
</script>

<style lang="stylus">
.home_objects {
  padding: var(--between_section);
  display: flex;
  flex-direction: column;
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
  }

  &__content {
    display: grid;
    column-gap: 40px;
    row-gap 55px
    //grid-template-columns: 1fr 1fr 1fr;
    grid-template-columns: repeat(3, calc(100% / 3));
    padding-right: 70px;

    +below(1750px) {
      padding-right: 80px;
    }
    +below(1024px) {
      overflow-x: scroll;
      display flex
      gap 15px
      padding-right: 0;

    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
    align-items: flex-end;
    +below(1024px) {
      align-items: flex-start;
      flex-direction: column;
      gap 15px
      padding-bottom: 27px;
    }

    h3 {
      font-weight: 700;
      font-size: 2.125em;
      line-height: 41px;
      color: var(--dark);
      +below(1024px) {
        font-size: 1.375em;
        line-height: 34px;
      }
    }
  }
}
</style>
