<template>
  <div class="mob-home_blocks">
    <div class="mob-home_blocks-item">
      <div v-if="infoBlocks.card[0]" class="benefits bg--orange">
        <h3 v-if="infoBlocks.card[0].title">{{ infoBlocks.card[0].title }}</h3>
        <span v-if="infoBlocks.card[0].subtitle">{{ infoBlocks.card[0].subtitle }}</span>
      </div>
      <div v-if="infoBlocks.card[2]" class="benefits bg--green">
        <h3 v-if="infoBlocks.card[2].title">{{ infoBlocks.card[2].title }}</h3>
        <span v-if="infoBlocks.card[2].subtitle">{{ infoBlocks.card[2].subtitle }}</span>
      </div>
      <div v-if="infoBlocks.card[4]" class="benefits bg--yellow">
        <h3 v-if="infoBlocks.card[4].title">{{ infoBlocks.card[4].title }}</h3>
        <span v-if="infoBlocks.card[4].subtitle">{{ infoBlocks.card[4].subtitle }}</span>
      </div>
    </div>
    <div class="mob-home_blocks-item">
      <div v-if="infoBlocks.card[1]" class="benefits bg--blue">
        <h3 v-if="infoBlocks.card[1].title">{{ infoBlocks.card[1].title }}</h3>
        <span v-if="infoBlocks.card[1].subtitle">{{ infoBlocks.card[1].subtitle }}</span>
      </div>
      <div v-if="infoBlocks.card[3]" class="benefits bg--white">
        <h3 v-if="infoBlocks.card[3].title">{{ infoBlocks.card[3].title }}</h3>
        <span v-if="infoBlocks.card[3].title">{{ infoBlocks.card[3].subtitle }}</span>
      </div>
      <div v-if="infoBlocks.card[5]" class="benefits bg--red">
        <h3 v-if="infoBlocks.card[5].title">{{ infoBlocks.card[5].title }}</h3>
        <span v-if="infoBlocks.card[5].subtitle">{{ infoBlocks.card[5].subtitle }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    infoBlocks() {
      return this.$store.state.home_page.info;
    },
  },
};
</script>

<style lang="stylus">
.mob-home_blocks {
  display: grid;
  padding: 60px 160px;
  grid-gap: 40px;
  grid-template-columns: 1fr 1fr 1fr;
  +below(1600px) {
    padding 60px 80px
  }
  +below(1024px) {
    padding var(--between_section--mob)
    padding-top: 27px;
    grid-template-columns: 1fr 1fr;
    gap 15px
  }

  &-item {
    display flex
    flex-direction column
    gap 15px
    flex-wrap wrap;
  }
}

.bg--green {
  background: #77e4a1;
  h3{
    color #295638
  }
}

.bg--blue {
  background: rgb(208, 229, 120);
  h3{
    color rgb(114, 132, 46)
  }
}

.bg--orange {
  background: rgb(122, 206, 233);
  h3{
    color rgb(38, 106, 128)
  }
}

.bg--white {
  background: #FFFFFF;
}

.bg--yellow {
  background: #FDFEF9;
}

.bg--red {
  background: #F8DBE5;
}
</style>
