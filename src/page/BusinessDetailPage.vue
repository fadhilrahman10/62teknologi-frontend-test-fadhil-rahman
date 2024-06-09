<script setup>
import {ref, onMounted, watch} from "vue";
import {BusinessService} from "../service/BusinessService.js";
import {useRoute} from "vue-router";
import { GoogleMap, Marker } from 'vue3-google-map'
import Review from "../components/Review.vue";

const route = useRoute();

onMounted(() => {
  BusinessService.getBusinessDetail(route.params.id)
      .then(res => res.json())
      .then(data => business.value = data)
      .catch(e => console.error(e));
})

const business = ref();
const responsiveOptions = ref([
  {
    breakpoint: '991px',
    numVisible: 4
  },
  {
    breakpoint: '767px',
    numVisible: 3
  },
  {
    breakpoint: '575px',
    numVisible: 1
  }
]);
</script>

<template>
  <RouterLink to="/">
    <Button label="Back" severity="contrast" />
  </RouterLink>
  <div class="" v-if="business">
    <section class="">
      <div class="p-4 flex gap-4">
        <Galleria :value="business.photos" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px"
                  :showItemNavigators="true" :showThumbnails="false" class="max-w-md">
          <template #item="slotProps">
            <div class="max-w-lg">
              <img class="rounded-lg object-cover w-[800px] h-[400px]" :src="slotProps.item" :alt="`img-${slotProps.item}`" style="display: block;" />
            </div>
          </template>
          <template #thumbnail="slotProps">
            <img :src="slotProps.item" :alt="`img-${slotProps.item}`" style="display: block;" />
          </template>
        </Galleria>

        <div class="flex flex-col w-full">
          <div>
            <div class="flex gap-2 items-center">
              <h1 class="text-2xl font-semibold">{{ business.name }}</h1>
              <div class="surface-100 p-1" style="border-radius: 30px">
                <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06)">
                  <span class="text-900 font-medium text-sm">{{ business.rating }}</span>
                  <i class="pi pi-star-fill text-yellow-500"></i>
                </div>
              </div>
            </div>
            <div class="flex gap-2 mt-2">
              <Tag v-for="category in business.categories" severity="secondary" :value="category.title"></Tag>
            </div>
          </div>

          <div class="mt-4">
            <GoogleMap
                style="width: 100%; height: 300px"
                :center="{
                lat: business.coordinates.latitude,
                lng: business.coordinates.longitude,
              }"
                :zoom="15"
            >
              <Marker :options="{
              position: {
                lat: business.coordinates.latitude,
                lng: business.coordinates.longitude,
              },
              label: business.alias,
              title: business.name
            }" />
            </GoogleMap>
          </div>
        </div>
      </div>
    </section>

    <Review />
  </div>

  <div class="" v-else>
    Loading
  </div>
</template>

<style scoped>

</style>