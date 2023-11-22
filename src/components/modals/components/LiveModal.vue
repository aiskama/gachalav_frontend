<template>
  <div class="live_modal">
    <h2>{{ data.title }}</h2>
    <div class="live_modal-tags">
      <span
        v-for="(item,i) in data.indicator"
        :key="i"
        class="btn btn--gray">
        <b> {{item.title}}</b>
        {{ item.amount }} {{item.unit}}</span>
    </div>
    <div class="live_modal__tabs">
      <button
        v-for="(tab, i) in data.camera"
        :key="tab.id"
        :class="{ 'btn--pink': activeTab === i }"
        class="btn btn--gray-border"
        @click="activeTab = i"
      >
        {{ tab.title }}
      </button>
    </div>
    <template v-for="(item, i) in data.camera">
      <div v-if="activeTab === i" :key="item.id">
        <iframe :src="item.link" allowfullscreen="allowfullscreen"></iframe>
      </div>
    </template>
    <router-link :to="{ name: 'object', params: { id: data.id } }">
      <button class="btn btn--gray" @click="close">Открыть объект</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "LiveModal",
  props: {
    data: Object,
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  methods: {
    close() {
      this.$store.state._modals = [];
    },
  },
};
</script>

<style lang="stylus">
.live_modal {
  padding 40px 50px 50px 50px
  background var(--white)
  display flex
  gap 20px
  border-radius var(--main_radius)
  flex-direction column
  z-index 999
  +below(1024px) {
    padding 15px
  }

  &-tags {
    display flex
    gap 10px
    +below(1024px) {
      flex-wrap wrap
    }

    .btn {
      height: 32px;
      cursor default

      &:active {
        transform: scale(1);
      }
    }

    .btn--gray {
      font-weight 400
    }

    b {
      font-weight 700

    }
  }

  iframe {
    border-radius var(--main_radius)
    height 483px
    width 800px

    +below(1024px) {
      height 207px
      width 344px
    }
  }

  h2 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    padding-bottom 10px
    +below(1024px) {
      font-size: 1.625em;
      line-height: 31px;
      padding-bottom 0
    }
  }

  &__tabs {
    display flex
    align-items center
    gap 10px
    flex-wrap wrap
    justify-content: center;
  }
}
</style>
