<template>
  <div class="home_blocks">
    <div v-for="(item,i) in infoBlocks.card" :key="i" class="benefits">
      <h3>{{ item.title }}</h3>
      <span>{{ item.subtitle }}</span>
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
.home_blocks {
  display: grid;
  padding 55px 160px 0 160px
  grid-gap: 40px;
  grid-template-columns: 1fr 1fr 1fr;
  +below(1600px) {
    padding 60px 80px
  }
  +below(1024px) {
    padding var(--between_section--mob)
    grid-template-columns: 1fr 1fr;
    gap 15px
  }
  :nth-child(1) {
  background: rgb(122, 206, 233);
    h3{
      color rgb(38, 106, 128)
    }
}
  :nth-child(2) {
    background: rgb(208, 229, 120);
    h3{
      color rgb(114, 132, 46)
    }
  }
  :nth-child(3) {
    background: #77e4a1;
    h3{
      color #295638
    }
  }

  :nth-child(4) {
    background: #CDDFF0;
  }

  :nth-child(5) {
    background: #FFFFFF;
  }
  :nth-child(6) {
    background: #F8DBE5;
  }

}





</style>
