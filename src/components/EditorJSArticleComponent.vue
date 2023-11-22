<template>
  <div v-if="text && typeof text === 'object'" class="editor-js">
    <template v-for="(block, index) in text.blocks">
      <p v-if="block.type === 'paragraph'" :key="index" v-html="block.data.text"></p>
      <h1 v-if="block.type === 'header' && block.data.level === 1" :key="index">
        {{ block.data.text }}
      </h1>
      <h2 v-if="block.type === 'header' && block.data.level === 2" :key="index">
        {{ block.data.text }}
      </h2>
      <h3 v-if="block.type === 'header' && block.data.level === 3" :key="index">
        {{ block.data.text }}
      </h3>
      <h4 v-if="block.type === 'header' && block.data.level === 4" :key="index">
        {{ block.data.text }}
      </h4>
      <h5 v-if="block.type === 'header' && block.data.level === 5" :key="index">
        {{ block.data.text }}
      </h5>
      <h6 v-if="block.type === 'header' && block.data.level === 6" :key="index">
        {{ block.data.text }}
      </h6>
      <pre v-if="block.type === 'code'" :key="index">{{ block.data.code }}</pre>
      <div v-if="block.type === 'quote'" :key="index" class="article__quote">
        <p>{{ block.data.text }}</p>
        <span>{{ block.data.caption }}</span>
      </div>
      <hr v-if="block.type === 'delimiter'" :key="index" />
      <div v-if="block.type === 'raw'" :key="index" v-html="block.data.html"></div>
      <div v-if="block.type === 'warning'" :key="index" class="article__warning">
        <span>{{ block.data.title }}</span>
        <p>{{ block.data.message }}</p>
      </div>
      <table v-if="block.type === 'table'" :key="index">
        <tbody>
          <tr v-for="(row, i) in block.data.content" :key="i">
            <td v-for="(column, j) in row" :key="j" v-html="column"></td>
          </tr>
        </tbody>
      </table>
      <ul v-if="block.type === 'list' && block.data.style === 'unordered'" :key="index">
        <li v-for="(item, i) in block.data.items" :key="i">{{ item }}</li>
      </ul>
      <ol v-if="block.type === 'list' && block.data.style === 'ordered'" :key="index">
        <li v-for="(item, i) in block.data.items" :key="i">{{ item }}</li>
      </ol>
      <a
        v-if="block.type === 'linkTool'"
        :key="index"
        :href="block.data.link"
        class="article__link"
        rel="nofollow"
        target="_blank"
      >
        <div>
          <span>{{ block.data.meta.title.length ? block.data.meta.title : block.data.link }}</span>
          <span v-if="block.data.meta.description.length">{{ block.data.meta.description }}</span>
        </div>
        <img
          v-if="block.data.meta.image.url.length"
          :alt="block.data.meta.title"
          :src="block.data.meta.image.url"
          loading="lazy"
        />
      </a>
      <div
        v-if="block.type === 'image'"
        :key="index"
        :class="{
          'article__image--fixed': block.data.link,
          'article__image--stretched': block.data.stretched,
          'article__image--left': block.data.left,
          'article__image--right': block.data.right,
        }"
        class="article__image"
      >
        <a v-if="block.data.link" :href="block.data.link" class="img__container" target="_blank">
          <div class="img__upper__layer"></div>
          <img
            :alt="block.data.caption"
            :src="
              block.data.file.url.indexOf('http') !== -1
                ? block.data.file.url
                : $store.state._env.MEDIA_ENDPOINT + block.data.file.url
            "
            loading="lazy"
          />
          <div class="article__image-info">
            <div class="article__image-title" v-html="block.data.caption"></div>
          </div>
        </a>

        <template v-else>
          <img
            :alt="block.data.caption"
            :src="
              block.data.file.url.indexOf('http') !== -1
                ? block.data.file.url
                : $store.state._env.MEDIA_ENDPOINT + block.data.file.url
            "
            loading="lazy"
          />
          <span v-html="block.data.caption"></span>
        </template>
      </div>
    </template>
  </div>
  <div v-else class="editor-js" v-html="text"></div>
