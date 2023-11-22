<template>
  <main class="about">
    <PageDescriptionComponent :data="info" />
    <AboutChartComponent :data="chart"  />
    <AboutObjectsComponent v-if="objectHomes" :data="objectHomes" />
    <AboutNumbersComponent v-if="info" :data="info" />
    <AboutAwardsComponent v-if="awards" :data="awards" />
    <AboutQuoteComponent v-if="info" :data="info" />
    <AboutAwardsComponent :data="tools" />
    <AboutReportsComponent v-if="file" :data="file" />
    <AboutSmiComponent v-if="smi" :data="smi" />
    <AboutEventComponent />
  </main>
</template>

<script>
import ABOUT_PAGE from "@/graphql/queries/about_page.graphql";
import AboutObjectsComponent from "./components/AboutObjectsComponent.vue";
import PageDescriptionComponent from "components/PageDescriptionComponent.vue";
import AboutNumbersComponent from "./components/AboutNumbersComponent.vue";
import AboutQuoteComponent from "./components/AboutQuoteComponent.vue";
import AboutReportsComponent from "./components/AboutReportsComponent.vue";
import AboutSmiComponent from "./components/AboutSmiComponent.vue";
import AboutEventComponent from "./components/AboutEventComponent.vue";
import AboutAwardsComponent from "./components/AboutAwardsComponent.vue";
import AboutChartComponent from "./components/AboutChartComponent.vue";

export default {
  metaInfo: {
    title: "О застройщике",
    titleTemplate: "%s | Gachalav Group",
    meta: [
      {
        vmid: "keywords",
        name: "keywords",
        content: "",
      },
      {
        vmid: "description",
        name: "description",
        content: "Продажа недвижимости в новостройках г. Дербент, республики Дагестан. Цена на квартиры в наших новостройках начинается от 934 тысяч рублей + мат. капитал.",
      },
      {
        vmid: "og:title",
        name: "og:title",
        content: "",
      },
      {
        vmid: "og:description",
        name: "og:description",
        content: "",
      },
    ],
  },
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: ABOUT_PAGE,
      })
      .then(({ data }) => {
        store.state.about_page.info = data.info;
        store.state.about_page.charts_item = data.charts_item;
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
      });
  },
  computed: {
    objectHomes() {
      return this.$store.state.about_page.info.object_homes;
    },
    info() {
      return this.$store.state.about_page.info;
    },
    file() {
      return this.$store.state.about_page.info.files;
    },
    awards() {
      return this.$store.state.about_page.info.files.slice(0, 4);
    },
    chart() {
      return this.$store.state.about_page.charts_item;
    },
    smi() {
      return this.$store.state.about_page.info.smi;
    },
  },
  components: {
    AboutAwardsComponent,
    AboutChartComponent,
    AboutEventComponent,
    AboutSmiComponent,
    AboutReportsComponent,
    AboutObjectsComponent,
    PageDescriptionComponent,
    AboutNumbersComponent,
    AboutQuoteComponent,
  },
  data() {
    return {
      description: {
        title: "Стремимся раскрыть инвестиционный потенциал жемчужины юга России",
        subtitle:
          "Tempor nulla do nostrud. Sint laboris fugiat consectetur amet tempor qui aliquip anim. Fugiat ea do dolore proident ad nisi esse minim cillum. Ex ex laborum ullamco officia nulla elit.",
        img: "/static/images/about_bckg.png",
      },
      tools: [
        { icon: "tech", title: "Передовые технологии", type: { code: 1 } },
        { icon: "avto", title: "Свой автопарк строительной техники", type: { code: 1 } },
        { icon: "package", title: "Полный пакет разрешений", type: { code: 1 } },
      ],
    };
  },
};
</script>

<style lang="stylus">
.about {
  .page_description__text {
    max-width: 1122px;
  }

  .slide_blocks {
    +below(1024px) {
      padding 10px 20px 20px 20px
    }
  }
}
</style>
