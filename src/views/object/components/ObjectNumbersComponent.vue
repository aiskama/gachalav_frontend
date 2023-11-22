<template>
  <div class="number__blocks">
    <div v-if="data && data.length!==0" v-for="(item,i) in data" :key="i" class="number__blocks_item">
      <span class="number__blocks_item-text">{{item.title}}</span>
      <span v-if="item.amount" class="number__blocks_item-content">{{ item.amount }}</span>
      <span class="number__blocks_item-text">{{item.unit}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ObjectNumbersComponent",
  props: {
    data: Array,
  },
};
</script>

<style lang="stylus">
.number__blocks {
  display: flex;
  gap: 40px;
  padding: var(--between_section);
  justify-content: space-between;
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding: var(--between_section--mob);
    gap 15px
    flex-wrap wrap
  }

  &_item {
    background: var(--white);
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px
    border-radius: var(--main_radius);
    max-height: 193px;
    min-width 250px
    justify-content: center;
    align-items: center;

    &:last-child {
      width 100%
    }
    +below(1600px) {
      min-width: fit-content;
    }
    +below(1024px) {
      width calc(50% - 8px)
      min-width 0
    }

    &-text {
      font-weight: 400;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--dark);
      +below(1024px) {
        font-size: 0.750em
        line-height 18px
      }
    }

    &-content {
      font-weight: 700;
      font-size: 4.5em;
      line-height: 87px;
      color: var(--dark);
      +below(1600px) {
        font-size 3.5em
      }
      +below(1024px) {
        font-size: 2.125em
        line-height 46px
      }
    }
  }
}
</style>
