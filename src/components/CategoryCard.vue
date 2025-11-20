<template>
  <div class="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow hover:shadow-md cursor-pointer">
    <div class="text-4xl mb-3">{{ category.icon }}</div>
    <div class="font-semibold">{{ category.title }}</div>
  </div>
</template>

<script setup>
defineProps({
  category: Object
})
</script>