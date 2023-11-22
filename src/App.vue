<template>
  <div id="app">
    <vue-progress-bar />
    <HeaderComponent class="mobile" />
    <HeaderMobileComponent class="desktop" />
    <Transition mode="out-in" name="slide-fade">
      <RouterView :key="$route.fullPath" />
    </Transition>
    <div :class="{ 'overlay--visible': isOverlayVisible }" class="overlay" @click="hideOverlay"></div>
    <Transition name="bounce">
      <ModalComponent />
    </Transition>
    <Notifications position="bottom right" />
    <FooterFormComponent />
    <FooterComponent />
    <CookiesComponent />
  </div>
</template>

<script>
import HeaderComponent from "components/HeaderComponent.vue";
import FooterComponent from "components/FooterComponent.vue";
import FooterFormComponent from "components/FooterFormComponent.vue";
import ModalComponent from "components/modals/index.vue";
import HeaderMobileComponent from "components/HeaderMobileComponent.vue";
import CookiesComponent from "components/CookiesComponent.vue";

export default {
  name: "App",
  metaInfo: {
    title: "Gachalav Group",
  },
  created() {
    // Полоска загрузки
    this.$Progress.start();
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }
      this.$Progress.start();
      next();
    });
    this.$router.afterEach(() => {
      this.$Progress.finish();
      this.hideOverlay();
    });
  },
  mounted() {
    this.$Progress.finish();
  },
  watch: {
    "$store.state.locale"() {
      this.$cookie.set("locale", this.$store.state.locale);
    },
    "$route.name"() {
      this.$store.state.variables = {};
    },
    "$route.params"() {
      this.$store.state.variables = {};
    },
    "$route.query"() {
      this.$store.state.variables = {};
    },
    "$store.state._overlays.searchOverlay"() {
      this.$store.state._overlays.menuOverlay = false;
    },
  },
  computed: {
    isOverlayVisible() {
      return Object.keys(this.$store.state._overlays).some((k) => this.$store.state._overlays[k]);
    },
  },
  methods: {
    hideOverlay() {
      Object.keys(this.$store.state._overlays).forEach((key) => {
        this.$store.state._overlays[key] = false;
      });
    },
  },
  components: {
    CookiesComponent,
    HeaderMobileComponent,
    ModalComponent,
    HeaderComponent,
    FooterComponent,
    FooterFormComponent,
  },
};
</script>

<style lang="stylus">
@import 'styles/style.styl';
.desktop {
  +above(1201px) {
    display: none;
  }
}

.mobile {
  +below(1200px) {
    display: none;
  }
}
</style>
