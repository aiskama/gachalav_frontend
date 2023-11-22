<template>
  <main>
    <PageDescriptionComponent :data="description" />
    <ContactsInfoComponent :contacts="contacts" />
    <ContactsTelegramComponent :data="contacts" />
  </main>
</template>

<script>
import PageDescriptionComponent from "components/PageDescriptionComponent.vue";
import ContactsInfoComponent from "./components/ContactsInfoComponent.vue";
import ContactsTelegramComponent from "./components/ContactsTelegramComponent.vue";
import CONTACTS_PAGE from "@/graphql/queries/contacts_page.graphql";

export default {
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: CONTACTS_PAGE,
      })
      .then(({ data }) => {
        store.state.contacts_page = data.feedback;
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
      });
  },
  data() {
    return {
      description: {
        title: "Контакты",
        img: "/static/images/objects_bckg.png",
      },
    };
  },
  computed: {
    contacts() {
      return this.$store.state.contacts_page;
    },
  },
  metaInfo: {
    title: "Контакты ",
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
  components: {
    ContactsTelegramComponent,
    ContactsInfoComponent,
    PageDescriptionComponent,
  },
};
</script>

<style lang="stylus"></style>
