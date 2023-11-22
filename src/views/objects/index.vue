<template>
  <main class="objects_main">
    <PageDescriptionComponent :data="description" />
    <div class="object_button">
      <button class="btn btn--white" @click.prevent="objectsMapModal(objectHomes)">На карте</button>
    </div>
    <div class="object_blocks" v-if="objectHomes">
      <ObjectBlockComponent v-for="(item, i) in objectHomes" :key="i" :data="item" />
      <SecondaryObject :data="secondaryObject" />
    </div>
    <ObjectsCalculatorComponent />
    <GoCalcComponent />
  </main>
</template>

<script>
import PageDescriptionComponent from "@/components/PageDescriptionComponent.vue";
import ObjectBlockComponent from "components/ObjectBlockComponent.vue";
import GoCalcComponent from "components/GoCalcComponent.vue";
import ObjectsCalculatorComponent from "./components/ObjectsCalculatorComponent.vue";
import ObjectsMapModal from "components/modals/components/ObjectsMapModal.vue";
import OBJECTS_PAGE from "@/graphql/queries/objects_page.graphql";
import SecondaryObject from "@/views/home/components/SecondaryObject.vue";

export default {
  name: "ObjectsPage",
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: OBJECTS_PAGE,
      })
      .then(({ data }) => {
        store.state.objects_page.object_homes = data.object_homes;
        store.state.objects_page.secondaryobject = data.secondaryobject;
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
      });
  },

  computed: {
    objectHomes() {
      return this.$store.state.objects_page.object_homes;
    },
    secondaryObject() {
      return this.$store.state.objects_page.secondaryobject;
    },
  },
  data() {
    return {
      description: {
        title: "Инвестиционные объекты",
        subtitle: "",
        img: "/static/images/objects_bckg.png",
      },
    };
  },
  methods: {
    objectsMapModal(objectHomes) {
      this.$store.state._modals.push({
        component: ObjectsMapModal,
        options: {
          objectHomes,
        },
      });
    },
  },
  components: {
    SecondaryObject,
    ObjectsCalculatorComponent,
    PageDescriptionComponent,
    ObjectBlockComponent,
    GoCalcComponent,
  },
  metaInfo: {
    title: "Инвестиционные объекты ",
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
        content: "",
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
};
</script>

<style lang="stylus">
.objects_main {
  +below(1024px) {
    .object_block__img img {
      width 100%
      height: 220px;
    }
  }
}

.object_blocks {
  padding: var(--between_section);
  display: grid;
  column-gap: 40px;
  row-gap: 53px;
  grid-template-columns: repeat(3, calc(100% / 3));
  margin-right: 70px;
  justify-items: center;
  +below(1750px) {
    margin-right: 80px;
  }
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
    grid-template-columns: repeat(2, 50%);
    gap 35px
    margin-right: 0;
  }
  +below(700px) {
    grid-template-columns: repeat(1, 100%);
  }
}

.object_button {
  display: flex;
  padding: var(--between_section);
  justify-content: flex-end;
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding var(--between_section--mob)
  }
}
</style>
