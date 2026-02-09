<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <main class="flex-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900">Mes Réservations</h1>
          <p class="text-gray-600 mt-2">{{ reservations.length }} {{ reservations.length === 1 ? 'réservation' : 'réservations' }}</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="bg-white rounded-2xl p-6 animate-pulse">
            <div class="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="reservations.length === 0" class="flex flex-col items-center justify-center py-20">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <svg class="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m-4 0v2m4 0a2 2 0 110 4H9a2 2 0 110-4h6a2 2 0 110 4H9" />
              </svg>
            </div>
            <p class="text-xl font-semibold text-gray-900 mb-2">Aucune réservation</p>
            <p class="text-gray-600 mb-6">Vous n'avez pas encore réservé de places</p>
            <router-link to="/" class="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Découvrir les spectacles
            </router-link>
          </div>
        </div>

        <!-- Reservations List -->
        <div v-else class="space-y-6">
          <div v-for="reservation in reservations" :key="reservation.id" class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div class="p-6">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <!-- Spectacle Info -->
                <div>
                  <h3 class="text-xl font-bold text-gray-900">{{ reservation.session.spectacle.titre }}</h3>
                  <div class="mt-3 space-y-2">
                    <div class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ formatDate(reservation.session.dateHeure) }}
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {{ reservation.session.salle.nom }}
                    </div>
                  </div>
                </div>

                <!-- Status Badge -->
                <div class="flex-shrink-0">
                  <span :class="[
                    'inline-flex px-4 py-2 text-sm font-semibold rounded-full',
                    reservation.statut === 'CONFIRMED' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  ]">
                    {{ reservation.statut === 'CONFIRMED' ? 'Confirmée' : 'Annulée' }}
                  </span>
                </div>
              </div>

              <!-- Details Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide font-semibold">Places</p>
                  <p class="text-lg font-bold text-gray-900 mt-1">{{ reservation.nbPlaces }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide font-semibold">Prix total</p>
                  <p class="text-lg font-bold text-orange-600 mt-1">{{ reservation.montantTotal.toFixed(2) }}€</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide font-semibold">Réservée le</p>
                  <p class="text-sm text-gray-900 mt-1">{{ formatReservationDate(reservation.dateReservation) }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide font-semibold">Confirmation</p>
                  <p class="text-sm text-gray-900 mt-1">#{{ reservation.id }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { authState } from '@/services/auth.service'
import { useRouter } from 'vue-router'

interface Reservation {
  id: number
  visiteur: any
  session: {
    id: number
    dateHeure: string
    prix: number
    spectacle: {
      id: number
      titre: string
    }
    salle: {
      id: number
      nom: string
    }
  }
  nbPlaces: number
  montantTotal: number
  dateReservation: string
  statut: 'CONFIRMED' | 'CANCELLED'
}

const reservations = ref<Reservation[]>([])
const loading = ref(true)
const router = useRouter()

async function loadReservations() {
  loading.value = true
  try {
    // Redirect to login if not authenticated
    if (!authState.user) {
      router.push('/login')
      return
    }

    const response = await fetch(`/api/reservations/visiteur/${authState.user.id}`)
    if (!response.ok) throw new Error('Failed to fetch reservations')

    reservations.value = await response.json()
  } catch (error) {
    console.error('Error loading reservations:', error)
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateStr))
}

function formatReservationDate(dateStr: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(dateStr))
}

onMounted(loadReservations)
</script>
