import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import AppLoader from '@/components/AppLoader.vue';
import AppError from '@/components/AppError.vue';
import { useCountriesStore } from '@/stores/countries';

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

const favouritesView = defineAsyncComponent({
  loader: () => import('@/views/FavouritesView.vue'),
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

  {
    path: '/favourites',
    name: 'favourites',
    component: favouritesView,
    beforeEnter: () => {
      const store = useCountriesStore();
      if (store.favouriteCountries.length === 0) {
        return { name: 'countries' };
      }
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
