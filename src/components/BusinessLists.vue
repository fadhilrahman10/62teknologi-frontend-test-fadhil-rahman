
<template>
  <div class="p-8 mb-4 shadow rounded-lg bg-white" v-if="businessLists">
    <DataView :value="businessLists" paginator :rows="3">
      <template #header>
        <div class="flex gap-2">
          <IconField iconPosition="left">
            <InputIcon class="pi pi-search"> </InputIcon>
            <InputText v-model="search" @input="onSearch" placeholder="Search term" />
          </IconField>
          <Dropdown v-model="filterBy" :options="filterOptions" optionLabel="label" placeholder="Filter by Attributes" @change="onFilterChange($event)" />
        </div>
      </template>
      <template #list="slotProps">
        <div class="grid">
          <div v-for="(item, index) in slotProps.items" :key="index" class="col">
            <div class="flex flex-col sm:flex-row sm:items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
              <div class="md:w-10rem relative">
                <img class="block xl:block mx-auto rounded-lg w-[200px] h-[120px] object-cover" :src="`${item.image_url}`" :alt="item.name" />
                <Tag value="FREE" severity="success" class="absolute" style="left: 4px; top: 4px"></Tag>
              </div>
              <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4">
                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                  <div>
                    <div class="flex gap-2 flex-wrap">
                      <span
                          v-for="category in item.categories"
                          class="font-medium text-secondary text-xs px-2 py-1 rounded-full border"
                      >
                        {{ category.title }}
                      </span>
                    </div>
                    <div class="text-lg font-medium text-900 mt-2">{{ item.name }}</div>
                  </div>
                  <div class="surface-100 p-1" style="border-radius: 30px">
                    <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.06)">
                      <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                      <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-5">
                  <span class="text-xl font-semibold text-900">${{ item.price }}</span>
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <RouterLink :to="`/${item.id}`">
                      <Button label="Detail" class="flex-auto md:flex-initial white-space-nowrap"></Button>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>

  <div v-else>
    <SkeletonLists />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { BusinessService } from "../service/BusinessService.js";
import SkeletonLists from "./SkeletonLists.vue";

onMounted(() => {
  getBusinesses();
});

const businessLists = ref();
const filterBy = ref();
const filterOptions = ref(BusinessService.getBusinessFilters());
const search = ref('');


const onSearch = () => {
  if (search.value.length > 3) {
    const params = {
      term: search.value,
    }

    if (filterBy.value?.value.length > 0) {
      params.attributes = filterBy.value.value;
    }

    getBusinesses(params);
  }
}

const onFilterChange = () => {
  getBusinesses({
    attributes: filterBy.value.value
  })
}

const getBusinesses = (params = {}) => {
  BusinessService.getBusinessLists(params)
      .then(res => res.json())
      .then(data => (businessLists.value = data.businesses))
      .catch(e => console.log(e));
}
</script>
