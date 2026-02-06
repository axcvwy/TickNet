<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <main v-if="spectacle" class="flex-1">
      <!-- Hero Section -->
      <div class="relative h-[60vh] overflow-hidden">
        <div class="absolute inset-0">
          <img :src="spectacle.imageUrl" :alt="spectacle.titre" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>

        <div class="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div class="max-w-7xl mx-auto">
            <span class="inline-block px-3 py-1 rounded-full bg-orange-500 text-white text-sm font-medium mb-4 shadow-lg shadow-orange-500/30">
              {{ spectacle.genre }}
            </span>
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">{{ spectacle.titre }}</h1>
            <div class="flex items-center text-gray-300 space-x-6 text-sm md:text-base">
              <span class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ spectacle.dureeMinutes }} minutes
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-7xl mx-auto px-4 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Left Column: Description & Info -->
          <div class="lg:col-span-2 space-y-12">
            <section>
              <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span class="w-1.5 h-8 bg-orange-500 rounded-full mr-3"></span>
                À propos du spectacle
              </h2>
              <p class="text-gray-600 leading-relaxed text-lg whitespace-pre-line bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                {{ spectacle.description }}
              </p>
            </section>

            <!-- Important Info -->
            <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-4">
                  <div class="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900">Information</h4>
                    <p class="text-sm text-gray-500 mt-1">Veuillez vous présenter 30 minutes avant le début de la séance.</p>
                  </div>
               </div>
               <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start space-x-4">
                  <div class="p-3 bg-green-50 text-green-600 rounded-xl">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-900">Billets</h4>
                    <p class="text-sm text-gray-500 mt-1">E-billets acceptés sur smartphone. Annulation possible jusqu'à 48h avant.</p>
                  </div>
               </div>
            </section>
          </div>

          <!-- Right Column: Sessions & Booking -->
          <div class="space-y-6">
            <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                Séances disponibles
                <span class="text-sm font-medium px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">{{ sessions.length }}</span>
              </h3>

              <div v-if="sessions.length > 0" class="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                <div
                  v-for="session in sortedSessions"
                  :key="session.id"
                  class="group p-4 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer relative"
                  @click="selectSession(session)"
                  :class="{'border-orange-500 bg-orange-50/50 shadow-md ring-1 ring-orange-500': selectedSessionId === session.id}"
                >
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <p class="font-bold text-gray-900">{{ formatDateLarge(session.dateHeure) }}</p>
                      <p class="text-xs text-orange-600 font-medium">{{ formatTime(session.dateHeure) }}</p>
                    </div>
                    <div class="text-right">
                       <p class="text-lg font-black text-gray-900">{{ session.prix }}€</p>
                       <p class="text-[10px] text-gray-400">par personne</p>
                    </div>
                  </div>

                  <div class="flex items-center text-sm text-gray-500">
                    <svg class="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {{ session.salle.nom }}
                  </div>

                  <!-- Seats indicator -->
                  <div class="mt-3 w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                    <div class="bg-orange-500 h-full" :style="{ width: '85%' }"></div>
                  </div>
                  <p class="text-[10px] text-gray-400 mt-1 font-medium">Quelques places restantes</p>
                </div>
              </div>

              <div v-else class="text-center py-12">
                <div class="p-4 bg-gray-50 rounded-2xl inline-block mb-4 text-gray-300">
                   <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p class="text-gray-500 font-medium">Aucune séance programmée</p>
              </div>

              <div class="mt-8">
                <button
                  :disabled="!selectedSessionId"
                  @click="handleBooking"
                  class="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale disabled:pointer-events-none"
                >
                  {{ selectedSessionId ? 'Réserver mes places' : 'Choisir une séance' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Skeleton / Loading State -->
    <div v-else class="flex-1 animate-pulse">
       <div class="h-[60vh] bg-gray-200"></div>
       <div class="max-w-7xl mx-auto p-16 grid grid-cols-3 gap-12">
          <div class="col-span-2 space-y-8">
            <div class="h-8 bg-gray-200 rounded w-1/3"></div>
            <div class="h-32 bg-gray-200 rounded-2xl"></div>
          </div>
          <div class="h-64 bg-gray-200 rounded-3xl"></div>
       </div>
    </div>

      <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { EventService, type Spectacle, type Session } from '../services/event.service'

const route = useRoute()
const router = useRouter()
const spectacle = ref<Spectacle | null>(null)
const sessions = ref<Session[]>([])
const selectedSessionId = ref<number | null>(null)

const sortedSessions = computed(() => {
  return [...sessions.value].sort((a, b) => new Date(a.dateHeure).getTime() - new Date(b.dateHeure).getTime())
})

async function loadData() {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) return

  try {
    const [spec, sess] = await Promise.all([
      EventService.getSpectacleById(id),
      EventService.getSessionsBySpectacleId(id)
    ])
    spectacle.value = spec
    sessions.value = sess

    // Auto-select first session if available
    if (sortedSessions.value.length > 0) {
      selectedSessionId.value = sortedSessions.value[0]?.id || null
    }
  } catch (e) {
    console.error("Failed to load spectacle details", e)
  }
}

function selectSession(session: Session) {
  selectedSessionId.value = session.id
}

function handleBooking() {
  if (!selectedSessionId.value) return
  // Redirect to booking flow with chosen session
  router.push({ name: 'home' }) // placeholder, we'll build booking next
}

function formatDateLarge(dateStr: string) {
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(dateStr))
}

function formatTime(dateStr: string) {
  return new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date(dateStr))
}

onMounted(loadData)
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
