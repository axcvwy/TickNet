<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
    <Navbar />

    <main class="flex-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900">Votre Panier</h1>
          <p class="text-gray-600 mt-2">{{ items.length }} {{ items.length === 1 ? 'article' : 'articles' }} dans votre panier</p>
        </div>

        <!-- Empty State -->
        <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-20">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
              <svg class="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p class="text-xl font-semibold text-gray-900 mb-2">Panier vide</p>
            <p class="text-gray-600 mb-6">Vous n'avez pas encore réservé de places</p>
            <router-link to="/" class="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Découvrir les spectacles
            </router-link>
          </div>
        </div>

        <!-- Cart Content -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Items List -->
          <div class="lg:col-span-2 space-y-4">
            <div v-for="item in items" :key="item.seanceId" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <!-- Item Details -->
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-gray-900">{{ item.spectacleTitre }}</h3>
                  <div class="mt-3 space-y-1">
                    <div class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ formatDateTime(item.dateHeure) }}
                    </div>
                    <div class="flex items-center text-sm text-gray-600">
                      <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {{ item.salleNom }}
                    </div>
                  </div>
                  <div class="mt-4 pt-4 border-t border-gray-100">
                    <p class="text-sm text-gray-500">Prix par place</p>
                    <p class="text-lg font-bold text-gray-900">{{ item.unitPrice.toFixed(2) }}€</p>
                  </div>
                </div>

                <!-- Controls -->
                <div class="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-6">
                  <!-- Quantity Control -->
                  <div class="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                    <button @click="decrement(item)" class="px-3 py-2 hover:bg-gray-200 transition-colors">
                      <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <div class="px-4 py-2 font-bold text-gray-900 min-w-[3rem] text-center">{{ item.quantity }}</div>
                    <button @click="increment(item)" class="px-3 py-2 hover:bg-gray-200 transition-colors">
                      <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  <!-- Subtotal & Remove -->
                  <div class="text-right">
                    <div class="text-2xl font-bold text-orange-600">{{ (item.unitPrice * item.quantity).toFixed(2) }}€</div>
                    <button @click="remove(item)" class="text-xs text-red-600 hover:text-red-700 font-semibold mt-2 transition-colors">
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary Card -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 sticky top-24">
              <h2 class="text-xl font-bold text-gray-900 mb-6">Résumé de la commande</h2>

              <!-- Price Breakdown -->
              <div class="space-y-3 pb-6 border-b border-gray-200">
                <div class="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span class="font-semibold">{{ total.toFixed(2) }}€</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Frais de service</span>
                  <span class="font-semibold">Gratuit</span>
                </div>
              </div>

              <!-- Total -->
              <div class="py-6">
                <div class="flex justify-between items-center mb-6">
                  <span class="text-gray-900 font-semibold">Total</span>
                  <span class="text-3xl font-bold text-orange-600">{{ total.toFixed(2) }}€</span>
                </div>
              </div>

              <!-- Login Notice -->
              <div v-if="!authState.user" class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p class="text-sm text-blue-900">
                  <span class="font-semibold">Connexion requise</span> pour finaliser la réservation
                </p>
              </div>

              <!-- Checkout Button -->
              <button
                @click="checkout"
                :disabled="isProcessing || items.length === 0"
                class="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-95"
              >
                {{ isProcessing ? 'Traitement...' : 'Procéder au paiement' }}
              </button>

              <!-- Continue Shopping -->
              <router-link to="/" class="block text-center mt-4 text-orange-600 hover:text-orange-700 font-semibold transition-colors">
                Continuer mes achats
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { CartService, type CartItem } from '@/services/cart.service'
import { authState } from '@/services/auth.service'
import { useRouter } from 'vue-router'

const items = ref<CartItem[]>([])
const isProcessing = ref(false)
const router = useRouter()

function load() {
  items.value = CartService.getCart()
}

onMounted(load)

const total = computed(() => items.value.reduce((s, it) => s + it.unitPrice * it.quantity, 0))

function increment(item: CartItem) {
  CartService.updateQuantity(item.seanceId, item.quantity + 1)
  load()
}

function decrement(item: CartItem) {
  if (item.quantity <= 1) return
  CartService.updateQuantity(item.seanceId, item.quantity - 1)
  load()
}

function remove(item: CartItem) {
  CartService.removeItem(item.seanceId)
  load()
}

async function checkout() {
  // require login so we can include visiteurId in metadata
  if (!authState.user) {
    router.push({ name: 'login', query: { redirect: '/panier' } })
    return
  }
  if (items.value.length === 0) return
  const item = items.value[0]
  isProcessing.value = true
  try {
    const resp = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titreSpectacle: item.spectacleTitre,
        seanceId: item.seanceId,
        quantity: item.quantity,
        unitAmount: Math.round(item.unitPrice * 100),
        currency: 'eur',
        visiteurId: authState.user?.id ?? null
      })
    })

    let data: any = null
    const contentType = resp.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      data = await resp.json()
    } else {
      data = await resp.text()
    }

    if (resp.ok && data && data.url) {
      window.location.href = data.url
      return
    }

    // Provide detailed feedback when available
    const errMsg = (data && (data.error || data.message)) ? (data.error || data.message) : (typeof data === 'string' ? data : JSON.stringify(data))
    console.error('Checkout creation failed', resp.status, errMsg)
    alert(`Impossible de démarrer le paiement: ${errMsg || resp.statusText || resp.status}`)
  } catch (e: any) {
    console.error('Checkout error', e)
    alert(`Erreur lors de la connexion au service de paiement: ${e?.message || e}`)
  } finally {
    isProcessing.value = false
  }
}

function formatDateTime(d?: string) {
  if (!d) return ''
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(d))
}
</script>

<style scoped>
</style>
