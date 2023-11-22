<template>
  <div v-if=" file && file.length!==0 && file.title" class="home_presentation">
    <div class="home_presentation__text">
      <span v-if="file.title" class="home_presentation__text-title">{{file.title}}</span>
      <span v-if="file.description" class="home_presentation__text-subtitle"
        >{{file.description}}</span
      >
      <h3 v-if="file.income">Основные показатели</h3>
      <div class="home_presentation__text_numbers">
        <div class="home_presentation__text_numbers__item">
          <h4 v-if="file.income">Общий объем поступлений</h4>
          <div v-if="file.income" class="home_presentation__text_numbers__item-number">
            <h2>{{file.income}}</h2>
            <h3>млрд. ₽</h3>
          </div>
        </div>
        <div class="home_presentation__text_numbers__item">
          <h4 v-if="file.implementation">Объем реализации</h4>
          <div v-if="file.implementation" class="home_presentation__text_numbers__item-number">
            <h2>{{file.implementation}}</h2>
            <h3>млрд. ₽</h3>
          </div>
        </div>
        <div v-if="file.square" class="home_presentation__text_numbers__item">
          <h4>
            Общая <br />
            площадь
          </h4>
          <div class="home_presentation__text_numbers__item-number">
            <h2>{{file.square}}</h2>
            <h3>тыс. кв. м.</h3>
          </div>
        </div>
      </div>
      <a v-if="file.file && file.file.path" :href="file.file.path" download="" target="_blank" class="btn btn--pink_text">
          <IconComponent name="download" />
          <span> Получить отчет в PDF </span>
      </a>
    </div>
    <div class="home_presentation__img">
      <img alt="Презентация инвестиционной программы GGP" src="/static/images/presentation.png" />
    </div>
  </div>
</template>

<script>
import IconComponent from "components/IconComponent.vue";

export default {
  components: { IconComponent },
  computed: {
    file() {
      return this.$store.state.home_page.info.presentation[0];
    },
  },
};
</script>

<style lang="stylus">
.home_presentation {
  display: flex;
  //margin: var(--between_section);
  margin 57px 160px 0 160px
  padding: 60px 140px 115px 80px;
  gap: 120px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), #2F6EB7;
  border-radius: var(--main_radius);
  background-image: url('/static/images/presentation_bckg.png');
  align-items: center;
  height: 716px;
  +below(1600px) {
    margin var(--between_section--tab)
    height: auto;
  }
  +below(1250px) {
    gap 30px
  }
  +below(1024px) {
    margin 0
    justify-content: center;
    border-radius: 0
    //padding var(--between_section--mob);
    padding: 25px 25px 37px 25px

  }

  svg {
    width: 16px;
    height: 20px;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 30px;
    +below(1024px) {
     gap 15px
     max-width 500px
    }
    +below(500px){
      max-width 100%
    }
    .btn {
      +below(1024px){
        max-width  500px
      }
      +below(500px){
        max-width 100%
      }
    }

    &-title {
      font-weight: 700;
      font-size: 2.125em;
      line-height: 46px;
      color: var(--white);
      +below(1024px) {
        font-size: 1.375em;
        line-height: 34px;
      }
    }

    &-subtitle {
      font-weight: 400;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--white);
      +below(1024px) {
        font-size: 1em;
        line-height: 26px;
      }
    }

    h3 {
      font-weight: 700;
      font-size: 1.625em;
      line-height: 31px;
      color: var(--white);
      +below(1024px) {
        font-size: 1.375em;
        line-height: 34px;
      }
    }

    &_numbers {
      display: flex;
      align-items: center;
      gap: 40px;

      +below(1024px) {
        gap 17px
        display grid
        grid-template-columns 1fr 1fr 1fr
      }

      br {
        +above(1025px) {
          display none
        }
      }
    }

    &_numbers__item {
      display: flex;
      flex-direction: column;
      gap 5px

      &-number {
        display: flex;
        gap: 12px;
        align-items: center;
        +below(1024px) {
          flex-direction: column;
          align-items: start;
          gap 0
        }

        h2 {
          font-weight: 700;
          font-size: 3em;
          line-height: 58px;
          color: var(--white);
          +below(1024px) {
            font-size: 2.125em;
            line-height: 41px;
          }
        }

        h3 {
          font-weight: 400;
          font-size: 0.875em;
          line-height: 22px;
          color: var(--white);
          +below(1024px) {
            font-size: 0.875em;
            line-height: 22px;
          }
        }
      }

      h4 {
        font-weight: 400;
        font-size: 0.75em;
        line-height: 18px;
        color: var(--white);
        +below(1024px) {
          font-size: 0.75em;
          line-height: 18px;
        }
      }
    }

    button {
      //width: 240px;
      +below(1024px) {
        width 100%
      }
    }
  }

  &__img {
    border-radius: var(--main_radius);
    padding-top: 114px;
    +below(1250px) {
      img {
        width: 250px;
      }
    }
    +below(1024px) {
      padding-top: 0
      display none
    }
  }
}
</style>
