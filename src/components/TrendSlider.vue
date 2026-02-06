<template>
  <div v-if="currentEvent" class="w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-indigo-950 relative mt-8 sm:mt-12 transition-all duration-500">
    <div class="flex flex-col md:flex-row h-auto md:h-[400px] lg:h-[450px]">
      <!-- Overlay Left (Title, Button) -->
      <div class="flex-1 flex flex-col justify-center p-6 sm:p-8 md:pl-12 md:pr-6 md:py-8 relative order-2 md:order-1">
        <h2 class="text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 line-clamp-2">{{ currentEvent.title }}</h2>
        <RouterLink :to="{ name: 'spectacle-detail', params: { id: currentEvent.id }}" class="bg-orange-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold hover:bg-orange-600 transition-all w-max shadow-lg text-sm sm:text-base">
          Voir les tickets
        </RouterLink>
        <!-- Dots navigation -->
        <div class="mt-6 md:mt-0 md:absolute md:left-0 md:bottom-8 flex gap-2 sm:gap-3 md:pl-12">
          <button
            v-for="(ev, idx) in events"
            :key="ev.id"
            @click="current = idx"
            :class="[
              'w-3 h-3 sm:w-4 sm:h-4 rounded-full transition',
              idx===current ? 'bg-orange-500' : 'bg-gray-700 hover:bg-gray-600'
            ]"
          />
        </div>
      </div>

      <!-- Image Right -->
      <div class="flex-1 md:flex-[1.5] lg:flex-3 relative h-64 sm:h-80 md:h-full order-1 md:order-2 md:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]">
        <img
          :src="currentEvent.image"
          alt=""
          class="object-cover w-full h-full transition-all duration-700"
          :key="currentEvent.id"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import type { Event } from '@/services/event.service'

const props = defineProps<{
  events: Event[]
}>()

const current = ref(0)
const currentEvent = computed(() => {
  if (props.events.length === 0) return null
  return props.events[current.value]
})

let autoSlideTimer: ReturnType<typeof setInterval>

onMounted(() => {
  autoSlideTimer = setInterval(() => {
    if (props.events.length > 0) {
      current.value = (current.value + 1) % props.events.length
    }
  }, 5000)
})

onUnmounted(() => {
  clearInterval(autoSlideTimer)
})
</script>
