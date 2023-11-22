<template>
  <div class="object_header">
    <h3>О проекте</h3>
    <div class="object_header__info">
      <div class="object_header__info-left">
        <span v-if="data.about_project" v-html="data.about_project"></span>
        <button class="btn btn--gray" @click.prevent="openLiveModal(data)">
          <div class="live_icon"></div>
          Live
        </button>
      </div>
      <div class="object_header__info-right">
        <button class="btn btn--pink" @click.prevent="openPhoneModal">Записаться на экскурсию</button>
        <router-link :to="{ name: 'flats', params: { id: data.id } }" class="btn btn--gray">
          <span>Выбрать лот</span>
        </router-link>
      </div>
    </div>
    <div class="object_header__blocks">
      <div v-if="data.indicator && data.indicator.length" v-for="(item, i) in data.indicator" :key="i"  class="object_header__blocks-item">
        <span >{{item.title}}</span>
        <div>
          <b>{{ item.amount }}</b
          ><span>{{item.unit}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LiveModal from "components/modals/components/LiveModal.vue";
import PhoneModal from "components/modals/components/PhoneModal.vue";

export default {
  name: "ObjectHeaderComponent",
  props: {
    data: Object,
  },
  methods: {
    openLiveModal(data) {
      this.$store.state._modals.push({
        component: LiveModal,
        options: {
          data,
        },
      });
    },
    openPhoneModal() {
      this.$store.state._modals.push({
        component: PhoneModal,
      });
    },
  },
};
</script>
<style lang="stylus">
.object_header {
  display flex
  flex-direction column
  gap 40px
  padding var(--between_section)
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
    padding-top: 25px
    gap 14px
  }

  .btn {
    font-size 1.125em
    font-weight: 400;
    +below(1024px) {
      width: 100%;
    }
  }

  h3 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    padding 0
    +below(1024px) {
      font-size: 1.375em;
      line-height: 34px;
    }
  }

  svg {
    width: 20px;
    height: 20px;
  }

  &__info {
    display flex
    padding 50px
    gap 20px
    background var(--white)
    border-radius var(--main_radius)
    align-items: center;
    justify-content: space-between;
    +below(1024px) {
      flex-direction column
      padding 15px
      gap 15px
      .btn {
        width: 100%;
        height: 50px;
      }
    }

    &-left {
      display flex
      gap 30px
      align-items center
      +below(1024px) {
        flex-direction column
        width 100%
        gap 15px
      }

      span {
        font-weight: 400;
        font-size: 3em;
        line-height: 58px;
        color: var(--dark);
        +below(1400px) {
          font-size 2.5em
        }
        +below(1024px) {
          font-size: 1.625em
          line-height: 31px;
          font-weight: 700;
          align-self: stretch;
        }
      }
    }

    &-right {
      display flex
      gap 20px
      +below(1024px) {
        flex-direction column
        width 100%
        gap 15px
        .btn {
          width: 100%;
          height: 50px;
        }
      }
    }
  }

  &__blocks {
    display flex
    width: 100%;
    grid-gap 40px
    +below(1400px) {
      display grid
      grid-template-columns 1fr 1fr
    }
    +below(1024px) {
      grid-template-columns 1fr 1fr
      grid-gap 15px
      padding-top 17px
    }

    &-item {
      display flex
      align-items center
      flex-direction column
      background: var(--white);
      width: 100%;
      padding 20px 60px
      border-radius: 10px;
      +below(1024px) {
        padding 15px
      }

      span {
        font-weight: 400;
        font-size: 1.125em;
        line-height: 28px;
        width: max-content;
        color: var(--dark);
        +below(1024px) {
          font-size: 0.750em
          line-height: 18px
        }
      }

      b {
        font-weight: 700;
        font-size: 4.5em;
        line-height: 87px;
        color: var(--dark);
        +below(1024px) {
          font-size: 2.125em
          line-height: 46px
        }
      }

      div {
        display: flex;
        gap: 12px;
        align-items: center;
      }
    }
  }
}
</style>
