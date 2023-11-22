<template>
  <div class="news_info">
    <div class="news_info-item" v-if="news_item.date!=null">Дата публикации: {{ news_item.date | humanDate }}</div>
    <div class="news_info-item" v-if="news_item.category && news_item.category.length">
      Тип публикации: <span class="news_info-item--teg">{{ news_item.category.title }}</span>
    </div>
    <div class="news_info-item">
      Поделиться
      <div class="news_info-item__buttons">
        <div v-for="(item, i) in socials" :key="i">
          <ShareNetwork :network="item.network" :url="currentUrl()" title="Поделиться">
            <button :title="item.title" class="btn btn--gray-border" type="button">
              <IconComponent :name="item.icon" />
            </button>
          </ShareNetwork>
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'portal' }" class="news_info-item news_info-btn">
        <IconComponent name="arrow_left" />
        <span>Вернуться к списку</span>
    </router-link>
  </div>
</template>

<script>
import IconComponent from "components/IconComponent.vue";

export default {
  name: "NewsInfoBlockComponent",
  data() {
    return {
      socials: [
        {
          title: "Telegram",
          network: "telegram",
          icon: "telega",
        },
        {
          title: "Whatsapp",
          network: "whatsapp",
          icon: "wtsapp",
        },
        {
          title: "Vkontakte",
          network: "vk",
          icon: "vk",
        },
        {
          title: "Twitter",
          network: "twitter",
          icon: "twit",
        },
      ],
      currentUrl() {
        return this.$store.state._env.MEDIA_ENDPOINT + this.$route.fullPath;
      },
    };
  },
  props: {
    news_item: {
      type: Object,
      default: () => {},
    },
  },
  components: { IconComponent },
};
</script>

<style lang="stylus">
.news_info {
  display: flex;
  flex-direction: column;
  border-radius: var(--main_radius);
  gap: 1px;
  +below(1024px) {
    order 2
    margin 0 15px 15px 15px
  }

  &-item {
    padding: 15px;
    background: var(--white);

    &:first-child {
      border-radius 10px 10px 0 0
    }

    &:last-child {
      border-radius 0 0 10px 10px
    }

    &--teg {
      padding: 3px 10px;
      background: var(--gray);
      border-radius: 100px;
    }

    &__buttons {
      display: flex;
      gap: 5px;
      padding-top 10px

      .btn {
        border-radius 5px
        padding: 18px 15px;

        svg {
          width 22px
          height 22px
        }
      }
    }
  }

  &-btn {
    display flex
    gap 15px
    font-weight: 400;
    font-size: 1em;
    line-height: 26px;
    color var(--main)

    svg {
      width 10px
      height 10px
    }
  }
}
</style>
