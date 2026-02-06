<template>
  <RouterLink :to="{ name: 'spectacle-detail', params: { id: event.id }}" class="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer block border border-transparent hover:border-purple-200">
    <img :src="event.img || event.image" alt="event" class="w-full h-44 object-cover" />
    <div class="p-4">
      <div class="flex justify-between items-start mb-1">
        <span class="text-xs font-semibold px-2 py-0.5 bg-indigo-50 text-indigo-950 rounded-full">{{ event.category }}</span>
        <p class="text-xs text-gray-400">{{ event.date || event.when }}</p>
      </div>
      <h3 class="font-bold text-gray-900 group-hover:text-purple-600 transition-colors leading-snug">{{ event.title }}</h3>
      <p class="text-xs text-gray-500 mt-1 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {{ event.location || '' }}
      </p>
      <div class="mt-4 flex items-center justify-between">
        <div class="text-sm font-bold text-gray-900 border-l-2 border-orange-500 pl-2">
          <span class="text-gray-500 font-normal text-[10px] block uppercase tracking-wider">À partir de</span>
          {{ event.price }} €
        </div>
        <div class="px-5 py-2 bg-orange-500 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-orange-600 transition-all">
          Voir
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps({
  event: { type: Object, required: true }
})
</script>
