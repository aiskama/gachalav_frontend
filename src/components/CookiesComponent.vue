<template>
  <div v-if="!confirmed" class="cookies">
    <div class="cookies-text">
      <span>
        Мы используем файлы Cookie, чтобы вам было удобнее пользоваться нашим сайтом. Продолжая использование
        сайта, Вы соглашаетесь с использованием нами файлов Cookies
      </span>
    </div>
    <div class="cookies-btn">
      <button class="btn btn--pink" @click="claim">Принять</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CookiesComponent",
  data() {
    return {
      confirmed: true,
    };
  },
  mounted() {
    this.confirmed = this.$cookie.get("confirmed-cookie");
  },
  methods: {
    claim() {
      this.confirmed = true;
      this.$cookie.set("confirmed-cookie", true);
    },
  },
};
</script>

<style lang="stylus">
.cookies {
  display flex
  //justify-content space-between
  //width 100%
  //height 110px
  //position sticky
  //padding 20px 200px
  //background-color var(--white)
  //box-shadow: 0 2px 8px var(--dark);
  //color var(--dark)
  //z-index 1000
  //bottom 0


  z-index: 20;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 15px;
  left: 50%;
  width: 940px;
  max-width: 90%;
  transform: translateX(-50%);
  padding: 25px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.4);
  +below(1024px){
    flex-direction column
  }

  &-text {
    display flex
    align-items center
  }

  span {
    margin: 0;
    font-size: 1em;
    text-align: left;
    color: var(--dark);
    font-weight 400
  }

  &-btn {
    display flex
    align-items center
  }
}
</style>
