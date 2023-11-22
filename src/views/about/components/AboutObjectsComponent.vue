<template>
  <div class="about_objects">
    <div class="about_objects__header">
      <h3>Инвестиционно-привлекательные объекты</h3>
      <router-link :to="{ name: 'objects' }" class="btn btn--white btn__mini">
          <span>Все</span>
          <IconComponent name="arrow_right" />
      </router-link>
    </div>
    <div class="about_objects__content" v-if="data">
      <ObjectBlockComponent v-for="(item, i) in data" :key="i" :data="item" />
    </div>
  </div>
</template>

<script>
import ObjectBlockComponent from "components/ObjectBlockComponent.vue";
import IconComponent from "components/IconComponent.vue";

export default {
  components: { ObjectBlockComponent, IconComponent },
  props: {
    data: Array,
  },
};
</script>

<style lang="stylus">
.about_objects {
  padding: var(--between_section);
  display: flex;
  flex-direction: column;
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding 34px 20px 20px 20px
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
    padding-bottom: 40px;
    align-items: flex-end;
    +below(1024px) {
      flex-direction column
      padding-bottom: 25px;
      gap 15px
      align-items: flex-start;
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
