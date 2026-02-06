<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <div class="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
      <h1 class="text-3xl font-bold mb-8 capitalize">{{ title }}</h1>

      <div v-if="events.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <EventCard v-for="e in events" :key="e.id" :event="e" />
      </div>

      <div v-else class="text-center py-20 text-gray-500">
        <p class="text-xl">Aucun événement trouvé pour cette catégorie.</p>
        <RouterLink to="/" class="text-orange-600 hover:text-orange-500 hover:underline mt-4 inline-block transition-colors">Retour à l'accueil</RouterLink>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '../components/NavBar.vue';
import AppFooter from '../components/AppFooter.vue';
import EventCard from '../components/EventCard.vue';
import { EventService, type Event } from '../services/event.service';

const route = useRoute();
const events = ref<Event[]>([]);

const title = computed(() => {
  const slug = route.params.slug as string;
  const map: {[key: string]: string} = {
    "theatre": "Théâtre",
    "musique": "Musique",
    "danse": "Danse",
    "comedie": "Comédie",
    "arts-visuels": "Arts visuels"
  };
  return map[slug] || slug;
});

async function loadEvents() {
  const slug = route.params.slug as string;
  if (slug) {
    events.value = await EventService.getEventsByCategory(slug);
  }
}

onMounted(loadEvents);

watch(() => route.params.slug, loadEvents);
</script>
