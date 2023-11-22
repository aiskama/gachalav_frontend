<template>
  <div class="map">
    <ClientOnly v-if="mapReady && isMounted">
      <yandex-map :coords="coords || []" :settings="settings" zoom="14" @map-was-initialized="init">
        <ymap-marker
          v-for="(m, i) in currentMarkers"
          :key="m.id"
          :balloon-template="m.baloon"
          :coords="m.coords"
          :icon="icon"
          :marker-id="m.id"
        />
      </yandex-map>
    </ClientOnly>
  </div>
</template>

<script>
import { loadYmap, yandexMap, ymapMarker } from "vue-yandex-maps";
import ClientOnly from "vue-client-only";

export default {
  name: "ArrayMapComponent",
  props: {
    addresses: Array,
    active: Object,
    // markers: Array,
  },
  data() {
    return {
      map: null,
      mapReady: false,
      isMounted: false,
      markers: [],
      coords: [42.0678, 48.2899],
      balloon_template: "GachalavGroup",
      bounds: null,
      settings: {
        apiKey: "c5ba8ad1-d002-49b3-ae67-db98ac46c0ed",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      },
      icon: {
        layout: "default#imageWithContent",
        imageHref: "/static/svg/gachalav.svg",
        imageSize: [60, 60],
        imageOffset: [-18, -30],
      },
    };
  },
  beforeMount() {
    loadYmap({
      ...this.settings,
    }).then(() => {
      window.ymaps.ready(() => {
        this.markers = JSON.parse(JSON.stringify(this.addresses));
        this.markers.forEach((m) => {
          window.ymaps.geocode(m.address).then((res) => {
            m.coords = res.geoObjects.get(0).geometry.getCoordinates();
          });
        });
        // видимо запросы на геокодер не успевают сработать, поэтому добавил задержку
        setTimeout(() => {
          this.mapReady = true;
        }, 200);
      });
    });
  },
  computed: {
    currentMarkers() {
      if (this.active) {
        let active = this.markers.find((m) => m.id === this.active.id);
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.coords = active.coords;
        return [active];
      }
      this.markers.forEach((item) => {
        item.baloon = `
      <a  href="/object/${item.id}" "target="_blank" >
        <h1 class="red">${item.title}</h1>
      </a>
      `;
      });
      return this.markers;
    },
  },
  methods: {
    init(map) {
      this.map = map;
    },
  },
  mounted() {
    setTimeout(() => {
      this.isMounted = true;
    }, 50);
  },
  components: {
    yandexMap,
    ymapMarker,
    ClientOnly,
  },
};
</script>

<style lang="stylus">
.map {
  width: 100%
  height: 100%
  border-radius var(--big-radius)
  overflow hidden

  .ymap-container {
    width 100%
    height 100%
  }

  .ymap-container {
    width: 100%;
    height: 730px;

    +below(1024px) {
      //width: 100%;
      height: 442px;
    }
  }
}
</style>
