<template>
  <div class="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-orange-500 flex relative h-[400px] max-w-7xl mt-6">
<!-- Overlay Left (Title, Button) -->
<div class="flex-1 flex flex-col justify-center pl-12 pr-6 py-8 relative">
  <h2 class="text-white text-4xl font-extrabold mb-6">{{ currentEvent.title }}</h2>
  <button class="bg-transparent border border-purple-200 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-900 transition w-max">
    See Tickets
  </button>
  <!-- Dots navigation FIXED BOTTOM -->
  <div class="absolute left-0 bottom-8 flex gap-3 pl-12">
    <button
      v-for="(ev, idx) in events"
      :key="ev.id"
      @click="current = idx"
      :class="[
        'w-4 h-4 rounded-full transition',
        idx===current ? 'bg-white' : 'bg-[#422674] hover:bg-[#7F53F2]'
      ]"
    />
  </div>
</div>

<!-- Image Right avec découpe inclinée -->
<div class="flex-3 relative h-full" style="clip-path: polygon(10% 0, 100% 0, 100% 100%, 0 100%);">
  <img
    :src="currentEvent.img"
    alt=""
    class="object-cover w-full h-full"
  />
  <!-- Top-right likes/heart -->
  <div class="absolute top-6 right-8 flex items-center gap-2 bg-black/50 rounded-2xl px-4 py-1 text-white">
    <span>1.2K</span>
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 21C12 21 21 13.4545 21 8.33333C21 5.0446 17.8656 3 15 3C13.2393 3 12 4.08696 12 4.08696C12 4.08696 10.7607 3 9 3C6.13437 3 3 5.0446 3 8.33333C3 13.4545 12 21 12 21Z"></path></svg>
  </div>
</div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const events = [
  { id: 1, title: 'Olivia Dean', img: 'https://media.stubhubstatic.com/stubhub-v2-catalog/d_defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_center,w_1600,h_800/categories/352024/6438963' },
  { id: 2, title: 'Sabrina Carpenter', img: 'https://media.stubhubstatic.com/stubhub-v2-catalog/d_defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_center,w_1600,h_800/categories/44460/6574964' },
  { id: 3, title: 'Coldplay', img: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/ColdplayWembley120925_%28cropped%29.jpg?uselang=fr' }
]
const current = ref(0)
const currentEvent = computed(() => events[current.value])

let autoSlideTimer: ReturnType<typeof setInterval>

onMounted(() => {
  autoSlideTimer = setInterval(() => {
    current.value = (current.value + 1) % events.length
  }, 4000) // Slide toutes les 4 secondes
})

onUnmounted(() => {
  clearInterval(autoSlideTimer)
})
</script>
