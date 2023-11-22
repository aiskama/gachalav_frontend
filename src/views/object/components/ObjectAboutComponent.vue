<template>
  <div class="object_about">
    <h3>О застройщике</h3>
    <div class="object_about__info">
      <div class="object_about__info-video">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          src="https://www.youtube.com/embed/AAIcw-akaeo"
          title="YouTube video player"
        ></iframe>
      </div>
      <div class="object_about__info-description">
        <p>
          Вот уже 13 лет мы занимаем лидирующие позиции в Дербенте по возведению
          многоквартирных домов, обеспечивая жильем тысячи семей.
        </p>
        <p>
          Строив Дома в родном городе, мы ощущаем большую ответственность перед земляками за качество их жизни,
          именно поэтому наши жилые комплексы оснащены передовыми технологиями, а строительство ориентировано на
          международные стандарты.
        </p>
        <p>
          Мы убеждены,что успех компании заключается в трепетном отношении даже к самым мелким деталям
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ObjectAboutComponent",
};
</script>

<style lang="stylus">
.object_about {
  display: flex;
  flex-direction: column;
  padding: var(--between_section);
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding: var(--between_section--mob);
  }

  h3 {
    font-weight: 700;
    font-size: 2.125em;
    line-height: 46px;
    color: var(--dark);
    padding-bottom: 40px;
    +below(1024px) {
      font-size: 1.375em;
      line-height: 34px;
      padding-bottom: 15px;
    }
  }

  &__info {
    display: flex;
    gap: 40px;
    align-items: center;
    +below(1024px) {
      flex-direction column
      gap 9px
    }

    &-video {
      display: flex;
      align-items: center;
      flex-direction: column;
      +below(1024px) {
        width 100%
      }
      iframe {
        border none
        border-radius: var(--main_radius);
        width 684px
        height 436px
        +below(1600px) {
          width: 574px;
          height: 433px;
        }
        +below(1024px) {
          height 240px
          width 450px
        }
        +below(500px) {
          width 400px
        }
        +below(410px) {
          width 350px
        }
      }
    }

    &-description {
      display: flex;
      flex-direction: column;
      padding: 30px 0;
      max-width: 683px;
      gap: 40px;
      +below(1024px) {
        max-width 100%
        padding: 0
        gap 23px
      }

      p {
        font-weight: 300;
        font-size: 1.375em;
        line-height: 38px;
        color: var(--dark);
        +below(1024px) {
          font-size: 0.875em;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
