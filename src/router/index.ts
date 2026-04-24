import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import AppLoader from '@/components/AppLoader.vue';
import AppError from '@/components/AppError.vue';

const CountriesView = defineAsyncComponent({
  loader: () => import('@/views/CountriesView.vue'),
  loadingComponent: AppLoader,
  errorComponent: AppError,
  delay: 200,
  timeout: 8000,
});

const CountryDetailView = defineAsyncComponent({
  loader: () => import('@/views/CountryDetailView.vue'),
  loadingComponent: AppLoader,
  errorComponent: AppError,
  delay: 200,
  timeout: 8000,
});

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
    path: '/countries/:cca2',
    name: 'country-details',
    component: CountryDetailView,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
