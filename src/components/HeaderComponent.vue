<template>
  <header>
    <div class="header__content">
      <router-link :to="{ name: 'home' }">
        <div class="header__content-logo">
          <IconComponent name="logo" />
        </div>
      </router-link>
      <div class="header__content-menu">
        <div v-for="item in objects" :key="item.id" class="header__content-menu-item">
          <router-link :to="{ name: 'object', params: { id: item.id } }">
            <span>{{ item.title }}</span>
          </router-link>
        </div>
        <div v-for="(item, i) in nav" :key="i" class="header__content-menu-item">
          <router-link :to="{ name: item.link }">
            <span>{{ item.title }}</span>
          </router-link>
        </div>
        <router-link :to="{ name: 'live' }" class="btn btn--gray-border btn__mini">
          <!--            <IconComponent name="live" />Live-->
          <div class="live_icon" />
          Live
        </router-link>
      </div>

      <div class="header__content-phone">
        <IconComponent name="phone" />
        <a :href="'tel:' + number.phone">
          <span>{{ number.phone }}</span>
        </a>
      </div>
      <button class="btn btn--gray-border callback__button" @click="openCallBackModal"><span>Обратный звонок</span></button>
    </div>
  </header>
</template>

<script>
import IconComponent from "./IconComponent.vue";
import CallBackModal from "components/modals/components/CallBackModal.vue";

export default {
  name: "HeaderComponent",
  components: { IconComponent },
  data() {
    return {
      nav: [
        { title: "Все объекты", link: "objects" },
        // { title: "О нас", link: "about" },
        { title: "Контакты", link: "contacts" },
      ],
    };
  },
  methods: {
    openCallBackModal() {
      this.$store.state._modals.push({
        component: CallBackModal,
      });
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
header {
  width: 100%;
  padding: 30px 160px;
  position: fixed;
  z-index 999

  +below(1600px) {
    padding 30px 80px
  }
  +below(1024px) {
    padding 20px
  }

  a {
    transition var(--transition)

    &:hover {
      color var(--main) !important
    }

  }

  .callback__button{
    width: 180px;
    height: 46px;
  }

  .btn__mini {
    width: 66px;
    height: 32px !important;
    gap 7px
    padding: 0 10px 0 8px;
  }

  .btn {
    border: 1px solid rgba(213, 216, 223, 0.5);
    font-size: 0.875em;
    line-height: 22px;
  }

  .header__content {
    display: flex;
    align-items: center;
    background-color: var(--white-o7);
    backdrop-filter: saturate(50%) blur(8px);
    border-radius: 10px;
    justify-content: space-between;
    padding: 20px 20px 20px 40px;
    gap 10px
    +below(1400px) {
      padding 20px 10px
    }


    &-logo {
      display: flex;
      max-width 200px
      gap: 30px;
    }

    &-menu {
      display: flex;
      align-items: center;
      gap: 30px;
      +below(1700px) {
        gap 25px
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }

    &-menu-item {
      a {
        text-decoration: none;
        color: var(--dark_light);
        font-weight: 500;
        font-size: 1em;
        line-height: 26px;
        white-space: pre;
        +below(1600px) {
          line-height: 20px;
        }
        +below(1350px) {
          font-size 0.8em
        }
      }
    }

    &-phone {
      display: flex;
      align-items: center;
      gap: 7px;
      padding-right: 30px;
      white-space: pre;
      +below(1600px) {
        padding-right 0
      }

      svg {
        width 18px
        height: 18px;

        path {
          fill: var(--dark);
        }
      }

      a {
        text-decoration: none;
        color: var(--dark);
        font-weight: 700;
        font-size: 1em;
        line-height: 26px;
        +below(1400px) {
          font-size: 0.875em;
        }
      }
    }
  }
}
</style>
