<template>
  <main class="page_404">
    <PageDescriptionComponent :data="description" />
    <div class="page_404__content">
      <IconComponent name="page_404" />
      <span> Мы подумаем как её использовать, <br />а пока вы можете...</span>
      <div class="page_404__content-btns">
        <router-link :to="{ name: 'calc' }">
          <button class="btn btn--pink">Рассчитать инвестиции</button>
        </router-link>
        <router-link :to="{ name: 'objects' }">
          <button class="btn btn--pink-border">Посмотреть объекты</button>
        </router-link>
      </div>
      <router-link :to="{ name: 'home' }">
        <button class="btn btn--white">
          <IconComponent name="arrow_left" />
          Вернуться на главную
        </button>
      </router-link>
    </div>
  </main>
</template>

<script>
import PageDescriptionComponent from "components/PageDescriptionComponent.vue";
import IconComponent from "components/IconComponent.vue";
import PORTAL_PAGE from "../graphql/queries/portal_page.graphql";

export default {
  components: {
    IconComponent,
    PageDescriptionComponent,
  },
  async asyncData({ apollo, store, res }) {
    res.status(404);
    await apollo.defaultClient
      .query({
        query: PORTAL_PAGE,
        variables: {
          first: 12,
        },
      })
      .then(({ data }) => {
        store.state.objects_header = data.header;
        store.state.objects_footer = data.footer;
        store.state.socials = data.socials;
        store.state.phone = data.feedback;
      });
  },
  data() {
    return {
      description: {
        title: "Такой страницы пока нет",
      },
    };
  },
};
</script>
<style lang="stylus">
.page_404 {
  .page_description__text {
    max-width: 100%
  }

  &__content {
    display flex
    flex-direction column
    padding 160px 160px 0 160px
    align-items: center;
    gap 40px

    +below(1600px) {
      padding var(--between_section--tab)
    }
    +below(1024px) {
      padding var(--between_section--mob)
    }

    span {
      font-weight: 400;
      font-size: 1.375em;
      line-height: 38px;
      text-align: center;
      color: var(--dark);
    }

    .page_404-icon {
      height: 250px;
      width: 300px;
    }

    .btn {
      height: 60px;
      font-weight 400

      &--white {
        color #bababa

        svg {
          path {
            fill #bababa
          }
        }
      }
    }

    &-btns {
      display flex
      gap 20px
    }
  }
}
</style>
