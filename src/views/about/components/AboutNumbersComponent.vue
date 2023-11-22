\<template>
  <div class="about_number">
    <h3 class="about_number__title">Ведущий лидер среди строительных компаний города Дербент</h3>
    <div class="about_number__blocks" v-if="data">
      <div v-if="data.indicator && data.indicator.length!==0" v-for="(item, i) in data.indicator" :key="i" class="about_number__blocks_item">
        <span class="about_number__blocks_item-text">{{item.title}}</span>
        <span class="about_number__blocks_item-content">{{ item.amount }}</span>
        <span class="about_number__blocks_item-text">{{item.unit}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutNumbersComponent",
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.about_number {
  display: flex;
  flex-direction: column;
  padding: var(--between_section);
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
  }

  &__title {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    +below(1024px) {
      font-size: 1.375em;
      line-height: 34px;
    }
  }

  &__blocks {
    display: flex;
    //grid-template-columns 1fr 1fr 1fr 1fr 1fr
    width: 100%;
    gap: 40px;
    padding-top 40px
    //justify-content: space-between;
    +below(1600px) {
      gap 20px
    }
    +below(1200px) {
      gap 15px
      display grid
      grid-template-columns 1fr 1fr
      padding-top 14px

      :nth-child(5) {
        grid-column: 1 / span 2;
      }
    }

    &_item {
      background: var(--white);
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 5px;
      padding: 20px
      border-radius: var(--main_radius);
      max-height: 193px;
      min-width fit-content
      justify-content: center;
      align-items: center;
      +below(1600px) {
        min-width fit-content
      }
      +below(1024px) {
        min-width fit-content
        min-height: fit-content;
        padding 10px
        gap 2px
      }

      &-text {
        font-weight: 400;
        font-size: 1.125em;
        line-height: 28px;
        color: var(--dark);
        +below(1024px) {
          font-size: 0.75em;
          line-height: 18px;
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
          font-size: 2.125em;
          line-height: 46px;
        }
      }
    }
  }
}
</style>
