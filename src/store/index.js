import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default function createStore(state) {
  return new Vuex.Store({
    state() {
      return (
        state || {
          user: null,
          _modals: [],
          _overlays: {
            searchOverlay: false,
            menuOverlay: false,
          },
          home_page: {
            gallery_works: [],
            object_homes: [],
            news: [],
            info_files: [],
            info: [],
            secondaryobject: [],
          },
          objects_page: {
            object_homes: [],
            secondaryobject: [],
          },
          about_page: {
            object_homes: [],
            charts_item: [],
          },
          flats_page: {
            apartments: [],
            apartments_item: null,
            object_homes_item: [],
          },

          portal_page: {
            news: [],
            news_item: [],
          },
          contacts_page: [],
          object_item: {
            object_homes_item: [],
            charts_item: [],
            info: [],
            awards: [],
          },
          live_page: {
            object_homes: [],
          },
          slider_page: [],
          secondary_page: {
            secondaryobject: [],
            charts_item: [],
            apartments: [],
          },
          socials: [],
          objects_footer: [],
          objects_header: [],
          phone: [],
          bonuses: [],
        }
      );
    },
  });
}
