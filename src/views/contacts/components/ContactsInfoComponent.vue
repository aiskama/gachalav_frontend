<template>
  <main class="contacts" v-if="contacts">
    <article class="contacts_map" v-if="contacts.address">
      <MapModal :address="contacts.address" />
    </article>
    <div class="contacts_info">
      <div class="contacts_info__block">
        <div class="contacts_info__block-item">
          <IconComponent name="wtsapp" />
          <div class="contacts_info__block-item__text">
            <span class="contacts_info__block-item__text-title">WhatsApp</span>
            <a  v-if="contacts.phone"
                :href="'https://wa.me/' + contacts.phone |formatNumber"
                target="_blank"
                class="contacts_info__block-item__text-subtitle">
                {{ contacts.phone }}
            </a>
          </div>
        </div>
        <div class="contacts_info__block-item">
          <IconComponent name="telephone" />
          <div class="contacts_info__block-item__text">
            <span class="contacts_info__block-item__text-title">Телефон</span>
            <a
              v-if="contacts.phone"
              :href="'tel:' + contacts.phone"
              class="contacts_info__block-item__text-subtitle">
                    {{ contacts.phone }}
            </a>
          </div>
        </div>
        <div class="contacts_info__block-item">
          <IconComponent name="mail" />
          <div class="contacts_info__block-item__text">
            <span class="contacts_info__block-item__text-title">Email</span>
            <a
              v-if="contacts.email"
              :href="'mailto:' + contacts.email"
              class="contacts_info__block-item__text-subtitle">
                {{ contacts.email }}
            </a>
          </div>
        </div>
      </div>
      <div class="contacts_info__block">
        <div class="contacts_info__block-item">
          <IconComponent name="location" />
          <div class="contacts_info__block-item__text">
            <span class="contacts_info__block-item__text-title">Офис</span>
            <a v-if="contacts.address"
               :href="'https://yandex.ru/maps/?text=' + contacts.address"
               target="_ blank"
               class="contacts_info__block-item__text-subtitle">
                {{ contacts.address }}
            </a>
          </div>
        </div>
        <div class="contacts_info__block-item">
          <IconComponent name="time" />
          <div class="contacts_info__block-item__text">
            <span class="contacts_info__block-item__text-title">Режим работы</span>
              <span v-if="contacts.working_mode" class="contacts_info__block-item__text-subtitle">
                {{ contacts.working_mode }}
              </span>
          </div>
        </div>
      </div>
      <div class="contacts_info__block">
        <span class="contacts_info__block-item__text-title">Соц. сети</span>
        <div class="contacts_info__block-btns">
          <a v-for="(item, i) in contacts.socials"
             :key="i"
             :href="item.link"
             target="_blank"
             class="contacts_info__block-btns_item">
           {{ item.title }}
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import IconComponent from "components/IconComponent.vue";
import MapModal from "components/MapComponent.vue";

export default {
  name: "ContactsInfoComponent",
  props: {
    contacts: {
      type: Object,
    },
  },
  components: { MapModal, IconComponent },
};
</script>
<style lang="stylus">
.contacts {
  display grid
  grid-template-columns 50% 50%
  padding var(--between_section)
  grid-gap 40px
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding 0
    grid-template-columns 1fr
    grid-gap 10px
  }

  &_map {
    width 100%

    .ymap-container {
      width: 100%;
      height: 730px;

      +below(1024px) {
        //width: 100%;
        height: 442px;
      }
    }
    +below(1024px) {
      width 99%
      height: 442px;
    }
  }

  &_info {
    display flex
    flex-direction column
    gap 20px
    +below(1024px) {
      padding var(--between_section--mob)
    }

    &__block {
      display flex
      flex-direction column
      padding 40px
      gap 20px
      border-radius var(--main_radius)
      background var(--white)
      +below(1024px) {
        padding 15px
      }

      &-item {
        display flex
        gap 20px

        svg {
          width 30px
          height: 30px;
        }
      }

      &-btns {
        display flex
        gap 10px
        +below(1024px) {
          flex-direction column
        }

        &_item {
          font-weight: 700;
          font-size: 0.875em;
          line-height: 24px;
          color: var(--dark_light);
          padding 10px 25px
          background var(--gray)
          border-radius 5px
          border none
          cursor pointer

        }
      }
    }

    &__block-item__text {
      display flex
      flex-direction column

      &-title {
        font-weight: 400;
        font-size: 1em;
        line-height: 26px;
        color: var(--dark_light);
        +below(1024px) {
          font-size: 0.875em;
          line-height: 22px;

        }
      }

      &-subtitle {
        font-weight: 700;
        font-size: 22px;
        line-height: 34px;
        color: var(--dark);
        +below(1024px) {
          font-size: 1.125em;
          line-height: 28px;
        }
      }
    }
  }
}
</style>