</template>

<script>
export default {
  name: "EditorJSArticleComponent",
  props: {
    text: {
      type: [Object, String],
      required: true,
    },
  },
  data() {
    return {
      editor: null,
    };
  },
};
</script>

<style lang="stylus">
.editor-js {
  display flex
  flex-direction column

  & > * {
    margin 10px 0

    &:first-child {
      margin-top: 0;
    }
  }

  ul
  ol {
    padding-left 20px
  }

  .article__embed {
    width 100%
    margin 30px 0 k

    iframe {
      width 100%
      max-width 100%
    }
  }

  .article__quote {
    width 100%
    display flex
    flex-direction column
    border-left 5px solid var(--dark)
    padding 20px 0 16px 20px

    p {
      font-weight normal
      font-size: 1em;
      width 100%
      text-align left
      line-height: 26px
      color var(--dark)
      margin-bottom 10px
    }

    span {
      font-size 0.875em
      line-height: 26px
      text-align right
      color rgba(0, 0, 0, 0.5);
    }
  }

  .article__link {
    display flex
    align-items flex-start
    justify-content flex-start
    box-shadow 0 15px 20px rgba(0, 0, 0, 0.05);
    border-radius 5px
    padding 10px 15px

    img {
      height 100%
      object-fit cover
      object-position center
      border-radius 5px
    }

    > div {
      display flex
      flex-direction column

      span {
        &:first-child {
          font-size 1.125em
          line-height: 26px
          text-align left
          color var(--dark)
        }

        &:last-child {
          font-size: 1em;
          line-height: 26px
          text-align left
          color var(--dark)
          margin-top 10px
        }
      }
    }
  }

  .article__image {
    display flex
    flex-direction column
    width 100%
    margin: 10px auto;

    img {
      width auto
      max-width 100%
    }

    span {
      margin-top 10px
    }
  }

  .article__image--stretched {
    width 100%
    height auto
  }

  .article__image--fixed {
    position relative
    overflow hidden
    width 100%
    max-width 490px
    height: auto
    border-radius: 10px;
    margin 10px 0

    a {
      display block
      width 100%
      height 100%

      &:hover {
        .article__image-title {
          color var(--orange)
        }

        svg {
          path {
            fill var(--orange)
          }
        }
      }

      img {
        width 100%
        height 100%
        max-width 100%
        object-fit cover
        object-position center
      }
    }

    .img__upper__layer {
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      z-index 2
      background: linear-gradient(180deg, transparent 24.48%, var(--black) 71.35%)
    }

    .article__image-info {
      position absolute
      bottom 0
      left 0
      right 0
      z-index 2
      display flex
      align-items flex-end
      justify-content space-between
      padding 16px 24px

      svg {
        width 48px
        height 48px

        path {
          fill var(--white)
          transition 0.2s
        }
      }
    }

    .article__image-title {
      font-weight: 500;
      font-size: 1.375em
      line-height: 28px;
      color var(--white)
      transition 0.2s
      margin-right: 24px;
    }
  }

  .article__warning {
    display flex
    flex-direction column
    border-left 5px solid var(--red)
    padding 20px 0 16px 20px
    width 100%

    p {
      font-weight normal
      font-size: 1em;
      width 100%
      text-align left
      line-height: 26px
      color var(--dark)
      margin 0
    }

    span {
      font-size 1.125em
      line-height: 26px
      text-align left
      color var(--red)
      margin-bottom 10px
    }
  }

  hr {
    margin 32px 0;
    width 100%
  }

  pre,
  p {
    width 100%
    +below(420px) {
      font-size: 0.875em;
      line-height: 26px
    }
  }
}
</style>
