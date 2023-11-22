<template>
  <div class="map-modal">
    <yandex-map v-if="isLoaded" :coords="coords" :settings="settings">
      <ymap-marker :coords="coords" :icon="icon" marker-id="0" />
    </yandex-map>
  </div>
</template>

<script>
import { loadYmap, yandexMap, ymapMarker } from "vue-yandex-maps";

export default {
  name: "MapModal",
  props: {
    address: String,
  },
  data() {
    return {
      isLoaded: false,
      coords: [42.959602, 47.506083],
      icon: {
        layout: "default#imageWithContent",
        imageHref: "/static/svg/gachalav.svg",
        imageSize: [60, 60],
        imageOffset: [-18, -30],
      },

      settings: {
        apiKey: "acf7a329-99c5-4322-968e-7d448d951ec7",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      },
    };
  },
  methods: {},
  async mounted() {
    await loadYmap({ ...this.settings });
    window.ymaps.ready(() => {
      window.ymaps.geocode(this.address).then((res) => {
        this.coords = res.geoObjects.get(0).geometry.getCoordinates();
        this.isLoaded = true;
      });
    });
    // window.ymaps.ready(() => {
    //   // this.addresses - массив из адресов Например: ['Махачкала, петра первого 123']
    //   let promises = this.address.map((item) => {
    //     // geocode асинхронная функция она возвращает Promise
    //     return window.ymaps.geocode(item);
    //   }); // Здесь получился массив из Promise которые нужно обработать
    //   // Здесь мы буквально ждем пока все асинхронные действия завершатся
    //   Promise.all(promises).then((coords) => {
    //     // Получаем массив из координат и показываем карту
    //     return coords;
    //     this.isLoaded = true;
    //   });
    // });
  },
  components: {
    yandexMap,
    ymapMarker,
  },
};
</script>

<style lang="stylus">
.map-modal {
  width: 100%;

  +below(1024px) {
    //height: 200px;
  }

  .ymap-container {
    width: 100%;
    height: 788px;

    +below(1024px) {
      height: 200px;
    }
  }

  &__hint {
    background: #FFFFFF;
    padding: 6px 12px;
    font-size: 1em;
    font-weight: bold;
    position: absolute;
    width: 200px;
    border-radius: 8px;
  }
}
</style>
