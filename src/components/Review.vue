<script setup>

import {onMounted, ref} from "vue";
import {BusinessService} from "../service/BusinessService.js";
import {useRoute} from "vue-router";

const route = useRoute();

onMounted(() => {
  BusinessService.getBusinessReviews(route.params.id)
      .then(res => res.json())
      .then(data => {
        reviews.value = data.reviews;
      })
      .catch(e => console.error(e));
})

const reviews = ref();
</script>

<template>
  <article class="p-4" v-if="reviews" v-for="review in reviews">
    <h1 class="text-xl font-semibold my-4">Reviews : </h1>
    <div class="flex items-center mb-4">
      <img class="w-10 h-10 me-4 rounded-full" :src="review.image_url ? `${review.image_url}` : `/src/assets/vue.svg`" alt="">
      <div class="font-medium">
        <p>{{ review.user.name }} <time :datetime="review.time_created" class="block text-sm text-gray-500">{{ review.time_created }}</time></p>
      </div>
    </div>
    <div class="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
      <div class="surface-100 p-1" style="border-radius: 30px">
        <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06)">
          <span class="text-900 font-medium text-sm">{{ review.rating }}</span>
          <i class="pi pi-star-fill text-yellow-500"></i>
        </div>
      </div>
    </div>
    <p class="mb-2 text-gray-500">{{ review.text }}</p>
    <aside>
      <div class="flex items-center mt-3">
        <a href="#" class="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Helpful</a>
        <a href="#" class="ps-4 text-sm font-medium text-blue-600 hover:underline border-gray-200 ms-4 border-s md:mb-0">Report abuse</a>
      </div>
    </aside>
  </article>
  <div class="" v-else>
    Loading
  </div>
</template>

<style scoped>

</style>