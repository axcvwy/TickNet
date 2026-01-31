<template>
  <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer">
    <img :src="event.img || event.image" alt="event" class="w-full h-44 object-cover" />
    <div class="p-4">
      <p class="text-sm text-gray-500">{{ event.date || event.when }}</p>
      <h3 class="mt-1 font-semibold text-lg leading-tight">{{ event.title }}</h3>
      <p class="text-sm text-gray-500 mt-1">{{ event.location || '' }}</p>
      <div class="mt-3 flex items-center justify-between">
        <div class="text-blue-600 font-bold">À partir de {{ event.price }} €</div>
        <button class="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">Voir</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  event: { type: Object, required: true }
})
</script>