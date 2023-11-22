<template>
  <div>
    <div v-if="!data.type" class="report">
      <div class="report-right">
        <IconComponent name="report" />
        <div class="report__info">
          <div v-if="data.title" class="report__info-title">{{ data.title }}</div>
          <div v-if="data.file" class="report__info-subtitle">{{ data.file.size }}, {{ data.file.type }}</div>
        </div>
      </div>
      <a v-if="data.file" :href="data.file.path" target="_blank">
        <button class="btn btn--gray-border">Посмотреть</button>
      </a>
    </div>
    <div v-if="data.type && data.type.code === 3" class="report">
      <div class="report-right">
        <IconComponent name="report" />
        <div class="report__info">
          <span v-if="data.title" class="report__info-title">{{ data.title }}</span>
          <span v-if="data.file" class="report__info-subtitle">{{ data.file.size }}, {{ data.file.type }}</span>
        </div>
      </div>
      <a v-if="data.file"
         :href="data.file.path"
         target="_blank"
         class="btn btn--gray-border">
        Посмотреть
      </a>
    </div>
  </div>
</template>

<script>
import IconComponent from "./IconComponent.vue";

export default {
  name: "ReportComponent",
  components: { IconComponent },
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.report {
  display: flex;
  align-items center
  border-radius: var(--main_radius);
  background: var(--white);
  padding: 20px 45px;
  +below(1024px) {
    flex-direction: column;
    align-items: initial;
    width: 100%;
    padding 15px
    gap: 15px;
    .btn {
      width: 100%;
    }
  }

  &-right {
    display flex
    gap 30px
    width 100%

    svg {
      height 30px
      width: 30px;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 5px;

    &-title {
      font-weight: 700;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--dark);
      +below(1024px) {
        font-size: 1em;
        line-height: 26px;
      }
    }

    &-subtitle {
      font-weight: 400;
      font-size: 1em;
      line-height: 26px;
      color: var(--dark_light);
      +below(1024px) {
        font-size: 0.875em;
        line-height: 22px;
      }
    }
  }
}
</style>
