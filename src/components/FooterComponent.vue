<template>
  <footer>
    <div class="footer__item footer__item--first mobile">
      <router-link :to="{ name: 'home' }">
        <IconComponent class="footer__item-logo" name="logo_footer" />
      </router-link>
      <div class="footer__item-subtitle mobile">
        <span>© 2022. Gachalav Development. Копирование запрещено. </span>
        <span
          >Информация на сайте не является публичной офертой и инвестиционной рекомендацией.</span
        >
      </div>
      <ComradesLogo/>
    </div>
    <div class="footer__item footer__item--first desktop">
      <router-link :to="{ name: 'home' }">
        <IconComponent class="footer__item-logo" name="logo_footer" />
      </router-link>
      <div class="footer__item-subtitle">
        <span >
          © 2022. Gachalav Development. Копирование запрещено. Информация на сайте не является публичной
          офертой и инвестиционной рекомендацией.
        </span>
        <ComradesLogo />
      </div>
    </div>
    <div class="footer__item">
      <span class="footer__item-title">Объекты</span>
      <div class="footer__item-subtitle">
        <router-link v-for="(item, i) in objects" :key="i" :to="{ name: 'object', params: { id: item.id } }">
          <span>{{ item.title }}</span>
        </router-link>
      </div>
    </div>
    <div class="footer__item">
      <span class="footer__item-title">Компания</span>
      <div class="footer__item-subtitle">
        <router-link :to="{ name: 'about' }">
          <span>О застройщике</span>
        </router-link>
        <router-link :to="{ name: 'portal' }">
          <span>Новости</span>
        </router-link>
        <router-link :to="{ name: 'privacy' }">
          <span>Политика конфиденциальности</span>
        </router-link>
      </div>
    </div>
    <div class="footer__item footer__item-contacts">
      <span class="footer__item-title">Контакты</span>
      <div class="footer__item-subtitle">
        <a :href="'tel:' + number.phone">
          <IconComponent name="phone" />
          <span>{{ number.phone }}</span>
        </a>

        <a :href="'mailto:' + number.email " >
          <IconComponent name="mail" />
          <span>{{ number.email }}</span>
        </a>
        <a
          :href="'https://yandex.ru/maps/?text=' + number.email"
          target="_ blank"
        >
          <IconComponent name="location" />
          <span>{{ number.address }}</span>
        </a>
        <router-link :to="{ name: 'contacts' }">
          <IconComponent name="time" />
          <span>{{ number.working_mode }}</span>
        </router-link>
      </div>
    </div>
    <div class="footer__item footer__item-socials">
      <span class="footer__item-title">Соц. сети</span>
      <div class="footer__item-subtitle">
        <a v-for="(item, i) in socials" :key="i" :href="item.link" target="_blank">
          <figure v-html="item.icon"/>
          <span>{{ item.title }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import IconComponent from "./IconComponent.vue";
import ComradesLogo from "components/ComradesLogo.vue";

export default {
  name: "FooterComponent",
  components: {ComradesLogo, IconComponent },
  data() {
    return {};
  },
  computed: {
    objects() {
      return this.$store.state.objects_footer.data;
    },
    socials() {
      return this.$store.state.socials.slice(0, 4);
    },
    number() {
      return this.$store.state.phone;
    },
  },
};
</script>

<style lang="stylus">
footer {
  display: grid;
  grid-template-columns 1fr 1fr 1fr 1fr 1fr
  gap 70px
  background: var(--white);
  width: 100%;
  padding: 75px 160px;
  left: 0;
  bottom: 0;

  +below(1600px) {
    padding 60px 80px
  }
  +below(1024px) {
    display grid
    padding: 35px 30px;
    grid-template-columns 1fr 1fr
    gap 35px
  }
  +below(350px) {
    gap 10px
  }

  a {
    transition var(--transition)

    &:hover {
      color var(--main) !important
      span{
        color var(--main) !important
      }
      svg path {
        fill var(--main)
      }
    }

  }

  .footer__item {
    display: flex;
    flex-direction: column;

     &-socials{
       a {
         display flex
         gap 6px
         align-items center
       }

       svg {
         width: 13px;
         height: 13px;
         transition var(--transition)

         path {
           fill var(--dark_light)
           transition var(--transition)

         }
       }

     }
    &-logo {
      max-width: 230px;
      padding-bottom: 28px;
      svg path {
        transition var(--transition)
      }
    }

    &--first {
      +below(1024px) {
        order 5
        grid-column: 1 / span 2;
        margin-left: -10px;
        .footer__item-subtitle {
          max-width 100%
        }
      }
    }

    &-contacts {
      a {
        display flex
        gap 6px
        align-items center
      }

      svg {
        width: 13px;
        height: 13px;
        transition var(--transition)

        path {
          fill var(--dark_light)
          transition var(--transition)

        }
      }
    }

    &-title {
      font-weight: 700;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--dark);
      padding-bottom: 21px;
      +below(1024px) {
        font-size: 1em;
        line-height: 26px;
      }
    }

    &-subtitle {
      display: flex;
      flex-direction: column;
      gap: 21px;
      max-width: 250px;

      a {
        text-decoration: none;
        font-weight: 400;
        font-size: 0.875em;
        line-height: 22px;
        color: var(--dark_light);
        transition var(--transition)
      }

      span {
        text-decoration: none;
        font-weight: 500;
        font-size: 0.875em;
        line-height: 22px;
        color: var(--dark_light);
        transition var(--transition)

      }
    }
  }

  .desktop {
    +above(1025px) {
      display: none;
    }
  }

  .mobile {
    +below(1024px) {
      display: none;
    }
  }
}
</style>
