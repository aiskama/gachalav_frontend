import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default function createRouter() {
  const routes = [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home/index.vue"),
      meta: { name: "Главная" },
    },
    {
      path: "/objects",
      name: "objects",
      component: () => import("./views/objects/index.vue"),
      meta: { name: "Инвестиционные объекты" },
    },
    {
      path: "/portal",
      name: "portal",
      component: () => import("./views/portal/index.vue"),
      meta: { name: "Информационный портал" },
    },
    {
      path: "/portal/:id",
      name: "news_item",
      component: () => import("./views/news/index.vue"),
      meta: { name: "Информационный портал" },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/about/index.vue"),
      meta: { name: "О застройщике" },
    },
    {
      path: "/live",
      name: "live",
      component: () => import("./views/live/index.vue"),
      meta: { name: "Live" },
    },
    {
      path: "/secondary",
      name: "secondary",
      component: () => import("./views/secondary/index.vue"),
      meta: { name: "secondary" },
    },
    {
      path: "/object/:id",
      name: "object",
      component: () => import("./views/object/index.vue"),
      meta: { name: "Инвестиционный объект" },
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("./views/privacy/index.vue"),
      meta: { name: "Политика конфиденциальности" },
    },
    {
      path: "/contacts",
      name: "contacts",
      component: () => import("./views/contacts/index.vue"),
      meta: { name: "Контакты" },
    },
    {
      path: "/flats/:id?",
      name: "flats",
      component: () => import("./views/flat/list/index.vue"),
      meta: { name: "Контакты" },
    },
    {
      path: "/calc",
      name: "calc",
      component: () => import("./views/calculator/index.vue"),
    },
    {
      path: "/slider",
      name: "slider",
      component: () => import("./views/slider/index.vue"),
    },

    {
      path: "/flat/:id",
      name: "flat",
      component: () => import("./views/flat/open/index.vue"),
      meta: { name: "Контакты" },
      props: true,
    },
    {
      path: "*",
      name: "notfound",
      component: () => import("./views/PageNotFound.vue"),
    },
  ];
  return new Router({
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return {
          selector: to.hash,
          behavior: "smooth",
        };
      }
      return { x: 0, y: 0 };
    },
    fallback: true,
    routes,
  });
}
