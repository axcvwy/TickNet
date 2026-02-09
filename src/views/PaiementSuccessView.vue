<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <main class="max-w-3xl mx-auto p-8 flex-1">
      <div class="bg-white p-12 rounded-2xl text-center">
        <h1 class="text-2xl font-bold mb-4">Paiement confirmé</h1>
        <p class="text-gray-600 mb-6">Merci ! Votre paiement a bien été accepté.</p>
        <p class="text-sm text-gray-500">ID Session: {{ sessionId }}</p>
        <div class="mt-6">
          <router-link to="/" class="px-6 py-3 bg-orange-500 text-white rounded-2xl font-bold">Retour à l'accueil</router-link>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/NavBar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { CartService } from '@/services/cart.service'

const route = useRoute()
const sessionId = route.query.session_id || route.query.sessionId || ''

onMounted(() => {
  // Clear cart on success — payment webhook will confirm on backend, but for UX we clear local cart
  CartService.clear()
})
</script>

<style scoped>
</style>
