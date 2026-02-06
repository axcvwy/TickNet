<template>
  <div class="flex-1">
    <Navbar />



    <!-- HERO -->
    <header class="px-4 sm:px-6">
      <HeroSearch class="mt-4 sm:mt-6" placeholder="Search events, artists, teams, and more..." @search="handleSearch" />
      <TrendSlider :events="trendEvents" />
    </header>







    <!-- Grid of events -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Spectacles & Événements</h2>
          <p class="text-xs sm:text-sm text-gray-500 mt-1">
            Affichage de 1–{{ Math.min(displayLimit, events.length) }} de {{ events.length }} résultats
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        <EventCard v-for="e in displayedEvents" :key="e.id" :event="e" />
      </div>

      <!-- Load More Button -->
      <div v-if="displayLimit < events.length" class="mt-12 sm:mt-16 text-center">
        <button
          @click="displayLimit += 8"
          class="px-6 sm:px-8 py-2.5 sm:py-3 bg-white border border-gray-200 text-gray-900 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95 text-sm sm:text-base"
        >
          Charger plus de spectacles
        </button>
      </div>
    </section>

      <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '../components/NavBar.vue'
import EventCard from '../components/EventCard.vue'
import AppFooter from '../components/AppFooter.vue'
import TrendSlider from '@/components/TrendSlider.vue'
import HeroSearch from '../components/HeroSearch.vue'
import { EventService, type Event } from '@/services/event.service'
import { computed } from 'vue'

const events = ref<Event[]>([])
const trendEvents = ref<Event[]>([])
const displayLimit = ref(8)

const displayedEvents = computed(() => {
  return events.value.slice(0, displayLimit.value)
})

async function loadData() {
  const allEvents = await EventService.getAllEvents()
  events.value = allEvents
  trendEvents.value = allEvents.slice(0, 5) // Just taking first 5 for now as trends
}




onMounted(loadData)

function handleSearch(q: string) {
  console.log('Recherche effectuée :', q)
  // TODO: Implement search with EventService
  EventService.searchEvents(q).then(results => {
    events.value = results
  })
}

</script>
