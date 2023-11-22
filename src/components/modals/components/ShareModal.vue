<template>
  <div class="share-modal">
    <h3>Поделиться:</h3>
    <div class="share-modal__buttons">
      <div v-for="(item, i) in socials" :key="i">
        <ShareNetwork :network="item.network" :url="currentUrl()" title="Поделиться">
          <button :title="item.title" class="btn" type="button">
            <IconComponent :name="item.icon" />
          </button>
        </ShareNetwork>
      </div>
    </div>
  </div>

</template>

<script>

import IconComponent from "components/IconComponent.vue";
export default {
  name: "ShareModal",
  components: {IconComponent},
  data(){
    return{
      currentUrl() {
        return this.$store.state._env.MEDIA_ENDPOINT + this.$route.fullPath;
      },
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
    }
  },

}
</script>

<style lang="stylus">
.share-modal{
  display flex
  flex-direction column
  background var(--white)
  gap 10px
  padding 20px
  border-radius 20px
  z-index 9999
  .btn{
    svg{
      width: 30px;
      height: 30px;
    }
  }
  &__buttons{
    display flex
    gap 10px
  }
}
</style>
