<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <main class="max-w-5xl mx-auto p-6 flex-1">
      <h1 class="text-2xl font-bold mb-6">Panier</h1>

      <div v-if="items.length === 0" class="bg-white rounded-2xl p-12 text-center">
        <p class="text-gray-600">Votre panier est vide.</p>
      </div>

      <div v-else class="space-y-6">
        <div v-for="item in items" :key="item.seanceId" class="bg-white p-6 rounded-2xl flex items-center justify-between border">
          <div>
            <div class="font-bold text-gray-900">{{ item.spectacleTitre }}</div>
            <div class="text-sm text-gray-500">{{ formatDateTime(item.dateHeure) }} • {{ item.salleNom }}</div>
            <div class="text-sm text-gray-700 mt-2">Prix unité: {{ item.unitPrice.toFixed(2) }}€</div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="flex items-center bg-gray-100 rounded-full overflow-hidden">
              <button @click="decrement(item)" class="px-3 py-2 text-lg">−</button>
              <div class="px-4 font-bold">{{ item.quantity }}</div>
              <button @click="increment(item)" class="px-3 py-2 text-lg">+</button>
            </div>

            <div class="text-right">
              <div class="font-bold">{{ (item.unitPrice * item.quantity).toFixed(2) }}€</div>
              <button @click="remove(item)" class="text-xs text-red-500 mt-1">Supprimer</button>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl border flex justify-between items-center">
          <div>
            <div class="text-sm text-gray-500">Total</div>
            <div class="text-2xl font-bold">{{ total.toFixed(2) }}€</div>
          </div>
          <div class="w-64">
            <button @click="checkout" class="w-full py-3 bg-orange-500 text-white rounded-2xl font-bold">Procéder au paiement</button>
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

const items = ref<CartItem[]>([])
const isProcessing = ref(false)

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
        currency: 'eur'
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
