import { createRouter, createWebHistory } from 'vue-router';

const CountriesView = () => import('@/views/CountriesView.vue');
const CountryDetailView = () => import('@/views/CountryDetailView.vue');

const routes = [
  {
    path: '/',
    redirect: '/countries',
  },

  {
    path: '/countries',
    name: 'countries',
    component: CountriesView,
  },

  {
    path: '/countries:cca2',
    name: 'country-details',
    component: CountryDetailView,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
