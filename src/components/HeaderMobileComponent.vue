<template>
  <header>
    <div class="header__content">
      <router-link :to="{ name: 'home' }" class="header__content-logo">
          <IconComponent name="logo" />
      </router-link>
      <div class="header__content-right">
        <router-link :to="{ name: 'live' }" class="btn btn--gray-border btn__mini">
          <div class="live_icon" />
          <span>Live</span>
        </router-link>
        <a :href="'tel:' + number.phone">
          <IconComponent name="phone" />
        </a>
        <div class="header__content-menu" @click.prevent="toggle">
          <IconComponent name="menu" />
        </div>
      </div>
    </div>
    <div :class="{ mobile_menu__open: isOpen }" class="mobile_menu">
      <div :class="{ mobile_menu__open: isOpen }" class="mobile_menu__content">
        <div class="mobile_menu__content-close" @click.prevent="toggle">
          <IconComponent name="close" />
        </div>
        <div class="mobile_menu__content-text">
          <div class="mobile_menu__content-text--block">
            <h3>Объекты</h3>
            <div v-for="item in objects" :key="item.id" @click.prevent="toggle">
              <router-link :to="{ name: 'object', params: { id: item.id } }">
                <span>{{ item.title }}</span>
              </router-link>
            </div>
          </div>
          <div class="mobile_menu__content-text--block">
            <h3>Компания</h3>
            <div @click.prevent="toggle">
              <router-link :to="{ name: 'about' }"><span>О застройщике</span></router-link>
            </div>
            <div @click.prevent="toggle">
              <router-link :to="{ name: 'portal' }"><span>Новости</span></router-link>
            </div>
            <div @click.prevent="toggle">
              <router-link :to="{ name: 'privacy' }"><span>Политика конфиденциальности</span></router-link>
            </div>
          </div>
          <div class="mobile_menu__content-footer" @click.prevent="toggle">
            <div class="header__content-phone">
              <IconComponent name="phone" />
              <a :href="'tel:' + number.phone">
                <span>{{ number.phone }}</span>
              </a>
            </div>
            <router-link :to="{ name: 'live' }" class="btn btn--gray-border">
              <div class="live_icon" />
              <span>Live</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import IconComponent from "./IconComponent.vue";
// import CallBackModal from "components/modals/components/CallBackModal.vue";
export default {
  name: "HeaderMobileComponent",
  components: { IconComponent },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        document.body.classList.add("no-overflow");
      } else {
        document.body.classList.remove("no-overflow");
      }
    },
  },
  computed: {
    objects() {
      return this.$store.state.objects_header.data;
    },
    number() {
      return this.$store.state.phone;
    },
  },
};
</script>

<style lang="stylus">
.no-overflow {
  overflow hidden
}

header {
  width: 100%;
  padding: 30px 160px
  position: fixed;
  z-index 900
  display flex
  flex-direction column
  gap 7px
  +below(1600px) {
    padding 30px 80px
  }
  +below(1024px) {
    padding 20px
  }

  .btn {
    svg {
      width: 16px;
      height: 16px;
    }
    +below(1400px) {
      font-size: 0.875em;
    }
  }

  .header__content {
    display: flex;
    align-items: center;
    background-color: var(--white-o7);
    backdrop-filter: saturate(50%) blur(8px);
    border-radius: 10px;
    justify-content: space-between;
    +below(1400px) {
      padding 20px 10px
    }
    +below(1024px) {
      padding 18px 15px
    }

    .phone-icon {
      +below(1024px) {
        svg {
          width: 15px;
          height: 15px;

          path {
            fill var(--dark)
          }
        }

      }

    }

    &-right {
      display flex
      align-items center
      gap 10px

      .phone-icon {
        svg {
          width 18px
          height: 18px;

          path {
            fill: var(--dark);
          }
        }
      }
    }

    &-logo {
      display: flex;
      gap: 30px;
      +below(1024px) {
        svg {
          width 130px
        }
      }

    }
  }
}

.mobile_menu {
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  transform: translateX(180%);
  transition var(--transition)


  &__content {
    display flex
    flex-direction column
    position absolute
    top 0
    right 0
    background-color var(--white)
    transform: translateX(180%);
    width: fit-content;
    height: 100%;
    transition var(--transition)

    &-close {
      display flex
      padding 32px
      justify-content: flex-end;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    &-text {
      display flex
      flex-direction column
      gap 40px
      padding 59px 65px 50px 45px
      overflow: scroll;

      &--block {
        display flex
        flex-direction column
        gap 21px

        h3 {
          font-weight: 700;
          font-size: 1.125em;
          line-height: 28px;
          color: var(--dark);
        }

        span {
          font-weight: 400;
          font-size: 1em;
          line-height: 26px;
          color: var(--dark_light);
        }
      }
    }

    &-footer {
      display flex
      flex-direction column
      gap 25px
    }
  }

  &__open {
    transform: translateX(0) !important;
  }
}
</style>
