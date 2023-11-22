<template>
  <div class="object_images">
    <div class="object_images__header">
      <h3 v-if="description.title" class="object_images__header-title">
        Жизнь в "{{ description.title }}" это...
      </h3>
      <div v-if="description.description" ref="test" class="object_images__header-subtitle">
        {{ description.description }}
      </div>
    </div>
    <div ref="object" class="object_images__grid">
      <div class="object_images__grid-block">
        <div v-for="(item, i) in container[0]" :key="i" class="object_images__grid-item">
          <ImageComponent :head_img="item.img" />
          <span v-if="item.title">{{ item.title }}</span>
        </div>
      </div>
      <div class="object_images__grid-block">
        <div v-for="(item, i) in container[1]" :key="i" class="object_images__grid-item">
          <ImageComponent :head_img="item.img" />
          <span v-if="item.title">{{ item.title }}</span>
        </div>
      </div>
      <div class="object_images__grid-block">
        <div v-for="(item, i) in container[2]" :key="i" class="object_images__grid-item">
          <ImageComponent :head_img="item.img" />
          <span v-if="item.title">{{ item.title }}</span>
        </div>
      </div>
      <div class="object_images__grid-block">
        <div v-for="(item, i) in container[3]" :key="i" class="object_images__grid-item">
          <ImageComponent :head_img="item.img" />
          <span v-if="item.title">{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";

export default {
  name: "ObjectImagesComponent",
  components: { ImageComponent },
  mounted() {
    this.sortImg(this.data);
  },
  props: {
    data: Array,
    description: Object,
  },
  methods: {
    sortImg(images) {
      let i = 0;
      if (window.screen.width > 1024) {
        images.forEach((item) => {
          if (i > 3) {
            i = 0;
          }
          this.container[i].push(item);
          i += 1;
        });
      } else {
        images.forEach((item) => {
          if (i > 1) {
            i = 0;
          }
          this.container[i].push(item);
          i += 1;
        });
      }
    },
  },
  data() {
    return {
      container: [[], [], [], []],
    };
  },
};
</script>

<style lang="stylus">
.object_images {
  display: flex;
  flex-direction: column;
  padding: var(--between_section);
  gap: 45px;
  +below(1600px) {
    padding var(--between_section--tab)
  }
  +below(1024px) {
    padding: var(--between_section--mob);
    gap 17px
  }

  &__header {
    display: flex;
    justify-content: space-between;
    +below(1024px) {
      flex-direction: column;
      gap: 15px;
    }

    &-title {
      font-weight: 700;
      font-size: 2.125em;
      line-height: 46px;
      color: var(--dark);
      +below(1024px) {
        font-size: 1.374em;
        line-height: 34px;
      }
    }

    &-subtitle {
      font-weight: 400;
      font-size: 1.125em;
      line-height: 28px;
      color: var(--dark);
      max-width: 684px;
      +below(1024px) {
        font-size: 0.875em;
        line-height: 22px;
      }
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap 40px
    +below(1024px) {
      grid-template-columns: 1fr 1fr;
      gap 15px
    }

    &-block {
      display flex
      flex-direction column
      flex-wrap wrap
      column-gap: 40px;
      row-gap: 50px;
      +below(1024px) {
        column-gap: 15px;
        row-gap: 28px;
      }
    }


    &-item {
      display: flex;
      flex-direction: column;
      gap: 10px;

      span {
        font-weight: 700;
        font-size: 1.375em;
        line-height: 34px;
        color: var(--dark);
        +below(1024px) {
          font-size: 0.75em;
          line-height: 19px;
          gap 6px
        }
      }

      img {
        border-radius: 10px;
        width: 100%;
      }
    }

    :nth-child(1) {
      img {
        height: 299px;
        +below(1024px) {
          height: 166px;
        }
      }
    }

    :nth-child(2) {
      img {
        height: 322px;
        +below(1024px) {
          height: 180px;
        }
      }
    }

    :nth-child(3) {
      img {
        height: 353px;
        +below(1024px) {
          height: 196px;
        }
      }
    }

    :nth-child(4) {
      img {
        height: 353px;
        +below(1024px) {
          height: 196px;
        }
      }
    }

    :nth-child(5) {
      img {
        height: 322px;
        +below(1024px) {
          height: 178px;
        }
      }
    }

    :nth-child(6) {
      img {
        height: 353px;
        +below(1024px) {
          height: 197px;
        }
      }
    }

    :nth-child(7) {
      img {
        height: 226px;
        +below(1024px) {
          height: 125px;
        }
      }
    }

    :nth-child(8) {
      img {
        height: 299px;
        +below(1024px) {
          height: 166px;
        }
      }
    }

    :nth-child(9) {
      img {
        height: 226px;
        +below(1024px) {
          height: 125px;
        }
      }
    }

    :nth-child(10) {
      img {
        height: 226px;
        +below(1024px) {
          height: 126px;
        }
      }
    }

    :nth-child(11) {
      img {
        height: 299px;
        +below(1024px) {
          height: 166px;
        }
      }
    }

    :nth-child(12) {
      img {
        height: 226px;
        +below(1024px) {
          height: 125px;
        }
      }
    }
  }
}
</style>
