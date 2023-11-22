<template>
  <div class="quote">
    <div class="quote__header">
      <span class="quote__header-right"
        >«Наша миссия — менять к лучшему жизни жителей Дербента, путем строительства качественного
        жилья»</span
      >
      <div class="quote__header-left">
        <span class="quote__header-left_title">Гачалаев Гачалав</span>
        <span class="quote__header-left_subtitle">Генеральный директор Gachalav Group</span>
      </div>
    </div>
    <div class="quote__content">
      <div v-if="data" :class="{ 'quote__content-text--open': textOpen }" class="quote__content-text">
        <EditorJSArticleComponent v-if="data" :text="JSON.parse(data.speech)" />
        <span class="quote__content-text--mob" @click.prevent="toggle">Читать полностью</span>
      </div>
      <div class="quote__content-img">
        <ImageComponent src="/static/images/gachalav.png" />
        <a href="https://www.youtube.com/watch?v=DT5ceJ-l5FU" target="_blank" class="btn btn--pink">
          Посмотреть обращение</a>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";

export default {
  components: { EditorJSArticleComponent, ImageComponent },
  props: {
    data: Object,
  },
  data() {
    return {
      textOpen: false,
    };
  },
  methods: {
    toggle() {
      this.textOpen = !this.textOpen;
    },
  },
};
</script>

<style lang="stylus">
.quote {
  display: flex;
  flex-direction: column;
  padding: 20px 160px 0 160px;
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding 0
  }

  &__header {
    margin: 0 50px;
    display: flex;
    padding: 30px 40px 40px 40px;
    border-radius: var(--main_radius) var(--main_radius) 0 0;
    background: var(--white);
    align-items: center;
    gap 25px
    justify-content: space-between;
    +below(1024px) {
      margin 10px 20px 0 20px
      justify-content: space-between;
      flex-direction: column;
      align-items start
      gap 10px
      padding 14px 15px
    }
  }

  &__header-right {
    font-weight: 700;
    font-size: 1.375em;
    line-height: 34px;
    max-width: 695px;
    color: var(--dark);
    +below(1024px) {
      font-size: 1.125em;
      line-height: 28px;
    }
  }

  &__header-left {
    display: flex;
    flex-direction: column;

    &_title {
      font-weight: 700;
      font-size: 1.375em;
      line-height: 34px;
      color: var(--dark);
      +below(1024px) {
        font-size: 1.125em;
        line-height: 28px;
      }
    }

    &_subtitle {
      font-weight: 400;
      font-size: 0.875em;
      line-height: 22px;
      color: var(--dark_light);
      +below(1024px) {
        font-size: 0.75em;
        line-height: 18px;
      }
    }
  }

  &__content {
    display: flex;
    background: var(--white);
    border-radius: var(--main_radius);
    filter: drop-shadow(0px 0px 60px rgba(0, 0, 0, 0.05));
    transition var(--transition)
    +below(1024px) {
      flex-direction column
    }

    &-text {
      display: flex;
      width: 60%;
      padding 50px 0 50px 50px;
      flex-direction: column;
      justify-content: space-between;
      font-style: italic;
      font-weight: 400;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--dark);
      transition var(--transition)
      +below(1024px) {
        padding 4px 20px 30px 20px
        width: 100%;
      }
      +below(1024px) {
        .editor-js {
          p:nth-last-child(-n+3) {
            display none
          }
        }
      }


      &--mob {
        font-weight: 400;
        font-size: 0.875em;
        line-height: 22px;
        text-decoration-line: underline;
        color: var(--dark);
        cursor pointer
        +above(1025px) {
          display none
        }
      }


      p {
        transition var(--transition)
        +below(1600px) {
          font-size 0.875em
        }
        +below(1024px) {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 11;
          -webkit-box-orient: vertical
        }
      }

      &--open {
        .editor-js {
          p:nth-last-child(-n+3) {
            display block
          }
        }
      }
    }

    &-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      //background-image url("/static/images/gachalav.png")
      background-repeat: no-repeat
      background-size: cover;
      background-position: center;
      width: 40%;
      +below(1024px) {
        align-items start
        background-size: contain;
        background-position: right;
        width: 100%;
      }

      .btn {
        margin-bottom: 50px;
        +below(1024px) {
          margin 0px 0 20px 30px
        }
      }

      .img {
        margin-bottom: -110px;
        +below(1024px) {
          margin-bottom -80px
          width: 100%;
          height: 100%;
          max-width 350px
        }
      }

      //   .btn {
      //     max-width: 293px;
      //   }
    }
  }
}
</style>
