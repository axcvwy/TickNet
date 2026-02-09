<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-orange-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
    </div>

    <div class="max-w-md w-full space-y-8 relative z-10">
      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <span class="inline-block -rotate-6 bg-orange-500 rounded-bl-lg rounded-br-lg px-3 sm:px-4 py-1 text-white font-bold text-lg sm:text-xl" style="font-family: sans-serif; letter-spacing: 0.5px; height: 36px; display: flex; align-items: center;"> TickNet </span>
          </div>
          <p class="mt-4 text-white font-semibold">Créer un compte</p>
        </div>

        <!-- Form -->
        <form class="space-y-4" @submit.prevent="handleRegister">
          <div>
            <label for="nom" class="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
            <input
              id="nom"
              name="nom"
              type="text"
              required
              v-model="nom"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              placeholder="Jean Dupont"
            />
          </div>
          <div>
            <label for="email-address" class="block text-sm font-medium text-gray-700 mb-2">Adresse Email</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="email"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label for="telephone" class="block text-sm font-medium text-gray-700 mb-2">Téléphone (optionnel)</label>
            <input
              id="telephone"
              name="telephone"
              type="text"
              autocomplete="tel"
              v-model="telephone"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              placeholder="+33 6 12 34 56 78"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              v-model="password"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-6"
          >
            {{ loading ? 'Inscription en cours...' : "S'inscrire" }}
          </button>
        </form>

        <!-- Divider -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-center text-sm text-gray-600">
            Déjà inscrit?
            <router-link to="/login" class="font-semibold text-orange-600 hover:text-orange-700 transition-colors">
              Se connecter
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth.service'

const router = useRouter()
const nom = ref('')
const email = ref('')
const password = ref('')
const telephone = ref('')
const error = ref('')
const loading = ref(false)

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  try {
    await authService.register(nom.value, email.value, password.value, telephone.value)
    router.push('/login')
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Une erreur est survenue lors de l\'inscription.'
    }
  } finally {
    loading.value = false
  }
}
</script>
