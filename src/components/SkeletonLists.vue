<script setup>

</script>

<template>
  <div class="grid">
    <div v-for="i in 1" :key="i" class="col p-2">
      <div class="p-4 shadow border-[#e2e8f0] rounded-lg">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <Skeleton class="w-[6rem] border-round h-[2rem]" />
        </div>
        <div class="flex flex-col items-center gap-3 py-5">
          <Skeleton class="w-9 rounded-lg h-[10rem]" />
          <Skeleton class="w-[8rem] rounded-lg h-[2rem]" />
          <Skeleton class="w-[6rem] rounded-lg h-[1rem]" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>